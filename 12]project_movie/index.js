const express = require("express");
const port = 1008;
const path = require("path")

const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/",require("./routes/route")); 

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started at port ", +port)
})