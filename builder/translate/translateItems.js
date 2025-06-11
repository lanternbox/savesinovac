import fetch from "node-fetch";
import dotenv from "dotenv";
import { translate } from "../openai/translate.js";
import fs from "fs";
import path from "path";

dotenv.config();

const API_URL = process.env.PAYLOAD_API_URL;

// Function to get collection slugs from /data/collections
function getCollectionSlugs() {
  const collectionsDir = path.join(process.cwd(), "data", "collections");
  return fs
    .readdirSync(collectionsDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => path.parse(file).name);
}

async function translateItems() {
  try {
    const collectionSlugs = getCollectionSlugs();

    for (const collectionSlug of collectionSlugs) {
      console.log(`Processing collection: ${collectionSlug}`);

      // Fetch all items in the default locale (English)
      const fetchUrl = `${API_URL}/${collectionSlug}?depth=0`;
      const response = await fetch(fetchUrl);
      const data = await response.json();
      const items = data.docs;

      // Translate and update each item
      for (const item of items) {
        // Translate the entire item
        const translatedItem = await translate(item, "zh");

        // Log the translated item before posting
        // console.log(
        //   `Translated item for ${collectionSlug} to be posted:`,
        //   JSON.stringify(translatedItem, null, 2),
        // );

        // Post the translated item back to the API with the Chinese locale
        const patchUrl = `${API_URL}/${collectionSlug}/${item.id}?locale=zh`;

        const updateResponse = await fetch(patchUrl, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(translatedItem),
        });

        if (!updateResponse.ok) {
          throw new Error(
            `Failed to update item ${item.id} in ${collectionSlug}: ${updateResponse.statusText}`,
          );
        }

        console.log(
          `Updated item with translation: ${item.id} in ${collectionSlug}`,
        );
      }

      console.log(`Finished processing collection: ${collectionSlug}`);
    }

    console.log(
      "All collections have been updated with translations successfully.",
    );
  } catch (error) {
    console.error("Error updating items:", error.message);
  }
}

translateItems();
