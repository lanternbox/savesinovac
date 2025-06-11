import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

// Your API URL and token
const API_URL = process.env.PAYLOAD_API_URL || "http://localhost:3000/api";
const TOKEN = process.env.PAYLOAD_API_TOKEN || "";

// The HTML content (we'll replace this with the actual HTML)
const htmlContent = `<div class="search-results__all"><div class="listing-page-search__results-card" id="listing-page-search__results-card-0"><a class="listing-page-search__results-card-link " href="/en/knowledge/lloyds-register-rules/guidance-notes/guidance-notes-for-calculation-procedures-for-composite-construction/"><div class="listing-page-search__results-card-content"><h4 class="listing-page-search__results-card-heading">LR-GN-032 Guidance Notes for Calculation Procedures for Composite Construction</h4><div class="listing-page-search__results-card-category-wrapper"><span class="listing-page-search__results-card-category">Guidance notes</span><span class="listing-page-search__results-card-published">1 Jul 2022</span></div></div></a></div><div class="listing-page-search__results-card" id="listing-page-search__results-card-1"><a class="listing-page-search__results-card-link " href="/en/knowledge/lloyds-register-rules/guidance-notes/guidance-notes-for-engine-power-limitation-epl-and-shaft-power-limitation-shapoli-equipment/"><div class="listing-page-search__results-card-content"><h4 class="listing-page-search__results-card-heading">LR-GN-014 Guidance Notes for Class Approval of EPL and SHaPoLi Equipment</h4><div class="listing-page-search__results-card-category-wrapper"><span class="listing-page-search__results-card-category">Guidance notes</span><span class="listing-page-search__results-card-published">1 Jul 2022</span></div></div></a></div><div class="listing-page-search__results-card" id="listing-page-search__results-card-2"><a class="listing-page-search__results-card-link " href="/en/knowledge/lloyds-register-rules/guidance-notes/guidance-notes-for-machinery-survey-arrangements/"><div class="listing-page-search__results-card-content"><h4 class="listing-page-search__results-card-heading">LR-GN-019 Guidance Notes for Machinery Survey Arrangements</h4><div class="listing-page-search__results-card-category-wrapper"><span class="listing-page-search__results-card-category">Guidance notes</span><span class="listing-page-search__results-card-published">1 Jul 2022</span></div></div></a></div><div class="listing-page-search__results-card" id="listing-page-search__results-card-3"><a class="listing-page-search__results-card-link " href="/en/knowledge/lloyds-register-rules/guidance-notes/guidance-notes-for-collision-assessment-for-the-location-of-low-flashpoint-fuel-tanks/"><div class="listing-page-search__results-card-content"><h4 class="listing-page-search__results-card-heading">LR-GN-036 Collision Assessment for Low-flashpoint Fuel Tanks</h4><div class="listing-page-search__results-card-category-wrapper"><span class="listing-page-search__results-card-category">Guidance notes</span><span class="listing-page-search__results-card-published">1 Jul 2022</span></div></div></a></div><div class="listing-page-search__results-card" id="listing-page-search__results-card-4"><a class="listing-page-search__results-card-link " href="/en/knowledge/lloyds-register-rules/guidance-notes/guidance-notes-for-calculation-of-probabilistic-explosion-loads/"><div class="listing-page-search__results-card-content"><h4 class="listing-page-search__results-card-heading">LR-GN-045 Guidance Notes for Calculation of Probabilistic Explosion Loads</h4><div class="listing-page-search__results-card-category-wrapper"><span class="listing-page-search__results-card-category">Guidance notes</span><span class="listing-page-search__results-card-published">1 Jul 2022</span></div></div></a></div><div class="listing-page-search__results-card" id="listing-page-search__results-card-5"><a class="listing-page-search__results-card-link " href="/en/knowledge/lloyds-register-rules/guidance-notes/guidance-notes-for-tyre-print-chart-usage/"><div class="listing-page-search__results-card-content"><h4 class="listing-page-search__results-card-heading">LR-GN-028 Guidance Notes for Tyre Print Chart Usage Guide</h4><div class="listing-page-search__results-card-category-wrapper"><span class="listing-page-search__results-card-category">Guidance notes</span><span class="listing-page-search__results-card-published">1 Jul 2022</span></div></div></a></div><div class="listing-page-search__results-card" id="listing-page-search__results-card-6"><a class="listing-page-search__results-card-link " href="/en/knowledge/lloyds-register-rules/guidance-notes/guidance-notes-for-masts-spars-and-standing-rigging/"><div class="listing-page-search__results-card-content"><h4 class="listing-page-search__results-card-heading">LR-GN-024 Guidance Notes for Masts, Spars and Standing Rigging</h4><div class="listing-page-search__results-card-category-wrapper"><span class="listing-page-search__results-card-category">Guidance notes</span><span class="listing-page-search__results-card-published">1 Jul 2022</span></div></div></a></div><div class="listing-page-search__results-card" id="listing-page-search__results-card-7"><a class="listing-page-search__results-card-link " href="/en/knowledge/lloyds-register-rules/guidance-notes/guidance-notes-primary-support-structures-for-polar-class-vessels/"><div class="listing-page-search__results-card-content"><h4 class="listing-page-search__results-card-heading">LR-GN-030 Guidance Notes Primary Support Structures for Polar Class Vessels</h4><div class="listing-page-search__results-card-category-wrapper"><span class="listing-page-search__results-card-category">Guidance notes</span><span class="listing-page-search__results-card-published">1 Jan 2022</span></div></div></a></div><div class="listing-page-search__results-card" id="listing-page-search__results-card-8"><a class="listing-page-search__results-card-link " href="/en/knowledge/lloyds-register-rules/guidance-notes/guidance-notes-general-overview-of-ship-structural-vibration-problems/"><div class="listing-page-search__results-card-content"><h4 class="listing-page-search__results-card-heading">LR-GN-31 Guidance Notes General Overview of Ship Structural Vibration Problems</h4><div class="listing-page-search__results-card-category-wrapper"><span class="listing-page-search__results-card-category">Guidance notes</span><span class="listing-page-search__results-card-published">1 Sep 2021</span></div></div></a></div><div class="listing-page-search__results-card" id="listing-page-search__results-card-9"><a class="listing-page-search__results-card-link " href="/en/knowledge/lloyds-register-rules/guidance-notes/guidance-notes-for-risk-based-inspection-for-hull-structures/"><div class="listing-page-search__results-card-content"><h4 class="listing-page-search__results-card-heading">Guidance Notes for Risk Based Inspection for Hull Structures.</h4><div class="listing-page-search__results-card-category-wrapper"><span class="listing-page-search__results-card-category">Guidance notes</span><span class="listing-page-search__results-card-published">3 Aug 2015</span></div></div></a></div><div class="listing-page-search__results-card" id="listing-page-search__results-card-10"><a class="listing-page-search__results-card-link " href="/en/knowledge/lloyds-register-rules/guidance-notes/guidance-notes-for-risk-based-analysis-cryogenic-spill/"><div class="listing-page-search__results-card-content"><h4 class="listing-page-search__results-card-heading">Guidance Notes for Risk Based Analysis: Cryogenic Spill.</h4><div class="listing-page-search__results-card-category-wrapper"><span class="listing-page-search__results-card-category">Guidance notes</span><span class="listing-page-search__results-card-published">1 Aug 2015</span></div></div></a></div><div class="listing-page-search__results-card" id="listing-page-search__results-card-11"><a class="listing-page-search__results-card-link " href="/en/knowledge/lloyds-register-rules/guidance-notes/guidance-notes-for-wind-turbine-installation-vessels/"><div class="listing-page-search__results-card-content"><h4 class="listing-page-search__results-card-heading">LR-GN-040 Guidance Notes for Wind Turbine Installation Vessels</h4><div class="listing-page-search__results-card-category-wrapper"><span class="listing-page-search__results-card-category">Guidance notes</span><span class="listing-page-search__results-card-published">1 Jul 2014</span></div></div></a></div></div>`;

