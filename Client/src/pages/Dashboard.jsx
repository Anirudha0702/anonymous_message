
import { useLocation} from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import WriteMessage from '../components/WriteMessage';
import AnonyousMessages from '../components/anonyousMessages';
const Dashboard = () => {

    const locattion=useLocation();
    const [isUserDivice,setIsuserDevice]=useState(null);
    const [userURL,setUserURL]=useState(null);
    const [messages,setMessages]=useState([]);
    
    useEffect(()=>{
      const wss_user_id=localStorage.getItem('wss_user_id');
      if(wss_user_id!==null && wss_user_id===locattion.pathname.slice(1,25)){
        setIsuserDevice(true);
        setUserURL(location.origin+locattion.pathname);
        const getMessages=async()=>{
          setMessages([]);
          try {
            const res=await axios.get(`${import.meta.env.VITE_APP_API}/api/message/getMsgs`,
            {params:{
            id:locattion.pathname.slice(1,25)
        }})
          setMessages(res.data);
          } 
          catch (error) {
            setMessages([]);
            console.log(error)
          }
        }
        getMessages();
      }
      else{
        setIsuserDevice(false);
      }  
    }, [locattion.pathname])
    
    if(isUserDivice){
      return (
        <AnonyousMessages messages={messages} userURL={userURL}/>
      )
    }
  return (
    <WriteMessage/>
  )
}

export default Dashboard;