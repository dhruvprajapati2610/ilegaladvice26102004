const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "144.24.124.135",
  database: "ilegaladvice",
  password: "Pranav@2003",
  port: 5432,
  max: 30, 
  idleTimeoutMillis: 60000,
  connectionTimeoutMillis: 3000, 
});


pool.connect((err) => {
    if (err) {
      console.error("Error connecting to PostgreSQL database:", {
        message: err.message,
        code: err.code,
        stack: err.stack,
        detail: err.detail || "No additional details available",
      });
      return;
    }
    console.log("Connected to PostgreSQL database");
  });

module.exports = pool;