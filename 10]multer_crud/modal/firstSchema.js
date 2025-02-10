const mongoose = require("mongoose");

const schema = mongoose.Schema({
    image:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    publish:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    copies:{
        type:Number,
        require:true
    }
})

const firstSchema = mongoose.model("Add-Book",schema);
module.exports = firstSchema;