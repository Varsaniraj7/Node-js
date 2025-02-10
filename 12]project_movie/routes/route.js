const ctl = require("../controller/firstCtl");
const express = require("express");
const route = express.Router();
const multer = require("multer");
 
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now())
    }
})

const upload = multer({ storage: Storage }).single("img");

route.get("/",ctl.home);
route.get("/addMovie",ctl.addMovie);
route.post("/addMovieData",upload,ctl.addMovieData);
route.get("/deleteMovie/:id",ctl.deleteMovie)
route.get("/editMovie/:id",ctl.editMovie)
route.post("/updateMovieData",upload,ctl.updateMovieData);

module.exports = route;