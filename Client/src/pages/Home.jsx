import Typewriter from "typewriter-effect";
import "../styles/home.css"
import image_chat from '../assets/logo-notext.png'
import { Link } from "react-router-dom";
const Home = () => {

  return (
    <div className="home">
    <div className="logo-wrapper">
        <img src={image_chat} alt=""/>
    </div>
    <div className="title">
      <i>Wanna Share Something??</i>
      </div>
      <div className="sub_title">
      <b>Get Anonymous &nbsp;
        <span className="typewriter"><Typewriter
          options={{
            strings: [' Advices.', ' Compliements.', ' Confessions.', ' Secrets.'],
            autoStart: true,
            loop: true,
          }}
        /></span>
       </b>
    </div>
    <Link to="/auth"><button type="submit">Create Your Link</button></Link>
    </div>
  )
}

export default Home