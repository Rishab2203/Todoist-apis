const express = require("express");
const cors = require("cors");
const projectRouter = require("./app/rotutes/projects.js");
const taskRouter = require("./app/rotutes/tasks.js");
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

app.use("/projects", projectRouter);
app.use("/tasks", taskRouter);

app.get("/testing", (req, res) => {
  console.log(req.params);
  res.status(200).send("hn hn thik");
});

///////////////routes//////////////////

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error starting server", err.message);
    return;
  }
  console.log("server started at port", PORT);
});
