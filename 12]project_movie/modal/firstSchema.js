const mongoose = require("mongoose");

const schema = mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    time:{
        type:String,
        require:true
    },
    img:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    }
})

const firstSchema = mongoose.model("Add-Movie",schema);
module.exports = firstSchema;