import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { readJsonFile, processItemData } from "../utils/convertFields.js";

dotenv.config();

const API_URL = process.env.PAYLOAD_API_URL || "http://localhost:3000/api";
const TOKEN = process.env.PAYLOAD_API_TOKEN;

const ITEMS_DIR = path.resolve("data/items");
const COLLECTIONS_DIR = path.resolve("data/collections");

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Get collection config
const getCollectionConfig = (collectionSlug) => {
  const collectionFilePath = path.join(
    COLLECTIONS_DIR,
    `${collectionSlug}.json`,
  );
  return readJsonFile(collectionFilePath);
};

// Function to post an item to the Payload CMS
const postItemToPayload = async (collectionSlug, itemData, retries = 0) => {
  try {
    const response = await fetch(`${API_URL}/${collectionSlug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(itemData),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorBody}`,
      );
    }

    const data = await response.json();
    console.log(
      `Successfully posted item to ${collectionSlug}: ${data.doc.name}`,
    );
    return data;
  } catch (error) {
    console.error(`Error posting item to ${collectionSlug}: ${error.message}`);
    if (retries < MAX_RETRIES) {
      console.warn(`Retrying (${retries + 1}/${MAX_RETRIES})...`);
      await sleep(RETRY_DELAY);
      return postItemToPayload(collectionSlug, itemData, retries + 1);
    }
    throw new Error(
      `Failed to post item after ${MAX_RETRIES} attempts: ${error.message}`,
    );
  }
};

// Main function to process and post items
const processItems = async () => {
  try {
    const itemFiles = fs
      .readdirSync(ITEMS_DIR)
      .filter((file) => path.extname(file) === ".json");
    console.log(`Found ${itemFiles.length} item files to process.`);

    for (const itemFile of itemFiles) {
      const collectionSlug = path.basename(itemFile, ".json");
      const itemFilePath = path.join(ITEMS_DIR, itemFile);
      const itemDataArray = readJsonFile(itemFilePath);

      // Get collection config
      const collectionConfig = getCollectionConfig(collectionSlug);
      const collectionFields = collectionConfig.fields;

      for (const itemData of itemDataArray) {
        const processedData = processItemData(itemData, collectionFields);

        // Post the item data to Payload API
        await postItemToPayload(collectionSlug, processedData);
      }
    }
  } catch (error) {
    console.error("Error processing items:", error.message);
  }
};

// Run the script
processItems();
