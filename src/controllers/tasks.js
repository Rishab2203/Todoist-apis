const {
  upDateTasksByID,
  insertTask,
  deleteById,
  getAll,
  findById,
  findByFilters,
} = require("../models/model.js");
const { tasksTable } = require("../../drizzle/schema.js");

const findTaskById = async (req, res) => {
  let id = parseInt(req.params.id);

  try {
    const result = await findById(tasksTable, id);
    if (result.length === 0) {
      res.status(200).json({ message: `No task in Database for id ${id}` });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: `Error getting task by  id ${id}` });
    console.log(`Error getting task by id ${id}`, err.message);
    return;
  }
};
const insertNewtask = async (req, res) => {
  const body = req.body;

  if (!body["content"] || body["content"] == "" || !body["project_id"]) {
    res.status(404).json({ message: "Invalid details" });
    return;
  }

  try {
    const result = await insertTask(body);
    return res.status(201).json({ message: "task created", Task: result });
  } catch (err) {
    console.error("Error inserting task:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const getAllTasks = async (req, res) => {
  let offset = req.query.page ? (req.query.page - 1) * 10 : 0;
  try {
    const result = await getAll(tasksTable, offset);
    if (result.length === 0) {
      return res.status(201).json({ message: "no tasks found" });
    }
    return res.status(201).json(result);
  } catch (err) {
    console.error("Error getting tasks:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const updateTask = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    const result = await upDateTasksByID(id, req.body);
    res.status(200).json({
      message: `Task ${id} successfully updated`,
      updatedTask: result,
    });
  } catch (err) {
    res.status(500).json({ message: `Error updating task id ${id}` });
    console.log(`Error updating task id ${id}`, err.message);
    return;
  }
};

const deleteTaskById = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    const result = await deleteById(tasksTable, id);
    res.status(200).json({ message: "successfully deleted." });
    return result.rowsAffected > 0
      ? { success: true, message: `Deleted project row by id ${id}  .` }
      : { success: false, message: "No matching record found." };
  } catch (err) {
    res.status(500).json({ message: "Error deleting" });
    console.log("error deleting : ", err.message);
  }
};

const getTasksByFilters = async (req, res) => {
  let offset = req.query.page ? (req.query.page - 1) * 10 : 0;
  let filters = req.query;

  try {
    const result = await findByFilters(filters, offset);
    if (result.length === 0) {
      res.status(200).json({ message: "No such tasks found" });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error finidng tasks" });
    console.log("error getting tasks by filters", err.message);
    return;
  }
};

module.exports = {
  insertNewtask,
  getAllTasks,
  deleteTaskById,
  updateTask,
  findTaskById,
  getTasksByFilters,
};
