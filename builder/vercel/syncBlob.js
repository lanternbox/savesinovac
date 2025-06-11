import dotenv from "dotenv";
import { list, del, put } from "@vercel/blob";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import util from "util";
import { Readable } from "stream";
import { pipeline } from "stream/promises"; // For streaming downloads
import resetVercelBlob from "./resetBlob.js"; // Import the reset function

dotenv.config({
  path: path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../../.env.production",
  ),
}); // Load .env.production

const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);
const mkdir = util.promisify(fs.mkdir);
const readFile = util.promisify(fs.readFile);
const unlink = util.promisify(fs.unlink);
const rmdir = util.promisify(fs.rmdir);

const LOCAL_BLOB_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../public/media",
);

const checkBlobToken = () => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("BLOB_READ_WRITE_TOKEN is not set in environment variables.");
    throw new Error("BLOB_READ_WRITE_TOKEN is required.");
  }
};

/**
 * Recursively get all file paths within a directory.
 * @param {string} dir The directory to scan.
 * @returns {Promise<string[]>} A list of full file paths.
 */
async function getFilesRecursively(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFilesRecursively(res) : res;
    }),
  );
  return Array.prototype.concat(...files);
}

/**
 * Clears the contents of a directory recursively.
 * @param {string} directory The directory to clear.
 */
async function clearLocalDir(directory) {
  console.log(`Clearing local directory: ${directory}`);
  try {
    if (!fs.existsSync(directory)) {
      console.log("Local directory does not exist, nothing to clear.");
      // Ensure it exists for subsequent operations
      await mkdir(directory, { recursive: true });
      return;
    }
    const dirents = await readdir(directory, { withFileTypes: true });
    for (const dirent of dirents) {
      const fullPath = path.join(directory, dirent.name);
      if (dirent.isDirectory()) {
        await clearLocalDir(fullPath); // Recurse into subdirectories
        await rmdir(fullPath); // Remove the now-empty directory
        console.log(`Removed directory: ${fullPath}`);
      } else {
        await unlink(fullPath); // Delete file
        console.log(`Deleted file: ${fullPath}`);
      }
    }
    console.log(`Finished clearing ${directory}`);
  } catch (error) {
    console.error(`Error clearing directory ${directory}:`, error);
    // Depending on the desired behavior, you might want to re-throw the error
    // or just log it and potentially proceed with caution.
    throw new Error(`Failed to clear local directory ${directory}`);
  }
}

const pullBlobs = async () => {
  checkBlobToken();

  // Clear local directory before pulling
  try {
    await clearLocalDir(LOCAL_BLOB_DIR);
  } catch (clearError) {
    console.error(
      "Halting pull due to error during local directory clearing.",
      clearError,
    );
    return; // Stop if clearing failed
  }

  console.log(`Pulling blobs from Vercel Blob to ${LOCAL_BLOB_DIR}...`);

  try {
    // Ensure local directory exists
    await mkdir(LOCAL_BLOB_DIR, { recursive: true });

    let cursor;
    let count = 0;
    do {
      const listResult = await list({
        limit: 1000, // Max limit
        cursor,
      });

      if (listResult.blobs.length === 0 && !cursor) {
        console.log("No blobs found in Vercel Blob storage.");
        break;
      }

      for (const blob of listResult.blobs) {
        const localPath = path.join(LOCAL_BLOB_DIR, blob.pathname);
        const localDir = path.dirname(localPath);

        console.log(`Downloading: ${blob.pathname} -> ${localPath}`);

        // Ensure subdirectory exists
        await mkdir(localDir, { recursive: true });

        // Fetch and stream to file
        const response = await fetch(blob.url);
        if (!response.ok) {
          console.error(`Failed to fetch ${blob.url}: ${response.statusText}`);
          continue; // Skip this blob
        }
        if (response.body) {
          // @ts-ignore - Node.js stream types vs web stream types
          const bodyStream = Readable.fromWeb(response.body);
          const fileStream = fs.createWriteStream(localPath);
          await pipeline(bodyStream, fileStream);
          count++;
        } else {
          console.warn(
            `Blob ${blob.pathname} has no content. Creating empty file.`,
          );
          fs.writeFileSync(localPath, ""); // Create empty file if no body
          count++;
        }
      }
      cursor = listResult.cursor;
    } while (cursor);

    console.log(`Successfully pulled ${count} blobs.`);
  } catch (error) {
    console.error("Error pulling blobs:", error);
    throw error;
  }
};

const pushBlobs = async () => {
  checkBlobToken();

  // Reset Vercel Blob before pushing
  try {
    await resetVercelBlob();
    console.log("Vercel Blob storage cleared before push.");
  } catch (resetError) {
    console.error(
      "Halting push due to error during Vercel Blob reset.",
      resetError,
    );
    return; // Stop if reset failed
  }

  console.log(`Pushing blobs from ${LOCAL_BLOB_DIR} to Vercel Blob...`);

  try {
    if (!fs.existsSync(LOCAL_BLOB_DIR)) {
      console.log(
        `Local directory ${LOCAL_BLOB_DIR} does not exist. Nothing to push.`,
      );
      return;
    }

    const localFiles = await getFilesRecursively(LOCAL_BLOB_DIR);
    console.log(`Found ${localFiles.length} local files to potentially push.`);

    let uploadedCount = 0;
    const uploadPromises = localFiles.map(async (filePath) => {
      const blobPathname = path.relative(LOCAL_BLOB_DIR, filePath);
      console.log(`Uploading: ${filePath} -> ${blobPathname}`);

      try {
        const fileBuffer = await readFile(filePath);
        // Consider streaming for very large files if needed:
        // const fileStream = fs.createReadStream(filePath);
        await put(blobPathname, fileBuffer, {
          access: "public",
          // Allow overwriting existing blobs during sync
          allowOverwrite: true,
          // We determine the path, don't add random suffix
          addRandomSuffix: false,
        });
        uploadedCount++;
        console.log(`Uploaded: ${blobPathname}`);
      } catch (uploadError) {
        console.error(`Error uploading ${blobPathname}:`, uploadError.message);
        // Decide if one error should stop the whole process or just be logged
        // For sync, we might want to continue and report errors at the end
      }
    });

    await Promise.all(uploadPromises);

    console.log(`Successfully pushed ${uploadedCount} blobs.`);
    // TODO: Optionally add logic to delete remote blobs not present locally
  } catch (error) {
    console.error("Error pushing blobs:", error);
    throw error;
  }
};

const syncBlobs = async (direction = "pull") => {
  if (direction === "pull") {
    await pullBlobs();
  } else if (direction === "push") {
    await pushBlobs();
  } else {
    throw new Error('Invalid direction. Use "push" or "pull"');
  }
};

// Only run if this is the main file - don't run if imported
if (
  import.meta.url.startsWith("file:") &&
  process.argv[1] === fileURLToPath(import.meta.url)
) {
  // Get direction from command line args, default to pull
  const direction = process.argv[2] || "pull";

  if (!["push", "pull"].includes(direction)) {
    console.error('Error: Direction must be either "push" or "pull"');
    console.log("Usage: node builder/vercel/syncBlob.js [push|pull]");
    process.exit(1);
  }

  syncBlobs(direction)
    .then(() => {
      console.log(
        `${direction.charAt(0).toUpperCase() + direction.slice(1)} completed successfully`,
      );
      process.exit(0);
    })
    .catch((error) => {
      console.error(
        `${direction.charAt(0).toUpperCase() + direction.slice(1)} failed:`,
        error.message, // Log only message for cleaner output
      );
      process.exit(1);
    });
}

export { syncBlobs, pullBlobs, pushBlobs };
