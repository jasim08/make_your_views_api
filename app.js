const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");

const db = require("./dbconnection/db");

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

app.use("/api/v1/user", require("./routes/v1/user.routes"));

db.authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

app.listen(3000, () => {
  console.log("APP listening on port 3000");
});
