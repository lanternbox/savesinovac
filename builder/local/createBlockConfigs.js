import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { applyPrettierSitewide } from "./prettier.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, "..", "..", "src", "blocks");
const targetDir = path.join(__dirname, "..", "..", "src", "blocks");
const pagesConfigPath = path.join(
  __dirname,
  "..",
  "..",
  "src",
  "collections",
  "Pages",
  "index.ts",
);
const catchallPagePath = path.join(
  __dirname,
  "..",
  "..",
  "src",
  "app",
  "(frontend)",
  "[locale]",
  "[[...slug]]",
  "page.js",
);

async function ensureTargetDirectoryExists() {
  try {
    await fs.access(targetDir);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log(`Creating directory: ${targetDir}`);
      await fs.mkdir(targetDir, { recursive: true });
    } else {
      throw error;
    }
  }
}

async function generateBlocks() {
  await ensureTargetDirectoryExists();
  try {
    console.log(`Scanning directory: ${sourceDir}`);
    const entries = await fs.readdir(sourceDir, { withFileTypes: true });
    const generatedBlocks = [];
    const globalBlocks = [];

    for (const entry of entries) {
      if (entry.isDirectory() && entry.name !== "_Builtin") {
        const blockComponentName = entry.name;

        console.log(`Processing block component: ${blockComponentName}`);

        if (blockComponentName.endsWith("G")) {
          // Handle global components
          await writeGlobalBlockFile(blockComponentName);
          globalBlocks.push(blockComponentName);
        } else {
          // Handle regular components (existing logic)
          const clientPath = path.join(
            sourceDir,
            blockComponentName,
            "client.jsx",
          );

          try {
            const fileContents = await fs.readFile(clientPath, "utf-8");
            const contentMatch = fileContents.match(
              /const\s+content\s*=\s*({[^;]+});/,
            );

            if (contentMatch) {
              const contentObject = contentMatch[1];
              console.log(`Found content object in ${blockComponentName}`);

              try {
                const content = eval(`(${contentObject})`);
                const fields = generateFieldsFromContent(content);
                await writeBlockFile(blockComponentName, fields);
              } catch (parseError) {
                console.error(
                  `Error parsing object in ${blockComponentName}:`,
                  parseError,
                );
              }
            } else {
              console.log(`No content object found in ${blockComponentName}`);
            }
          } catch (error) {
            console.error(
              `Error processing ${blockComponentName}:`,
              error.message,
            );
          }
        }

        generatedBlocks.push(blockComponentName);
      }
    }

    await updatePagesConfig(generatedBlocks);
    await updateCatchallPage(generatedBlocks);
    await updatePayloadConfig(globalBlocks);

    // Apply Prettier after all modifications
    await applyPrettierSitewide();
  } catch (error) {
    console.error("Error generating blocks:", error);
  }
}

function generateFieldsFromContent(content) {
  const fields = Object.entries(content)
    .map(([key, value]) => {
      if (isImage(key)) {
        return {
          name: key,
          type: "upload",
          relationTo: "media",
        };
      }
      if (isLink(key)) {
        return {
          name: key,
          type: "group",
          fields: [
            {
              name: "href",
              type: "text",
              localized: true,
            },
            {
              name: "text",
              type: "text",
              localized: true,
            },
          ],
        };
      }
      return {
        name: key,
        type: mapType(key),
        localized: true,
      };
    })
    .filter((field) => field !== null);

  return fields;
}

function isImage(fieldName) {
  return fieldName.toLowerCase().startsWith("image");
}

function isLink(fieldName) {
  return fieldName.toLowerCase().startsWith("link");
}

function mapType(fieldName) {
  if (fieldName.toLowerCase().startsWith("subheading")) return "text";
  if (fieldName.toLowerCase().startsWith("heading")) return "text";
  if (fieldName.toLowerCase().startsWith("paragraph")) return "text";
  if (fieldName.toLowerCase().startsWith("body")) return "richText";
  return "text";
}

async function writeBlockFile(blockComponentName, fields) {
  const blockContent = `import { Block } from 'payload';

export const ${blockComponentName}: Block = {
  slug: "${blockComponentName}",
  fields: ${JSON.stringify(fields, null, 2)}
};
`;

  // Update the file path to be inside the specific block folder
  const filePath = path.join(targetDir, blockComponentName, "config.ts");

  // Ensure the block directory exists
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  await fs.writeFile(filePath, blockContent);
  console.log(`Generated block config file for ${blockComponentName}`);
}

async function writeGlobalBlockFile(blockComponentName) {
  const blockContent = `import { Block } from "payload";

export const ${blockComponentName}: Block = {
  slug: "${blockComponentName}",
  fields: [
    {
      name: "message",
      type: "text",
      localized: true,
      admin: {
        readOnly: true,
        description: "Edit this block in Globals.",
      },
    },
  ],
};
`;

  // Update the file path to be inside the specific block folder
  const filePath = path.join(targetDir, blockComponentName, "config.ts");

  // Ensure the block directory exists
  await fs.mkdir(path.dirname(filePath), { recursive: true });

  await fs.writeFile(filePath, blockContent);
  console.log(`Generated global block config file for ${blockComponentName}`);
}

