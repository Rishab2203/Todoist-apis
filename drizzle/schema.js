const { sql } = require("drizzle-orm");
const {
  check,
  sqliteTable,
  text,
  integer,
} = require("drizzle-orm/sqlite-core");

const usersTable = sqliteTable("users_table", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});

const projectsTable = sqliteTable(
  "projects",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("project_name"),
    color: text("color"),
    is_favourite: integer("is_favourite").default(0),
    user_id: integer("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
  },
  (table) => [check("is_favourite_check", sql`${table.is_favourite} In  (0,1)`)]
);

const tasksTable = sqliteTable(
  "tasks",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    content: text("content"),
    description: text("description"),
    created_at: text("created_at").default(sql`(CURRENT_DATE)`),
    project_id: integer("project_id")
      .notNull()
      .references(() => projectsTable.id, { onDelete: "cascade" }),
    completed: integer("completed").default(0),
    due_date: text("created_at"),
  },
  (table) => [check("completed_check", sql`${table.completed} In (0,1)`)]
);

const commentsTable = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  content: text("content"),
  posted_at: text("posted_at").default(sql`(CURRENT_DATE)`),
  project_id: integer("project_id")
    .notNull()
    .references(() => projectsTable.id, { onDelete: "cascade" }),
  task_id: integer("task_id")
    .notNull()
    .references(() => tasksTable.id, { onDelete: "cascade" }),
});

module.exports = { usersTable, projectsTable, commentsTable, tasksTable };
