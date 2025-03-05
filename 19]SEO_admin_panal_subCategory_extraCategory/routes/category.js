const express = require("express");
const route = express.Router();
const passport = require("../middleware/passport")
const ctl = require("../controller/categoryCtl")
const multer = require("../middleware/multer");

route.get("/addCategory",passport.checkAuth,ctl.addCategory);
route.post("/addCategory",passport.checkAuth,multer,ctl.addCategoryData);
route.get("/viewCategory",passport.checkAuth,ctl.viewCategory);
route.get("/editCategory/:id",passport.checkAuth,ctl.editCategory)
route.get("/deleteCategory/:id",passport.checkAuth,ctl.deleteCategory);
route.post("/editCategoryData",passport.checkAuth,multer,ctl.editCategoryData)

module.exports = route;