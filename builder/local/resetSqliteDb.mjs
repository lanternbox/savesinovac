import dotenv from "dotenv";
import { createClient } from "@libsql/client";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local" });

const resetDatabaseSchema = async () => {
  const databaseUri = process.env.DATABASE_URI;

  if (!databaseUri) {
    console.log("DATABASE_URI is not set, skipping database reset");
    return;
  }

  if (databaseUri.startsWith("file:")) {
    const filePath = databaseUri.replace("file:", "");
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Successfully deleted SQLite database file: ${filePath}`);
      } else {
        console.log(`SQLite database file does not exist: ${filePath}`);
      }
    } catch (error) {
      console.error(`Error deleting SQLite database file: ${error.message}`);
      throw error;
    }
    return;
  }

  if (!databaseUri.includes("turso")) {
    console.log(
      "DATABASE_URI does not contain 'turso', skipping database reset",
    );
    return;
  }

  console.log("Starting Turso database reset...");
  console.log(`Connecting to database: ${databaseUri}`);

  let client;
  try {
    client = createClient({
      url: databaseUri,
      authToken: process.env.DATABASE_TOKEN || "",
    });

    // First, test the connection
    await client.execute("SELECT 1");
    console.log("Successfully connected to database");

    // Disable foreign key constraints temporarily
    await client.execute("PRAGMA foreign_keys = OFF;");

    // Get all tables
    const tables = await client.execute(`
      SELECT name FROM sqlite_master 
      WHERE type='table' 
      AND name NOT LIKE 'sqlite_%'
      AND name NOT LIKE '_migrations'
      AND name NOT LIKE 'payload_migrations';
    `);

    console.log(
      "Found tables:",
      tables.rows.map((t) => t.name),
    );

    if (tables.rows.length === 0) {
      console.log("No tables found to drop");
    } else {
      // Drop tables in reverse order to handle dependencies
      for (const table of tables.rows.reverse()) {
        const tableName = table.name;
        try {
          console.log(`Attempting to drop table: ${tableName}`);
          await client.execute(`DROP TABLE IF EXISTS "${tableName}";`);
          console.log(`Successfully dropped table: ${tableName}`);
        } catch (dropError) {
          console.warn(
            `Warning: Failed to drop table ${tableName}:`,
            dropError.message,
          );
        }
      }
    }

    // Re-enable foreign key constraints
    await client.execute("PRAGMA foreign_keys = ON;");

    console.log("Database reset process completed successfully.");
  } catch (error) {
    console.error("Error during database reset:");
    console.error("Error details:", error);
    throw error;
  } finally {
    if (client) {
      await client.close();
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("Database connection closed.");
    }
  }
};

// Only run the exit logic if this is the main file being executed
if (import.meta.url === new URL(process.argv[1], "file:").href) {
  resetDatabaseSchema()
    .then(() => {
      console.log("Reset completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Reset failed:", error);
      process.exit(1);
    });
}

export default resetDatabaseSchema;
