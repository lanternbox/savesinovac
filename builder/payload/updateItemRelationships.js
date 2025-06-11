import fs from "fs/promises";
import path from "path";
import fetch from "node-fetch";
import dotenv from "dotenv";
import qs from "qs";

dotenv.config();

const API_URL = process.env.PAYLOAD_API_URL || "http://localhost:3000/api";
const token = process.env.PAYLOAD_API_TOKEN;

const itemsDir = path.resolve("data/items");
const collectionsDir = path.resolve("data/collections");

// Function to get relationship fields from a collection config
const getRelationshipFields = async (collectionSlug) => {
  const collectionFilePath = path.join(
    collectionsDir,
    `${collectionSlug}.json`,
  );
  const collectionConfig = JSON.parse(
    await fs.readFile(collectionFilePath, "utf-8"),
  );

  // Get all collection slugs and their corresponding IDs
  const collectionsMap = new Map();
  const collectionFiles = await fs.readdir(collectionsDir);
  for (const file of collectionFiles) {
    const collectionData = JSON.parse(
      await fs.readFile(path.join(collectionsDir, file), "utf-8"),
    );
    collectionsMap.set(collectionData.id, path.basename(file, ".json"));
  }

  return collectionConfig.fields
    .filter(
      (field) =>
        field.type === "Reference" ||
        field.type === "MultiReference" ||
        field.type === "Image" ||
        field.type === "File",
    )
    .map((field) => ({
      slug: field.slug,
      relatedCollectionSlug:
        field.type === "Image" || field.type === "File"
          ? "media"
          : collectionsMap.get(field.validations.collectionId),
      hasMany: field.type === "MultiReference",
      isImage: field.type === "Image",
      isFile: field.type === "File",
    }));
};

// Function to get Payload item by Webflow ID
const getPayloadItemByWebflowId = async (collectionSlug, webflowId) => {
  try {
    const query = qs.stringify(
      {
        where: {
          webflowId: {
            equals: webflowId,
          },
        },
      },
      { addQueryPrefix: true },
    );

    const url = `${API_URL}/${collectionSlug}${query}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.docs[0];
  } catch (error) {
    console.error(
      `Error fetching Payload item for Webflow ID ${webflowId} in collection ${collectionSlug}:`,
      error.message,
    );
    return null;
  }
};

// Function to update relationships for an item
const updateItemRelationships = async (
  collectionSlug,
  itemId,
  relationships,
) => {
  try {
    const response = await fetch(`${API_URL}/${collectionSlug}/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(relationships),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(
      `Updated relationships for item ${itemId} in ${collectionSlug}`,
    );
    return data;
  } catch (error) {
    console.error(
      `Error updating relationships for item ${itemId} in ${collectionSlug}:`,
      error.message,
    );
  }
};

// Main function to process and update relationships
const updateRelationships = async () => {
  try {
    const itemFiles = await fs.readdir(itemsDir);
    for (const itemFile of itemFiles) {
      const collectionSlug = path.basename(itemFile, ".json");
      const itemFilePath = path.join(itemsDir, itemFile);
      const itemDataArray = JSON.parse(
        await fs.readFile(itemFilePath, "utf-8"),
      );

      const relationshipFields = await getRelationshipFields(collectionSlug);

      for (const itemData of itemDataArray) {
        const payloadItem = await getPayloadItemByWebflowId(
          collectionSlug,
          itemData.id,
        );
        if (!payloadItem) {
          console.log(
            `No Payload item found for Webflow ID ${itemData.id} in ${collectionSlug}`,
          );
          continue;
        }

        const relationships = {};

        for (const field of relationshipFields) {
          if (itemData.fieldData[field.slug]) {
            if (field.isImage || field.isFile) {
              const webflowFileId = itemData.fieldData[field.slug].fileId;
              const payloadMediaItem = await getPayloadItemByWebflowId(
                "media",
                webflowFileId,
              );
              if (payloadMediaItem) {
                relationships[field.slug] = payloadMediaItem.id;
              }
            } else if (field.hasMany) {
              const relatedIds = [];
              for (const webflowId of itemData.fieldData[field.slug]) {
                const relatedItem = await getPayloadItemByWebflowId(
                  field.relatedCollectionSlug,
                  webflowId,
                );
                if (relatedItem) {
                  relatedIds.push(relatedItem.id);
                }
              }
              relationships[field.slug] = relatedIds;
            } else {
              const relatedItem = await getPayloadItemByWebflowId(
                field.relatedCollectionSlug,
                itemData.fieldData[field.slug],
              );
              if (relatedItem) {
                relationships[field.slug] = relatedItem.id;
              }
            }
          }
        }

        if (Object.keys(relationships).length > 0) {
          await updateItemRelationships(
            collectionSlug,
            payloadItem.id,
            relationships,
          );
        }
      }
    }

    console.log("Relationship update process completed.");
  } catch (error) {
    console.error("Error updating relationships:", error.message);
  }
};

updateRelationships();
