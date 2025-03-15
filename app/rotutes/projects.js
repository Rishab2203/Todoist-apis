const express = require("express");
const {
  insertNewProject,
  getAllProjects,
  deleteByIdProjectOrTaskById,
  upDateProject,
  findProjectOrTaskById,
} = require("../connectors/connectors.js");
const router = express.Router();

router.get("/:id", findProjectOrTaskById);
router.get("/", getAllProjects);

router.delete("/:id", deleteByIdProjectOrTaskById);
router.post("/", insertNewProject);
router.put("/:id", upDateProject);

module.exports = router;
