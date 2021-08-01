const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const URI = process.env.MONGODB_URI;

mongoose.connect(URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Connected to MongoDB :)");
});

const fortuneRoute = require("./routes/fortunes");
app.use("/api/fortunes", fortuneRoute);

app.use(express.static(path.resolve(__dirname, "../client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client"), "build", "index.html");
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
