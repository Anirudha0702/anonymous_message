import{ useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import "../styles/writeMessage.css"
import {AiOutlineLoading3Quarters} from "react-icons/ai"
const WriteMessage = () => {
  const [message,setMessage]=useState("");
  const [msgLength,setMsgLength]=useState(0);
  const [processing,setProcessing]=useState(false);
  const locattion=useLocation();
  const navigate=useNavigate();
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
    setProcessing(true);
    try {
      const res=await axios.post(`${import.meta.env.VITE_APP_API}/api/message/post`,{
      message:message,
      id:locattion.pathname.slice(1,25)
  })
  console.log(res.data);
  setProcessing(false);
  navigate("/");
    } catch (error) {
      console.error(error)
      setProcessing(false);
    }
  }
  return (
    <div className='page-wrapper'>
      <h3>Your Secret Message</h3> 
      <div className='txt-area-wrpr'>
        <textarea onChange={(e)=>{handleEvent(e)}} placeholder='Enter your message' rows={10} cols={40} value={message}/>
        <div style={{'color':msgLength>200?'red':'white'}}>{`${msgLength}/200`}
        </div>
      <button type="submit" className="msg_post"onClick={e=>{handleSubmit(e)}}>
      {processing?<AiOutlineLoading3Quarters className="spinner"/>:"Submit"}
      </button>
      </div>
      <div className='text'>
      <ol className='notes_list'>
        <li>Let&apos;s play and have fun with aaa.</li>
        <li>Send your message secretly to aaa.</li>
        <li>To view message: Use that same Browser created the link.</li>
        <li>aaa will never know who message.</li>
      </ol>
    </div>
    </div>
  )
}

export default WriteMessage