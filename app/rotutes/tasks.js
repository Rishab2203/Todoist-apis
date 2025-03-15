const express = require("express");
const {
  insertNewtask,
  getAllTasks,
  deleteByIdProjectOrTaskById,
  updateTask,
  findProjectOrTaskById,
} = require("../connectors/connectors.js");
const router = express.Router();

router.get("/", getAllTasks);
router.get("/:id", findProjectOrTaskById);
router.post("/", insertNewtask);
router.delete("/:id", deleteByIdProjectOrTaskById);
router.put("/:id", updateTask);

module.exports = router;
