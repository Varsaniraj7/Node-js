const express = require("express");
const route = express.Router();
const ctl = require("../controller/productCtl")

route.get("/addProduct",ctl.addProduct);

module.exports = route;