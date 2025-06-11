import { runScripts } from "../utils/runScripts.js";

const scripts = [
  "builder/local/createBlocks",
  "builder/local/extractBlockContent",
  "builder/local/createBlockConfigs",
  "builder/local/overwrites",
];

runScripts(scripts);
