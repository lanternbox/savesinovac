import { runScripts } from "../utils/runScripts.js";

const scripts = [
  "builder/batch/getWebflowData",
  "builder/batch/postPayloadData",
];

runScripts(scripts);
