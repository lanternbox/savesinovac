import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function overwriteFiles(sourceDir, targetDir) {
  try {
    const files = await fs.readdir(sourceDir, { withFileTypes: true });

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file.name);
      const relativePath = path.relative(sourceDir, sourcePath);
      const targetPath = path.join(targetDir, relativePath);

      if (file.isDirectory()) {
        // Recursively call the function for subdirectories
        await overwriteFiles(sourcePath, targetPath);
      } else {
        // Ensure the target directory exists
        await fs.mkdir(path.dirname(targetPath), { recursive: true });

        // Copy the file
        await fs.copyFile(sourcePath, targetPath);
        console.log(`Overwritten: ${targetPath}`);
      }
    }
  } catch (err) {
    console.error("Error overwriting files:", err);
  }
}

// Function to initiate the overwrite process
export async function initiateOverwrite() {
  const sourceDir = path.join(
    __dirname,
    "..",
    "..",
    "builder-mods",
    "overwrites",
  );
  const targetDir = path.join(__dirname, "..", "..", "src");

  await overwriteFiles(sourceDir, targetDir);
  console.log("Files overwritten successfully");
}

initiateOverwrite();
