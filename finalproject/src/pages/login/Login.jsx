
import './login.scss';
import { Link, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {

  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);


  //for the restriction - we cant go to another page using back button of the website
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
      window.history.go(1);
  }; 





  useEffect(() => {
    
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
    
      console.log('Token found in localStorage:', storedToken);
  
      setIsAdmin(true); 
    }
  }, []); // Empty dependency array means this effect runs once on component mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 
    setSuccess(false); 
 

    try {
      const apiUrl = 'http://localhost:5164/admin/login'; // API URL
      const response = await axios.post(apiUrl, { Username, Password });
      const { token } = response.data;

    
      localStorage.setItem('token', token);

    
      setSuccess(true);
      setIsAdmin(true); 
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
      console.error('Login error:', err);
    }
  };

 
  if (isAdmin) {

    return <Navigate to='/'/>
  }

      return (
        <div className="login-page">
          <div className="left-section">
            <div className="logo">ARMY DASHBOARD</div>
            
            <img src="./images/loginPhoto.png" alt="login" className="loginimage" />
          </div>
          <div className="right-section">
            <div className="login-container">
              <h2>Welcome to ADMIN DASHBOARD of Indian Army</h2>
              {/* <p>Need an account? <a href="#signup">Sign Up</a></p> */}
              <div className="role-buttons">
                <button className="role-button">Admin</button>
                <Link to="/soldier">
                <button className="role-button">Soldier</button>
                </Link>
              </div>
              {error && <p className="error-message">{error}</p>}
           {success && <p className="success-message">Login successful!</p>}
              <form className="login-form" onSubmit={handleSubmit}>
                <label>
                  Username*
                  <input type="text"  value={Username}
            onChange={(e) => setUsername(e.target.value)}
            required placeholder="Username" />
                </label>
                <label>
                  Password*
                  <input type="password"  value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required  placeholder="********" />
                </label>

                

                {/* <Link to="/"> */}
                <button type="submit" className="login-button">Login</button>
                {/* </Link> */}
              </form>
         
            </div>
          </div>
        </div>
    
    
  )
}

export default Login