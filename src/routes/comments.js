const express = require("express");
const {
  findCommentById,
  getAllComments,
  deleteCommentById,
  insertNewComment,
  updateCommentById,
} = require("../controllers/comments.js");
const router = express.Router();

router.get("/:id", findCommentById);
router.get("/", getAllComments);

router.delete("/:id", deleteCommentById);
router.post("/", insertNewComment);
router.put("/:id", updateCommentById);

module.exports = router;
