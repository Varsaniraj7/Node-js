const mongoose = require("mongoose");

const schema = mongoose.Schema({
    city:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    }
})

const firstSchema = mongoose.model("Data",schema);
module.exports = firstSchema;