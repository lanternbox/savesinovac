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
const assetsDir = path.resolve("data/assets");
const assetsFilesDir = path.resolve("data/assets/_files");
const collectionAssetsDir = path.resolve("data/collectionAssets");
const collectionAssetsFilesDir = path.resolve("data/collectionAssets/_files");

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const uploadMediaItem = async (filePath, retries = 0) => {
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

    console.log(
      `Attempting to upload file: ${fileName} (Content-Type: ${contentType})`,
    );

    const response = await fetch(`${API_URL}/media`, {
      method: "POST",
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
    console.log(
      `Successfully uploaded media item: ${data.doc.id || "Unknown ID"}`,
    );
    return data;
  } catch (error) {
    console.error(`Error uploading media item:`, error);

    if (retries < MAX_RETRIES) {
      console.warn(`Retrying upload (${retries + 1}/${MAX_RETRIES})...`);
      await sleep(RETRY_DELAY);
      return uploadMediaItem(filePath, retries + 1);
    }
    throw new Error(
      `Failed to upload media item after ${MAX_RETRIES} attempts.`,
    );
  }
};

const updateMediaItem = async (mediaId, updateData, retries = 0) => {
  try {
    const response = await fetch(`${API_URL}/media/${mediaId}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
      headers: {
        "Content-Type": "application/json",
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
    console.log(`Successfully updated media item: ${mediaId}`);
    return data;
  } catch (error) {
    console.error(`Error updating media item:`, error);

    if (retries < MAX_RETRIES) {
      console.warn(`Retrying update (${retries + 1}/${MAX_RETRIES})...`);
      await sleep(RETRY_DELAY);
      return updateMediaItem(mediaId, updateData, retries + 1);
    }
    throw new Error(
      `Failed to update media item after ${MAX_RETRIES} attempts.`,
    );
  }
};

const processSingleAsset = async (assetFile, isCollectionAsset = false) => {
  try {
    const assetDir = isCollectionAsset ? collectionAssetsDir : assetsDir;
    const assetFilesDir = isCollectionAsset
      ? collectionAssetsFilesDir
      : assetsFilesDir;
    const assetFilePath = path.join(assetDir, assetFile);
    const assetData = JSON.parse(fs.readFileSync(assetFilePath, "utf-8"));

    const idField = isCollectionAsset ? "fileId" : "id";
    if (!assetData[idField]) {
      console.warn(
        `Skipping asset due to missing ${idField}: ${assetFilePath}`,
      );
      return { status: "skipped", id: assetFile };
    }

    const fileExtension = path.extname(
      assetData.fileName || assetData.originalFileName || assetData.url || "",
    );
    const fileName = `${assetData[idField]}${fileExtension}`;
    const filePath = path.join(assetFilesDir, fileName);

    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return {
        status: "error",
        id: assetData[idField],
        error: "File not found",
      };
    }

    // Upload the file
    const uploadedMedia = await uploadMediaItem(filePath);

    // Update the media item with additional data
    const updateData = {
      alt: assetData.alt || assetData.fileName || fileName,
      [isCollectionAsset ? "webflowId" : "id"]: assetData[idField],
    };
    await updateMediaItem(uploadedMedia.doc.id, updateData);

    return { status: "success", id: assetData[idField] };
  } catch (error) {
    console.error(`Error processing asset ${assetFile}:`, error.message);
    return { status: "error", id: assetFile, error: error.message };
  }
};

const processWithWorkerPool = async (files, poolSize = 5) => {
  const results = [];
  const inProgress = new Set();
  let nextIndex = 0;

  const startNextFile = async () => {
    if (nextIndex >= files.length) return;

    const fileInfo = files[nextIndex];
    nextIndex++;

    const promise = processSingleAsset(fileInfo.file, fileInfo.isCollection)
      .then((result) => {
        results.push(result);
        inProgress.delete(promise);
        console.log(`Completed ${nextIndex} of ${files.length} files`);
        return startNextFile(); // Start next file when this one finishes
      })
      .catch((error) => {
        console.error(`Failed to process file:`, error);
        results.push({
          status: "error",
          id: fileInfo.file,
          error: error.message,
        });
        inProgress.delete(promise);
        return startNextFile(); // Start next file even if this one failed
      });

    inProgress.add(promise);
    return promise;
  };

  const processAssets = async () => {
    try {
      const assetFiles = fs
        .readdirSync(assetsDir)
        .filter((file) => path.extname(file) === ".json")
        .map((file) => ({ file, isCollection: false }));

      const collectionAssetFiles = fs
        .readdirSync(collectionAssetsDir)
        .filter((file) => path.extname(file) === ".json")
        .map((file) => ({ file, isCollection: true }));

      const allFiles = [...assetFiles, ...collectionAssetFiles];
      console.log(`Found ${allFiles.length} total files to process.`);

      // Initialize the pool with first batch of files
      const initialPromises = Array(Math.min(poolSize, allFiles.length))
        .fill()
        .map(() => startNextFile());

      // Wait for all files to complete
      await Promise.all(initialPromises);
      await Promise.all(Array.from(inProgress));

      const summary = results.reduce((acc, result) => {
        acc[result.status] = (acc[result.status] || 0) + 1;
        return acc;
      }, {});

      console.log("Processing complete. Summary:");
      console.log(summary);
    } catch (error) {
      console.error("Error processing assets:", error.message);
    }
  };

  return processAssets();
};

// Replace the existing processAssets() call with:
const assetFiles = fs
  .readdirSync(assetsDir)
  .filter((file) => path.extname(file) === ".json")
  .map((file) => ({ file, isCollection: false }));

const collectionAssetFiles = fs
  .readdirSync(collectionAssetsDir)
  .filter((file) => path.extname(file) === ".json")
  .map((file) => ({ file, isCollection: true }));

const allFiles = [...assetFiles, ...collectionAssetFiles];
processWithWorkerPool(allFiles, 5);
