const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Cookie parser
app.use(cookieParser());

// Load env vars
dotenv.config({ path: "./config.env" });

// user routes
app.use("/api/user", require("./routes/userAuth"));

// vendor routes
app.use("/api/vendor", require("./routes/vendorAuth"));

// error handler middleware
app.use(errorHandler);

// static folder
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// server port
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`); //import port from config.env
});
