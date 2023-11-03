require("dotenv").config(); // Make sure to require dotenv if you are using environment variables
require("ts-node/register");
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg", // Use 'pg' for PostgreSQL
    connection: {
      host: process.env.DB_HOST || "127.0.0.1", // Your DB host
      port: process.env.DB_PORT || 5432, // Your DB port
      database: process.env.DB_NAME || "postgres", // Your local database name
      user: process.env.DB_USER || "postgres", // Your local database user
      password: process.env.DB_PASSWORD || "postgres", // Your local database password
      ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false, // Use SSL connection (required for some databases)
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./src/db/migrations", // The directory where your migration files are located
      extension: "ts", // The file extension for the migration files
    },
    seeds: {
      directory: "./src/db/seeds", // The directory where your seed files are located
    },
  },

  staging: {
    // ... same as development, or specific to your staging environment
  },

  production: {
    // ... same as development, or specific to your production environment
  },
};
