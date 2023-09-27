
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/messagelist.css"
const MessageList = () => {
    // const ID_=window.location.href.slice(0,24);
    const [message,setMessage]=useState(null);
    const [msgLength,setMsgLength]=useState(0);
    const locattion=useLocation();
    const [isUserDivice,setIsuserDevice]=useState(null);
    const [userURL,setUserURL]=useState(null);
    useEffect(()=>{
      const wss_user_id=localStorage.getItem('wss_user_id');
      console.log(location.origin)
      if(wss_user_id!==null && wss_user_id===locattion.pathname.slice(1,25)){
        setIsuserDevice(true);
        setUserURL(location.origin+locattion.pathname);
      }
      else{
        setIsuserDevice(false);
      }
    }, [locattion.pathname])
    const handleEvent=(e)=>{
      setMessage(e.target.value);
      setMsgLength(e.target.value.length);
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
        const res=await axios.post('http://localhost:5000/api/message/post',{
        message:message,
        id:locattion.pathname.slice(1,25)
    })
    console.log(res.data.message);
    setMsgLength(res.data.message);
      } catch (error) {
        console.log(error)
      }
    }
    if(isUserDivice){
      return (
        <div className='wrapper'>
          <div className='user_link'>
            <span className='link'>{userURL}</span>
          </div>
          <div className='text'></div>
        </div>
      )
    }
  return (
    <>
    <div className='txt-area-wrpr'>
      <textarea onChange={(e)=>{handleEvent(e)}} placeholder='Enter your message' rows={10} cols={40}/>
<div>{msgLength}</div>
    </div>
    <button type="submit" onClick={e=>{handleSubmit(e)}}>Submit</button>
    </>
  )
}

export default MessageList