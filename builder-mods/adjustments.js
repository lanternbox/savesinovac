// import fs from "fs/promises";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// async function updateContactAllClient() {
//   const filePath = path.join(
//     __dirname,
//     "..",
//     "src",
//     "blocks",
//     "ReserHeader",
//     "client.jsx",
//   );

//   try {
//     let data = await fs.readFile(filePath, "utf8");

//     const updatedContent = data
//       // Update the Google Maps API key
//       .replace(
//         /process\.env\.DEVLINK_ENV_GOOGLE_MAPS_API_KEY/,
//         "process.env.NEXT_PUBLIC_DEVLINK_ENV_GOOGLE_MAPS_API_KEY",
//       )
//       // Update the submit button
//       .replace(
//         /value="Submit"/,
//         'value={processFieldContent("submit", content, locale)}',
//       );

//     await fs.writeFile(filePath, updatedContent, "utf8");
//     console.log("ContactAll/client.jsx updated successfully");
//   } catch (err) {
//     console.error("Error updating ContactAll/client.jsx:", err);
//   }
// }

// async function updateTabsJs() {
//   const filePath = path.join(
//     __dirname,
//     "..",
//     "src",
//     "devlink",
//     "_Builtin",
//     "Tabs.js",
//   );

//   try {
//     let data = await fs.readFile(filePath, "utf8");

//     const updatedContent = data.replace(
//       /nextTabHeader\?\.focus\(\);/,
//       "// nextTabHeader?.focus();",
//     );

//     await fs.writeFile(filePath, updatedContent, "utf8");
//     console.log("Tabs.js updated successfully");
//   } catch (err) {
//     console.error("Error updating Tabs.js:", err);
//   }
// }

// // Call the adjustment functions
// updateContactAllClient();
// updateTabsJs();
