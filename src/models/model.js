const db = require("../db-config/db.js");
const {
  projectsTable,
  usersTable,
  tasksTable,
  commentsTable,
} = require("../../drizzle/schema.js");
const { sql, eq, like, and } = require("drizzle-orm");
const getAll = async (tableName, offset = 0) => {
  try {
    const result = await db.select().from(tableName).limit(10).offset(offset);
    return result;
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to get projects");
  }
};

const insertUser = async ({ name, email }) => {
  try {
    const result = await db
      .insert(usersTable)
      .values({
        name: name,
        email: email,
      })
      .returning();
    return result[0];
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to insert project");
  }
};

const insertProject = async ({
  name,
  color = null,
  user_id,
  is_favourite = 0,
}) => {
  try {
    const result = await db
      .insert(projectsTable)
      .values({
        name: name,
        color: color,
        user_id: user_id,
        is_favourite: is_favourite,
      })
      .returning();
    return result[0];
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to insert project");
  }
};

const insertTask = async (
  {
    content,
    description = null,
    project_id,
    // created = getCurrentDate(),
    completed = 0,
    due_date = null,
  },
  cb
) => {
  try {
    const result = await db
      .insert(tasksTable)
      .values({
        content: content,
        description: description,
        project_id: project_id,
        completed: completed,
        due_date: due_date,
      })
      .returning();
    return result[0];
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to insert task");
  }
};

const findById = async (tableName, id) => {
  try {
    const result = await db
      .select()
      .from(tableName)
      .where(eq(tableName.id, id));
    return result;
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to get project");
  }
};

const deleteById = async (tableName, id) => {
  try {
    const result = await db.delete(tableName).where(eq(tableName.id, id));
    return result;
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to delete project");
  }
};

const upDateProjectByID = async (
  id,
  { name, color = null, is_favourite = 0 }
) => {
  try {
    const result = await db
      .update(projectsTable)
      .set({ name: name, color: color, is_favourite: is_favourite })
      .where(projectsTable.id.eq(id))
      .returning();
    return result;
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to update project by id", id);
  }
};

const upDateTasksByID = async (
  id,
  {
    content,
    description = null,
    project_id,
    // created_at = getCurrentDate(),
    completed = 0,
    due_date = null,
  }
) => {
  try {
    const result = await db
      .update(tasksTable)
      .set({
        content: content,
        description: description,
        project_id: project_id,
        completed: completed,
        due_date: due_date,
      })
      .where(eq(tasksTable.id, id))
      .returning();
    return result;
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to update task by id", id);
  }
};

const findByFilters = async (filters, offset) => {
  const conditions = Object.entries(filters)
    .map(([key, value]) => {
      if (key === "project_id")
        return eq(tasksTable.project_id, parseInt(value));
      if (key === "completed") return eq(tasksTable.completed, parseInt(value));
      if (key === "content")
        return like(tasksTable.content, `%${value.replace(/"/g, "")}%`);
      if (key === "id") return eq(tasksTable.id, parseInt(value));
      if (key === "description")
        return like(tasksTable.description, `%${value.replace(/"/g, "")}%`);
      if (key === "created_at")
        return eq(tasksTable.created_at, `%${value.replace(/"/g, "")}%`);
      if (key === "due_date")
        return eq(tasksTable.due_date, `%${value.replace(/"/g, "")}%`);
      return null;
    })
    .filter(Boolean);

  try {
    const result = await db
      .select()
      .from(tasksTable)
      .where(and(...conditions))
      .limit(10)
      .offset(offset);
    return result;
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to get tasks");
  }
};

async function updateField(field, id) {
  try {
    const result = await db
      .update(projectsTable)
      .set(field)
      .where(eq(projectsTable.id, id));

    return result;
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to update project");
  }
}

async function insertComment({ project_id, task_id = null, content }) {
  try {
    const result = await db
      .insert(commentsTable)
      .values({
        project_id: project_id,
        task_id: task_id,
        content: content,
      })
      .returning();
    return result[0];
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to insert comment");
  }
}

const upDateComments = async (
  id,
  { project_id, task_id, content, posted_at = getCurrentDate() },
  cb
) => {
  try {
    const result = await db
      .update(commentsTable)
      .set({
        content: content,
        task_id: task_id,
        project_id: project_id,
        posted_at: posted_at,
      })
      .where(eq(commentsTable.id, id))
      .returning();
    return result;
  } catch (err) {
    console.error("Database error:", err);
    throw new Error("Failed to update task by id", id);
  }
};

function getCurrentDate() {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

module.exports = {
  upDateProjectByID,
  upDateTasksByID,
  insertTask,
  insertProject,
  deleteById,
  getAll,
  findById,
  getCurrentDate,
  findByFilters,
  updateField,
  insertComment,
  upDateComments,
  insertUser,
};
