const express = require("express");
const route = express.Router();
const passport = require("../middleware/passport")
const ctl = require("../controller/productCtl")

const multer = require("multer");

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now());
    }
})

const upload = multer({storage:Storage}).single("productImage");



route.get("/addProduct",passport.checkAuth,ctl.addProduct);
route.post("/addProduct",passport.checkAuth,upload,ctl.addProductData);
route.get("/viewProduct",passport.checkAuth,ctl.viewProduct);

module.exports = route;