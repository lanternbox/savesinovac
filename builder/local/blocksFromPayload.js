import fs from "fs/promises";
import path from "path";

async function replaceContentInClientFiles() {
  const blocksPath = path.join(process.cwd(), "src", "blocks");

  try {
    const folders = await fs.readdir(blocksPath);

    for (const folder of folders) {
      const folderPath = path.join(blocksPath, folder);
      const clientFilePath = path.join(folderPath, "client.jsx");

      try {
        const stat = await fs.stat(folderPath);
        if (!stat.isDirectory()) continue;

        const clientFileExists = await fs
          .access(clientFilePath)
          .then(() => true)
          .catch(() => false);

        if (clientFileExists) {
          let content = await fs.readFile(clientFilePath, "utf-8");

          // Replace content for all components, including NavbarG
          content = content.replace(
            /content\s*=\s*{[\s\S]*?};/g,
            "content = block;",
          );
          await fs.writeFile(clientFilePath, content, "utf-8");
          console.log(`Updated ${clientFilePath}`);
        }
      } catch (error) {
        console.error(`Error processing ${folderPath}:`, error);
      }
    }
  } catch (error) {
    console.error("Error reading blocks directory:", error);
  }
}

replaceContentInClientFiles();
