const http = require("http")
const port = 1008

const portHandler = (req,res)=>{
    res.write("<h1>Server Started</h1>")
    res.end();
}

const server = http.createServer(portHandler)

server.listen(port,(err)=>{
    err?console.log(err):console.log("Server Started on port : "+port);
})