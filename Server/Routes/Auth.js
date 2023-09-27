const router=require("express").Router();
const User=require("../Models/User");


router.post("/register", async (req,res)=>{
    const user = new User({
        username: req.body.name,
        password: Math.floor(Math.random() * Date.now()).toString(36),
    });
    try{
        const savedUser = await user.save();
        const link_part=`${savedUser._id}${savedUser.password}`;
        res.status(201).json(link_part);
    }catch(err){
        res.json({message: err});
    }
});
module.exports=router;