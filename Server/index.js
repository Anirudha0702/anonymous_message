const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute=require("./Routes/Auth");
const messageRoute=require("./Routes/Messages");
const cors = require("cors");




dotenv.config();
const app = express();

app.use(cors({
    origin: "*",
    methods : ["GET", "POST","DELETE","PUT"],
    credentials: true
}))


main().catch(err => console.log(err))
async function main(){
    mongoose.set("strictQuery", false)
    await mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology : true})
    .then(()=> console.log("DataBase is running!"))
    .catch(err => console.log(err))
}

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute)
app.get("/",(req,res)=>{
    console.log("API is running")
    res.json({ user: 'geek' });
})
app.get("/:id",(req,res)=>{
    res.json({ user: req.params.id });
    console.log(req.params.id)
})

app.listen(process.env.PORT||5173, ()=>{
    console.log("The server is running !!",process.env.PORT)
})
 


