const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors= require("cors");
const session = require("express-session");

const userRoutes = require("./routes/user");
const propsRoutes = require("./routes/properties");

const app = express();

app.use(session({
  name: 'name.sid',
  resave: false,
  saveUninitialized: false,
  secret: 'secret',
  cookie:{
    mayAge: 36000000,
    httpOnly: false,
    secure: true
  }
}));

app.use(cors({
  origin:['http://localhost:4200', 'http://127.0.0.1:4200'],
  credentials: true
}));

mongoose
  .connect(
    "mongodb+srv://Admin:Admin@cluster0-fwp6n.azure.mongodb.net/house-manager",
    {useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join("backend/images")));

/*app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});*/

app.use("/api/props", propsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
