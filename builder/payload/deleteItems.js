import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.PAYLOAD_API_URL || "http://localhost:3000/api";
const token = process.env.PAYLOAD_API_TOKEN;
const webflowToken = process.env.WEBFLOW_API_TOKEN;
const webflowSiteId = process.env.WEBFLOW_SITE_ID;

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const deleteItem = async (collectionSlug, itemId, retries = 0) => {
  try {
    const response = await fetch(`${API_URL}/${collectionSlug}/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorBody}`,
      );
    }

    console.log(`Successfully deleted item ${itemId} from ${collectionSlug}`);
  } catch (error) {
    console.error(
      `Error deleting item ${itemId} from ${collectionSlug}:`,
      error.message,
    );
    if (retries < MAX_RETRIES) {
      console.warn(`Retrying (${retries + 1}/${MAX_RETRIES})...`);
      await sleep(RETRY_DELAY);
      return deleteItem(collectionSlug, itemId, retries + 1);
    }
    throw new Error(
      `Failed to delete item ${itemId} from ${collectionSlug} after ${MAX_RETRIES} attempts: ${error.message}`,
    );
  }
};

const deleteItemsFromCollection = async (collectionSlug) => {
  try {
    let hasMoreItems = true;
    let page = 1;

    while (hasMoreItems) {
      const response = await fetch(
        `${API_URL}/${collectionSlug}?limit=100&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, body: ${errorBody}`,
        );
      }

      const data = await response.json();
      const items = data.docs;

      if (items.length > 0) {
        for (const item of items) {
          await deleteItem(collectionSlug, item.id);
        }
        page += 1;
      } else {
        hasMoreItems = false;
      }
    }

    console.log(`Finished deleting items from ${collectionSlug}`);
  } catch (error) {
    console.error(
      `Error deleting items from ${collectionSlug}:`,
      error.message,
    );
  }
};

const getCollectionSlugs = async () => {
  // get from webflow, because no collections list in payload rest api
  try {
    const collectionsResponse = await fetch(
      `https://api.webflow.com/v2/sites/${webflowSiteId}/collections`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${webflowToken}`,
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

    return collections.map((collection) => collection.slug);
  } catch (error) {
    console.error("Error fetching collections:", error.message);
    return [];
  }
};

const deleteAllItems = async () => {
  try {
    const collectionSlugs = await getCollectionSlugs();
    console.log(`Found collections: ${collectionSlugs.join(", ")}`);

    for (const slug of collectionSlugs) {
      await deleteItemsFromCollection(slug);
    }

    console.log("Finished deleting items from all specified collections.");
  } catch (error) {
    console.error("Error deleting all items:", error.message);
  }
};

deleteAllItems();
