import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100svh',
      // backgroundColor: '#f5f5f5',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #ccc',
      borderRadius: '3px',
      fontSize: '16px',
      color:"white"
    },
    submitButton: {
      backgroundColor: '#ebca0f',
      color: '#000',
      border: 'none',
      borderRadius: '3px',
      padding: '10px 20px',
      fontSize: '1rem',
      cursor: 'pointer',
    },
  };
const Auth = () => {
    const [name,setName]=useState(null);
    // const []
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name)
        if(!name){
            window.alert("Please Enter Your Name")  
        }
        else{
            try {
              const res=await axios.post("http://localhost:5000/api/auth/register",{name})
              // const jsn=await res.json();
              console.log(res.data.slice(0,24))
              window.alert("Your Password  is "+res.data.slice(24,res.data.length));
              localStorage.setItem("wss_user_id",res.data.slice(0,24));
              navigate(`/${res.data}`);
            } catch (error) {
              console.log(error);
            }
        }
    }
    return (
        <div style={styles.container}>
          <form style={styles.form} >
            <input
              type="text"
              placeholder="Enter Name"
              style={styles.input}
              onChange={(e)=>setName(e.target.value)}
              required
            />
            <button type="submit" style={styles.submitButton} onClick={e=>{handleSubmit(e)}}>
              Submit
            </button>
          </form>
        </div>
      );
  }
  
  export default Auth