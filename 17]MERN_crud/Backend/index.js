const express = require("express");
const port = 1008;
const db = require("./config/db");
const cors = require("cors");

const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors({origin:"http://localhost:5173"}))

app.use("/",require("./routes/route"));

app.listen(port,(err)=>{
    err?console.log(err):console.log("Server Started : "+port);
})