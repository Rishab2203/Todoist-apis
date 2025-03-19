const express = require("express");
const loginUserAndSetToken = require("../service/auth.js");
const router = express.Router();

router.post("/", loginUserAndSetToken);

module.exports = router;
