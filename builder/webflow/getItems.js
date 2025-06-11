import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

const token = process.env.WEBFLOW_API_TOKEN;

const fetchItems = async () => {
  try {
    const collectionsDir = path.resolve("data/collections");
    const itemsDir = path.resolve("data/items");

    if (!fs.existsSync(itemsDir)) {
      fs.mkdirSync(itemsDir, { recursive: true });
    }

    const collectionFiles = fs
      .readdirSync(collectionsDir)
      .filter((file) => file.endsWith(".json"));

    for (const file of collectionFiles) {
      const collection = JSON.parse(
        fs.readFileSync(path.join(collectionsDir, file), "utf-8"),
      );

      console.log(
        `Fetching items for collection: ${collection.displayName} (${collection.id})`,
      );

      const itemsResponse = await fetch(
        `https://api.webflow.com/v2/collections/${collection.id}/items`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            authorization: `Bearer ${token}`,
          },
        },
      );

      if (!itemsResponse.ok) {
        throw new Error(
          `Failed to fetch items for ${collection.slug}: ${itemsResponse.statusText}`,
        );
      }

      const itemsData = await itemsResponse.json();
      const itemsFilePath = path.join(itemsDir, `${collection.slug}.json`);
      fs.writeFileSync(itemsFilePath, JSON.stringify(itemsData.items, null, 2));

      console.log(
        `Saved items of collection ${collection.slug} to ${itemsFilePath}`,
      );
    }
  } catch (error) {
    console.error("Error fetching items:", error.message);
  }
};

fetchItems();
