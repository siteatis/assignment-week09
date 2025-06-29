import pkg from "@next/env";
const { loadEnvConfig } = pkg;
loadEnvConfig(process.cwd().concat("/../..")); // Go up two levels for env file

import pg from "pg";

export const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STR,
});
