const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    detail:{
        type:String,
        required:true
    }
})

const firstSchema = mongoose.model("FirstDataBase",schema);

module.exports = firstSchema;   