import dotenv from "dotenv";
import { S3 } from "@aws-sdk/client-s3";

console.log("Starting resetBucket script...");

dotenv.config();

const resetCloudflareR2 = async () => {
  if (
    !process.env.S3_ACCESS_KEY_ID ||
    !process.env.S3_SECRET_ACCESS_KEY ||
    !process.env.S3_ENDPOINT
  ) {
    console.log("Cloudflare R2 credentials not set, skipping reset...");
    return;
  }
  console.log("Emptying Cloudflare R2 bucket...");

  try {
    const s3Client = new S3({
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
      region: "auto",
      forcePathStyle: true,
    });

    const bucket = process.env.S3_BUCKET;

    // List all objects
    const listResult = await s3Client.listObjectsV2({
      Bucket: bucket,
    });

    const Contents = listResult.Contents || [];
    console.log(`Found ${Contents.length} objects`);

    if (Contents.length === 0) {
      console.log("Bucket is already empty.");
      return;
    }

    // Delete objects in batches of 1000 (S3 API limit)
    const objects = Contents.map((object) => ({ Key: object.Key }));
    console.log("Attempting to delete objects:", objects);

    const deleteResult = await s3Client.deleteObjects({
      Bucket: bucket,
      Delete: { Objects: objects },
    });
    console.log("Delete result:", deleteResult);

    console.log(`Deleted ${Contents.length} objects from bucket ${bucket}`);
    console.log("Cloudflare R2 bucket emptied successfully.");
  } catch (error) {
    console.error("Error emptying Cloudflare R2 bucket:", error);
    throw error;
  }
};

// Only run the exit logic if this is the main file being executed
if (import.meta.url === new URL(process.argv[1], "file:").href) {
  resetCloudflareR2()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export default resetCloudflareR2;
