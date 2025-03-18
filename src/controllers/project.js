const {
  upDateProjectByID,
  insertProject,
  deleteById,
  getAll,
  findById,
  updateField,
} = require("../models/model.js");
const { projectsTable } = require("../../drizzle/schema.js");

const insertNewProject = async (req, res) => {
  const body = req.body;
  if (!body["name"] || body["name"].trim() === "") {
    res.status(404).json({ message: "Invalid project Name" });
    return;
  }
  try {
    const result = await insertProject(body);
    return res
      .status(201)
      .json({ message: "Project created", project: result });
  } catch (err) {
    console.error("Error inserting project:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const getAllProjects = async (req, res) => {
  let offset = req.query.page ? (req.query.page - 1) * 10 : 0;
  try {
    const result = await getAll(projectsTable, offset);
    if (result.length === 0) {
      return res.status(201).json({ message: "no projects found" });
    }
    return res.status(201).json(result);
  } catch (err) {
    console.error("Error getting projects:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

const upDateProject = async (req, res) => {
  let id = parseInt(req.params.id);

  try {
    const result = await upDateProjectByID(id, req.body);
    res.status(200).json({
      message: `project ${id} successfully updated`,
      updatedProject: result,
    });
  } catch (err) {
    res.status(500).json({ message: `Error updating project id ${id}` });
    console.log(`Error updating project id ${id}`, err.message);
    return;
  }
};

const findProjectById = async (req, res) => {
  let id = parseInt(req.params.id);

  try {
    const result = await findById(projectsTable, id);
    if (result.length === 0) {
      res.status(200).json({ message: `No project in Database for id ${id}` });
      return;
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: `Error getting project id ${id}` });
    console.log(`Error getting project id ${id}`, err.message);
    return;
  }
};

const updateFieldInProjects = async (req, res) => {
  let id = req.params.id;
  let field = req.body;

  try {
    const result = await updateField(field, id);

    return result.changes > 0
      ? res.status(200).json({ message: `Project ${id} successfully updated` })
      : res
          .status(200)
          .json({ success: false, message: "No matching record found." });
  } catch (err) {
    res.status(500).json({ message: `Error updating project id ${id}` });
    console.log(`Error updating project id ${id}`, err.message);
    return;
  }
};
const deleteProjectById = async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    const result = await deleteById(projectsTable, id);
    res.status(200).json({ message: "successfully deleted." });
    return result.rowsAffected > 0
      ? { success: true, message: `Deleted project row by id ${id}  .` }
      : { success: false, message: "No matching record found." };
  } catch (err) {
    res.status(500).json({ message: "Error deleting" });
    console.log("error deleting : ", err.message);
  }
};

module.exports = {
  insertNewProject,
  getAllProjects,
  deleteProjectById,
  upDateProject,
  findProjectById,
  updateFieldInProjects,
};
