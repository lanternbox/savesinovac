import { exec } from "child_process";
import fs from "fs";
import path from "path";

function ensureTargetDirectoryExists() {
  const targetDirectory = path.join(process.cwd(), "data", "devlink");
  if (!fs.existsSync(targetDirectory)) {
    fs.mkdirSync(targetDirectory, { recursive: true });
    console.log("Created data/devlink folder");
  }
}

function syncWebflowComponents() {
  ensureTargetDirectoryExists();

  exec("npx webflow devlink sync", (error, stdout, stderr) => {
    console.log("Connecting to Webflow...");
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    console.log("Webflow components synced successfully");
  });
}

// Run the function
syncWebflowComponents();
