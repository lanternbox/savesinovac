import fs from "fs-extra";
import path from "path";
import dotenv from "dotenv";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import resetDatabaseSchema from "../local/resetSqliteDb.mjs";
import resetVercelBlob from "../vercel/resetBlob.js";
import resetCloudflareR2 from "../cloudflare/resetBucket.js";

dotenv.config();

const argv = yargs(hideBin(process.argv))
  .option("withData", {
    alias: "d",
    type: "boolean",
    description: "Include data directory in reset",
  })
  .help()
  .alias("help", "h").argv;

const withData = argv.withData;

const clearBlockImportsAndComponents = async () => {
  console.log(
    "Clearing block and global imports and component names in [[...slug]]/page.js...",
  );
  const slugPagePath = path.join(
    process.cwd(),
    "src",
    "app",
    "(frontend)",
    "[locale]",
    "[[...slug]]",
    "page.js",
  );

  if (await fs.pathExists(slugPagePath)) {
    let content = await fs.readFile(slugPagePath, "utf-8");

    const importStartComment = "// added block imports";
    const importEndComment = "// end added block imports";
    const componentStartComment = "// added block component names";
    const componentEndComment = "// end added block component names";
    const globalImportStartComment = "// added global imports";
    const globalImportEndComment = "// end added global imports";
    const globalComponentStartComment = "// added global component names";
    const globalComponentEndComment = "// end added global component names";

    const removeContentBetweenMarkers = (text, startMarker, endMarker) => {
      const startIndex = text.indexOf(startMarker);
      const endIndex = text.indexOf(endMarker, startIndex);
      if (startIndex !== -1 && endIndex !== -1) {
        return (
          text.slice(0, startIndex + startMarker.length) +
          "\n" +
          text.slice(endIndex)
        );
      }
      return text;
    };

    // Remove block imports
    content = removeContentBetweenMarkers(
      content,
      importStartComment,
      importEndComment,
    );

    // Remove block component names
    content = removeContentBetweenMarkers(
      content,
      componentStartComment,
      componentEndComment,
    );

    // Remove global imports
    content = removeContentBetweenMarkers(
      content,
      globalImportStartComment,
      globalImportEndComment,
    );

    // Remove global component names
    content = removeContentBetweenMarkers(
      content,
      globalComponentStartComment,
      globalComponentEndComment,
    );

    await fs.writeFile(slugPagePath, content);
    console.log(
      "Cleared block and global imports and component names in [[...slug]]/page.js",
    );
  } else {
    console.log("[[...slug]]/page.js not found");
  }
};

const cleanupAppDirectory = async () => {
  console.log("Cleaning up /src/app/(frontend)/[locale]/ directory...");
  const appDir = path.join(
    process.cwd(),
    "src",
    "app",
    "(frontend)",
    "[locale]",
  );

  if (await fs.pathExists(appDir)) {
    const entries = await fs.readdir(appDir, { withFileTypes: true });

    const deletionPromises = entries.map((entry) => {
      if (entry.isDirectory() && entry.name !== "[[...slug]]") {
        return fs.remove(path.join(appDir, entry.name));
      }
    });

    await Promise.all(deletionPromises);
    console.log(
      "Cleanup of /src/app/(frontend)/[locale]/ directory completed.",
    );
  } else {
    console.log("/src/app/(frontend)/[locale] directory not found.");
  }
};

const cleanupCollectionsDirectory = async () => {
  console.log("Cleaning up /src/collections/ directory...");
  const collectionsDir = path.join(process.cwd(), "src", "collections");

  if (await fs.pathExists(collectionsDir)) {
    const entries = await fs.readdir(collectionsDir, { withFileTypes: true });

    const deletionPromises = entries.map((entry) => {
      if (entry.isDirectory() && !["Pages", "Users"].includes(entry.name)) {
        return fs.remove(path.join(collectionsDir, entry.name));
      } else if (entry.isFile() && !["Media.ts"].includes(entry.name)) {
        return fs.remove(path.join(collectionsDir, entry.name));
      }
    });

    await Promise.all(deletionPromises);
    console.log("Cleanup of /src/collections/ directory completed.");
  } else {
    console.log("/src/collections/ directory not found.");
  }
};

