const mongoose = require("mongoose");

const schema = mongoose.Schema({
    fname:{
        type:String,
        require:true
    },
    lname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    scity:{
        type:String,
        require:true
    },
    // image:{
    //     type:String,
    //     require:true
    // },
    gender:{
        type:String,
        require:true
    },
    hobby:{
        type:Array,
        require:true
    }
})

const firstSchema = mongoose.model("Add-admin",schema);
module.exports = firstSchema;