const { deleteById, insertUser } = require("../models/model.js");
const { usersTable } = require("../../drizzle/schema.js");

const insertNewUser = async (req, res) => {
  const body = req.body;
  if (!body["name"] || body["name"].trim() === "") {
    res.status(404).json({ message: "Invalid user Name" });
    return;
  }
  try {
    const result = await insertUser(body);
    return res.status(201).json({ message: "user created", user: result });
  } catch (err) {
    console.error("Error creatung user:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const deleteUserById = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    const result = await deleteById(usersTable, id);
    res.status(200).json({ message: "successfully deleted." });
    return result.rowsAffected > 0
      ? { success: true, message: `Deleted project row by id ${id}  .` }
      : { success: false, message: "No matching record found." };
  } catch (err) {
    res.status(500).json({ message: "Error deleting" });
    console.log("error deleting : ", err.message);
  }
};

module.exports = {
  insertNewUser,
  insertNewtask,
  insertNewProject,
  getAllProjects,
  getAllTasks,
  deleteProjectById,
  deleteCommentById,
  deleteTaskById,
  deleteUserById,
  upDateProject,
  updateTask,
  findProjectById,
  findTaskById,
  findCommentById,
  getTasksByFilters,
  updateFieldInProjects,
  getAllComments,
  insertNewComment,
  updateCommentById,
};
