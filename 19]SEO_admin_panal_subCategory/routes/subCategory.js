const express = require("express");
const route = express.Router();
const ctl = require("../controller/subCategoryCtl")
const passport = require("../middleware/passport")

route.get("/addSubCategory",passport.checkAuth,ctl.addSubCategory)
route.post("/addSubCategory",passport.checkAuth,ctl.addSubCategoryData)
route.get("/viewSubCategory",passport.checkAuth,ctl.viewSubCategory)

module.exports= route;