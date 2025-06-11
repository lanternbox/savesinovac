import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

const token = process.env.WEBFLOW_API_TOKEN;
const siteId = process.env.WEBFLOW_SITE_ID;

const fetchAssets = async () => {
  try {
    // Step 1: List all assets for the site
    const assetsResponse = await fetch(
      `https://api.webflow.com/v2/sites/${siteId}/assets`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (!assetsResponse.ok) {
      throw new Error(`Failed to fetch assets: ${assetsResponse.statusText}`);
    }

    const assetsData = await assetsResponse.json();
    const assets = assetsData.assets;

    console.log(`Found ${assets.length} assets.`);

    // Create directories if they don't exist
    const dir = path.resolve("data/assets");
    const filesDir = path.resolve(dir, "_files");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(filesDir)) {
      fs.mkdirSync(filesDir, { recursive: true });
    }

    // Step 2: Save each asset's details and download the files
    for (const asset of assets) {
      // Skip woff2 and mp4 files
      const fileUrl = asset.hostedUrl;
      if (
        fileUrl.toLowerCase().endsWith(".woff2") ||
        fileUrl.toLowerCase().endsWith(".mp4")
      ) {
        console.log(
          `Skipping ${fileUrl.toLowerCase().endsWith(".woff2") ? "woff2" : "mp4"} file: ${asset.displayName}`,
        );
        continue;
      }

      console.log(`Processing asset: ${asset.displayName} (${asset.id})`);

      // Save asset details to a file
      const filePath = path.join(dir, `${asset.id}.json`);
      fs.writeFileSync(filePath, JSON.stringify(asset, null, 2));

      console.log(`Saved asset ${asset.displayName} details to ${filePath}`);

      // Download and save the asset file
      const fileExtension = path.extname(fileUrl);
      const fileName = `${asset.id}${fileExtension}`;
      const fileSavePath = path.join(filesDir, fileName);

      const response = await fetch(fileUrl);
      if (!response.ok) {
        throw new Error(`Failed to download asset: ${response.statusText}`);
      }

      const fileStream = fs.createWriteStream(fileSavePath);
      await new Promise((resolve, reject) => {
        response.body.pipe(fileStream);
        response.body.on("error", reject);
        fileStream.on("finish", resolve);
      });

      console.log(`Downloaded and saved asset to ${fileSavePath}`);
    }
  } catch (error) {
    console.error("Error fetching assets:", error.message);
  }
};

fetchAssets();
