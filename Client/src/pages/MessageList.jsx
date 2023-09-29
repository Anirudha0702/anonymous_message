
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import{BsWhatsapp} from 'react-icons/bs'
import{LiaCopySolid} from 'react-icons/lia'
import "../styles/messagelist.css"
import {writeText} from 'clipboard-polyfill';
const MessageList = () => {
    const [message,setMessage]=useState("");
    const [msgLength,setMsgLength]=useState(0);
    const locattion=useLocation();
    const navigate=useNavigate();
    const [isUserDivice,setIsuserDevice]=useState(null);
    const [userURL,setUserURL]=useState(null);
    const [messages,setMessages]=useState([]);
    
    const copyLink=()=>{
      writeText(userURL)
      .then(() => {
        window.alert("Link Copied");
      })
      .catch(err => {
        window.alert(" failLink Copied");
      });
      
    }
    const share_wp=()=>{
      const wp_url="https://api.whatsapp.com/send?text="+userURL;
      window.open(wp_url);
    }
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
    const handleEvent=(e)=>{
      if(msgLength<200){  
        setMessage(e.target.value);
        setMsgLength(e.target.value.length);
      }else{
        window.alert("You can't send more than 200 characters");
      }
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
      try {
        const res=await axios.post(`${import.meta.env.VITE_APP_API}/api/message/post`,{
        message:message,
        id:locattion.pathname.slice(1,25)
    })
    console.log(res.data);
    navigate("/");
      } catch (error) {
        console.log(error)
      }
    }
    if(isUserDivice){
      return (
        <div className='wrapper'>
          <div className='gif_celeb'></div>
          <h3 >Your link has been generated Successfully</h3>
          <h4>Now share your link with your friends:</h4>
          <div className='user_link'>
            {userURL}
          </div>
          <div className="button_wrapper">
            <button onClick={share_wp}>SHARE ON WHATSAPP <BsWhatsapp className="wp_logo logo"/></button>
            <button onClick={copyLink}>COPY LINK <LiaCopySolid className='copy_logo logo'/></button>
          </div>
          <div className='text'>
            <ol className='notes_list'>
              <li>Copy and share your link to instagram, facebook and twitter.</li>
              <li>You can take sceenshot and share your unknown message on whatsapp and etc.</li>
              <li>To view message: Use that same Browser you created the link.</li>
              <li>Scroll down to check your received messages.</li>
            </ol>
          </div>
          <div className='messages'>
            <h3 className='heading'>Your Messages</h3>
            {
              messages.length!==0 ? 
              messages.map((message,key)=>{
                return(
                  <div className='_message' key={key}>
                    <div className='message_text'>{message.message}</div>
                    <div className='message_time'>{new Date(message.createdAt).toLocaleString()}</div>
                  </div>
                )})
              
              :(<h3>No Messages🥲</h3>)
            }
          </div>
        </div>
      )
    }
  return (
    <div className='page-wrapper'>
      <h3>Your Secret Message</h3> 
      <div className='txt-area-wrpr'>
        <textarea onChange={(e)=>{handleEvent(e)}} placeholder='Enter your message' rows={10} cols={40} value={message}/>
        <div style={{'color':msgLength>200?'red':'white'}}>{`${msgLength}/200`}
        </div>
      <button type="submit" className="msg_post"onClick={e=>{handleSubmit(e)}}>Send</button>
      </div>
      <div className='text'>
      <ol className='notes_list'>
        <li>Let's play and have fun with aaa.</li>
        <li>Send your message secretly to aaa.</li>
        <li>To view message: Use that same Browser created the link.</li>
        <li>aaa will never know who message.</li>
      </ol>
    </div>
    </div>
  )
}

export default MessageList;