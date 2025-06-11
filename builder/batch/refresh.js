import { runScripts } from "../utils/runScripts.js";

const args = process.argv.slice(2);

let scripts;

if (args.includes("-d")) {
  scripts = ["builder/batch/reset -d", "builder/batch/all -d"];
} else if (args.includes("-c")) {
  scripts = [
    "builder/batch/reset",
    "builder/webflow/getComponents",
    "builder/batch/all",
  ];
} else {
  scripts = ["builder/batch/reset", "builder/batch/all"];
}

runScripts(scripts);
