const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(
  cors({
    exposedHeaders: ["Content-Range"],
  })
);
app.use(express.json());

app.use("/users", userRoutes);

module.exports = app;
