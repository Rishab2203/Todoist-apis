const express = require("express");
const {
  insertNewtask,
  getAllTasks,
  deleteByIdProjectOrTaskById,
  updateTask,
  findProjectOrTaskById,
  getTasksByFilters,
} = require("../connectors/connectors.js");
const router = express.Router();

router.get("/", getAllTasks);
router.get("/search", getTasksByFilters);
router.get("/:id", findProjectOrTaskById);
router.post("/", insertNewtask);
router.delete("/:id", deleteByIdProjectOrTaskById);
router.put("/:id", updateTask);

module.exports = router;
