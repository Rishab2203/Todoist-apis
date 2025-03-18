const { drizzle } = require("drizzle-orm/better-sqlite3");
const Database = require("better-sqlite3");

const sqlite = new Database("./projects.db");
const db = drizzle({ client: sqlite });

const result = await db.execute("select 1");

module.exports = result;
