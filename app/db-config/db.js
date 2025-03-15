const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./projects.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.log("error connecting database:", err.message);
      return;
    }
    console.log("database connected");
  }
);

db.run(
  `CREATE TABLE IF NOT EXISTS OurUsers(
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
     PRIMARY KEY (name,email)
      );`,
  [],
  (err) => {
    if (err) {
      console.log("Error creating OurUsers table", err.message);
      return;
    }
    console.log("OurUsers table created");
  }
);

db.run(
  `CREATE TABLE IF NOT EXISTS projects(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    color TEXT,
    user_id INTEGER NOT NULL,
    favourite INTEGER CHECK(favourite IN(0,1)) DEFAULT 0
    FOREIGN KEY (USER_id) REFERENCES OurUsers(id) ON DELETE CASCADE
    );`,
  [],
  (err) => {
    if (err) {
      console.log("Error creating projects table", err.message);
      return;
    }
    console.log("projects table created");
  }
);

db.run(
  `CREATE TABLE IF NOT EXISTS tasks(
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      description TEXT,
      created TEXT,
      completed INTEGER CHECK(completed IN(0,1)) DEFAULT 0,
      due_date TEXT,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
      );`,
  [],
  (err) => {
    if (err) {
      console.log("Error creating tasks table", err.message);
      return;
    }
    console.log("tasks table created");
  }
);

db.run(
  `CREATE TABLE IF NOT EXISTS comments(
      id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER NOT NULL,
      task_id INTEGER,
      content TEXT,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
      FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
      );`,
  [],
  (err) => {
    if (err) {
      console.log("Error creating tasks table", err.message);
      return;
    }
    console.log("tasks table created");
  }
);

// db.exec('PRAGMA foreign_keys = ON')
module.exports = db;
