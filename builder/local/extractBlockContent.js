import { promises as fs } from "fs";
import path from "path";
import prettier from "prettier";
import parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import * as t from "@babel/types";
import { applyPrettierSitewide } from "./prettier.js";

// Helper function to get the full name of a JSX element
const getJSXElementName = (node) => {
  if (t.isJSXIdentifier(node)) {
    return node.name;
  } else if (t.isJSXMemberExpression(node)) {
    return (
      getJSXElementName(node.object) + "." + getJSXElementName(node.property)
    );
  }
  return "";
};

// Helper function to extract text from children nodes
const extractTextFromChildren = (children) => {
  let textContent = "";

  children.forEach((child) => {
    if (t.isJSXText(child)) {
      const text = child.value.replace(/\s+/g, " ").trim();
      textContent += text;
    } else if (t.isJSXExpressionContainer(child)) {
      if (t.isStringLiteral(child.expression)) {
        const text = child.expression.value.replace(/\s+/g, " ").trim();
        textContent += text;
      }
    } else if (t.isJSXElement(child)) {
      // If there are nested elements, process them recursively
      textContent += processRichTextChildren([child]);
    }
  });

  return textContent.trim();
};

// Helper function to process RichText children and convert to HTML
const processRichTextChildren = (children) => {
  let htmlContent = "";

  children.forEach((child) => {
    if (t.isJSXElement(child)) {
      const tagName = getJSXElementName(child.openingElement.name);

      // Process _Builtin.Heading
      if (tagName === "_Builtin.Heading") {
        const tagAttr = child.openingElement.attributes.find(
          (attr) =>
            t.isJSXAttribute(attr) &&
            attr.name.name === "tag" &&
            t.isStringLiteral(attr.value),
        );
        const tagValue = tagAttr ? tagAttr.value.value : "h2"; // Default to h2 if not specified

        const textContent = extractTextFromChildren(child.children);
        htmlContent += `<${tagValue}>${textContent}</${tagValue}>`;
      }
      // Process _Builtin.Paragraph
      else if (tagName === "_Builtin.Paragraph") {
        const textContent = extractTextFromChildren(child.children);
        htmlContent += `<p>${textContent}</p>`;
      }
      // Process _Builtin.Link
      else if (tagName === "_Builtin.Link") {
        const optionsAttr = child.openingElement.attributes.find(
          (attr) =>
            t.isJSXAttribute(attr) &&
            attr.name.name === "options" &&
            t.isJSXExpressionContainer(attr.value),
        );

        let hrefValue = "";
        if (optionsAttr) {
          const optionsObj = optionsAttr.value.expression;
          if (t.isObjectExpression(optionsObj)) {
            const hrefProp = optionsObj.properties.find(
              (prop) =>
                t.isObjectProperty(prop) &&
                prop.key.name === "href" &&
                t.isStringLiteral(prop.value),
            );
            if (hrefProp) {
              hrefValue = hrefProp.value.value;
            }
          }
        }
        const textContent = extractTextFromChildren(child.children);
        htmlContent += `<a href="${hrefValue}">${textContent}</a>`;
      }
      // Process _Builtin.List
      else if (tagName === "_Builtin.List") {
        const tagAttr = child.openingElement.attributes.find(
          (attr) =>
            t.isJSXAttribute(attr) &&
            attr.name.name === "tag" &&
            t.isStringLiteral(attr.value),
        );
        const tagValue = tagAttr ? tagAttr.value.value : "ul"; // Default to ul if not specified

        const textContent = extractTextFromChildren(child.children);
        htmlContent += `<${tagValue}>${textContent}</${tagValue}>`;
      }
      // Process _Builtin.ListItem
      else if (tagName === "_Builtin.ListItem") {
        const textContent = extractTextFromChildren(child.children);
        htmlContent += `<li>${textContent}</li>`;
      }

      // Process other elements as needed
      else {
        // Process child elements recursively
        htmlContent += processRichTextChildren(child.children);
      }
    } else if (t.isJSXText(child)) {
      const text = child.value.replace(/\s+/g, " ").trim();
      if (text) {
        htmlContent += text;
      }
    } else if (t.isJSXExpressionContainer(child)) {
      if (t.isStringLiteral(child.expression)) {
        const text = child.expression.value.replace(/\s+/g, " ").trim();
        if (text) {
          htmlContent += text;
        }
      }
    }
  });

  // Remove spaces between HTML tags
  return htmlContent.replace(/>\s+</g, "><").trim();
};

