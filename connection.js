const mongoose =require("mongoose");
async function connectMongoDB(url) {
    return mongoose.connect(url)
    .then(()=>console.log("MongoDB connected "))
    .catch((err)=>console.log("MogoDB Error",err));
    
}

module.exports={
    connectMongoDB,
}