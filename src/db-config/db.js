const { drizzle } = require("drizzle-orm/better-sqlite3");
const Database = require("better-sqlite3");

const sqlite = new Database("./projects.db");
sqlite.pragma("foreign_keys = ON");
const db = drizzle({ client: sqlite });

module.exports = db;
