const db = require("../db-config/db.js");

const getAll = (tableName, offset = 0, cb) => {
  db.all(
    `SELECT * FROM ${tableName} LIMIT 10 OFFSET ? ;`,
    [offset],
    (err, rows) => {
      cb(err, rows);
    }
  );
};

const insertProject = ({ name, color = "NULL", favourite = 0 }, cb) => {
  db.run(
    "INSERT INTO projects (name ,color,favourite) VALUES(?,?,?)",
    [name, color, favourite],
    (err) => {
      cb(err);
    }
  );
};

const projectIdByName = (projectName) => {
  return new Promise((resolve, reject) => {
    db.get(
      "select id from projects where name= ? ",
      [projectName],
      (err, row) => {
        if (err) {
          console.log("error getting project Id by name", err.message);
          reject();
        }
        //   console.log(row, row.id);
        resolve(row.id);
      }
    );
  });
};

const insertTask = (
  {
    content,
    description = "NULL",
    project_id,
    created = getCurrentDate(),
    completed = 0,
    due_date = "NULL",
  },
  cb
) => {
  db.run(
    "INSERT INTO tasks (content, description,project_id, created,completed,due_date) VALUES(?,?,?,?,?,?)",
    [content, description, project_id, created, completed, due_date],
    (err) => {
      cb(err);
    }
  );
};

const findById = (tableName, id, cb) => {
  db.get(`SELECT * FROM ${tableName} WHERE id = ? `, id, (err, result) => {
    cb(err, result);
  });
};

const deleteById = (tableName, id, cb) => {
  db.run(`DELETE FROM ${tableName}  WHERE id = ?`, id, (err) => {
    cb(err);
  });
};

const upDateProjectByID = (id, { name, color = "NULL", favourite = 0 }, cb) => {
  console.log(id);
  db.run(
    "UPDATE projects SET name = ? , color = ?, favourite = ?  WHERE id = ?",
    [name, color, favourite, id],
    (err) => {
      cb(err);
    }
  );
};

const upDateTasksByID = (
  id,
  {
    content,
    description = "NULL",
    project_id,
    created = getCurrentDate(),
    completed = 0,
    due_date = "NULL",
  },
  cb
) => {
  db.run(
    "UPDATE tasks SET content = ? , description = ?, project_id = ? , created = ?, completed= ?, due_date = ? WHERE id = ?",
    [content, description, project_id, created, completed, due_date, id],
    (err) => {
      cb(err);
    }
  );
};

const findByFilters = (filters, offset, cb) => {
  console.log(
    `SELECT * FROM tasks WHERE ${filters} LIMIT 10 OFFSET ${offset} ;`
  );
  db.all(
    `SELECT * FROM tasks WHERE ${filters} LIMIT 10 OFFSET ? ;`,
    [offset],
    (err, result) => {
      cb(err, result);
    }
  );
};

function updateField(field, id, cb) {
  db.run(`UPDATE projects SET ${field} WHERE id = ? ;`, [id], (err) => {
    cb(err);
  });
}

function insertComment(
  { project_id, task_id = "NULL", content, posted_at = getCurrentDate() },
  cb
) {
  db.run(
    `INSERT INTO comments(project_id,task_id,content,posted_at) VALUES (?,?,?,?) ;`,
    [project_id, task_id, content, posted_at],
    (err) => {
      cb(err);
    }
  );
}

const upDateComments = (
  id,
  { project_id, task_id = "NULL", content, posted_at = getCurrentDate() },
  cb
) => {
  db.run(
    "UPDATE comments SET project_id = ? , task_id = ?, content = ? , posted_at = ? WHERE id = ?",
    [project_id, task_id, content, posted_at, id],
    (err) => {
      cb(err);
    }
  );
};

function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
}

module.exports = {
  upDateProjectByID,
  upDateTasksByID,
  insertTask,
  insertProject,
  deleteById,
  deleteById,
  getAll,
  findById,
  projectIdByName,
  getCurrentDate,
  findByFilters,
  updateField,
  insertComment,
  upDateComments,
};
