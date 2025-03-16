const db = require("./app/db-config/db.js");
let randomstring = require("randomstring");
const { getRandomColorName, getRandomDates } = require("./utils.js");

db.run("PRAGMA journal_mode = WAL;");

function insertProjects(rows) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("BEGIN TRANSACTION;");
      let stmt = db.prepare(
        "INSERT INTO projects (name, color, favourite, user_id) VALUES (?, ?, ?,1)"
      );
      for (const row of rows) {
        stmt.run(row, (err) => {
          if (err) {
            reject(err.message);
          }
        });
      }
      stmt.finalize((err) => {
        if (err) {
          reject(err.message);
        }
        db.run("COMMIT;", (err) => {
          if (err) {
            reject(err.message);
          }
          resolve();
        });
      });
    });
  });
}

function insertTasks(start, projects, tasksPerProject) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("BEGIN TRANSACTION;");
      let stmt = db.prepare(
        "INSERT INTO tasks (content, description,project_id, created,completed,due_date) VALUES(?,?,?,?,?,?)"
      );
      for (let i = start; i <= projects + start; i++) {
        for (let j = 1; j <= tasksPerProject; j++) {
          let randomDates = getRandomDates();
          let randContent = (randProject = randomstring.generate({
            length: 10,
            charset: "alphabetic",
          }));
          let randDescript = (randProject = randomstring.generate({
            length: 4,
            charset: "alphabetic",
          }));
          let completed = 1;
          if (j % 2 === 0) {
            completed = 0;
          }

          stmt.run(
            [
              randContent,
              randDescript,
              i,
              randomDates.currentDate,
              completed,
              randomDates.duedate,
            ],
            (err) => {
              if (err) {
                reject(err.message);
              }
            }
          );
        }
        if (i === projects + start) {
          stmt.finalize((err) => {
            if (err) {
              reject(err.message);
            }
            db.run("COMMIT;", (err) => {
              if (err) {
                reject(err.message);
              }
              console.log("done");
              resolve();
            });
          });
        }
      }
    });
  });
}

function createProjects(num) {
  return new Promise((resolve) => {
    let rows = [];
    for (let i = 1; i <= num; i++) {
      const randProject = randomstring.generate({
        length: 6,
        charset: "alphabetic",
      });
      const randColor = getRandomColorName();
      const favourite = i % 2 === 0 ? 0 : 1;
      rows.push([randProject, randColor, favourite]);
    }
    resolve(rows);
  });
}

async function insertProjectsInChunks(toalProjects, chunkSize) {
  try {
    for (let i = 1; i <= toalProjects; i += chunkSize) {
      const rows = await createProjects(chunkSize);
      await insertProjects(rows);
    }
  } catch (err) {
    return err;
  }
}

async function insertTasksInChunks(toalProjects, tasksPerProject, chunkSize) {
  try {
    for (let i = 1; i <= toalProjects; i += chunkSize) {
      console.log("batch started");
      await insertTasks(i, chunkSize, tasksPerProject);
    }
  } catch (err) {
    return err;
  }
}

insertProjectsInChunks(1000000, 10000)
  .then(() => {
    console.log("all projects added");
    return insertTasksInChunks(1000000, 10, 10000);
  })
  .then(() => console.log("all tasks added"))
  .catch((err) => {
    console.log(err);
  });
