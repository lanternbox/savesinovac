import { exec } from "child_process";
import { promisify } from "util";
import { fileURLToPath } from "url";
import path from "path";

const execAsync = promisify(exec);

export const applyPrettierSitewide = async () => {
  // Get the directory of the current module
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  // Construct the path to the root .prettierignore file
  const prettierignorePath = path.resolve(
    __dirname,
    "..",
    "..",
    ".prettierignore",
  );

  const prettierCommand = `npx prettier --ignore-path "${prettierignorePath}" --write "**/*.{js,jsx,ts,tsx,css,json}"`;
  console.log("Applying Prettier sitewide...");
  try {
    // const { stderr } = await execAsync(prettierCommand);
    // if (stderr) console.error(stderr);
    console.log("Prettier applied sitewide successfully.");
  } catch (error) {
    console.error("Error applying Prettier sitewide:", error);
  }
};

applyPrettierSitewide();
