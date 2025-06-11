import fetch from "node-fetch";
import dotenv from "dotenv";
import { translate } from "../openai/translate.js";
import fs from "fs";
import path from "path";

dotenv.config();

const API_URL = process.env.PAYLOAD_API_URL;

function getGlobalSlugs() {
  const globalsDir = path.join(process.cwd(), "src", "globals");
  return fs
    .readdirSync(globalsDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

async function translateGlobals() {
  try {
    console.log("Starting globals translation process");

    const globalSlugs = getGlobalSlugs();
    console.log("Global slugs:", globalSlugs);

    for (const globalSlug of globalSlugs) {
      console.log(`Processing global: ${globalSlug}`);

      // Fetch the global in the default locale (English)
      const fetchUrl = `${API_URL}/globals/${globalSlug}?depth=0`;
      const response = await fetch(fetchUrl);

      if (!response.ok) {
        console.error(
          `Failed to fetch global ${globalSlug}: ${response.statusText}`,
        );
        continue;
      }

      const global = await response.json();

      // Translate the entire global object
      const translatedGlobal = await translate(global, "zh");

      // Log the translated global before posting
      // console.log(
      //   `Translated global to be posted:`,
      //   JSON.stringify(translatedGlobal, null, 2),
      // );

      // Post the translated global back to the API with the Chinese locale
      const postUrl = `${API_URL}/globals/${globalSlug}?locale=zh`;

      const updateResponse = await fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(translatedGlobal),
      });

      if (!updateResponse.ok) {
        const responseBody = await updateResponse.text();
        console.error(`Failed to update global ${globalSlug}:`);
        console.error(
          `Status: ${updateResponse.status} ${updateResponse.statusText}`,
        );
        console.error(`Response body: ${responseBody}`);
        continue;
      }

      console.log(`Updated global with translation: ${globalSlug}`);
    }

    console.log(
      "All globals have been updated with translations successfully.",
    );
  } catch (error) {
    console.error("Error updating globals:", error.message);
  }
}

translateGlobals();
