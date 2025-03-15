const express = require("express");
const cors = require("cors");
const projectRouter = require("./app/rotutes/projects.js");
const taskRouter = require("./app/rotutes/tasks.js");
const commentsRouter = require("./app/rotutes/comments.js");
const app = express();

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

app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);
app.use("/comments", commentsRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting server", err.message);
    return;
  }
  console.log("server started at port", PORT);
});
