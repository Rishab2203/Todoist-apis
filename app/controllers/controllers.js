const {
  upDateProjectByID,
  upDateTasksByID,
  insertTask,
  insertProject,
  deleteById,
  getAll,
  findById,
  findByFilters,
  updateField,
  insertComment,
  upDateComments,
} = require("../models/model.js");

const { createRequestFilters } = require("../../utils.js");

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
  let offset = req.query.page ? (req.query.page - 1) * 10 : 0;
  getAll("projects", offset, (err, result) => {
    if (err) {
      res.status(400).json({ message: `Error fetching projects` });
      console.log(`error fetchiing projects`, err.message);
      return;
    }
    if (result.length === 0) {
      res.status(200).json({ message: "No Projects in Database" });
      return;
    }
    res.status(200).json(result);
  });
};

const getAllTasks = (req, res) => {
  let offset = req.query.page ? (req.query.page - 1) * 10 : 0;
  getAll("tasks", offset, (err, result) => {
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

const getAllComments = (req, res) => {
  let offset = req.query.page ? (req.query.page - 1) * 10 : 0;
  getAll("comments", offset, (err, result) => {
    if (err) {
      res.status(400).json({ message: `Error fetching comments` });
      console.log(`error fetchiing comments `, err.message);
      return;
    }
    if (result.length === 0) {
      res.status(200).json({ message: "No comments in Database" });
      return;
    }
    res.status(200).json(result);
  });
};

const deleteProjectOrTaskOrCommentById = (req, res) => {
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

const findProjectOrTaskOrCommentById = (req, res) => {
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

const getTasksByFilters = (req, res) => {
  let queries = req.query;
  let offset = req.query.page ? (req.query.page - 1) * 10 : 0;
  let filters = createRequestFilters(queries);
  findByFilters(filters, offset, (err, result) => {
    if (err) {
      res.status(500).json({ message: "Error finidng tasks" });
      console.log("error getting tasks by filters", err.message);
      return;
    }
    if (result.length === 0) {
      res.status(200).json({ message: "No such tasks found" });
      return;
    }
    res.status(200).json(result);
  });
};

const updateFieldInProjects = (req, res) => {
  let id = req.params.id;
  let field = createRequestFilters(req.body);
  updateField(field, id, (err) => {
    if (err) {
      res.status(500).json({ message: `Error updating project id ${id}` });
      console.log(`Error updating project id ${id}`, err.message);
      return;
    }
    res.status(200).json({ message: `Project ${id} successfully updated` });
  });
};

const insertNewComment = (req, res) => {
  const body = req.body;
  if (!body["project_id"] || body["content"] == "") {
    res.status(404).json({ message: "Invalid project_id Name" });
    return;
  }

  insertComment(req.body, (err) => {
    if (err) {
      res.status(500).json({ message: "Error inserting comment" });
      console.log("Error inserting comment", err.message);
      return;
    }
    res.status(200).json({ message: "comment successfully added" });
  });
};

const updateCommentById = (req, res) => {
  let id = req.params.id;
  upDateComments(id, req.body, (err) => {
    if (err) {
      res.status(500).json({ message: `Error updating comment id ${id}` });
      console.log(`Error updating comment id ${id}`, err.message);
      return;
    }
    res.status(200).json({ message: `Comment ${id} successfully updated` });
  });
};

module.exports = {
  insertNewtask,
  insertNewProject,
  getAllProjects,
  getAllTasks,
  deleteProjectOrTaskOrCommentById,
  upDateProject,
  updateTask,
  findProjectOrTaskOrCommentById,
  getTasksByFilters,
  updateFieldInProjects,
  getAllComments,
  insertNewComment,
  updateCommentById,
};
