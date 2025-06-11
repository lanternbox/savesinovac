import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const token = process.env.WEBFLOW_API_TOKEN;

const url = "https://api.webflow.com/v2/sites";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    authorization: `Bearer ${token}`,
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("error:" + err));
