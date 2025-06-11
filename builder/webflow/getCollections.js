import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

const token = process.env.WEBFLOW_API_TOKEN;
const siteId = process.env.WEBFLOW_SITE_ID;

const fetchCollections = async () => {
  try {
    const collectionsResponse = await fetch(
      `https://api.webflow.com/v2/sites/${siteId}/collections`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (!collectionsResponse.ok) {
      throw new Error(
        `Failed to fetch collections: ${collectionsResponse.statusText}`,
      );
    }

    const collectionsData = await collectionsResponse.json();
    const collections = collectionsData.collections;

    console.log(`Found ${collections.length} collections.`);

    const dir = path.resolve("data/collections");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    for (const collection of collections) {
      console.log(
        `Fetching details and fields for collection: ${collection.displayName} (${collection.id})`,
      );

      const collectionDetailsResponse = await fetch(
        `https://api.webflow.com/v2/collections/${collection.id}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            authorization: `Bearer ${token}`,
          },
        },
      );

      if (!collectionDetailsResponse.ok) {
        throw new Error(
          `Failed to fetch collection details for ${collection.slug}: ${collectionDetailsResponse.statusText}`,
        );
      }

      const collectionDetails = await collectionDetailsResponse.json();

      // Save the collection details along with fields to a file
      const filePath = path.join(dir, `${collection.slug}.json`);
      fs.writeFileSync(filePath, JSON.stringify(collectionDetails, null, 2));

      console.log(
        `Saved collection details and fields for ${collection.slug} to ${filePath}`,
      );
    }
  } catch (error) {
    console.error("Error fetching collections:", error.message);
  }
};

fetchCollections();
