import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || "sys",
  port: parseInt(process.env.DB_PORT || "4000"),
  waitForConnections: true,
  connectionLimit: 10,
  ssl: { minVersion: "TLSv1.2", rejectUnauthorized: false },
});

export default pool;
