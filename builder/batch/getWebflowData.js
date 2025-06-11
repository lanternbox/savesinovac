import { runScripts } from "../utils/runScripts.js";

const scripts = [
  "builder/webflow/getComponents",
  "builder/webflow/getCollections",
  "builder/webflow/getItems",
  "builder/webflow/getAssets",
  "builder/webflow/getCollectionAssets",
  "builder/webflow/getPages",
];

runScripts(scripts);
