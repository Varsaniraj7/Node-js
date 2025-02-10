const ctl = require("../controller/firstCtl");
const express = require("express");
const route = express.Router();

route.get("/",ctl.dashboard);
route.get("/addAdmin",ctl.addAdmin);
route.post("/addAdminData",ctl.addAdminData);

module.exports = route;