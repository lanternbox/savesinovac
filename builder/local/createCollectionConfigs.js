import fs from "fs";
import path from "path";
import {
  getCollectionSlugById,
  fieldTypeMapping,
  convertFields,
  readJsonFile,
} from "../utils/convertFields.js";
import { applyPrettierSitewide } from "./prettier.js";

// Utility function to write content to a file
const writeFile = (filePath, content) => {
  fs.writeFileSync(filePath, content);
};

// Create Payload config content without using JSON.stringify on functions
const createPayloadConfigContent = (
  collectionName,
  slug,
  fields,
  defaultColumns,
  defaultSort,
) => {
  const allFields = [
    {
      name: "webflowId",
      type: "text",
      admin: { description: "The original Webflow ID for this item" },
    },
    ...fields,
  ];

  const collectionConfig = `
import type { CollectionConfig } from 'payload';
import afterChangePostToWebhook from "@/hooks/afterChangePostToWebhook";
import afterDeletePostToWebhook from "@/hooks/afterDeletePostToWebhook";

export const ${collectionName.replace(/\s+/g, "")}: CollectionConfig = {
  slug: '${slug}',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ${JSON.stringify(defaultColumns)},
  },
  ${defaultSort ? `defaultSort: '${defaultSort}',` : ""}
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
    hooks: {
    afterChange: [afterChangePostToWebhook],
    afterDelete: [afterDeletePostToWebhook],
  },
  fields: ${JSON.stringify(allFields, null, 2).replace(/"(\w+)":/g, "$1:")},
};
`;
  return collectionConfig;
};

// Determine admin settings
const determineAdminSettings = (webflowFields) => {
  const defaultColumns = ["name", "slug"];
  const orderField = webflowFields.find((field) => field.slug === "order");
  const dateField = webflowFields.find((field) => field.slug === "date");

  if (orderField) {
    defaultColumns.push("order");
    return { defaultColumns, defaultSort: "order" };
  } else if (dateField) {
    defaultColumns.push("date");
    return { defaultColumns, defaultSort: "-date" };
  }

  return { defaultColumns };
};

// Generate Payload config for a single collection
const generatePayloadConfig = async (inputFilePath, outputDir) => {
  try {
    const webflowJson = readJsonFile(inputFilePath);
    const fields = convertFields(webflowJson.fields);
    const { defaultColumns, defaultSort } = determineAdminSettings(
      webflowJson.fields,
    );
    const configContent = createPayloadConfigContent(
      webflowJson.displayName,
      webflowJson.slug,
      fields,
      defaultColumns,
      defaultSort,
    );

    const outputFileName = `${webflowJson.displayName.replace(/\s+/g, "")}.ts`;
    const outputPath = path.join(outputDir, outputFileName);

    writeFile(outputPath, configContent);
    console.log(`Generated Payload config at: ${outputPath}`);
    return webflowJson.displayName.replace(/\s+/g, "");
  } catch (error) {
    console.error(
      `Error generating Payload config for ${inputFilePath}:`,
      error,
    );
  }
};

// Generate all Payload configs
const generateAllPayloadConfigs = async () => {
  const inputDir = "./data/collections";
  const outputDir = "./src/collections";

  // Check if input directory exists
  if (!fs.existsSync(inputDir)) {
    console.log(
      "No collections directory found at ./data/collections - skipping collection config generation",
    );
    return;
  }

  const files = fs.readdirSync(inputDir);

  // Check if there are any JSON files
  const jsonFiles = files.filter((file) => path.extname(file) === ".json");
  if (jsonFiles.length === 0) {
    console.log(
      "No collection JSON files found - skipping collection config generation",
    );
    return;
  }

  // Continue with existing logic if we have files to process
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const generatedCollections = [];

  for (const file of jsonFiles) {
    const collectionName = await generatePayloadConfig(
      path.join(inputDir, file),
      outputDir,
    );
    if (collectionName) {
      generatedCollections.push(collectionName);
    }
  }

  await updatePayloadConfig(generatedCollections);
};

// Update payload.config.ts
const updatePayloadConfig = async (generatedCollections) => {
  const configPath = path.join(process.cwd(), "src", "payload.config.ts");
  let configContent;

  if (!fs.existsSync(configPath)) {
    console.error(`payload.config.ts not found at ${configPath}`);
    return;
  }

  configContent = fs.readFileSync(configPath, "utf-8");

  const imports = generatedCollections
    .map((name) => `import { ${name} } from "./collections/${name}";`)
    .join("\n");

  // Update imports
  const importRegex =
    /\/\/ added collection imports\n[\s\S]*?\/\/ end added collection imports/;
  if (importRegex.test(configContent)) {
    configContent = configContent.replace(
      importRegex,
      `// added collection imports\n${imports}\n// end added collection imports`,
    );
  } else {
    // If the comment markers are not found, add imports at the top of the file
    configContent = `${imports}\n\n${configContent}`;
  }

  // Update collections list
  const collectionsRegex =
    /(collections:\s*\[[\s\S]*?)(\/\/ added collections\n)[\s\S]*?(\/\/ end added collections\n)([\s\S]*?\])/;
  const match = configContent.match(collectionsRegex);

  if (match) {
    const [, beforeAdded, addedComment, endAddedComment, afterAdded] = match;
    const newCollectionsString = generatedCollections.join(",\n    ");

    const updatedCollectionsContent = `${beforeAdded}${addedComment}    ${newCollectionsString},\n${endAddedComment}${afterAdded}`;

    configContent = configContent.replace(
      collectionsRegex,
      updatedCollectionsContent,
    );
  } else {
    console.error(
      "Unable to find collections array or added collections comments in payload.config.ts",
    );
    return;
  }

  try {
    writeFile(configPath, configContent);
    console.log("Updated payload.config.ts with new collections");
  } catch (error) {
    console.error("Error updating payload.config.ts:", error);
    console.log("Unformatted content:", configContent);
  }
};

// Run the script
generateAllPayloadConfigs()
  .then(() => applyPrettierSitewide())
  .catch(console.error);
