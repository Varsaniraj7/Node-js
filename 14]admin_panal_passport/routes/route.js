const express = require("express");
const route = express.Router();
const ctl = require("../controller/firstCtl");
const multer = require("multer");
const passport = require("../middleware/passport")

const Storage = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname + "-"+ Date.now())
    }
})

const upload = multer({storage:Storage}).single("image")

route.get("/",ctl.admin);
route.post("/login",passport.authenticate("local",{failureRedirect:"/"}),ctl.adminLogin)
route.get("/logout",ctl.adminLogout)
route.get("/dashboard",passport.checkAuth,ctl.dashboard);
route.get("/addAdmin",ctl.addAdmin);
route.post("/addAdminData",upload,ctl.addAdminData);
route.get("/viewAdmin",ctl.viewAdmin);
route.get("/deleteAdmin/:id",ctl.deleteAdmin)
route.get("/editAdmin/:id",ctl.editAdmin);
route.post("/editAdminData",upload,ctl.editAdminData);

module.exports = route;