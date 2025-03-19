const { Pool } = require("pg");

const pool= new Pool({ 
  user: "postgres",
  host: "ilegalrds.cv2o4u0uqobp.ap-south-1.rds.amazonaws.com",
  database: "ilegalrds",
  password: "ilegal2025",
  port: 5432,
  max: 30,
  idleTimeoutMillis: 60000,
  connectionTimeoutMillis: 50000,
  ssl: {
    rejectUnauthorized: false,  // For RDS SSL connection
  },
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
