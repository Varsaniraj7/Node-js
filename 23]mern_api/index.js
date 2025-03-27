const express = require("express");
const port = 1008.
const db = require("./config/db")
const cookie = require("cookie-parser");
const path = require("path")

const session = require("express-session")

const app = express();

app.use(session({
    name: "local",
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge:100*100*60 }
}));

app.use(cookie());
app.use(express.json());
app.use(express.urlencoded());
app.use("/",require("./routes/adminRoute"))
app.use("/manager",require("./routes/managerRoute"))
app.use("/employee",require("./routes/employeeRoute"))


app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started on port : " + port);
})