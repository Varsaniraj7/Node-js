const express  = require("express");
const route = express.Router();
const ctl = require("../controllers/ctl");

const multer = require("multer");

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
})

const upload = multer({storage:Storage}).single("adminImage");



route.post("/addAdmin",upload,ctl.addAdmin);
route.get("/viewAdmin",ctl.viewAdmin);
route.delete("/deleteAdmin/:id",ctl.deleteAdmin);
route.put("/editAdmin/:id",upload,ctl.editAdmin);

module.exports = route;