import React, { useState } from 'react';
import './login.scss';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';


const VerifyEmail = () => {
 
  const [email, setEmail] = useState('');
    //for the restriction - we cant go to another page using back button of the website
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    }; 
  
  // const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Email submitted:', email);

   
  

  const payload = {
     eventID:"1001",
     addInfo:{
       email:email
     }
  };

  try {
    const response = await axios.post('http://localhost:5164/generate', payload);
    const res = response.data.result.rData.rMessage;

    if (res === 'OTP sent successfully') {
      alert(res);
      // navigate('/forgotpassword');
    } else {
      alert(res || 'Failed to send OTP');
    }
  } catch (error) {
    console.error('Error sending OTP:', error);
    alert('Error sending OTP. Please try again.');
  }
  }
  return (
    <div className="login-page">
      <div className="left-section">
        <div className="logo">EMAIL VERIFICATION</div>
        <img src="./images/loginPhoto.png" alt="login" className="loginimage" />
      </div>
      <div className="right-section">
        <div className="login-container">
          <h2>Enter Your Email ID</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              Email Address*
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </label>
            <button type="submit" className="login-button">Send</button>
            <Link to="/otpverify">
            <button type="submit" className="button2">Verify</button>
            </Link>
          </form>
        </div>
     </div>
     </div>

  )
}

export default VerifyEmail