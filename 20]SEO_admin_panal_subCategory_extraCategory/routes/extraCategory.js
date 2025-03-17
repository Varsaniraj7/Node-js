const express = require("express");
const route = express.Router();
const ctl = require("../controller/extraCategoryCtl")
const passport = require("../middleware/passport");

route.get("/addExtraCategory",passport.checkAuth,ctl.addExtraCategory);
route.post("/addExtraCategory",passport.checkAuth,ctl.addExtraCategoryData);
route.get("/viewExtraCategory",passport.checkAuth,ctl.viewExtraCategory);

module.exports=route;