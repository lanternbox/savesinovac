import fetch from "node-fetch";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const API_URL = process.env.PAYLOAD_API_URL || "http://localhost:3000/api";
const COLLECTION_SLUG = "case-studies"; // Replace with your collection slug

async function connectToPayloadAPI() {
  try {
    // Make a GET request to retrieve items from the collection
    const response = await fetch(`${API_URL}/${COLLECTION_SLUG}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    console.log("Successfully connected to Payload API");
    console.log("Retrieved data:", data);

    // You can process the data here as needed
  } catch (error) {
    console.error("Error connecting to Payload API:", error.message);
  }
}

connectToPayloadAPI();
