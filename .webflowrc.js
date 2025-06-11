import dotenv from "dotenv";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

export default {
  host: "https://api.webflow.com",
  rootDir: "./data/devlink",
  siteId: process.env.WEBFLOW_SITE_ID,
  authToken: process.env.WEBFLOW_API_TOKEN,
  cssModules: true,
};
