const mongoose = require("mongoose");

const schema = mongoose.Schema({
    fname: {
        type: String,
        require: true
    },
    lname:{
        type:String,
        require:true
    },
    bdate:{
        type:String,
        require:true
    },
    gender:{
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
    pnumber:{
        type:Number,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    }
})

const adminSchema = mongoose.model("Admin",schema);
module.exports = adminSchema; 