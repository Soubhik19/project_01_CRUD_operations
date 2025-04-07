const mongoose =require("mongoose");



// Schema 
const userSchema =new mongoose.Schema({
    firstName:{
        type:String,
        required : true,
    },lastName:{
        type:String,
    },email:{
        type:String,
        required :true,
        unique:true,
    },jobTitle:{
        type:String,
    },gender:{
        type: String,
    },
},{
    timestamps:true,
});

//schema to model
const User =mongoose.model("user",userSchema);

//export the modules

module.exports =User;