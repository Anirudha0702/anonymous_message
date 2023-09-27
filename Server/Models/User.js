const mongoose=require("mongoose");

const UserSchema = new mongoose.Schema({
    username : {type: String, required: true},
    password : {type: String, required: true},
    Link: {type: String,default:null},
},{timestamps: true})
module.exports = mongoose.model("User", UserSchema);