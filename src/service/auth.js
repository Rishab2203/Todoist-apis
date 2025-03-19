const { eq, and } = require("drizzle-orm");
const { usersTable } = require("../../drizzle/schema");
const db = require("../db-config/db.js");
const jwt = require("jsonwebtoken");

const SECRET = "blackHat";

const isUser = async ({ name, email }) => {
  try {
    const result = await db
      .select()
      .from(usersTable)
      .where(and(eq(usersTable.email, email), eq(usersTable.name, name)));
    return result;
  } catch (err) {
    console.log("error finding user in database", err.message);
    return err;
  }
};

const loginUserAndSetToken = async (req, res) => {
  try {
    const result = await isUser(req.body);

    if (result.length > 0) {
      const token = jwt.sign(result[0], SECRET);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.status(200).json({ message: "logged in " });
    }
  } catch (err) {
    res.send(500).json({ message: "Database error in finding user." });
  }
};

module.exports = loginUserAndSetToken;
