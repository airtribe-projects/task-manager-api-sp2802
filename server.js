const express = require("express");
const bodyParser = require("body-parser")
const taskRoutes = require("./src/routes/taskRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/tasks", taskRoutes);

app.listen(PORT, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

module.exports = app;
