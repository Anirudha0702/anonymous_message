import {writeText} from 'clipboard-polyfill';
import{BsWhatsapp} from 'react-icons/bs'
import{LiaCopySolid} from 'react-icons/lia'
import "../styles/anonymousMessage.css"
const AnonyousMessages = ({messages,userURL}) => {
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

export default AnonyousMessages