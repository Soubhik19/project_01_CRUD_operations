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


//Middleware  --as of now we use it as a plugin 
app.use(express.urlencoded({extended:false}));

//middleware 
app.use((req,res,next)=>{
    console.log("Hello from middleware 1");
    req.myUsername ="Soubhik";
    next();
})

app.use((req,res,next)=>{
    console.log("Hello from middleware 2",req.myUsername);
    next();
})


//for html rendeering 
app.get("/users",async(req,res)=>{
    const allDbUsers =await User.find({});
    const html=`
    <ul>
    ${allDbUsers.map((user)=>`<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>`
    res.send(html);
})


app.get("/api/users",async(req,res)=>{            //when we read the JSON details of the user we rout on /api/users
    const allDbUsers =await User.find({});
    return res.json(allDbUsers);
})

//REST API
app.get("/api/users/:id",async(req,res)=>{       //specifically for find an JSON id details
const user =await User.findById(req.params.id);
if(!user)return res.status(404).json({error: "user not found on databse"});
return res.json(user);
})

//POST
//create any user
app.post("/api/users",async(req,res)=>{
    const body=req.body; //frontend se data uthayenge
    if(
       !body ||
       !body.first_name ||
       !body.last_name ||
       !body.email ||
       !body.gender ||
       !body.jobTitle 
    ) {
        return res.status(400).json({msg:"All fields are required"});
    }
const result =await User.create({
    firstName : body.first_name,
    lastName : body.last_name,
    email : body.email,
    gender :body.gender,
    jobTitle :body.jobTitle,
});
return res.status(201).json({ status: "success"});
 /*   users.push({...body,id:users.length+1});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        return res.json({status:"success",id:users.length})
    })*/
    
})
//Patch
app.patch("/api/users/:id",async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{lastName : "Changed"});
    return res.json({status:"Success"})
})
//Delete
app.delete("/api/users/:id",async(req,res)=>{
await User.findByIdAndDelete(req.params.id)
    return res.json({status:"successfullly deleted"})
});  









app.listen(PORT,()=>{
    console.log(`server started on PORT :${PORT}`)
})