import dotenv from "dotenv";
import { list, del } from "@vercel/blob";

dotenv.config();

const resetVercelBlob = async () => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.log("BLOB_READ_WRITE_TOKEN is not set, skipping reset...");
    return;
  }
  console.log("Emptying Vercel Blob storage...");

  try {
    const { blobs } = await list();

    const deletionPromises = blobs.map(async (blob) => {
      await del(blob.url);
      console.log(`Deleted blob: ${blob.url}`);
    });

    await Promise.all(deletionPromises);

    console.log("Vercel Blob storage emptied successfully.");
  } catch (error) {
    console.error("Error emptying Vercel Blob storage:", error.message);
    throw error;
  }
};

// Only run the exit logic if this is the main file being executed
if (import.meta.url === new URL(process.argv[1], "file:").href) {
  resetVercelBlob()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export default resetVercelBlob;
