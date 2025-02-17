const express = require("express");
const port = 1008;
const db = require("./config/db");
const path = require("path");

const app = express();

const cookie = require("cookie-parser")

app.set("view engine","ejs")
app.use(cookie())
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,"public")))
app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.use("/",require("./routes/route"))

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started at port ", +port)
})