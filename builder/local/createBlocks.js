import { promises as fs } from "fs";
import path from "path";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";
import { exec } from "child_process";
import { assertTSUndefinedKeyword } from "@babel/types";
import { applyPrettierSitewide } from "./prettier.js";

const copyFile = async (src, dest) => {
  await fs.copyFile(src, dest);
};

const copyDir = async (src, dest) => {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await copyFile(srcPath, destPath);
    }
  }
};

const updateImports = async (filePath) => {
  const content = await fs.readFile(filePath, "utf-8");
  const updatedContent = content.replace(
    /(from\s+['"])\.\/((?!.*\.css).*?)(['"])/g,
    "$1@/devlink/$2$3",
  );
  await fs.writeFile(filePath, updatedContent);
};

const createComponentIndex = async (
  sourceDir,
  folderPath,
  componentName,
  attrCollection,
) => {
  // Read the source file from data/devlink
  const sourcePath = path.join(sourceDir, `${componentName}.js`);
  const sourceContent = await fs.readFile(sourcePath, "utf-8");

  // Extract sort and limit attributes
  const sortMatch = sourceContent.match(/sort="([^"]+)"/);
  const limitMatch = sourceContent.match(/limit="([^"]+)"/);

  const attrSort = sortMatch ? sortMatch[1] : "order";
  const attrLimit = limitMatch ? parseInt(limitMatch[1], 10) : 100; // Default to 100 if not specified

  const isDynamicSingle = componentName.endsWith("Ds");
  const isDynamicPage = componentName.endsWith("Dp");
  const isGlobal = componentName.endsWith("G");

  let content;

  if (isGlobal) {
    content = `import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Client } from './client.jsx'

export async function ${componentName}({ locale }) {
  const payload = await getPayload({ config })

  let global
  try {
    global = await payload.findGlobal({
      slug: '${componentName}',
      locale: locale,
    })
  } catch (error) {
    // db not created yet
    return <></>
  }

  const block = global

  return <Client block={block} locale={locale} />
}
`;
  } else if (isDynamicSingle) {
    content = `import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Client } from './client.jsx'

export async function ${componentName}({ block, locale }) {
  const payload = await getPayload({ config })

  let items = await payload.find({
    collection: '${attrCollection}',
    sort: '${attrSort}',
    limit: ${attrLimit},
    locale: locale,
  })

  return <Client block={block} items={items} locale={locale} />
}
`;
  } else if (isDynamicPage) {
    content = `import React from 'react'
import { Client } from './client.jsx'

export async function ${componentName}({ block, item, locale }) {
  return <Client block={block} item={item} locale={locale} />
}
`;
  } else {
    content = `import React from 'react'
import { Client } from './client.jsx'

export async function ${componentName}({ block, locale }) {
  return <Client block={block} locale={locale} />
}
`;
  }

  await fs.writeFile(path.join(folderPath, "index.jsx"), content);
  console.log(`Created and formatted index.jsx for: ${componentName}`);
};

const handleFieldContent = (fieldName, variablePrefix) => {
  return t.callExpression(t.identifier("processFieldContent"), [
    t.stringLiteral(fieldName),
    t.identifier(variablePrefix),
    t.identifier("locale"), // Add the locale parameter
  ]);
};

