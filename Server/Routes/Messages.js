const router=require("express").Router();
const User=require("../Models/User");
const Message=require("../Models/Message"); 


router.post("/post", async (req,res)=>{
    console.log(req.body.id)
    const msg=new Message(
        {
            message : req.body.message,
            link_host_id:req.body.id,
        }
        )
        console.log(msg)
    try {
        const newMsg=await msg.save();
        res.status(201).json(newMsg);

    } catch (error) {
        console.log(error)
    } 
});
module.exports=router; 