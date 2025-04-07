const express=require ("express");
const app=express();
const mongoose =require("mongoose");
const PORT = 8005;
//const users =require("./MOCK_DATA.json");
const fs=require('fs');
const { type } = require("os");


//connection
mongoose.connect('mongodb://127.0.0.1:27017/project-app-1')
.then(()=>console.log("MongoDB connected "))
.catch((err)=>console.log("MogoDB Error",err));





app.listen(PORT,()=>{
    console.log(`server started on PORT :${PORT}`)
})