import fetch from "node-fetch";
import dotenv from "dotenv";
import { translate } from "../openai/translate.js";

dotenv.config();

const API_URL = process.env.PAYLOAD_API_URL;

async function translatePages() {
  try {
    console.log("Starting page translation process");

    // Fetch all pages in the default locale (English)
    const fetchUrl = `${API_URL}/pages?depth=0`;
    const response = await fetch(fetchUrl);
    const data = await response.json();
    const pages = data.docs;

    // Translate and update each page
    for (const page of pages) {
      console.log(`Processing page: ${page.name}`);

      // Translate the entire page object
      const translatedPage = await translate(page, "zh");

      // Log the translated page before posting
      // console.log(
      //   `Translated page to be posted:`,
      //   JSON.stringify(translatedPage, null, 2),
      // );

      // Post the translated page back to the API with the Chinese locale
      const patchUrl = `${API_URL}/pages/${page.id}?locale=zh`;

      const updateResponse = await fetch(patchUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(translatedPage),
      });

      if (!updateResponse.ok) {
        throw new Error(
          `Failed to update page ${page.id}: ${updateResponse.statusText}`,
        );
      }

      console.log(`Updated page with translation: ${page.id}`);
    }

    console.log("All pages have been updated with translations successfully.");
  } catch (error) {
    console.error("Error updating pages:", error.message);
  }
}

translatePages();
