const express = require("express")
const port = 1008

const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded());

let students = [
    {id:1,name:"raj",city:"Rajkot"},
    {id:2,name:"jay",city:"Rajkot"},
    {id:3,name:"harsh",city:"Rajkot"}
]

app.get("/",(req,res)=>{
    res.render("index",{students});
})

app.post("/addData",(req,res)=>{
    req.body.id = students.length+1;
    students.push(req.body)
    res.redirect("/");
})

app.get("/deleteData",(req,res)=>{
    let data = students.filter(item=>item.id != req.query.id);
    students = data;
    res.redirect("/");
})

app.get("/editData/:id",(req,res)=>{
    let data = students.find(item=>item.id == req.params.id);
    res.render("edit",{data});
})

app.post("/updateData",(req,res)=>{
    students.forEach(item=>{
        if(item.id == req.body.id){
            item.name = req.body.name;
            item.city = req.body.city;
        }else{
            item
        }
    })
    res.redirect("/");
})

app.listen(port,(err)=>{
    err? console.log(err):console.log("Server Started at port ",+port);
})