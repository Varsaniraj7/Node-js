const mongoose = require("mongoose");

const schema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        require:true,
        minlength:6,
    },
    profilePic:{
        type:String,
        default:"",
    }
},{timestamps:true});

const userSchema = mongoose.model("User",schema);

module.exports=userSchema;