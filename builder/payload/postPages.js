import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import qs from "qs";
import { convertHtmlToPayloadJson } from "../utils/convertHtmlToPayloadJson.js";

const pagesJsonPath = path.join(process.cwd(), "data", "pages", "pages.json");
const componentsDir = path.join(process.cwd(), "src", "blocks");

const API_URL = process.env.PAYLOAD_API_URL || "http://localhost:3000/api";
const token = process.env.PAYLOAD_API_TOKEN;

const getPayloadMediaItemByFilename = async (searchString) => {
  try {
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

const getComponentContent = async (componentName) => {
  try {
    const componentPath = path.join(componentsDir, componentName, "client.jsx");
    const content = await fs.promises.readFile(componentPath, "utf8");
    const contentMatch = content.match(/const\s+content\s*=\s*({[^;]+});/);
    if (contentMatch) {
      const contentObject = eval(`(${contentMatch[1]})`);
      return contentObject;
    }
  } catch (error) {
    console.error(`Error reading component ${componentName}:`, error);
  }
  return null;
};

const processField = async (value) => {
  const imageExtensions = [
    "jpg",
    "jpeg",
    "png",
    "gif",
    "bmp",
    "tiff",
    "webp",
    "svg",
    "avif",
  ];
  if (
    typeof value === "string" &&
    value.startsWith("http") &&
    imageExtensions.includes(value.split(".").pop())
  ) {
    const filename = value.split("/").pop();
    const searchString = filename.substring(0, 24);

    const mediaItem = await getPayloadMediaItemByFilename(searchString);

    if (mediaItem) {
      console.log(`Found media item: ${mediaItem.id}`);
      return mediaItem.id;
    } else {
      console.warn(`No media item found for ${searchString}`);
      return null;
    }
  } else if (Array.isArray(value)) {
    return Promise.all(value.map((item) => processField(item)));
  } else if (typeof value === "object" && value !== null) {
    const processedObject = {};
    for (const [key, val] of Object.entries(value)) {
      if (key === "image" && typeof val === "object") {
        processedObject[key] = await processField(val.url || val.src);
      } else if (key === "link" || key === "link-2") {
        processedObject[key] = {
          ...val,
          href: await processField(val.href),
        };
      } else {
        processedObject[key] = await processField(val);
      }
    }
    return processedObject;
  }
  return value;
};

const createPage = async (page) => {
  const slug = page.slug || "home";
  const name = page.title;
  const blocks = page.openGraph.description
    ? page.openGraph.description.split(", ")
    : [];
  const data = {
    slug,
    name,
    webflowId: page.id,
    seo: {
      title: page.seo?.title || "",
      description: page.seo?.description || "",
    },
    content: await Promise.all(
      blocks.map(async (block) => {
        if (block.endsWith("G")) {
          // If the block type ends with "G", only include the blockType
          return { blockType: block };
        }

        const componentContent = await getComponentContent(block);
        if (componentContent) {
          const blockContent = { blockType: block, ...componentContent };
          // Convert body fields to Payload JSON
          Object.keys(blockContent).forEach((key) => {
            if (key.startsWith("body") && blockContent[key]) {
              blockContent[key] = convertHtmlToPayloadJson(blockContent[key]);
            }
          });
          // Process all fields recursively
          for (const [key, value] of Object.entries(blockContent)) {
            if (key !== "blockType") {
              blockContent[key] = await processField(value);
              if (blockContent[key] === null) {
                delete blockContent[key];
              }
            }
          }

          return blockContent;
        }
        return { blockType: block };
      }),
    ),
  };
  try {
    const url = `${API_URL}/pages`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token to the headers
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Created page: ${name}`);
  } catch (error) {
    console.error(`Error creating page ${name}:`, error);
  }
};

const createPages = async () => {
  try {
    const pagesData = JSON.parse(
      await fs.promises.readFile(pagesJsonPath, "utf8"),
    );

    for (const page of pagesData.staticPages) {
      await createPage(page);
    }

    console.log("All pages have been created successfully.");
  } catch (err) {
    console.error("Error creating pages:", err);
  }
};

createPages();
