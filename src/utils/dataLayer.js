import { db } from "./dataConn.js";
// Note: This enables dataLayer to access the env var outside the Next.js runtime.
// Or use dotenv? Revise later maybe.
import pkg from "@next/env";
const { loadEnvConfig } = pkg;
loadEnvConfig(process.cwd());

export const dbqry = {
  getUserByName: "SELECT * FROM wk9profiles WHERE username=$1",
  getUsers: "SELECT * FROM wk9profiles",
  getPostsByUID: "SELECT * FROM wk9posts WHERE clerk_id=$1 ORDER BY stamp DESC",
  addProfile:
    "INSERT INTO wk9profiles (username,clerk_id,bio) VALUES ($1,$2,$3)",
  addPost: "INSERT INTO wk9posts (clerk_id,subject,content) VALUES ($1,$2,$3)",
  setUserBio: "UPDATE wk9profiles SET bio=$2 WHERE username=$1",
};
// TODO: Maybe use PUT rather than POST for setUserBio (re idempotency)

export async function dbgetOnly(qry, args = []) {
  // Enforce maximum of one result
  const rows = await dbget(qry, args);
  if (rows?.length > 1) throw "Multiple values matched!";
  if (rows?.length === 0 || typeof rows === "undefined") return undefined;
  return rows[0];
}

export async function dbget(qry, args = []) {
  try {
    return Promise.resolve((await db.query(qry, args)).rows);
  } catch (er) {
    console.log(er.message);
    throw er;
  }
}

export function dbpost(qry, args = []) {
  try {
    db.query(qry, args);
  } catch (er) {
    console.log(er.message);
    throw er;
  }
}
