import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

const token = process.env.WEBFLOW_API_TOKEN;

const fetchCollectionAssets = async () => {
  try {
    const itemsDir = path.resolve("data/items");
    const assetsDir = path.resolve("data/collectionAssets");
    const filesDir = path.resolve(assetsDir, "_files");

    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
    if (!fs.existsSync(filesDir)) {
      fs.mkdirSync(filesDir, { recursive: true });
    }

    const itemsFiles = fs
      .readdirSync(itemsDir)
      .filter((file) => file.endsWith(".json"));

    for (const file of itemsFiles) {
      const items = JSON.parse(
        fs.readFileSync(path.join(itemsDir, file), "utf-8"),
      );

      for (const item of items) {
        // Get all fields that start with "image" or "file"
        const assetFields = Object.keys(item.fieldData).filter(
          (field) => field.startsWith("image") || field.startsWith("file"),
        );

        for (const field of assetFields) {
          if (
            item.fieldData[field] &&
            item.fieldData[field].url &&
            item.fieldData[field].fileId
          ) {
            const assetUrl = item.fieldData[field].url;
            const assetFileId = item.fieldData[field].fileId;
            const assetFileExtension = path.extname(assetUrl);
            const assetFileName = `${assetFileId}${assetFileExtension}`;
            const assetSavePath = path.join(filesDir, assetFileName);

            try {
              const assetResponse = await fetch(assetUrl);
              if (!assetResponse.ok) {
                throw new Error(
                  `Failed to download ${field}: ${assetResponse.statusText}`,
                );
              }

              const fileStream = fs.createWriteStream(assetSavePath);
              await new Promise((resolve, reject) => {
                assetResponse.body.pipe(fileStream);
                assetResponse.body.on("error", reject);
                fileStream.on("finish", resolve);
              });

              console.log(`Downloaded and saved ${field} to ${assetSavePath}`);
            } catch (error) {
              console.error(
                `Error downloading ${field} for item ${item._id}: ${error.message}`,
              );
            }

            // Save asset data as JSON
            const assetFilePath = path.join(assetsDir, `${assetFileId}.json`);
            fs.writeFileSync(
              assetFilePath,
              JSON.stringify(item.fieldData[field], null, 2),
            );
          }
        }
      }
    }
  } catch (error) {
    console.error("Error fetching assets:", error.message);
  }
};

fetchCollectionAssets();
