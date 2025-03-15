const express = require("express");
const {
  insertNewProject,
  getAllProjects,
  deleteProjectOrTaskOrCommentById,
  upDateProject,
  findProjectOrTaskOrCommentById,
  updateFieldInProjects,
} = require("../controllers/controllers.js");
const router = express.Router();

router.get("/:id", findProjectOrTaskOrCommentById);
router.get("/", getAllProjects);

router.delete("/:id", deleteProjectOrTaskOrCommentById);
router.post("/", insertNewProject);
router.put("/:id", upDateProject);
router.patch("/:id", updateFieldInProjects);

module.exports = router;
