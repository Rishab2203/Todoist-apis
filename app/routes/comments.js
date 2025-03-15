const express = require("express");
const {
  findProjectOrTaskOrCommentById,
  getAllComments,
  deleteProjectOrTaskOrCommentById,
  insertNewComment,
  updateCommentById,
} = require("../controllers/controllers.js");
const router = express.Router();

router.get("/:id", findProjectOrTaskOrCommentById);
router.get("/", getAllComments);

router.delete("/:id", deleteProjectOrTaskOrCommentById);
router.post("/", insertNewComment);
router.put("/:id", updateCommentById);

module.exports = router;
