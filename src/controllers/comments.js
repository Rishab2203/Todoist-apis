const {
  deleteById,
  getAll,
  findById,
  insertComment,
  upDateComments,
} = require("../models/model.js");

const { commentsTable } = require("../../drizzle/schema.js");

const findCommentById = async (req, res) => {
  let id = parseInt(req.params.id);

  try {
    const result = await findById(commentsTable, id);
    if (result.length === 0) {
      res.status(200).json({ message: `No comment in Database for id ${id}` });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: `Error getting comment by  id ${id}` });
    console.log(`Error getting comment by id ${id}`, err.message);
    return;
  }
};

const getAllComments = async (req, res) => {
  let offset = req.query.page ? (req.query.page - 1) * 10 : 0;

  try {
    const result = await getAll(commentsTable, offset);
    if (result.length === 0) {
      return res.status(201).json({ message: "no comments found" });
    }
    return res.status(201).json(result);
  } catch (err) {
    console.error("Error getting comments:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const deleteCommentById = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    const result = await deleteById(commentsTable, id);
    res.status(200).json({ message: "successfully deleted." });
    return result.rowsAffected > 0
      ? { success: true, message: `Deleted project row by id ${id}  .` }
      : { success: false, message: "No matching record found." };
  } catch (err) {
    res.status(500).json({ message: "Error deleting" });
    console.log("error deleting : ", err.message);
  }
};

const insertNewComment = async (req, res) => {
  const body = req.body;
  if (!body["project_id"] || body["content"] == "") {
    res.status(404).json({ message: "Invalid project_id Name" });
    return;
  }
  try {
    const result = await insertComment(body);
    return res
      .status(201)
      .json({ message: "comment created", comment: result });
  } catch (err) {
    res.status(500).json({ message: "Error inserting comment" });
    console.log("Error inserting comment", err.message);
    return;
  }
};

const updateCommentById = async (req, res) => {
  let id = req.params.id;
  try {
    const result = await upDateComments(id, req.body);
    res.status(200).json({
      message: `comment ${id} successfully updated`,
      updatedTask: result,
    });
  } catch (err) {
    res.status(500).json({ message: `Error updating comment id ${id}` });
    console.log(`Error updating comment id ${id}`, err.message);
    return;
  }
};
module.exports = {
  deleteCommentById,
  findCommentById,
  getAllComments,
  insertNewComment,
  updateCommentById,
};
