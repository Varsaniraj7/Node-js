const express = require("express");
const port = 1008;

const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded());

let list = [
    {id: 1, title: "Morning", detail: "wake up at 7 o'clock"},
    {id: 2, title: "Afternoon", detail: "have lunch at 1 o'clock"},
    {id: 3, title: "Evening", detail: "go for a walk at 6 o'clock"}
]

app.get("/",(req,res)=>{
    res.render("index",{list});
})

app.post("/addData",(req,res)=>{
    req.body.id = list.length+1;
    list.push(req.body);
    console.log(req.body);
    
    res.redirect("/");
})

app.get("/deleteData",(req,res)=>{
    let data = list.filter(item=>item.id != req.query.id);
    list = data;
    res.redirect("/")
})

app.get("/editData",(req,res)=>{
    let data = list.find(item=>item.id == req.query.id);
    console.log(data);
    res.render("edit",{data})
})

app.post("/updateData",(req,res)=>{
    list.forEach(item=>{
        if (item.id == req.body.id) {
            item.title = req.body.title;
            item.detail = req.body.detail;
        } else {
            item;
        }
    })
    res.redirect("/")
})

app.listen(port,(err)=>{
    err?console.log(err):console.log("Server Started at port ",+port);
})