async function updatePagesConfig(generatedBlocks) {
  try {
    let pagesConfigContent = await fs.readFile(pagesConfigPath, "utf-8");

    // Filter out dynamic page (Dp) blocks, NavbarG, and GlobalStyles
    const filteredBlocks = generatedBlocks.filter(
      (block) =>
        !block.endsWith("Dp") &&
        block !== "NavbarG" &&
        block !== "GlobalStyles",
    );

    // Add imports for filtered blocks
    const importStatements = filteredBlocks
      .map((block) => `import { ${block} } from "@/blocks/${block}/config";`)
      .join("\n");

    // Find the position to insert the new imports
    const startComment = "// added block imports";
    const endComment = "// end added block imports";
    const startIndex = pagesConfigContent.indexOf(startComment);
    const endIndex = pagesConfigContent.indexOf(endComment);

    if (startIndex !== -1 && endIndex !== -1) {
      // Replace the content between the comments with the new imports
      pagesConfigContent =
        pagesConfigContent.slice(0, startIndex + startComment.length) +
        "\n" +
        importStatements +
        "\n" +
        pagesConfigContent.slice(endIndex);
    } else {
      console.error("Could not find import section in Pages Config");
    }

    // Add filtered blocks between comments
    const blocksStartComment = "// added blocks";
    const blocksEndComment = "// end added blocks";
    const blocksStartIndex = pagesConfigContent.indexOf(blocksStartComment);
    const blocksEndIndex = pagesConfigContent.indexOf(blocksEndComment);

    if (blocksStartIndex !== -1 && blocksEndIndex !== -1) {
      const blocksList = filteredBlocks.join(",\n                ");
      pagesConfigContent =
        pagesConfigContent.slice(
          0,
          blocksStartIndex + blocksStartComment.length,
        ) +
        "\n                " +
        blocksList +
        "\n                " +
        pagesConfigContent.slice(blocksEndIndex);
    } else {
      console.error("Could not find blocks section in Pages config");
    }

    await fs.writeFile(pagesConfigPath, pagesConfigContent);
    console.log(
      "Updated Pages config with filtered blocks (excluding Dp blocks, NavbarG, and GlobalStyles)",
    );
  } catch (error) {
    console.error("Error updating Pages config:", error);
  }
}

async function updateCatchallPage(generatedBlocks) {
  try {
    let catchallPageContent = await fs.readFile(catchallPagePath, "utf-8");

    // Filter out dynamic page (Dp) blocks and NavbarG
    const filteredBlocks = generatedBlocks.filter(
      (block) => !block.endsWith("Dp") && block !== "NavbarG",
    );

    // Add imports for filtered blocks
    const importStatements = filteredBlocks
      .map((block) => `import { ${block} } from "@/blocks/${block}";`)
      .join("\n");

    // Find the position to insert the new imports
    const startComment = "// added block imports";
    const endComment = "// end added block imports";
    const startIndex = catchallPageContent.indexOf(startComment);
    const endIndex = catchallPageContent.indexOf(endComment);

    if (startIndex !== -1 && endIndex !== -1) {
      // Replace the content between the comments with the new imports
      catchallPageContent =
        catchallPageContent.slice(0, startIndex + startComment.length) +
        "\n" +
        importStatements +
        "\n" +
        catchallPageContent.slice(endIndex);

      // Add filtered block component names
      const blockComponentNamesStartComment = "// added block component names";
      const blockComponentNamesEndComment =
        "// end added block component names";
      const blockComponentNamesStartIndex = catchallPageContent.indexOf(
        blockComponentNamesStartComment,
      );
      const blockComponentNamesEndIndex = catchallPageContent.indexOf(
        blockComponentNamesEndComment,
      );

      if (
        blockComponentNamesStartIndex !== -1 &&
        blockComponentNamesEndIndex !== -1
      ) {
        const blockComponentNamesList = filteredBlocks.join(",\n  ");
        catchallPageContent =
          catchallPageContent.slice(
            0,
            blockComponentNamesStartIndex +
              blockComponentNamesStartComment.length,
          ) +
          "\n  " +
          blockComponentNamesList +
          ",\n  " +
          catchallPageContent.slice(blockComponentNamesEndIndex);
      } else {
        console.error(
          "Could not find block component names section in [[...slug]]/page.js",
        );
      }

      await fs.writeFile(catchallPagePath, catchallPageContent);
      console.log(
        "Updated [[...slug]]/page.js with filtered block imports and block component names (excluding Dp blocks and NavbarG)",
      );
    } else {
      console.error("Could not find import section in [[...slug]]/page.js");
    }
  } catch (error) {
    console.error("Error updating [[...slug]]/page.js:", error);
  }
}

async function updatePayloadConfig(globalBlocks) {
  const configPath = path.join(process.cwd(), "src", "payload.config.ts");
  let configContent = await fs.readFile(configPath, "utf-8");

  const imports = globalBlocks
    .map((name) => `import { ${name} } from "./globals/${name}/config";`)
    .join("\n");

  const globalsList = globalBlocks.join(",\n    ");

  configContent = configContent.replace(
    /\/\/ added global imports\n[\s\S]*?\/\/ end added global imports/,
    `// added global imports\n${imports}\n// end added global imports`,
  );

  configContent = configContent.replace(
    /\/\/ added globals\n[\s\S]*?\/\/ end added globals/,
    `// added globals\n    ${globalsList},\n    // end added globals`,
  );

  await fs.writeFile(configPath, configContent);
  console.log("Updated payload.config.ts with new globals");
}

generateBlocks();
