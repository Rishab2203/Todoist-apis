const express = require("express");
const {
  insertNewtask,
  getAllTasks,
  deleteProjectOrTaskOrCommentById,
  updateTask,
  findProjectOrTaskOrCommentById,
  getTasksByFilters,
} = require("../controllers/controllers.js");
const router = express.Router();

router.get("/", getAllTasks);
router.get("/search", getTasksByFilters);
router.get("/:id", findProjectOrTaskOrCommentById);
router.post("/", insertNewtask);
router.delete("/:id", deleteProjectOrTaskOrCommentById);
router.put("/:id", updateTask);

module.exports = router;
