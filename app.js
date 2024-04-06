require("dotenv").config("./env");
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const db = require("./dbconnection/dbmyt");

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use(express.static("public"));
app.use("/api/v1/user", require("./routes/v1/user.routes"));
app.use("/api/v1/links", require("./routes/v1/links.routes"));
app.use("/api/v1/myt", require("./routes/v1/mytsetup.routes"));

app.use("/static", express.static(path.join(__dirname, "public")));

db.authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

app.listen(process.env.PORT, () => {
  console.log(`APP listening on port ${process.env.PORT}`);
});
