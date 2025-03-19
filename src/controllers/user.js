const { deleteById, insertUser } = require("../models/model.js");
const { usersTable } = require("../../drizzle/schema.js");
const db = require("../db-config/db.js");

const insertNewUser = async (req, res) => {
  const body = req.body;
  if (!body["name"] || body["name"].trim() === "") {
    res.status(404).json({ message: "Invalid user Name" });
    return;
  }
  try {
    const result = await insertUser(body);
    return res.status(201).json({ message: "user created", user: result });
  } catch (err) {
    console.error("Error creatung user:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const deleteUserById = async (req, res) => {
  let id = parseInt(req.params.id);

  try {
    const result = await deleteById(usersTable, id);
    res.status(200).json({ message: "successfully deleted." });
    return result.rowsAffected > 0
      ? { success: true, message: `Deleted project row by id ${id}  .` }
      : { success: false, message: "No matching record found." };
  } catch (err) {
    res.status(500).json({ message: "Error deleting" });
    console.log("error deleting : ", err.message);
  }
};

const markuserDelete = async (userId) => {
  try {
    await db
      .update(usersTable)
      .set({ deleted_at: Date.now() })
      .where(eq(usersTable.id, userId));
  } catch (err) {
    console.error("Error soft deleting error", err.message);
  }
};

module.exports = {
  insertNewUser,
  deleteUserById,
};
