import { CollectionAfterChangeHook } from "payload";

const afterChangePostToWebhook: CollectionAfterChangeHook = async () => {
  const webhookUrl = process.env.VERCEL_DEPLOY_HOOK;

  if (!webhookUrl) {
    return;
  }

  try {
    const response = await fetch(webhookUrl, { method: "POST" });
    // console.log('Webhook response:', response);
  } catch (error) {
    console.error("Error calling webhook:", error);
  }
};

export default afterChangePostToWebhook;
