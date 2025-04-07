const express=require ("express");

const app=express();
const PORT = 8005;

const mongoose =require("mongoose");

const fs=require('fs');
const { type } = require("os");

const userRouter =require('./routes/user');

const {connectMongoDB}=require('./connection');

const {logReqRes}=require("./middlewares/index")

//connection
connectMongoDB("mongodb://127.0.0.1:27017/project-app-1");

app.use(express.urlencoded({extended : false}));
app.use(logReqRes("log.txt"));


//Routes
app.use("/api/users",userRouter);

app.listen(PORT,()=>{
    console.log(`server started on PORT :${PORT}`)
})