const updatePayloadConfig = async () => {
  console.log("Updating payload.config.ts...");
  const configPath = path.join(process.cwd(), "src", "payload.config.ts");

  if (await fs.pathExists(configPath)) {
    let configContent = await fs.readFile(configPath, "utf-8");

    const collectionStartMarker = "// added collections";
    const collectionEndMarker = "// end added collections";
    const importStartMarker = "// added collection imports";
    const importEndMarker = "// end added collection imports";
    const globalImportStartMarker = "// added global imports";
    const globalImportEndMarker = "// end added global imports";
    const globalStartMarker = "// added globals";
    const globalEndMarker = "// end added globals";

    const removeContentBetweenMarkers = (text, startMarker, endMarker) => {
      const startIndex = text.indexOf(startMarker);
      const endIndex = text.indexOf(endMarker, startIndex);
      if (startIndex !== -1 && endIndex !== -1) {
        return (
          text.slice(0, startIndex + startMarker.length) +
          "\n" +
          text.slice(endIndex)
        );
      }
      return text;
    };

    // Remove collection imports
    configContent = removeContentBetweenMarkers(
      configContent,
      importStartMarker,
      importEndMarker,
    );

    // Remove collections
    configContent = removeContentBetweenMarkers(
      configContent,
      collectionStartMarker,
      collectionEndMarker,
    );

    // Remove global imports
    configContent = removeContentBetweenMarkers(
      configContent,
      globalImportStartMarker,
      globalImportEndMarker,
    );

    // Remove globals
    configContent = removeContentBetweenMarkers(
      configContent,
      globalStartMarker,
      globalEndMarker,
    );

    await fs.writeFile(configPath, configContent, "utf-8");
    console.log("payload.config.ts updated successfully.");
  } else {
    console.log("payload.config.ts not found.");
  }
};

const updatePagesIndex = async () => {
  console.log("Updating src/collections/Pages/index.ts...");
  const pagesIndexPath = path.join(
    process.cwd(),
    "src",
    "collections",
    "Pages",
    "index.ts",
  );

  if (await fs.pathExists(pagesIndexPath)) {
    let content = await fs.readFile(pagesIndexPath, "utf-8");

    const blockImportStartMarker = "// added block imports";
    const blockImportEndMarker = "// end added block imports";
    const blockStartMarker = "// added blocks";
    const blockEndMarker = "// end added blocks";

    const removeContentBetweenMarkers = (text, startMarker, endMarker) => {
      const startIndex = text.indexOf(startMarker);
      const endIndex = text.indexOf(endMarker, startIndex);
      if (startIndex !== -1 && endIndex !== -1) {
        return (
          text.slice(0, startIndex + startMarker.length) +
          "\n" +
          text.slice(endIndex)
        );
      }
      return text;
    };

    // Remove block imports
    content = removeContentBetweenMarkers(
      content,
      blockImportStartMarker,
      blockImportEndMarker,
    );

    // Remove blocks
    content = removeContentBetweenMarkers(
      content,
      blockStartMarker,
      blockEndMarker,
    );

    await fs.writeFile(pagesIndexPath, content, "utf-8");
    console.log("src/collections/Pages/index.ts updated successfully.");
  } else {
    console.log("src/collections/Pages/index.ts not found.");
  }
};

