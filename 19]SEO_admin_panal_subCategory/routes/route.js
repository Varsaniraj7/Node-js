const express = require("express");
const route = express.Router();
const ctl = require("../controller/firstCtl");
const multer = require("multer");
const passport = require("../middleware/passport")

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
})

const upload = multer({storage:Storage}).single("image");

route.get("/",ctl.login)
route.post("/login",
    passport.authenticate("local",{failureRedirect:"/"})
    ,ctl.adminLogin);
route.get("/logout",ctl.adminLogout);
route.get("/dashboard", passport.checkAuth,ctl.dashboard);
route.get("/addAdmin", passport.checkAuth,ctl.addAdmin);
route.post("/addAdminData",upload, ctl.addAdminData);
route.get("/viewAdmin",passport.checkAuth,ctl.viewAdmin);
route.get("/deleteAdmin/:id",passport.checkAuth,ctl.deleteAdmin);
route.get("/editAdmin/:id",passport.checkAuth,ctl.editAdmin);
route.post("/editAdminData",upload, ctl.editAdminData);
route.get("/AdminProfile",passport.checkAuth,ctl.AdminProfile);
route.get("/changePass",passport.checkAuth,ctl.changePass);
route.post("/changePass",passport.checkAuth,ctl.changePassword);

route.get("/forgetpassword",ctl.forgetpassword)
route.post("/forgotpassword",ctl.forgotpassword)

route.get("/forgototp",ctl.forgototp);
route.post("/resetpassword",ctl.resetpassword)

module.exports = route;