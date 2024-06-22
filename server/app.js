require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
require("./db/conn");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./routes/router");
const DefaultData = require("./defaultdata");
const app = express();

app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);

const port = process.env.PORT || 8005;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => {
  console.log(`server is running on port number ${port}`);
});

//DefaultData();
