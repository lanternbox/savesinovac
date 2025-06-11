import fetch from "node-fetch";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const API_URL = process.env.PAYLOAD_API_URL || "http://localhost:3000/api";
const COLLECTION_SLUG = "media"; // Replace with your collection slug
const CONCURRENT_DELETES = 10; // Adjust this number based on your API's rate limits
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function deleteMediaItem(id, retries = 0) {
  try {
    const deleteResponse = await fetch(`${API_URL}/${COLLECTION_SLUG}/${id}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${process.env.PAYLOAD_API_SECRET}`,
      },
    });

    if (!deleteResponse.ok) {
      throw new Error(
        `Failed to delete media item with ID: ${id}. Status: ${deleteResponse.status}`,
      );
    }

    return `Deleted media item with ID: ${id}`;
  } catch (error) {
    if (retries < MAX_RETRIES) {
      console.warn(
        `Error deleting item ${id}. Retrying (${retries + 1}/${MAX_RETRIES})...`,
      );
      await sleep(RETRY_DELAY);
      return deleteMediaItem(id, retries + 1);
    }
    throw error;
  }
}

async function deleteAllMedia() {
  try {
    let hasMoreItems = true;
    let page = 1;
    let totalDeleted = 0;
    let totalItems = 0;

    while (hasMoreItems) {
      const response = await fetch(
        `${API_URL}/${COLLECTION_SLUG}?limit=100&page=${page}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            authorization: `Bearer ${process.env.PAYLOAD_API_SECRET}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      totalItems = data.totalDocs;
      console.log(
        `Found ${data.docs.length} media items on page ${page}. Total items: ${totalItems}`,
      );

      for (let i = 0; i < data.docs.length; i += CONCURRENT_DELETES) {
        const batch = data.docs.slice(i, i + CONCURRENT_DELETES);
        const results = await Promise.allSettled(
          batch.map((item) => deleteMediaItem(item.id)),
        );

        results.forEach((result, index) => {
          if (result.status === "fulfilled") {
            totalDeleted++;
            console.log(result.value);
          } else {
            console.error(
              `Failed to delete item ${batch[index].id}:`,
              result.reason,
            );
          }
        });

        const progressPercentage = ((totalDeleted / totalItems) * 100).toFixed(
          2,
        );
        console.log(
          `Progress: ${totalDeleted}/${totalItems} (${progressPercentage}%) items deleted`,
        );
      }

      hasMoreItems = data.hasNextPage;
      page++;
    }

    console.log(
      `Operation complete. Total items deleted: ${totalDeleted}/${totalItems}`,
    );
  } catch (error) {
    console.error("Error deleting media items:", error.message);
  }
}

deleteAllMedia();
