const express = require("express");
const route = express.Router();
const adminCtl = require("../controllers/adminCtl");

route.post("/registerAdmin",adminCtl.registerAdmin);
route.post("/loginAdmin",adminCtl.loginAdmin);

module.exports = route;