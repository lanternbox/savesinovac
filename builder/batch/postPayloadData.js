import { runScripts } from "../utils/runScripts.js";

const scripts = [
  "builder/local/createCollectionConfigs",
  "builder/payload/postItems",
  "builder/payload/postAssets",
  "builder/payload/updateItemRelationships",
];

runScripts(scripts);