// Function to extract content from fileContent using AST traversal
const extractContentObj = (fileContent) => {
  const content = {};
  let counter = {
    heading: 0,
    subheading: 0,
    paragraph: 0,
    image: 0,
    link: 0,
    navbarLink: 0,
    body: 0,
  };

  const ast = parser.parse(fileContent, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  traverse.default(ast, {
    JSXElement(path) {
      const node = path.node;
      const openingElement = node.openingElement;
      const tagName = getJSXElementName(openingElement.name);

      // Extract RichText content
      if (tagName === "_Builtin.RichText") {
        counter.body++;
        const key = counter.body === 1 ? "body" : `body-${counter.body}`;

        const htmlContent = processRichTextChildren(node.children);
        content[key] = htmlContent;

        // Skip processing children of RichText
        path.skip();
      }

      // Extract headings and subheadings
      else if (tagName === "_Builtin.Heading") {
        const tagAttr = openingElement.attributes.find(
          (attr) =>
            t.isJSXAttribute(attr) &&
            attr.name.name === "tag" &&
            t.isStringLiteral(attr.value),
        );
        const tagValue = tagAttr ? tagAttr.value.value : null;

        const textNode = node.children.find(
          (child) =>
            t.isJSXExpressionContainer(child) &&
            t.isStringLiteral(child.expression),
        );
        const text = textNode ? textNode.expression.value : "";

        if (tagValue === "h4") {
          counter.subheading++;
          const key =
            counter.subheading === 1
              ? "subheading"
              : `subheading-${counter.subheading}`;
          content[key] = text;
        } else {
          counter.heading++;
          const key =
            counter.heading === 1 ? "heading" : `heading-${counter.heading}`;
          content[key] = text;
        }
      }

      // Extract paragraphs
      else if (tagName === "_Builtin.Paragraph") {
        counter.paragraph++;
        const key =
          counter.paragraph === 1
            ? "paragraph"
            : `paragraph-${counter.paragraph}`;

        let paragraphContent = extractTextFromChildren(node.children);

        paragraphContent = paragraphContent
          .replace(/<br \/>/g, "\n")
          .replace(/\\n/g, "\n")
          .split("\n")
          // .map((line) => line)
          .filter((line) => line !== "")
          .join("\n");

        content[key] = paragraphContent;
      }

      // Extract image sources
      else if (tagName === "_Builtin.Image") {
        counter.image++;
        const key = counter.image === 1 ? "image" : `image-${counter.image}`;

        const srcAttr = openingElement.attributes.find(
          (attr) => t.isJSXAttribute(attr) && attr.name.name === "src",
        );

        let srcValue = "";
        if (srcAttr) {
          if (t.isStringLiteral(srcAttr.value)) {
            srcValue = srcAttr.value.value;
          } else if (
            t.isJSXExpressionContainer(srcAttr.value) &&
            t.isStringLiteral(srcAttr.value.expression)
          ) {
            srcValue = srcAttr.value.expression.value;
          }
        }

        content[key] = srcValue;
      }

      // Extract link content
      else if (tagName === "_Builtin.Link") {
        counter.link++;
        const key = counter.link === 1 ? "link" : `link-${counter.link}`;

        const optionsAttr = openingElement.attributes.find(
          (attr) =>
            t.isJSXAttribute(attr) &&
            attr.name.name === "options" &&
            t.isJSXExpressionContainer(attr.value),
        );

        let hrefValue = "";
        if (optionsAttr) {
          const optionsObj = optionsAttr.value.expression;
          if (t.isObjectExpression(optionsObj)) {
            const hrefProp = optionsObj.properties.find(
              (prop) =>
                t.isObjectProperty(prop) &&
                t.isIdentifier(prop.key) &&
                prop.key.name === "href" &&
                t.isStringLiteral(prop.value),
            );
            if (hrefProp) {
              hrefValue = hrefProp.value.value;
            }
          }
        }

        // Extract inner text
        let innerText = extractTextFromChildren(node.children);

        content[key] = {
          href: hrefValue,
          text: innerText,
        };
      }

      // Extract navbar link content
      else if (tagName === "_Builtin.NavbarLink") {
        counter.navbarLink++;
        const key =
          counter.navbarLink === 1
            ? "navbarLink"
            : `navbarLink-${counter.navbarLink}`;

        const optionsAttr = openingElement.attributes.find(
          (attr) =>
            t.isJSXAttribute(attr) &&
            attr.name.name === "options" &&
            t.isJSXExpressionContainer(attr.value),
        );

        let hrefValue = "";
        if (optionsAttr) {
          const optionsObj = optionsAttr.value.expression;
          if (t.isObjectExpression(optionsObj)) {
            const hrefProp = optionsObj.properties.find(
              (prop) =>
                t.isObjectProperty(prop) &&
                t.isIdentifier(prop.key) &&
                prop.key.name === "href" &&
                t.isStringLiteral(prop.value),
            );
            if (hrefProp) {
              hrefValue = hrefProp.value.value;
            }
          }
        }

        // Extract inner text
        let innerText = extractTextFromChildren(node.children);

        content[key] = {
          href: hrefValue,
          text: innerText,
        };
      }
    },
  });

  return content;
};

// Function to replace content in fileContent using AST traversal
const replaceContent = (fileContent, contentObj, isDs, item) => {
  const ast = parser.parse(fileContent, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  let dynamicItemContent = "";

  if (isDs) {
    // For Ds components, find and remove content inside <React.Fragment>
    traverse.default(ast, {
      JSXElement(path) {
        const openingElement = path.node.openingElement;
        const tagName = getJSXElementName(openingElement.name);

        if (tagName === "React.Fragment") {
          const fragmentNode = t.jsxFragment(
            t.jsxOpeningFragment(),
            t.jsxClosingFragment(),
            path.node.children,
          );
          dynamicItemContent = generate.default(fragmentNode).code;
          // Remove the children
          path.node.children = [t.jsxText("PLACEHOLDER")];
          path.stop();
        }
      },
    });
  }

  // Counters for elements
  let headingCounter = 0;
  let subheadingCounter = 0;
  let paragraphCounter = 0;
  let imageCounter = 0;
  let bodyCounter = 0;
  let linkCounter = 0;
  let navbarLinkCounter = 0;

  traverse.default(ast, {
    JSXElement(path) {
      const node = path.node;
      const openingElement = node.openingElement;
      const tagName = getJSXElementName(openingElement.name);

      // Replace headings and subheadings
      if (tagName === "_Builtin.Heading") {
        const tagAttr = openingElement.attributes.find(
          (attr) =>
            t.isJSXAttribute(attr) &&
            attr.name.name === "tag" &&
            t.isStringLiteral(attr.value),
        );
        const tagValue = tagAttr ? tagAttr.value.value : null;

        if (tagValue === "h4") {
          subheadingCounter++;
          const key =
            subheadingCounter === 1
              ? "subheading"
              : `subheading-${subheadingCounter}`;
          path.node.children = [
            t.jsxExpressionContainer(
              t.optionalMemberExpression(
                t.identifier("content"),
                t.stringLiteral(key),
                true,
                true,
              ),
            ),
          ];
        } else {
          headingCounter++;
          const key =
            headingCounter === 1 ? "heading" : `heading-${headingCounter}`;
          path.node.children = [
            t.jsxExpressionContainer(
              t.optionalMemberExpression(
                t.identifier("content"),
                t.stringLiteral(key),
                true,
                true,
              ),
            ),
          ];
        }
      }

      // Replace paragraphs
      else if (tagName === "_Builtin.Paragraph") {
        paragraphCounter++;
        const key =
          paragraphCounter === 1
            ? "paragraph"
            : `paragraph-${paragraphCounter}`;
        if (contentObj[key]) {
          path.node.children = [
            t.jsxExpressionContainer(
              t.optionalMemberExpression(
                t.identifier("content"),
                t.stringLiteral(key),
                true,
                true,
              ),
            ),
          ];
        }
      }

      // Replace image sources
      else if (tagName === "_Builtin.Image") {
        imageCounter++;
        const key = imageCounter === 1 ? "image" : `image-${imageCounter}`;

        // Add new image attribute instead of modifying src
        openingElement.attributes.push(
          t.jsxAttribute(
            t.jsxIdentifier("image"),
            t.jsxExpressionContainer(
              t.optionalMemberExpression(
                t.identifier("content"),
                t.stringLiteral(key),
                true,
                true,
              ),
            ),
          ),
        );
      }

      // Replace RichText content
      else if (tagName === "_Builtin.RichText") {
        bodyCounter++;
        const key = bodyCounter === 1 ? "body" : `body-${bodyCounter}`;

        path.node.children = [
          t.jsxExpressionContainer(
            t.callExpression(t.identifier("processFieldContent"), [
              t.stringLiteral("body"),
              t.identifier("content"),
              t.identifier("locale"),
            ]),
          ),
        ];
      }

      // Replace link content
      else if (tagName === "_Builtin.Link") {
        linkCounter++;
        const key = linkCounter === 1 ? "link" : `link-${linkCounter}`;

        // Replace href in options
        const optionsAttr = openingElement.attributes.find(
          (attr) => t.isJSXAttribute(attr) && attr.name.name === "options",
        );

        if (optionsAttr && t.isJSXExpressionContainer(optionsAttr.value)) {
          const optionsObj = optionsAttr.value.expression;

          if (t.isObjectExpression(optionsObj)) {
            const hrefPropIndex = optionsObj.properties.findIndex(
              (prop) =>
                t.isObjectProperty(prop) &&
                t.isIdentifier(prop.key) &&
                prop.key.name === "href",
            );

            if (hrefPropIndex !== -1) {
              optionsObj.properties[hrefPropIndex] = t.objectProperty(
                t.identifier("href"),
                t.optionalMemberExpression(
                  t.optionalMemberExpression(
                    t.identifier("content"),
                    t.stringLiteral(key),
                    true,
                    true,
                  ),
                  t.identifier("href"),
                  false,
                  true,
                ),
              );
            }
          }
        }

        // Replace inner text
        path.node.children = [
          t.jsxExpressionContainer(
            t.optionalMemberExpression(
              t.optionalMemberExpression(
                t.identifier("content"),
                t.stringLiteral(key),
                true,
                true,
              ),
              t.identifier("text"),
              false,
              true,
            ),
          ),
        ];
      }

      // Replace navbar link content
      else if (tagName === "_Builtin.NavbarLink") {
        navbarLinkCounter++;
        const key =
          navbarLinkCounter === 1
            ? "navbarLink"
            : `navbarLink-${navbarLinkCounter}`;

        // Replace href in options
        const optionsAttr = openingElement.attributes.find(
          (attr) => t.isJSXAttribute(attr) && attr.name.name === "options",
        );

        if (optionsAttr && t.isJSXExpressionContainer(optionsAttr.value)) {
          const optionsObj = optionsAttr.value.expression;

          if (t.isObjectExpression(optionsObj)) {
            const hrefPropIndex = optionsObj.properties.findIndex(
              (prop) =>
                t.isObjectProperty(prop) &&
                t.isIdentifier(prop.key) &&
                prop.key.name === "href",
            );

            if (hrefPropIndex !== -1) {
              optionsObj.properties[hrefPropIndex] = t.objectProperty(
                t.identifier("href"),
                t.optionalMemberExpression(
                  t.optionalMemberExpression(
                    t.identifier("content"),
                    t.stringLiteral(key),
                    true,
                    true,
                  ),
                  t.identifier("href"),
                  false,
                  true,
                ),
              );
            }
          }
        }

        // Replace inner text
        path.node.children = [
          t.jsxExpressionContainer(
            t.optionalMemberExpression(
              t.optionalMemberExpression(
                t.identifier("content"),
                t.stringLiteral(key),
                true,
                true,
              ),
              t.identifier("text"),
              false,
              true,
            ),
          ),
        ];
      }
    },
  });

  if (isDs) {
    // Put back the dynamic item content
    traverse.default(ast, {
      JSXElement(path) {
        const openingElement = path.node.openingElement;
        const tagName = getJSXElementName(openingElement.name);

        if (tagName === "React.Fragment") {
          if (
            path.node.children.length === 1 &&
            t.isJSXText(path.node.children[0]) &&
            path.node.children[0].value === "PLACEHOLDER"
          ) {
            const fragmentAst = parser.parseExpression(
              `<React.Fragment>${dynamicItemContent}</React.Fragment>`,
              { plugins: ["jsx"] },
            );

            if (
              t.isJSXElement(fragmentAst) &&
              fragmentAst.children.length > 0
            ) {
              path.node.children = fragmentAst.children;
            }
          }
        }
      },
    });
  }

  // Generate the code from the modified AST
  const output = generate.default(ast, {}, fileContent);

  return output.code;
};

// Function to insert content object into the fileContent
const insertContentObject = (fileContent, contentObj) => {
  const ast = parser.parse(fileContent, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  let contentVariableFound = false;
  let clientFunctionPath = null;

  // Traverse the AST to find the 'content' variable and the 'Client' function
  traverse.default(ast, {
    // Update 'content' variable if it already exists
    VariableDeclaration(path) {
      const declaration = path.node.declarations.find(
        (declarator) =>
          t.isIdentifier(declarator.id) && declarator.id.name === "content",
      );
      if (declaration) {
        contentVariableFound = true;
        // Replace the initializer with the new content object
        declaration.init = t.valueToNode(contentObj);
      }
    },
    // Find the 'Client' component function
    FunctionDeclaration(path) {
      if (path.node.id && path.node.id.name === "Client") {
        clientFunctionPath = path;
      }
    },
    // Handle variable declarations for arrow functions or function expressions
    VariableDeclarator(path) {
      if (
        t.isIdentifier(path.node.id) &&
        path.node.id.name === "Client" &&
        (t.isArrowFunctionExpression(path.node.init) ||
          t.isFunctionExpression(path.node.init))
      ) {
        clientFunctionPath = path;
      }
    },
    // Handle exported named declarations
    ExportNamedDeclaration(path) {
      const declaration = path.node.declaration;
      if (
        t.isFunctionDeclaration(declaration) &&
        declaration.id.name === "Client"
      ) {
        clientFunctionPath = path.get("declaration");
      } else if (t.isVariableDeclaration(declaration)) {
        const declarator = declaration.declarations.find(
          (decl) =>
            t.isIdentifier(decl.id) &&
            decl.id.name === "Client" &&
            (t.isArrowFunctionExpression(decl.init) ||
              t.isFunctionExpression(decl.init)),
        );
        if (declarator) {
          clientFunctionPath = path
            .get("declaration.declarations")
            .find((d) => d.node === declarator);
        }
      }
    },
  });

  if (!contentVariableFound && clientFunctionPath) {
    let body;
    if (clientFunctionPath.isFunctionDeclaration()) {
      body = clientFunctionPath.get("body");
    } else if (clientFunctionPath.isVariableDeclarator()) {
      const init = clientFunctionPath.get("init");
      if (init.isArrowFunctionExpression() || init.isFunctionExpression()) {
        body = init.get("body");
      }
    }

    if (body && body.isBlockStatement()) {
      // Insert the content variable declaration at the beginning of the function body
      const contentVariableDeclaration = t.variableDeclaration("const", [
        t.variableDeclarator(
          t.identifier("content"),
          t.valueToNode(contentObj),
        ),
      ]);
      body.node.body.unshift(contentVariableDeclaration);
    } else {
      console.error("Could not find function body to insert content variable");
    }
  } else if (!contentVariableFound) {
    // Fallback: Insert before the first ReturnStatement
    traverse.default(ast, {
      ReturnStatement(path) {
        const contentVariableDeclaration = t.variableDeclaration("const", [
          t.variableDeclarator(
            t.identifier("content"),
            t.valueToNode(contentObj),
          ),
        ]);
        path.insertBefore(contentVariableDeclaration);
        path.stop();
      },
    });
  }

  // Generate the code from the modified AST
  const output = generate.default(ast, {}, fileContent);

  return output.code;
};

// Main function to transform components
const transformComponents = async () => {
  const componentsDir = path.join(process.cwd(), "src", "blocks");

  try {
    const items = await fs.readdir(componentsDir, { withFileTypes: true });

    for (const item of items) {
      if (item.isDirectory()) {
        // Skip items where name starts with _Builtin
        if (item.name.startsWith("_Builtin")) {
          continue;
        }

        const filePath = path.join(componentsDir, item.name, "client.jsx");
        const isDp = item.name.endsWith("Dp");
        const isDs = item.name.endsWith("Ds");

        try {
          let fileContent = await fs.readFile(filePath, "utf-8");
          let contentObj = {};

          if (isDp) {
            // For Dp components, skip processing
            continue;
          } else if (isDs) {
            // For Ds components, find and remove content inside the dynamic item block
            const ast = parser.parse(fileContent, {
              sourceType: "module",
              plugins: ["jsx"],
            });

            let dynamicItemContent = "";
            traverse.default(ast, {
              JSXElement(path) {
                const openingElement = path.node.openingElement;
                const tagName = getJSXElementName(openingElement.name);

                if (tagName === "React.Fragment") {
                  const fragmentNode = t.jsxFragment(
                    t.jsxOpeningFragment(),
                    t.jsxClosingFragment(),
                    path.node.children,
                  );
                  dynamicItemContent = generate.default(fragmentNode).code;
                  // Remove the children
                  path.node.children = [t.jsxText("PLACEHOLDER")];
                  path.stop();
                }
              },
            });

            // Generate code from the modified AST
            const outsideItemContent = generate.default(
              ast,
              {},
              fileContent,
            ).code;

            // Extract content from the outside of the dynamic item block
            contentObj = extractContentObj(outsideItemContent);

            // Replace content in the fileContent
            const replacedContent = replaceContent(
              fileContent,
              contentObj,
              isDs,
              item,
            );

            // Insert content object
            const finalContent = insertContentObject(
              replacedContent,
              contentObj,
            );

            // Format the code with Prettier
            const formattedContent = await prettier.format(finalContent, {
              parser: "babel",
            });

            await fs.writeFile(filePath, formattedContent, "utf-8");
            console.log(`Updated ${filePath}`);
          } else {
            // For other components, process all content
            contentObj = extractContentObj(fileContent);
            const replacedContent = replaceContent(
              fileContent,
              contentObj,
              false,
            );
            const finalContent = insertContentObject(
              replacedContent,
              contentObj,
            );

            // Format the code with Prettier
            const formattedContent = await prettier.format(finalContent, {
              parser: "babel",
            });

            await fs.writeFile(filePath, formattedContent, "utf-8");
            console.log(`Updated ${filePath}`);
          }
        } catch (err) {
          console.error(`Error processing ${filePath}:`, err);
        }
      }
    }

    // Apply Prettier sitewide after processing all components
    await applyPrettierSitewide();
    console.log("Prettier applied sitewide after component transformations.");
  } catch (err) {
    console.error("Error reading components directory:", err);
  }
};

// Run the function immediately
transformComponents().catch((err) =>
  console.error("Error in transformComponents:", err),
);
