const express = require("express");
const port = 1008.
const db = require("./config/db")

const app = express();

app.use(express.urlencoded());
app.use("/",require("./routes/adminRoute"))

app.listen(port, (err) => {
    err ? console.log(err) : console.log("Server Started on port : " + port);
})