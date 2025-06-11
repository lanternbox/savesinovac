import fetch from "node-fetch";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

const token = process.env.WEBFLOW_API_TOKEN;
const siteId = process.env.WEBFLOW_SITE_ID;

const fetchPages = async () => {
  try {
    const pagesDir = path.resolve("data/pages");

    if (!fs.existsSync(pagesDir)) {
      fs.mkdirSync(pagesDir, { recursive: true });
    }

    console.log(`Fetching pages for site: ${siteId}`);

    const pagesResponse = await fetch(
      `https://api.webflow.com/v2/sites/${siteId}/pages`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      },
    );

    if (!pagesResponse.ok) {
      throw new Error(`Failed to fetch pages: ${pagesResponse.statusText}`);
    }

    const pagesData = await pagesResponse.json();

    // Filter out draft pages, utility pages, and pages with "skip" SEO description
    const publishedContentPages = pagesData.pages.filter(
      (page) =>
        !page.draft &&
        page.slug !== "404" &&
        page.slug !== "401" &&
        (!page.seo ||
          !page.openGraph.description ||
          page.openGraph.description.toLowerCase() !== "skip"),
    );

    // Separate template pages and static pages
    const templatePages = publishedContentPages.filter(
      (page) => page.collectionId !== null,
    );
    const staticPages = publishedContentPages.filter(
      (page) => page.collectionId === null,
    );

    const filteredPagesData = {
      templatePages,
      staticPages,
      pagination: {
        ...pagesData.pagination,
        total: publishedContentPages.length,
        templatePagesCount: templatePages.length,
        staticPagesCount: staticPages.length,
      },
    };

    const pagesFilePath = path.join(pagesDir, "pages.json");
    fs.writeFileSync(pagesFilePath, JSON.stringify(filteredPagesData, null, 2));

    console.log(
      `Saved ${staticPages.length} static pages and ${templatePages.length} template pages to ${pagesFilePath}`,
    );
  } catch (error) {
    console.error("Error fetching pages:", error.message);
  }
};

fetchPages();
