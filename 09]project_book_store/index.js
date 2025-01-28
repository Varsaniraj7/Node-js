const express = require("express");
const port = 1008;
const db = require("./config/db");
const schema = require("./modal/firstSchema");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded());

app.get("/", async (req, res) => {
    await schema.find({}).then((data) => {
        console.log(data);
            res.render("index",{data});
        })
})

app.post("/addBook", async (req, res) => {
    await schema.create(req.body)
        .then(() => {
            res.redirect("/");
        })
})

app.get("/deleteBook",async(req,res)=>{
    await schema.findByIdAndDelete(req.query.id)
    .then(()=>{
        res.redirect("/")
    })
})

app.get("/editBook",async(req,res)=>{
    console.log(req.query.id);
    
    await schema.findById(req.query.id)
    .then((data)=>{
        res.render("edit",{data});
    })
})

app.post("/updateBook",async(req,res)=>{
    console.log(req.body.id);
    
    await schema.findByIdAndUpdate(req.body.id,req.body)
    .then(()=>{
        res.redirect("/");
    })
})


app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started at port ", +port)
})