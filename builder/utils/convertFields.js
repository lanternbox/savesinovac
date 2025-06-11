import fs from "fs";
import path from "path";
import { convertHtmlToPayloadJson } from "./convertHtmlToPayloadJson.js";

// Utility function to read and parse JSON files
export const readJsonFile = (filePath) =>
  JSON.parse(fs.readFileSync(filePath, "utf-8"));

// Get collection slug by ID
export const getCollectionSlugById = (collectionId) => {
  const collectionsDir = path.join(process.cwd(), "data", "collections");
  const files = fs.readdirSync(collectionsDir);

  for (const file of files) {
    if (path.extname(file) === ".json") {
      const fileContent = readJsonFile(path.join(collectionsDir, file));
      if (fileContent.id === collectionId) {
        return fileContent.slug;
      }
    }
  }
  return null;
};

// Field types to exclude
const fieldsToExclude = [
  // Relationship fields
  "Image",
  "File",
  "Reference",
  "MultiReference",
  // Not supported
  "Email",
  "Phone",
  "MultiImage",
  "VideoLink",
  "Color",
];

// Field type mapping with conversion logic
export const fieldTypeMapping = {
  PlainText: {
    type: "text",
    localized: (fieldName) => fieldName !== "slug",
  },
  Link: {
    type: "text",
    localized: true,
  },
  RichText: {
    type: "richText",
    localized: true,
    processValue: (value) => convertHtmlToPayloadJson(value),
  },
  Number: { type: "number" },
  DateTime: { type: "date" },
  Option: {
    type: "select",
    getOptions: (field) =>
      field.validations.options.map(({ name, id }) => ({
        label: name,
        value: name,
      })),
    processValue: (value, field) => {
      const option = field.validations.options.find((opt) => opt.id === value);
      return option ? option.name : null;
    },
  },
  Image: { type: "upload", relationTo: "media" },
  File: { type: "upload", relationTo: "media" },
  Reference: {
    type: "relationship",
    getRelationTo: (field) =>
      getCollectionSlugById(field.validations?.collectionId),
  },
  MultiReference: {
    type: "relationship",
    getRelationTo: (field) =>
      getCollectionSlugById(field.validations?.collectionId),
    hasMany: true,
  },
};

// Convert Webflow fields to Payload fields
export const convertFields = (webflowFields) => {
  const priorityFields = ["name", "slug"];

  const convertedFields = webflowFields.map((field) => {
    const fieldType =
      fieldTypeMapping[field.type] || fieldTypeMapping.PlainText;
    const convertedField = {
      name: field.slug,
      type: fieldType.type,
      ...(field.isRequired && { required: true }),
    };

    // Check if the field should be localized
    if (typeof fieldType.localized === "function") {
      if (fieldType.localized(field.slug)) {
        convertedField.localized = true;
      }
    } else if (fieldType.localized) {
      convertedField.localized = true;
    }

    if (fieldType.getOptions) {
      convertedField.options = fieldType.getOptions(field);
    }

    if (fieldType.relationTo) {
      convertedField.relationTo = fieldType.relationTo;
    }

    if (fieldType.getRelationTo) {
      convertedField.relationTo = fieldType.getRelationTo(field);
    }

    if (fieldType.hasMany) {
      convertedField.hasMany = fieldType.hasMany;
    }

    return convertedField;
  });

  // Sort fields so that priority fields come first
  const sortedFields = [
    ...priorityFields.map((name) =>
      convertedFields.find((f) => f.name === name),
    ),
    ...convertedFields.filter((f) => !priorityFields.includes(f.name)),
  ].filter(Boolean);

  return sortedFields;
};

// Function to process item data
export const processItemData = (itemData, collectionFields) => {
  const fieldData = { ...itemData.fieldData };

  // Add the Webflow ID as a string
  fieldData.webflowId = itemData.id;

  for (const field of collectionFields) {
    const fieldType =
      fieldTypeMapping[field.type] || fieldTypeMapping.PlainText;
    const fieldName = field.slug;

    // Remove fields that are not supported
    if (fieldsToExclude.includes(field.type)) {
      delete fieldData[fieldName];
      continue;
    }

    // Process field value if a processor is defined
    if (fieldType.processValue && fieldData[fieldName]) {
      fieldData[fieldName] = fieldType.processValue(
        fieldData[fieldName],
        field,
      );
    }
  }

  return fieldData;
};
