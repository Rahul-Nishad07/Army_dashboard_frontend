import React, { useState } from 'react';
import './signup.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import axios from 'axios';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    image: '',
    dob: '',
    rank: '',
    address: '',
    unit: '',
    degree: ''
  });

  const navigate = useNavigate();

    //for the restriction - we cant go to another page using back button of the website
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    }; 
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      eventID: "1001",
      addInfo: {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        image: formData.image,
        dob: formData.dob,
        rank: formData.rank,
        address: formData.address,
        unit: formData.unit,
        degree: formData.degree,
      }
    };
    try {
      const response = await axios.post('http://localhost:5164/army_soldier', payload);

      let res = response.data.result.rData.rMessage;
      console.log(response.data, 'api response'); // handle response

      if (res === "Registration Successfulll") {
        alert(res);
        navigate('/soldier');
      } else {
        alert(res);
        navigate('/signup');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error
    }
  };

  return (
    <div className="signup-page">
      <div className="left-section">
        <div className="logo">ARMY DASHBOARD</div>
        <img src="./images/loginPhoto.png" alt="signup" className="signupimage" />
      </div>
      <div className="right-section">
        <div className="signup-container">
          <h2>Welcome to Indian Army</h2>

          <form className="signup-form" onSubmit={handleSubmit}>
            <label>
              Username*
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Username"
                required
              />
            </label>

            <label>
              Email*
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email"
                required
              />
            </label>

            <label>
              Phone*
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Phone"
                required
              />
            </label>

            <label>
              Password*
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="********"
                required
              />
            </label>
            <button type="submit" className="signup-button">SignUp</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
