import dotenv from "dotenv";
import pg from "pg";

const { Client } = pg;

dotenv.config();

const resetDatabaseSchema = async () => {
  console.log("Resetting database schema...");
  const client = new Client({
    connectionString: process.env.DATABASE_URI,
    // ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
  });

  let transactionStarted = false;

  try {
    await client.connect();

    await client.query("BEGIN");
    transactionStarted = true;

    await client.query("DROP SCHEMA IF EXISTS public CASCADE;");
    console.log("Schema 'public' dropped successfully.");

    await client.query("CREATE SCHEMA public;");
    console.log("Schema 'public' created successfully.");

    await client.query("GRANT ALL ON SCHEMA public TO public;");

    // Extract username from DATABASE_URI
    const username = new URL(process.env.DATABASE_URI).username;
    await client.query(`GRANT ALL ON SCHEMA public TO "${username}";`);
    console.log("Privileges granted on 'public' schema.");

    await client.query("COMMIT");
    transactionStarted = false;

    console.log("Database schema reset successfully.");
  } catch (error) {
    if (transactionStarted) {
      await client.query("ROLLBACK");
    }
    console.error("Error resetting database schema:", error.message);
    throw error;
  } finally {
    await client.end();
  }
};

export default resetDatabaseSchema;

// Run the script if it's called directly
resetDatabaseSchema()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