const processFieldContents = (
  path,
  variablePrefix,
  attrCollection,
  isDynamicPage = false,
) => {
  path.traverse({
    JSXExpressionContainer(innerPath) {
      if (t.isStringLiteral(innerPath.node.expression)) {
        const fieldName = innerPath.node.expression.value;
        const replacement = handleFieldContent(fieldName, variablePrefix);

        // Check if the parent is a _Builtin.Paragraph inside a _Builtin.RichText
        const paragraphElement = innerPath.findParent(
          (p) =>
            p.isJSXElement() &&
            p.node.openingElement.name.property &&
            p.node.openingElement.name.property.name === "Paragraph",
        );

        const richTextElement =
          paragraphElement &&
          paragraphElement.findParent(
            (p) =>
              p.isJSXElement() &&
              p.node.openingElement.name.property &&
              p.node.openingElement.name.property.name === "RichText",
          );

        if (paragraphElement && richTextElement) {
          // Replace the _Builtin.Paragraph with our new expression only if it's inside _Builtin.RichText
          paragraphElement.replaceWith(t.jsxExpressionContainer(replacement));
        } else {
          // If not within a _Builtin.Paragraph inside _Builtin.RichText, just replace the expression container
          innerPath.replaceWith(t.jsxExpressionContainer(replacement));
        }
      }
    },
    JSXAttribute(innerPath) {
      if (
        innerPath.node.name &&
        innerPath.node.name.name === "src" &&
        t.isStringLiteral(innerPath.node.value)
      ) {
        const parentElement = innerPath.findParent((p) =>
          p.isJSXOpeningElement(),
        );
        const fieldNameAttr = parentElement.node.attributes.find(
          (attr) => attr.name && attr.name.name === "fieldname", // lowercase to avoid react hydration errors
        );
        if (fieldNameAttr) {
          const fieldName =
            fieldNameAttr && t.isStringLiteral(fieldNameAttr.value)
              ? fieldNameAttr.value.value
              : "image";

          innerPath.node.value = t.jsxExpressionContainer(
            t.optionalMemberExpression(
              t.memberExpression(
                t.identifier(variablePrefix),
                t.stringLiteral(fieldName),
                true,
              ),
              t.identifier("url"),
              false,
              true,
            ),
          );
        }
      } else if (
        !isDynamicPage &&
        innerPath.node.name &&
        innerPath.node.name.name === "options" &&
        t.isJSXExpressionContainer(innerPath.node.value)
      ) {
        innerPath.node.value.expression.properties.forEach((prop) => {
          if (
            prop.key &&
            prop.key.name === "href" &&
            t.isStringLiteral(prop.value)
          ) {
            const parentElement = innerPath.findParent((p) =>
              p.isJSXOpeningElement(),
            );
            const customHrefAttr = parentElement.node.attributes.find(
              (attr) => attr.name && attr.name.name === "customhref",
            );

            if (customHrefAttr && t.isStringLiteral(customHrefAttr.value)) {
              // Use customhref if present, removing outermost quotes and backticks
              const customHrefValue = customHrefAttr.value.value.replace(
                /^["'`](.+)["'`]$/,
                "$1",
              );

              // Check if the customHrefValue contains a template literal
              if (customHrefValue.includes("${")) {
                // Create a template literal
                const quasis = customHrefValue
                  .split(/\$\{.*?\}/g)
                  .map((part, index, array) =>
                    t.templateElement(
                      { raw: part, cooked: part },
                      index === array.length - 1,
                    ),
                  );
                const expressions = customHrefValue
                  .match(/\$\{(.*?)\}/g)
                  .map((expr) => t.identifier(expr.slice(2, -1).trim()));
                prop.value = t.templateLiteral(quasis, expressions);
              } else {
                // Use a simple string literal if no template expressions
                prop.value = t.stringLiteral(customHrefValue);
              }
            } else {
              // Default to current behavior
              prop.value = t.templateLiteral(
                [
                  t.templateElement(
                    {
                      raw: `/${attrCollection}/`,
                      cooked: `/${attrCollection}/`,
                    },
                    false,
                  ),
                  t.templateElement({ raw: "", cooked: "" }, true),
                ],
                [
                  t.memberExpression(
                    t.identifier(variablePrefix),
                    t.stringLiteral("slug"),
                    true,
                  ),
                ],
              );
            }
          }
        });
      }
    },
  });
};

const processDynamicElement = (
  ast,
  elementId,
  mapFunctionName,
  variablePrefix,
  isSubitem = false,
  attrCollection,
  isDynamicPage = false,
) => {
  traverse.default(ast, {
    JSXElement(path) {
      if (
        path.node.openingElement.attributes &&
        path.node.openingElement.attributes.some(
          (attr) =>
            t.isJSXAttribute(attr) &&
            attr.name.name === "id" &&
            ((t.isStringLiteral(attr.value) &&
              attr.value.value === elementId) ||
              (t.isJSXExpressionContainer(attr.value) &&
                attr.value.expression.arguments &&
                attr.value.expression.arguments.some(
                  (arg) => t.isStringLiteral(arg) && arg.value === elementId,
                ))),
        )
      ) {
        let collectionName = null;

        if (isSubitem) {
          // Extract collection attribute from dynamic-subitem
          const collectionAttr = path.node.openingElement.attributes.find(
            (attr) =>
              t.isJSXAttribute(attr) &&
              attr.name.name === "collection" &&
              t.isStringLiteral(attr.value),
          );
          if (collectionAttr) {
            collectionName = collectionAttr.value.value;
          }
        }

        // Process field contents within the node
        processFieldContents(
          path,
          variablePrefix,
          attrCollection,
          isDynamicPage,
        );

        // Clone the node
        const clonedNode = t.cloneNode(path.node, true);

        // Replace the element with a map function
        const arrowFunction = t.arrowFunctionExpression(
          [t.identifier(variablePrefix), t.identifier("index")],
          t.jsxElement(
            t.jsxOpeningElement(t.jsxIdentifier("React.Fragment"), [
              t.jsxAttribute(
                t.jsxIdentifier("key"),
                t.jsxExpressionContainer(
                  t.logicalExpression(
                    "||",
                    t.memberExpression(
                      t.identifier(variablePrefix),
                      t.identifier("id"),
                    ),
                    t.identifier("index"),
                  ),
                ),
              ),
            ]),
            t.jsxClosingElement(t.jsxIdentifier("React.Fragment")),
            [clonedNode],
            false,
          ),
        );

        let mapCall;
        if (isSubitem && collectionName) {
          mapCall = t.callExpression(
            t.memberExpression(
              t.memberExpression(
                t.identifier(mapFunctionName),
                t.stringLiteral(collectionName),
                true,
              ),
              t.identifier("map"),
            ),
            [arrowFunction],
          );
        } else {
          mapCall = t.callExpression(
            t.memberExpression(
              t.identifier(mapFunctionName),
              t.identifier("map"),
            ),
            [arrowFunction],
          );
        }

        path.replaceWith(t.jsxExpressionContainer(mapCall));
        path.stop();
      }
    },
  });
};

const updateComponentClient = async (
  filePath,
  componentType,
  attrCollection,
) => {
  let content = await fs.readFile(filePath, "utf-8");

  // Split the content into lines
  const lines = content.split("\n");

  // Find the line that starts with "const _interactionsData = "
  const interactionsDataLineIndex = lines.findIndex((line) =>
    line.trim().startsWith("const _interactionsData = "),
  );

  if (interactionsDataLineIndex !== -1) {
    // Extract the current line and the next two lines
    const interactionsDataLines = lines.slice(
      interactionsDataLineIndex,
      interactionsDataLineIndex + 3,
    );
    const interactionsData = interactionsDataLines.join("\n");

    // Create a new file for interactions data
    const interactionsFilePath = path.join(
      path.dirname(filePath),
      "interactions.js",
    );
    const interactionsContent = `export ${interactionsData}`;

    await fs.writeFile(interactionsFilePath, interactionsContent);

    // Remove the _interactionsData declaration from the original content
    lines.splice(interactionsDataLineIndex, 3);

    // Add import statement for _interactionsData at the beginning of the file
    lines.splice(2, 0, `import { _interactionsData } from './interactions.js'`);

    // Join the lines back into content
    content = lines.join("\n");
  }

  // Extract the original component type
  const componentTypeMatch = content.match(
    /as:\s*_Component\s*=\s*_Builtin\.(\w+)/,
  );
  const originalComponentType = componentTypeMatch
    ? componentTypeMatch[1]
    : "Block";

  // Fix the styles import
  // content = content.replace(
  //   /import _styles from "\.\/.*\.module\.css";/,
  //   `import _styles from "./${path.basename(filePath, '.jsx')}.module.css";`,
  // )

  // Parse the content into an AST
  const ast = parser.parse(content, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  // Replace the component name and add the appropriate props
  traverse.default(ast, {
    FunctionDeclaration(path) {
      if (path.node.id && path.node.id.name) {
        path.node.id.name = "Client";
        const commonProps = [
          t.objectProperty(
            t.identifier("as"),
            t.assignmentPattern(
              t.identifier("_Component"),
              t.memberExpression(
                t.identifier("_Builtin"),
                t.identifier(originalComponentType),
              ),
            ),
            false,
            false,
          ),
          t.objectProperty(
            t.identifier("block"),
            t.identifier("block"),
            false,
            true,
          ),
          t.objectProperty(
            t.identifier("locale"),
            t.identifier("locale"),
            false,
            true,
          ),
        ];

        if (componentType === "dynamicSingle") {
          path.node.params = [
            t.objectPattern([
              ...commonProps,
              t.objectProperty(
                t.identifier("items"),
                t.identifier("items"),
                false,
                true,
              ),
            ]),
          ];
        } else if (componentType === "dynamicPage") {
          path.node.params = [
            t.objectPattern([
              ...commonProps,
              t.objectProperty(
                t.identifier("item"),
                t.identifier("item"),
                false,
                true,
              ),
            ]),
          ];
        } else {
          path.node.params = [t.objectPattern(commonProps)];
        }
      }
    },
  });

  if (componentType === "dynamicSingle") {
    // Process dynamic-subitem first
    processDynamicElement(
      ast,
      "dynamic-subitem",
      "item",
      "subitem",
      true,
      attrCollection,
    );
    // Then process dynamic-item and dynamic-item-2
    processDynamicElement(
      ast,
      "dynamic-item",
      "items.docs",
      "item",
      false,
      attrCollection,
    );
    processDynamicElement(
      ast,
      "dynamic-item-2",
      "items.docs",
      "item",
      false,
      attrCollection,
    );
  } else if (componentType === "dynamicPage") {
    // Process dynamic-subitem first
    processDynamicElement(
      ast,
      "dynamic-subitem",
      "item",
      "subitem",
      true,
      attrCollection,
      true,
    );
    // Then process dynamic-item and dynamic-item-2
    processDynamicElement(
      ast,
      "dynamic-item",
      "item",
      "item",
      true,
      attrCollection,
      true,
    );
    processDynamicElement(
      ast,
      "dynamic-item-2",
      "item",
      "item",
      true,
      attrCollection,
      true,
    );
    traverse.default(ast, {
      JSXElement(path) {
        processFieldContents(path, "item", attrCollection, true);
      },
    });
  }

  // Generate code from the modified AST
  const output = generate.default(
    ast,
    {
      /* options */
    },
    content,
  );

  // Add the formatDate function and processFieldContent imports
  let modifiedCode = output.code.replace(
    /import _styles from "\.\/.*\.module\.css";/,
    (match) =>
      `${match}\nimport { formatDate } from "@/utils/formatDate";\nimport { processFieldContent } from "@/utils/processFieldContent";\n\n`,
  );

  await fs.writeFile(filePath, modifiedCode);
  console.log(
    `Created and formatted client.jsx for: ${path.basename(path.dirname(filePath))}`,
  );
};

async function updateBuiltinTabsFile(targetDir) {
  const tabsFilePath = path.join(
    process.cwd(),
    "src",
    "devlink",
    "_Builtin",
    "Tabs.js",
  );

  try {
    let content = await fs.readFile(tabsFilePath, "utf-8");
    content = content.replace(
      /tabIndex=\{isCurrent \? 0 : -1\}/g,
      "// tabIndex={isCurrent ? 0 : -1}",
    );
    await fs.writeFile(tabsFilePath, content, "utf-8");

    console.log("Updated and formatted _Builtin/Tabs.js");
  } catch (error) {
    console.error("Error updating _Builtin/Tabs.js:", error);
  }
}

const ensureDevlinkFolder = async () => {
  const devlinkPath = path.join(process.cwd(), "src", "devlink");
  try {
    await fs.access(devlinkPath);
  } catch {
    console.log("Creating src/devlink folder...");
    await fs.mkdir(devlinkPath, { recursive: true });
  }
};

const copyAndOrganizeDevlinkFiles = async () => {
  await ensureDevlinkFolder();

  const sourceDir = path.join(process.cwd(), "data", "devlink");
  const targetDir = path.join(process.cwd(), "src", "blocks");

  try {
    console.log(`Source directory: ${sourceDir}`);
    console.log(`Target directory: ${targetDir}`);

    // Check if source directory exists
    try {
      await fs.access(sourceDir);
    } catch (error) {
      console.error(
        `Error: Source directory ${sourceDir} does not exist or is not accessible.`,
      );
      return;
    }

    // Create target directory if it doesn't exist
    await fs.mkdir(targetDir, { recursive: true });

    // Read source directory
    const sourceEntries = await fs.readdir(sourceDir, { withFileTypes: true });

    if (sourceEntries.length === 0) {
      console.log("No entries found in the source directory. Nothing to copy.");
      return;
    }

    // Group entries by basename (without extension), ignoring files starting with "Xx"
    const entryGroups = {};
    sourceEntries.forEach((entry) => {
      if (!entry.name.startsWith("Xx")) {
        const basename = entry.name.split(".")[0];
        if (!entryGroups[basename]) {
          entryGroups[basename] = [];
        }
        entryGroups[basename].push(entry);
      }
    });

    // Read target directory
    const targetEntries = await fs.readdir(targetDir, { withFileTypes: true });

    // Delete files and folders in target that don't match the source
    for (const entry of targetEntries) {
      if (!entry.name.startsWith("Xx")) {
        const entryPath = path.join(targetDir, entry.name);
        const sourcePath = path.join(sourceDir, entry.name);
        try {
          await fs.access(sourcePath);
        } catch {
          if (entry.isDirectory()) {
            await fs.rm(entryPath, { recursive: true, force: true });
          } else {
            await fs.unlink(entryPath);
          }
        }
      }
    }

    // Copy and organize entries
    for (const [basename, entries] of Object.entries(entryGroups)) {
      const jsFile = entries.find((e) => e.name === `${basename}.js`);
      const dtsFile = entries.find((e) => e.name === `${basename}.d.ts`);
      const moduleCssFile = entries.find(
        (e) => e.name === `${basename}.module.css`,
      );

      if (jsFile && dtsFile && moduleCssFile) {
        const folderPath = path.join(targetDir, basename);
        await fs.mkdir(folderPath, { recursive: true });

        const isDynamicSingle = basename.endsWith("Ds");
        const isDynamicPage = basename.endsWith("Dp");
        const isGlobal = basename.endsWith("G");

        // Extract collection attribute
        const sourcePath = path.join(sourceDir, `${basename}.js`);
        const sourceContent = await fs.readFile(sourcePath, "utf-8");
        const collectionMatch = sourceContent.match(/collection="([^"]+)"/);
        const attrCollection = collectionMatch
          ? collectionMatch[1]
          : "collection";

        // Copy all files for this component into the folder
        for (const entry of entries) {
          const sourcePath = path.join(sourceDir, entry.name);
          let targetPath = path.join(folderPath, entry.name);

          if (entry.name === `${basename}.js`) {
            targetPath = path.join(folderPath, "client.jsx");
            await createComponentIndex(
              sourceDir,
              folderPath,
              basename,
              attrCollection,
            );
          }

          if (entry.isDirectory()) {
            await copyDir(sourcePath, targetPath);
          } else {
            await copyFile(sourcePath, targetPath);
            // Update imports for JSX and TSX files
            if (entry.name.endsWith(".js") || entry.name.endsWith(".ts")) {
              await updateImports(targetPath);
            }
          }
        }

        // Update the component file
        if (isDynamicSingle) {
          await updateComponentClient(
            path.join(folderPath, "client.jsx"),
            "dynamicSingle",
            attrCollection,
          );
        } else if (isDynamicPage) {
          await updateComponentClient(
            path.join(folderPath, "client.jsx"),
            "dynamicPage",
            attrCollection,
          );
        } else if (isGlobal) {
          await updateComponentClient(
            path.join(folderPath, "client.jsx"),
            "global",
            attrCollection,
          );
        } else {
          await updateComponentClient(
            path.join(folderPath, "client.jsx"),
            "static",
            attrCollection,
          );
        }
      } else {
        // Copy files to the devlink directory
        for (const entry of entries) {
          const sourcePath = path.join(sourceDir, entry.name);
          const targetPath = path.join(
            process.cwd(),
            "src",
            "devlink",
            entry.name,
          );
          if (entry.isDirectory()) {
            await copyDir(sourcePath, targetPath);
          } else {
            await copyFile(sourcePath, targetPath);

            // fix devlink bug with missing selectors and ease--out
            if (entry.name === "utils.js") {
              let content = await fs.readFile(targetPath, "utf-8");
              content = content.replace(
                /selector\.replace\(new RegExp\(CSS_CLASS\)/g,
                "selector?.replace(new RegExp(CSS_CLASS)",
              );
              content = content.replace(/ease--out/g, "ease-out");
              await fs.writeFile(targetPath, content);
              console.log("Updated and formatted utils.js");
            }
          }
        }
      }
    }

    console.log("All entries copied and organized successfully.");

    // Uncomment lines in layout.tsx
    const layoutPath = path.join(
      process.cwd(),
      "src",
      "app",
      "(frontend)",
      "[locale]",
      "layout.tsx",
    );
    let layoutContent = await fs.readFile(layoutPath, "utf-8");

    // Find the section with imports to uncomment
    const importSectionRegex =
      /\/\/ imports to uncomment\n([\s\S]*?)\/\/ end imports to uncomment/;
    const importSectionMatch = layoutContent.match(importSectionRegex);

    if (importSectionMatch) {
      const importSection = importSectionMatch[1];
      const uncommentedImports = importSection.replace(/^\/\/ /gm, "");

      layoutContent = layoutContent.replace(
        importSectionRegex,
        `// imports to uncomment\n${uncommentedImports}// end imports to uncomment`,
      );
    }

    // Change the "return // no devlink yet" line from uncommented to commented
    const uncommentedReturn = `return; // no devlink yet`;
    const commentedReturn = `// return; // no devlink yet`;
    if (!layoutContent.includes(commentedReturn)) {
      layoutContent = layoutContent.replace(uncommentedReturn, commentedReturn);
    }

    await fs.writeFile(layoutPath, layoutContent);

    // Add this new function call
    await updateBuiltinTabsFile(targetDir);

    // Apply Prettier formatting
    console.log("Applying Prettier formatting...");
    await applyPrettierSitewide();
  } catch (error) {
    console.error("Error:", error);
  }
};

copyAndOrganizeDevlinkFiles();
