const express = require("express");
const {
  insertNewProject,
  getAllProjects,
  deleteProjectById,
  upDateProject,
  findProjectById,
  updateFieldInProjects,
} = require("../controllers/project.js");
const router = express.Router();

router.get("/:id", findProjectById);
router.get("/", getAllProjects);

router.delete("/:id", deleteProjectById);
router.post("/", insertNewProject);
router.put("/:id", upDateProject);
router.patch("/:id", updateFieldInProjects);

module.exports = router;
