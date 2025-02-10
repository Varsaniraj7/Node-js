const express = require("express");
const port = 1008;
const db = require("./config/db");
const schema = require("./modal/firstSchema");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now())
    }
})

const upload = multer({ storage: Storage }).single("image");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", async (req, res) => {
    await schema.find({}).then((data) => {
        res.render("index", { data });
    })
})

app.post("/addBook", upload, async (req, res) => {
    req.body.image = req.file.path;
    await schema.create(req.body)
        .then(() => {
            res.redirect("/");
        })
})

app.get("/deleteBook", async (req, res) => {
    let singleData = await schema.findById(req.query.id);
    fs.unlinkSync(singleData.image)
    await schema.findByIdAndDelete(req.query.id)
        .then(() => {
            res.redirect("/")
        })
})

app.get("/editBook", async (req, res) => {
    await schema.findById(req.query.id)
        .then((data) => {
            res.render("edit", { data });
        })
})

app.post("/updateBook", upload , async (req, res) => {
    let singleData = await schema.findById(req.body.id);
    let img;
    req.file ? img=req.file.path : img = singleData.image;
    console.log(img);
    
    req.file && fs.unlinkSync(singleData.image)
    req.body.image = img;
    await schema.findByIdAndUpdate(req.body.id, req.body)
        .then(() => {
            res.redirect("/");
        })
})


app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started at port ", +port)
})