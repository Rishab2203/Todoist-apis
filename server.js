const express = require("express");
const cors = require("cors");
const projectRouter = require("./src/routes/projects.js");
const taskRouter = require("./src/routes/tasks.js");
const commentsRouter = require("./src/routes/comments.js");
const loginRouter = require("./src/routes/login.js");
const userRouter = require("./src/routes/user.js");
const { verifyToken } = require("./src/middleware/auth.js");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
const PORT = 5500;

let corsOptions = {
  origin: "http://localhost:5500",
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "connected" });
});

///////////////routes//////////////////

app.use("/login", loginRouter);
app.use(verifyToken);
app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);
app.use("/comments", commentsRouter);
app.use("/users", userRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting server", err.message);
    return;
  }
  console.log("server started at port", PORT);
});
