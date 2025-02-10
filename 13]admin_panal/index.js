const express = require("express");
const port = 1008;
const path = require("path");

const app = express();

app.set("view engine","ejs");
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,"public")))

app.use("/",require("./routes/route"));
// app.use("/addAdmin",require("./routes/route"));

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started at port ", +port)
})