import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // e.g. postgres://oli@localhost:5432/vef2_2025
});

export default pool;
