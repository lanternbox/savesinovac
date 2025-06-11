import { exec } from "child_process";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import util from "util";
import fs from "fs";

const execPromise = util.promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load both environments
const productionEnv = dotenv.config({
  path: path.resolve(__dirname, "../../.env.production"),
}).parsed;

const pullDatabase = async () => {
  console.log("Pulling from Turso database to local...");

  try {
    // Extract database name from URI
    const dbName = productionEnv.DATABASE_URI.split("//")[1]
      .split(".")[0]
      .split("-lantern")[0];

    // Remove existing database if it exists
    if (fs.existsSync("sqlite.db")) {
      fs.unlinkSync("sqlite.db");
    }

    // First dump to a SQL file
    console.log(`Dumping database ${dbName} to temp.sql...`);
    await execPromise(`turso db shell ${dbName} .dump > temp.sql`);

    // Create an empty database with autoincrement support
    console.log("Creating new SQLite database...");
    await execPromise(
      `sqlite3 sqlite.db "CREATE TABLE _temp (id INTEGER PRIMARY KEY AUTOINCREMENT); DROP TABLE _temp;"`,
    );

    // Import the dump
    console.log("Importing dump into SQLite database...");
    await execPromise(`sqlite3 sqlite.db ".read temp.sql"`);

    // Clean up temp file
    fs.unlinkSync("temp.sql");

    console.log("Database pull completed successfully");
  } catch (error) {
    console.error("Error pulling database:", error);
    throw error;
  }
};

const pushDatabase = async () => {
  console.log("Pushing from local to Turso database...");

  try {
    // Extract database name from URI
    const dbName = productionEnv.DATABASE_URI.split("//")[1]
      .split(".")[0]
      .split("-lantern")[0];

    // Check if local database exists
    if (!fs.existsSync("sqlite.db")) {
      throw new Error(
        "Local sqlite.db does not exist in builder/turso/. Create it first or move it.",
      );
    }

    // Check authentication by trying to list databases
    console.log("Checking Turso authentication...");
    try {
      await execPromise(`turso db list`);
    } catch (error) {
      if (error.message.includes("not logged in")) {
        console.error(
          "Authentication error. Please run 'turso auth login' first.",
        );
        throw new Error(
          "Not authenticated with Turso. Please run 'turso auth login' first.",
        );
      }
      console.warn(
        "Warning: Could not verify authentication status:",
        error.message,
      );
    }

    // Create a backup of the current database
    console.log("Creating backup of remote database...");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFileName = `backup-${timestamp}.sql`;
    await execPromise(`turso db shell ${dbName} .dump > ${backupFileName}`);
    console.log(`Database backup created: ${backupFileName}`);

    // Dump local database to a file
    console.log("Dumping local database to temp.sql...");
    await execPromise(`sqlite3 sqlite.db ".dump" > temp.sql`);

    // Process the SQL file for Turso compatibility
    console.log("Processing SQL file for Turso compatibility...");
    let sqlContent = fs.readFileSync("temp.sql", "utf8");

    // Remove sqlite_sequence references and operations
    sqlContent = sqlContent.replace(/.*sqlite_sequence.*/g, "");

    // Write processed SQL to a file
    fs.writeFileSync("processed.sql", sqlContent);

    // Clear existing database content instead of deleting the entire database
    console.log("Clearing existing database content...");
    try {
      // Get list of all user tables (excluding system tables)
      const { stdout: tablesOutput } = await execPromise(
        `turso db shell ${dbName} "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';"`,
      );

      const tableNames = tablesOutput
        .split("\n")
        .filter((line) => line.trim() && !line.includes("name"))
        .map((line) => line.trim());

      if (tableNames.length > 0) {
        console.log(
          `Found ${tableNames.length} user tables to clear:`,
          tableNames,
        );

        // Disable foreign key constraints and drop all tables in one command
        console.log("Clearing all user tables...");
        const dropScript = `
          PRAGMA foreign_keys = OFF;
          ${tableNames.map((tableName) => `DROP TABLE IF EXISTS "${tableName}";`).join("\n          ")}
          PRAGMA foreign_keys = ON;
        `;

        // Write the drop script to a file
        fs.writeFileSync("drop_tables.sql", dropScript);

        // Execute the drop script
        await execPromise(`turso db shell ${dbName} < drop_tables.sql`);

        // Clean up the drop script
        fs.unlinkSync("drop_tables.sql");

        console.log("Database content cleared successfully");
      } else {
        console.log("No user tables found to clear.");
      }
    } catch (error) {
      console.error(
        `Error clearing database content:`,
        error.stderr || error.message,
      );
      throw error;
    }

    // Import the data to the existing database
    console.log("Importing data to database...");
    try {
      const { stdout, stderr } = await execPromise(
        `turso db shell ${dbName} < processed.sql`,
      );
      console.log("turso db shell import stdout:", stdout);
      if (stderr) console.error("turso db shell import stderr:", stderr);
    } catch (error) {
      console.error(
        `Error importing data to ${dbName}:`,
        error.stderr || error.message,
      );
      // Log stderr from the error object
      if (error.stderr) {
        console.error("Import command stderr:", error.stderr);
      }
      // Save files on error for inspection
      console.log(
        "Saving temp.sql and processed.sql for inspection due to import error.",
      );
      fs.copyFileSync("temp.sql", `error-temp-${timestamp}.sql`);
      fs.copyFileSync("processed.sql", `error-processed-${timestamp}.sql`);
      throw error;
    }

    // Clean up temp files
    console.log("Cleaning up temporary files...");
    try {
      if (fs.existsSync("temp.sql")) fs.unlinkSync("temp.sql");
      if (fs.existsSync("processed.sql")) fs.unlinkSync("processed.sql");
      if (fs.existsSync("drop_tables.sql")) fs.unlinkSync("drop_tables.sql");
    } catch (cleanupError) {
      console.warn(
        "Warning: Could not clean up some temp files:",
        cleanupError.message,
      );
    }

    console.log("Database push completed successfully");
    console.log(`A backup was created at ${backupFileName}`);
    console.log(
      "✅ Database URL and tokens remain unchanged - no need to update environment variables!",
    );
  } catch (error) {
    console.error("Error pushing database:", error.message);
    throw error;
  }
};

const syncDatabase = async (direction = "pull") => {
  if (direction === "pull") {
    await pullDatabase();
  } else if (direction === "push") {
    await pushDatabase();
  } else {
    throw new Error('Invalid direction. Use "push" or "pull"');
  }
};

// Only run if this is the main file - don't run if imported
if (import.meta.url === new URL(process.argv[1], "file:").href) {
  // Get direction from command line args, default to pull
  const direction = process.argv[2] || "pull";

  if (!["push", "pull"].includes(direction)) {
    console.error('Error: Direction must be either "push" or "pull"');
    console.log("Usage: node syncDb.js [push|pull]");
    process.exit(1);
  }

  syncDatabase(direction)
    .then(() => {
      console.log(
        `${direction.charAt(0).toUpperCase() + direction.slice(1)} completed successfully`,
      );
      process.exit(0);
    })
    .catch((error) => {
      console.error(
        `${direction.charAt(0).toUpperCase() + direction.slice(1)} failed:`,
        error,
      );
      process.exit(1);
    });
}

export { syncDatabase, pullDatabase, pushDatabase };
