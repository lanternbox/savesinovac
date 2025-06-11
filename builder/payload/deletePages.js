import fetch from "node-fetch";

const apiUrl = "http://localhost:3000/builder/pages";

async function deletePage(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.text();
    console.log(`Deleted page with ID ${id} - Response: ${data}`);
  } catch (error) {
    console.error(`Error deleting page with ID ${id}: ${error}`);
  }
}

async function getAllPages() {
  try {
    const response = await fetch(apiUrl);
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      return data.docs;
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      console.log("Raw response:", text);
      return [];
    }
  } catch (error) {
    console.error("Error fetching pages:", error);
    return [];
  }
}

async function deleteAllPages() {
  try {
    const pages = await getAllPages();
    for (const page of pages) {
      await deletePage(page.id);
    }
    console.log("All pages have been deleted.");
  } catch (error) {
    console.error("Error deleting pages:", error);
  }
}

deleteAllPages();
