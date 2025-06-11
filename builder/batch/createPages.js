import { runScripts } from "../utils/runScripts.js";

const scripts = [
  "builder/local/createDynamicRoutes",
  "builder/payload/postPages",
  "builder/payload/postGlobals",
  "builder/payload/updatePageRelationships",
  "builder/local/blocksFromPayload",
];

runScripts(scripts);
