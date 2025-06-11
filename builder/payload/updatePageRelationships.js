import fs from "fs/promises";
import path from "path";
import fetch from "node-fetch";
import dotenv from "dotenv";
import qs from "qs";

dotenv.config();

const API_URL = process.env.PAYLOAD_API_URL || "http://localhost:3000/api";
const token = process.env.PAYLOAD_API_TOKEN;

const pagesDir = path.resolve("data/pages");

// Function to get Payload page by slug
const getPayloadPageBySlug = async (slug) => {
  try {
    const query = qs.stringify(
      {
        where: {
          slug: {
            equals: slug,
          },
        },
      },
      { addQueryPrefix: true },
    );

    const url = `${API_URL}/pages${query}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Successfully fetched page with slug: ${slug}`);
    return data.docs[0];
  } catch (error) {
    console.error(
      `Error fetching Payload page for slug ${slug}:`,
      error.message,
    );
    return null;
  }
};

// Function to update parent relationship for a page
const updatePageParent = async (pageId, parentId) => {
  try {
    const url = `${API_URL}/pages/${pageId}`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ parent: parentId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Successfully updated parent for page ${pageId}`);
    return data;
  } catch (error) {
    console.error(`Error updating parent for page ${pageId}:`, error.message);
  }
};

// Function to get parent slug from publishedPath
const getParentSlugFromPath = (publishedPath) => {
  const pathParts = publishedPath.split("/").filter(Boolean);
  return pathParts.length > 1 ? pathParts[pathParts.length - 2] : null;
};

// Main function to process and update page relationships
const updatePageRelationships = async () => {
  try {
    const pagesFile = path.join(pagesDir, "pages.json");
    const pagesData = JSON.parse(await fs.readFile(pagesFile, "utf-8"));

    const staticPages = pagesData.staticPages;
    console.log(`Processing ${staticPages.length} static pages`);

    for (const pageData of staticPages) {
      if (pageData.parentId) {
        console.log(`Processing page: ${pageData.slug}`);
        const payloadPage = await getPayloadPageBySlug(pageData.slug);
        if (!payloadPage) {
          console.log(`No Payload page found for slug: ${pageData.slug}`);
          continue;
        }

        const parentSlugFromPath = getParentSlugFromPath(
          pageData.publishedPath,
        );
        if (!parentSlugFromPath) {
          console.log(
            `No parent slug found for path: ${pageData.publishedPath}`,
          );
          continue;
        }

        const payloadParentPage =
          await getPayloadPageBySlug(parentSlugFromPath);
        if (!payloadParentPage) {
          console.log(
            `No Payload parent page found for slug: ${parentSlugFromPath}`,
          );
          continue;
        }

        console.log(
          `Child page "${pageData.slug}" found parent "${parentSlugFromPath}"`,
        );
        await updatePageParent(payloadPage.id, payloadParentPage.id);
      }
    }

    console.log("Page relationship update process completed.");
  } catch (error) {
    console.error("Error updating page relationships:", error.message);
  }
};

updatePageRelationships();
