import "dotenv/config";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const res = await pool.query("select 1");
console.log("Connected:", res.rows);
process.exit(0);
