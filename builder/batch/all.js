import { runScripts } from "../utils/runScripts.js";
import next from "next";
import { createServer } from "http";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

// Parse command-line arguments using Yargs
const argv = yargs(hideBin(process.argv))
  .option("withData", {
    alias: "d",
    type: "boolean",
    description: "Include getWebflowData script",
    default: false,
  })
  .help()
  .alias("help", "h").argv;

const scripts = [];

// Check if 'withData' flag is provided
if (argv.withData) {
  scripts.push("builder/batch/getWebflowData");
}

scripts.push(
  "builder/batch/postPayloadData",
  "builder/batch/createBlocks",
  "builder/batch/createPages",
  "builder-mods/adjustments",
);

async function main() {
  try {
    // Initialize Next.js
    const dev = process.env.NODE_ENV !== "production";
    const app = next({ dev });
    const handle = app.getRequestHandler();

    // Prepare Next.js
    await app.prepare();

    // Create HTTP server
    const server = createServer((req, res) => {
      handle(req, res);
    });

    // Start the server
    await new Promise((resolve, reject) => {
      server.listen(3000, (err) => {
        if (err) reject(err);
        console.log("> Ready on http://localhost:3000");
        resolve();
      });
    });

    // Run the batch scripts
    console.log("Running batch scripts...");
    await runScripts(scripts);
    console.log("Batch scripts completed.");
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

main();
