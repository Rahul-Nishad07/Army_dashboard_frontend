import React, { useState } from 'react'

import axios from 'axios'

import './login.scss';

import { Link, useNavigate } from 'react-router-dom';

const Soldier = () => {

  const navigate = useNavigate();
    //for the restriction - we cant go to another page using back button of the website
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    }; 

    const [formData,setFormData] =useState({
      email:'',
       password:''
    });

    const handleSubmit = async (e) =>{
      e.preventDefault();
      const payload = {
          eventID: "1001",
          addInfo: {
           
              email: formData.email,
              password: formData.password,
             
                 
          }
      };

      try {
        const response = await axios.post('http://localhost:5164/army_soldierlogin', payload);
        console.log('API Response:', response.data);
    
        const res = response.data.result.rData.rMessage;
    
        if (res === "login Successfull") {
            const token = response.data.result.rData.TOKEN;
            const userEmail  = response.data.result.rData.email;

            console.log('User Email:', userEmail); 
    
          
                // Store token and email in localStorage
                localStorage.setItem('currentUser', JSON.stringify({ token, email :userEmail }));
                console.log('Stored in localStorage:', localStorage.getItem('currentUser'));
    
                // Navigate to the next page after storing in localStorage
                navigate('/home2');
            } else {
                console.error('TOKEN or email is missing in the API response.');
                alert('An error occurred while processing login data.');
            }
        
    } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred. Please try again.');
    }
    
  }    
  
  return (
        <div className="login-page">
          <div className="left-section">
            <div className="logo">ARMY DASHBOARD</div>
            <img src="./images/loginPhoto.png" alt="login" className="loginimage" />
          </div>
          <div className="right-section">
            <div className="login-container">
              <h2>Welcome to Indian Army</h2>
              <p>Need an account? 
                <Link to="/signup">Sign up</Link>
                {/* <a href="#signup">Sign Up</a> */}
                </p>
              <div className="role-buttons">

                <Link to="/login">
                <button className="role-button">Admin</button>
                </Link>
                
                <button className="role-button">Soldier</button>
            
              </div>
              <form className="login-form"  onSubmit={handleSubmit}>
                <label>
                  Email*
                  <input type="email" placeholder=" Enter Your Email"   id="email"
                  value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})}
                  required/>
                </label>
                <label>
                  Password*
                  <input type="password" placeholder="********"  id="password"
                  value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})}
                  required/>
                </label>

                <Link to="">
                <div className="remember-forgot">
                  <Link to="/verifyEmail">
                  <a href="#forgot-password">Forgot Password?</a>
                  </Link>
                </div>
                </Link>

               
                <button type="submit" className="login-button">Login</button>
           
              </form>
             
            </div>
          </div>
        </div>
    
    
  )
}

export default Soldier