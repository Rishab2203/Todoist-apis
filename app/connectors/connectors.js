const {
  upDateProjectByID,
  upDateTasksByID,
  insertTask,
  insertProject,
  deleteById,
  getAll,
  findById,
  projectIdByName,
} = require("../models/model.js");

const insertNewProject = (req, res) => {
  const body = req.body;
  if (!body["name"] || body["name"] == "") {
    res.status(404).json({ message: "Invalid project Name" });
    return;
  }

  insertProject(req.body, (err) => {
    if (err) {
      res.status(500).json({ message: "Error inserting Project" });
      console.log("Error inserting project", err.message);
      return;
    }
    res.status(200).json({ message: "Project successfully added" });
  });
};

const insertNewtask = async (req, res) => {
  const body = req.body;
  const projectId = await projectIdByName(body.project_name);
  body.project_id = projectId;

  if (!body["content"] || body["content"] == "" || !body["project_id"]) {
    res.status(404).json({ message: "Invalid details" });
    return;
  }

  insertTask(req.body, (err) => {
    if (err) {
      res.status(500).json({ message: "Error inserting Project" });
      console.log("Error inserting project", err.message);
      return;
    }
    res.status(200).json({ message: "Project successfully added" });
  });
};

const getAllProjects = (req, res) => {
  getAll("projects", (err, result) => {
    if (err) {
      res.status(400).json({ message: `Error fetching projects` });
      console.log(`error fetchiing projects`, err.message);
      return;
    }
    if (!result.length) {
      res.status(200).json({ message: "No Projects in Database" });
      return;
    }
    res.status(200).json(result);
  });
};

const getAllTasks = (req, res) => {
  getAll("tasks", (err, result) => {
    if (err) {
      res.status(400).json({ message: `Error fetching tasks` });
      console.log(`error fetchiing tasks `, err.message);
      return;
    }
    if (result.length === 0) {
      res.status(200).json({ message: "No Tasks in Database" });
      return;
    }
    res.status(200).json(result);
  });
};

const deleteByIdProjectOrTaskById = (req, res) => {
  let id = parseInt(req.params.id);
  const table = req.baseUrl.slice(1);

  deleteById(table, id, (err) => {
    if (err) {
      res.status(500).json({ message: "Error deleting" });
      console.log("error deleting : ", err.message);
    }
    res.status(200).json({ message: "successfully deleted." });
  });
};

const upDateProject = (req, res) => {
  let id = parseInt(req.params.id);

  upDateProjectByID(id, req.body, (err) => {
    if (err) {
      res.status(500).json({ message: `Error updating project id ${id}` });
      console.log(`Error updating project id ${id}`, err.message);
      return;
    }
    res.status(200).json({ message: `project ${id} successfully updated` });
  });
};

const updateTask = (req, res) => {
  let id = parseInt(req.params.id);
  upDateTasksByID(id, req.body, (err) => {
    if (err) {
      res.status(500).json({ message: `Error updating task id ${id}` });
      console.log(`Error updating task id ${id}`, err.message);
      return;
    }
    res.status(200).json({ message: `Task ${id} successfully updated` });
  });
};

const findProjectOrTaskById = (req, res) => {
  const table = req.baseUrl.slice(1);
  let id = parseInt(req.params.id);

  findById(table, id, (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ message: `Error getting data for ${table} id ${id}` });
      console.log(`Error updating ${table} id ${id}`, err.message);
      return;
    }
    if (!result) {
      res.status(200).json({ message: `No ${table} in Database for id ${id}` });
      return;
    }
    res.status(200).json(result);
  });
};

module.exports = {
  insertNewtask,
  insertNewProject,
  getAllProjects,
  getAllTasks,
  deleteByIdProjectOrTaskById,
  upDateProject,
  updateTask,
  findProjectOrTaskById,
};
