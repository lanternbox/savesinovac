import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { FormData } from "formdata-node";
import { fileFromPath } from "formdata-node/file-from-path";
import mime from "mime-types";
import sharp from "sharp";

dotenv.config();

const API_URL = process.env.PAYLOAD_API_URL || "http://localhost:3000/api";
const token = process.env.PAYLOAD_API_TOKEN;
const TEMP_DIR = path.resolve("temp");

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Ensure temp directory exists
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

const uploadMediaItem = async (filePath, originalData, retries = 0) => {
  try {
    const formData = new FormData();
    const fileName = path.basename(filePath);
    const contentType = mime.lookup(fileName) || "application/octet-stream";

    // Only process with Sharp if it's not an SVG
    if (!contentType.includes("svg")) {
      // Process image with Sharp before uploading
      const imageBuffer = await sharp(filePath)
        .rotate() // Auto-rotate based on EXIF data
        .toBuffer();

      // Create a Blob from the processed image buffer
      const processedFile = new Blob([imageBuffer], { type: contentType });
      formData.append("file", processedFile, fileName);
    } else {
      // For SVGs, use the original file
      const file = await fileFromPath(filePath);
      formData.append("file", file, fileName);
    }

    console.log(`Reuploading file: ${fileName}`);

    const response = await fetch(`${API_URL}/media/${originalData.id}`, {
      method: "PATCH",
      body: formData,
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

    const data = await response.json();
    console.log(`Successfully reprocessed media item: ${originalData.id}`);
    return data;
  } catch (error) {
    console.error(`Error uploading media item:`, error);

    if (retries < MAX_RETRIES) {
      console.log(`Retrying upload (${retries + 1}/${MAX_RETRIES})...`);
      await sleep(RETRY_DELAY);
      return uploadMediaItem(filePath, originalData, retries + 1);
    }
    throw error;
  }
};

const reprocessAssets = async () => {
  try {
    // Fetch all media items
    const response = await fetch(`${API_URL}/media?limit=100`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch media items: ${response.statusText}`);
    }

    const { docs: mediaItems } = await response.json();
    console.log(`Found ${mediaItems.length} media items to reprocess.`);

    const failedItems = [];

    for (const mediaItem of mediaItems) {
      try {
        // Try first in assets directory
        let localFilePath = path.resolve(
          "data/assets/_files",
          mediaItem.filename,
        );

        // If not found, try in collectionAssets directory
        if (!fs.existsSync(localFilePath)) {
          localFilePath = path.resolve(
            "data/collectionAssets/_files",
            mediaItem.filename,
          );

          // If still not found, mark as failed
          if (!fs.existsSync(localFilePath)) {
            console.log(
              `File not found in either directory: ${mediaItem.filename}`,
            );
            failedItems.push({
              id: mediaItem.id,
              filename: mediaItem.filename,
              reason:
                "File not found in assets or collectionAssets directories",
            });
            continue;
          }
        }

        console.log(`Found file at: ${localFilePath}`);
        await uploadMediaItem(localFilePath, mediaItem);

        // Add delay between items
        await sleep(500);
      } catch (error) {
        console.error(`Error processing media item ${mediaItem.id}:`, error);
        failedItems.push({
          id: mediaItem.id,
          filename: mediaItem.filename,
          reason: error.message,
        });
        await sleep(500);
      }
    }

    console.log("Reprocessing complete!");
    if (failedItems.length > 0) {
      console.log("\nFailed items:");
      console.table(failedItems);
    }
  } catch (error) {
    console.error("Error reprocessing assets:", error);
  }
};

reprocessAssets();
