require("dotenv").config();
const express = require("express");
const db = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

db();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const userRoutes = require("./routes/User");
const notesRoutes = require("./routes/Notes");
app.use("/api/user", userRoutes);
app.use("/api/notes", notesRoutes);

app.listen(port, () => {
  console.log(`app running`);
});
