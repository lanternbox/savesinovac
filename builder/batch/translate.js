import { runScripts } from "../utils/runScripts.js";

const scripts = [
  "builder/translate/translateItems",
  "builder/translate/translatePages",
  "builder/translate/translateGlobals",
];

runScripts(scripts);
