const express = require("express");
const { insertNewUser, deleteUserById } = require("../controllers/user.js");
const router = express.Router();

router.post("/", insertNewUser);
router.delete("/:id", deleteUserById);

module.exports = router;
