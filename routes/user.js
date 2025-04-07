const express=require ("express");

//create a router 
const router =express.Router();


router.get("/",async(req,res)=>{            //when we read the JSON details of the user we rout on /api/users
    const allDbUsers =await User.find({});
    return res.json(allDbUsers);
})

//REST API
router.get("/:id",async(req,res)=>{       //specifically for find an JSON id details
const user =await User.findById(req.params.id);
if(!user)return res.status(404).json({error: "user not found on databse"});
return res.json(user);
})

//POST
//create any user
router.post("/",async(req,res)=>{
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
router.patch("/:id",async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{lastName : "Changed"});
    return res.json({status:"Success"})
})
//Delete
router.delete("/:id",async(req,res)=>{
await User.findByIdAndDelete(req.params.id)
    return res.json({status:"successfullly deleted"})
});  

//export
module.exports =router;



