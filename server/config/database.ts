import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "../db/schema";

let db: ReturnType<typeof drizzle>;

export const initializeDatabase = () => {
  try {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error("DATABASE_URL environment variable is not set");
    }

    console.log("🔗 Connecting to database...");

    const client = postgres(connectionString, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    });

    db = drizzle(client, { schema });

    console.log("✅ Database connection established");
    return db;
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
};

export const getDatabase = () => {
  if (!db) {
    throw new Error(
      "Database not initialized. Call initializeDatabase() first.",
    );
  }
  return db;
};

export * from "../db/schema";
