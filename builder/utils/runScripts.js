import { exec } from "child_process";
import path from "path";

export async function runScripts(scripts) {
  try {
    for (const script of scripts) {
      console.log(`Running ${script}...`);
      try {
        await new Promise((resolve, reject) => {
          const childProcess = exec(
            `node ${path.join(process.cwd(), script)}`,
            (error, stdout, stderr) => {
              if (error) {
                console.error(`Error executing ${script}:`, error);
                reject(error);
              } else {
                if (stderr) console.error(stderr);
                resolve();
              }
            },
          );

          childProcess.stdout.on("data", (data) => {
            process.stdout.write(data);
          });
        });
        console.log(`Finished running ${script}`);
      } catch (error) {
        console.error(`Failed to run ${script}:`, error);
      }
    }
    console.log("All scripts have been executed.");
  } catch (error) {
    console.error("An error occurred while running the scripts:", error);
  }
}
