const express = require("express");
const {
  insertNewtask,
  getAllTasks,
  deleteTaskById,
  updateTask,
  findTaskById,
  getTasksByFilters,
} = require("../controllers/tasks.js");
const router = express.Router();

router.get("/", getAllTasks);
router.get("/search", getTasksByFilters);
router.get("/:id", findTaskById);
router.post("/", insertNewtask);
router.delete("/:id", deleteTaskById);
router.put("/:id", updateTask);

module.exports = router;