// Function to check if a regulation already exists
async function checkRegulationExists(link) {
  try {
    const encodedLink = encodeURIComponent(link);
    const response = await fetch(
      `${API_URL}/regulations?where[link][equals]=${encodedLink}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );

    if (!response.ok) {
      console.error(`Error checking if regulation exists: ${response.status}`);
      return false;
    }

    const data = await response.json();
    return data.docs && data.docs.length > 0;
  } catch (error) {
    console.error(`Error checking if regulation exists: ${error.message}`);
    return false;
  }
}

// Function to map English category name to Chinese category ID
function mapCategoryNameToId(categoryName) {
  const categoryMap = {
    "Lloyd's Register Rules": 1, // LR规则
    "Guidance notes": 2, // 指南说明
    "Materials and Qualification Procedures for Ships": 3, // 船舶材料与资格程序
    "Historical Documents and Rules": 4, // 历史文件和规则
    "Type Approval Test Specifications": 1, // Map to LR规则 for now
    "": 4, // Empty category - treat as historical documents
  };

  return categoryMap[categoryName] || null;
}

// Function to parse the HTML and extract regulations
function parseRegulations(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const cards = document.querySelectorAll(".listing-page-search__results-card");

  const regulations = [];

  cards.forEach((card) => {
    const linkElement = card.querySelector("a");
    const headingElement = card.querySelector(
      ".listing-page-search__results-card-heading",
    );
    const categoryElement = card.querySelector(
      ".listing-page-search__results-card-category",
    );
    const publishedElement = card.querySelector(
      ".listing-page-search__results-card-published",
    );

    if (!headingElement || !publishedElement || !linkElement) {
      console.warn("Skipping item with missing data");
      return;
    }

    const fullTitle = headingElement.textContent.trim();
    const category = categoryElement ? categoryElement.textContent.trim() : "";
    const dateStr = publishedElement.textContent.trim();
    const link = "https://www.lr.org" + linkElement.getAttribute("href");

    // Extract code from the heading - typically the format is "CODE - Description"
    let code = "";
    let name = fullTitle;
    let hasCode = false;

    if (fullTitle.includes(" - ")) {
      const parts = fullTitle.split(" - ");
      code = parts[0].trim();
      name = parts.slice(1).join(" - ").trim();
      hasCode = true;
    } else if (
      /^[A-Z]{2,}-[A-Z]{2,}-\d{3}/.test(fullTitle) ||
      /^[A-Z]{2,}-\d{2,}/.test(fullTitle)
    ) {
      // Match patterns like "LR-RU-001" or "LR-GN-012" or "LR-RU-20"
      const parts = fullTitle.split(" ");
      code = parts[0].trim();
      name = parts.slice(1).join(" ").trim();
      hasCode = true;
    }

    // Format the date from "30 Jan 2025" or "1 Jul 2024" to ISO format "2025-01-30"
    const dateParts = dateStr.split(" ");
    const monthMap = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    const day = dateParts[0].padStart(2, "0");
    const month = monthMap[dateParts[1]];
    const year = dateParts[2];
    const formattedDate = `${year}-${month}-${day}`;

    // Create slug based on whether there's a code or not
    let slug;
    if (hasCode) {
      // Use lowercase code if available
      slug = code.toLowerCase();
    } else {
      // Create slug from title if no code
      slug = name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
    }

    // Create regulation data object
    const regulationData = {
      name,
      slug,
      date: formattedDate,
      category, // Temporary field to store category name
      link,
    };

    // Only add the code if it exists
    if (hasCode) {
      regulationData.code = code;
    }

    regulations.push(regulationData);
  });

  return regulations;
}

// Function to process a regulation
async function processRegulation(regulationData) {
  try {
    // Check if regulation already exists
    const exists = await checkRegulationExists(regulationData.link);
    if (exists) {
      console.log(`Regulation already exists: ${regulationData.name}`);
      return null;
    }

    // Check for unknown categories and stop processing if found
    if (regulationData.category && regulationData.category.trim() !== "") {
      const categoryId = mapCategoryNameToId(regulationData.category);
      if (categoryId) {
        regulationData.category2 = categoryId;
      } else {
        console.error(
          `Unknown category found: "${regulationData.category}" for regulation "${regulationData.name}"`,
        );
        console.error(
          `Processing stopped. Please add this category to the mapping.`,
        );
        process.exit(1); // Exit the script
      }
    }

    delete regulationData.category; // Remove the temporary category field

    const response = await fetch(`${API_URL}/regulations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(regulationData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${errorText}`,
      );
    }

    const data = await response.json();
    console.log(`Successfully posted regulation: ${data.doc.name}`);
    return data;
  } catch (error) {
    console.error(`Error processing regulation: ${error.message}`);
    return null;
  }
}

// Main function
async function main() {
  try {
    const regulations = parseRegulations(htmlContent);
    console.log(`Found ${regulations.length} regulations to process`);

    let newCount = 0;
    let skipCount = 0;

    // Process each regulation
    for (const regulation of regulations) {
      const result = await processRegulation(regulation);
      if (result) {
        newCount++;
      } else {
        skipCount++;
      }
    }

    console.log(`Finished processing all regulations`);
    console.log(`New regulations added: ${newCount}`);
    console.log(`Existing regulations skipped: ${skipCount}`);
  } catch (error) {
    console.error("Error in main function:", error);
  }
}

// Run the script
main();