const updateLayoutFile = async () => {
  console.log("Updating src/app/(frontend)/[locale]/layout.tsx...");
  const layoutPath = path.join(
    process.cwd(),
    "src",
    "app",
    "(frontend)",
    "[locale]",
    "layout.tsx",
  );

  if (await fs.pathExists(layoutPath)) {
    let layoutContent = await fs.readFile(layoutPath, "utf-8");

    // Comment out the imports
    const importSectionRegex =
      /(\/\/ imports to uncomment\n)([\s\S]*?)(\n\/\/ end imports to uncomment)/;
    layoutContent = layoutContent.replace(
      importSectionRegex,
      (match, p1, p2, p3) => {
        const commentedImports = p2
          .split("\n")
          .map((line) => (line.trim().startsWith("//") ? line : `// ${line}`))
          .join("\n");
        return `${p1}${commentedImports}${p3}`;
      },
    );

    // Comment out the "no devlink yet" line
    const commentedReturn = `// return; // no devlink yet`;
    const uncommentedReturn = `return; // no devlink yet`;
    layoutContent = layoutContent.replace(commentedReturn, uncommentedReturn);

    await fs.writeFile(layoutPath, layoutContent);
    console.log("src/app/(frontend)/[locale]/layout.tsx updated successfully.");
  } else {
    console.log("src/app/(frontend)/[locale]/layout.tsx not found.");
  }
};

const clearMediaFolder = async () => {
  console.log("Clearing contents of /media and /public/media folders...");
  const mediaDir = path.join(process.cwd(), "media");
  const publicMediaDir = path.join(process.cwd(), "public", "media");

  if (await fs.pathExists(mediaDir)) {
    await fs.emptyDir(mediaDir);
    console.log("Contents of /media folder cleared successfully.");
  } else {
    console.log("/media folder not found.");
  }

  if (await fs.pathExists(publicMediaDir)) {
    await fs.emptyDir(publicMediaDir);
    console.log("Contents of /public/media folder cleared successfully.");
  } else {
    console.log("/public/media folder not found.");
  }
};

const cleanupGlobalsDirectory = async () => {
  console.log("Cleaning up /src/globals/ directory...");
  const globalsDir = path.join(process.cwd(), "src", "globals");

  if (await fs.pathExists(globalsDir)) {
    await fs.emptyDir(globalsDir);
    console.log("Contents of /src/globals/ directory removed.");
  } else {
    console.log("/src/globals/ directory not found.");
  }
};

const cleanupDevlinkDirectory = async () => {
  console.log("Cleaning up /src/devlink/ directory...");
  const devlinkDir = path.join(process.cwd(), "src", "devlink");

  if (await fs.pathExists(devlinkDir)) {
    await fs.emptyDir(devlinkDir);
    console.log("Contents of /src/devlink/ directory removed.");
  } else {
    console.log("/src/devlink/ directory not found.");
  }
};

const reset = async () => {
  try {
    await clearBlockImportsAndComponents();
    await updatePagesIndex();
    await cleanupAppDirectory();
    await fs.remove(path.join(process.cwd(), "src", "blocks"));
    console.log("/src/blocks/ directory deleted.");

    await updateLayoutFile();
    await fs.remove(path.join(process.cwd(), "src", "components", "devlink"));
    console.log("/src/components/devlink directory deleted.");

    await cleanupCollectionsDirectory();
    await cleanupGlobalsDirectory();
    await cleanupDevlinkDirectory();
    await clearMediaFolder();
    await updatePayloadConfig();

    if (withData) {
      await fs.remove(path.join(process.cwd(), "data"));
      console.log("/data directory deleted.");
    }

    // Run database reset first and wait for it to complete
    console.log("Starting database reset...");
    await resetDatabaseSchema();
    // Add a small delay to ensure database connection is fully closed
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Database reset completed");

    // Then run blob reset
    console.log("Starting blob reset...");
    await resetVercelBlob();
    console.log("Blob reset completed");

    // Then run Cloudflare R2 reset
    console.log("Starting Cloudflare R2 reset...");
    await resetCloudflareR2();
    console.log("Cloudflare R2 reset completed");

    console.log("Reset process completed successfully.");
  } catch (error) {
    console.error("Error during reset process:", error.message);
    process.exit(1); // Exit with error code if something fails
  }
};

// Add this to ensure we wait for all promises to complete
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});

reset();
