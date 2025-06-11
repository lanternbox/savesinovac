import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import qs from "qs";
import { convertHtmlToPayloadJson } from "../utils/convertHtmlToPayloadJson.js";

const componentsDir = path.join(process.cwd(), "src", "blocks");

const API_URL = process.env.PAYLOAD_API_URL || "http://localhost:3000/api";
const token = process.env.PAYLOAD_API_TOKEN;

const getPayloadMediaItemByFilename = async (searchString) => {
  try {
    console.log(
      `Searching for media item with filename containing: ${searchString}`,
    );
    const query = qs.stringify(
      {
        where: {
          filename: {
            contains: searchString,
          },
        },
      },
      { addQueryPrefix: true },
    );

    const url = `${API_URL}/media${query}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Media search response status: ${response.status}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.docs[0];
  } catch (error) {
    console.error(
      `Error fetching Payload media item for search string ${searchString}:`,
      error.message,
    );
    return null;
  }
};

const getComponentContent = async (componentPath) => {
  try {
    console.log(`Reading component file: ${componentPath}`);
    const content = await fs.promises.readFile(componentPath, "utf8");
    const contentMatch = content.match(/const\s+content\s*=\s*({[^;]+});/);
    if (contentMatch) {
      console.log(`Content found in ${componentPath}`);
      const contentObject = eval(`(${contentMatch[1]})`);
      return contentObject;
    } else {
      console.log(`No content match found in ${componentPath}`);
    }
  } catch (error) {
    console.error(`Error reading component ${componentPath}:`, error);
  }
  return null;
};

const processRichTextFields = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => processRichTextFields(item));
  }

  if (typeof data === "object" && data !== null) {
    const processed = { ...data };
    Object.keys(processed).forEach((key) => {
      processed[key] = processRichTextFields(processed[key]);
    });
    return processed;
  }

  if (typeof data === "string" && /<[a-z][\s\S]*>/i.test(data)) {
    return convertHtmlToPayloadJson(data);
  }

  return data;
};

const updateGlobal = async (globalName, content) => {
  console.log(`Updating global: ${globalName}`);

  let data = { ...content };
  // Convert rich text fields to Payload JSON
  data = processRichTextFields(data);

  // Handle image fields
  for (const key of Object.keys(data)) {
    if (
      typeof data[key] === "string" &&
      /\.(svg|png|jpg|jpeg|webp)$/i.test(data[key])
    ) {
      console.log(`Processing image field: ${key}`);
      const filename = path.basename(data[key]);
      const searchString = filename.substring(0, 24);
      const mediaItem = await getPayloadMediaItemByFilename(searchString);
      if (mediaItem) {
        console.log(`Found media item for ${filename}`);
        data[key] = mediaItem.id;
      } else {
        console.log(`No media item found for ${filename}, removing field`);
        delete data[key];
      }
    }
  }

  try {
    const url = `${API_URL}/globals/${globalName}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const responseText = await response.text();
      console.error(`Response body for ${globalName}:`, responseText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Successfully updated global: ${globalName}`);
  } catch (error) {
    console.error(`Error updating global ${globalName}:`, error);
  }
};

const updateGlobals = async () => {
  try {
    const directories = await fs.promises.readdir(componentsDir);
    const globalDirectories = directories.filter((dir) => dir.endsWith("G"));

    for (const dir of globalDirectories) {
      console.log(`Processing global component: ${dir}`);
      const clientPath = path.join(componentsDir, dir, "client.jsx");
      const content = await getComponentContent(clientPath);

      if (content) {
        await updateGlobal(dir, content);
      } else {
        console.log(`No content found for ${dir}, skipping...`);
      }
    }

    console.log("All globals have been processed.");
  } catch (err) {
    console.error("Error updating globals:", err);
  }
};

updateGlobals();
