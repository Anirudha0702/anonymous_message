import { useState } from "react";
import axios from "axios";
import "../styles/auth.css";
import { useNavigate } from "react-router-dom";
import {AiOutlineLoading3Quarters} from "react-icons/ai"
const Auth = () => {
    const [name,setName]=useState(null);
    const navigate=useNavigate();
    const [processing,setProcessing]=useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name)
        setProcessing(true);
        if(!name){
            window.alert("Please Enter Your Name")  
        }
        else{
            try {
              const res=await axios.post(`${import.meta.env.VITE_APP_API}/api/auth/register`,{name})
              console.log(res.data.slice(0,24))
              window.alert("Your Password  is "+res.data.slice(24,res.data.length));
              localStorage.setItem("wss_user_id",res.data.slice(0,24));
              navigate(`/${res.data}`);
              
                setProcessing(false);

            } catch (error) {
              console.log(error);
              setProcessing(false);

            }
        }
    }
    return (
        <div className="container">
          <form  >
            <input
              type="text"
              placeholder="Enter Name"
              onChange={(e)=>setName(e.target.value)}
              required
            />
            <button type="submit" className="submitButton" onClick={e=>{handleSubmit(e)}} disabled={processing?true:false}>
              {processing?<AiOutlineLoading3Quarters className="spinner"/>:"Submit"}
            </button>
          </form>
        </div>
      );
  }
  
  export default Auth