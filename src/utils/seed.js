import { db } from "./dataConn.js";
// TODO: will have to create a fake user to be able to seed any data!

async function doSeeding() {
  for (let q of [
    `BEGIN`,
    `DROP TABLE IF EXISTS wk9profiles, wk9posts`,
    `CREATE TABLE wk9profiles (
      username VARCHAR(40) PRIMARY KEY,
      clerk_id TEXT NOT NULL UNIQUE,
      stamp TIMESTAMP NOT NULL DEFAULT now(),
      bio TEXT
    )`,
    `CREATE TABLE wk9posts (
      id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      clerk_id TEXT NOT NULL,
      stamp TIMESTAMP DEFAULT now(),
      subject VARCHAR(255) NOT NULL,
      content TEXT,
      FOREIGN KEY (clerk_id) REFERENCES wk9profiles(clerk_id)
    )`,
    `COMMIT`,
  ])
    await db.query(q);
  console.log("Seed data created successfully!");
}
doSeeding();
