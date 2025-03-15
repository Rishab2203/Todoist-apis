const db = require("./app/db-config/db.js");
let randomstring = require("randomstring");
const { getRandomColorName, getRandomDates } = require("./utils.js");

db.run("PRAGMA journal_mode = WAL;");

function insertProjects(chunkSize) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("BEGIN TRANSACTION;");
      let stmt = db.prepare(
        "INSERT INTO projects (name, color, favourite) VALUES (?, ?, ?)"
      );
      let randProject = randomstring.generate({
        length: 6,
        charset: "alphabetic",
      });
      let randColor = getRandomColorName();
      for (let i = 1; i <= chunkSize; i++) {
        let favourite = i % 2 === 0 ? 0 : 1;
        stmt.run([randProject, randColor, favourite], (err) => {
          if (err) {
            reject(err.message);
          }
          if (i === chunkSize) {
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
          }
        });
      }
    });
  });
}

function insertTasks(start, projects, tasksPerProject) {
  return new Promise((resolve, reject) => {
    // db.serialize(() => {
    //   db.run("BEGIN TRANSACTION;");
    //   let stmt = db.prepare(
    //     "INSERT INTO tasks (content, description,project_id, created,completed,due_date) VALUES(?,?,?,?,?,?)"
    //   );
    //   for (let i = start; i <= projects + i; i++) {
    //     for (let j = 1; j <= tasksPerProject; j++) {
    //       let randomDates = getRandomDates();
    //       let randContent = (randProject = randomstring.generate({
    //         length: 10,
    //         charset: "alphabetic",
    //       }));
    //       let randDescript = (randProject = randomstring.generate({
    //         length: 4,
    //         charset: "alphabetic",
    //       }));
    //       let completed = 1;
    //       if (j % 2 === 0) {
    //         completed = 0;
    //       }

    //       stmt.run(
    //         [
    //           randContent,
    //           randDescript,
    //           i,
    //           randomDates.currentDate,
    //           completed,
    //           randomDates.duedate,
    //         ],
    //         (err) => {
    //           if (err) {
    //             reject(err.message);
    //           }
    //         }
    //       );
    //     }
    //     if (i === chunkSize) {
    //       stmt.finalize((err) => {
    //         if (err) {
    //           reject(err.message);
    //         }
    //         db.run("COMMIT;", (err) => {
    //           if (err) {
    //             reject(err.message);
    //           }
    //           resolve();
    //         });
    //       });
    //     }
    //   }
    // });
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
              //   console.log("dkfjsdkjg", i, j);
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

async function insertProjectsInChunks(toalProjects, chunkSize) {
  try {
    for (let i = 1; i <= toalProjects; i += chunkSize) {
      await insertProjects(chunkSize);
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

// insertTasksInChunks(20, 10, 5).then(() => console.log("tasks created"));

// db.serialize(() => {
//   db.run("BEGIN TRANSACTION;");
//   let stmt = db.prepare(
//     "INSERT INTO tasks (content, description,project_id, created,completed,due_date) VALUES(?,?,?,?,?,?)"
//   );
//   for (let i = 1; i <= 10; i++) {
//     for (let j = 1; j <= 10; j++) {
//       let randomDates = getRandomDates();
//       let randContent = (randProject = randomstring.generate({
//         length: 10,
//         charset: "alphabetic",
//       }));
//       let randDescript = (randProject = randomstring.generate({
//         length: 4,
//         charset: "alphabetic",
//       }));
//       let completed = 1;
//       if (j % 2 === 0) {
//         completed = 0;
//       }

//       stmt.run(
//         [
//           randContent,
//           randDescript,
//           i,
//           randomDates.currentDate,
//           completed,
//           randomDates.duedate,
//         ],
//         (err) => {
//           console.log("dkfjsdkjg", i, j);
//           if (err) {
//             console.log(err.message);
//           }
//         }
//       );
//     }
//     if (i === 10) {
//       stmt.finalize((err) => {
//         if (err) {
//           console.log(err.message);
//         }
//         db.run("COMMIT;", (err) => {
//           if (err) {
//             console.log(err.message);
//           }
//           console.log("done");
//         });
//       });
//     }
//   }
// });
