import { db } from "../config.json";
import { Pool } from "pg";
import logger from "./logger";

logger.info("Starting DB Pool");

const NAME = process.env.DB_NAME || db.name;
const HOST = process.env.DB_HOST || db.host;
const PORT = process.env.DB_PORT || db.port;
const USER = process.env.DB_USER || db.user;
const PASSWORD = process.env.DB_PASSWORD || db.password;

const pool = new Pool({
  user: USER,
  password: PASSWORD,
  database: NAME,
  host: HOST,
  port: Number(PORT),

  statement_timeout: 10000, // eslint-disable-line
  query_timeout: 10000, // eslint-disable-line

  connectionTimeoutMillis: 3000,
  idleTimeoutMillis: 60000,
  max: 20
});

pool.on("error", err => {
  logger.error(`POOL ERROR ${err}`);
});

export default pool;
