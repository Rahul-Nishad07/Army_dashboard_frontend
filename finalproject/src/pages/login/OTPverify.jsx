// import React, { useState } from 'react';
// import './login.scss';
// import { Link } from 'react-router-dom';

// const OTPverify = () => {
     
//       const [otp, setOtp] = useState('');
    
//       const handleOtpChange = (e) => {
//         setOtp(e.target.value);
//       };
    
//       const handleSubmit = (e) => {
//         e.preventDefault();

//         console.log('OTP submitted:', otp);
       
//       };
    
//       return (
//         <div className="login-page">
//           <div className="left-section">
//             <div className="logo">OTP VERIFICATION</div>
//             <img src="./images/loginPhoto.png" alt="login" className="loginimage" />
//           </div>
//           <div className="right-section">
//             <div className="login-container">
//               <h2>Enter OTP Number</h2>
//               <form className="login-form" onSubmit={handleSubmit}>
//                 <label>
//                   OTP*
//                   <input
//                     type="number"
//                     placeholder="Enter OTP"
//                     value={otp}
//                     onChange={handleOtpChange}
//                     required
//                   />
//                 </label>

//                 <button type="submit" className="login-button">Submit</button>
            
//                 <Link to="/generatepass">
//                 <button type="submit" className="button2">Generate</button>
//                 </Link>
                
//               </form>
//             </div>
//          </div>
//          </div>
    
//       )
//     }
 
// export default OTPverify




import React, { useState } from 'react';
import './login.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OTPverify = () => {
  const [otp, setOtp] = useState('');

    //for the restriction - we cant go to another page using back button of the website
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    }; 
  
    const navigate = useNavigate();
  // const [message, setMessage] = useState('');

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const payload = {
      eventID:"1001",
      addInfo:{
        otp:otp
      }
   };


    try {
      const response = await axios.post('http://localhost:5164/verify',payload);
      const res = response.data.result.rData.message;

      if(res === 'OTP verified SuccessFully'){
         alert(res);
         navigate('generatepass');
      }
      else{
        alert(res || 'Invalid OTP');
      }
    } catch (error){ 
      console.error('Error verification OTP:',error);
      alert('Error invalid OTP Please try again..')
    }
  }
  return (
    <div className="login-page">
      <div className="left-section">
        <div className="logo">OTP VERIFICATION</div>
        <img src="./images/loginPhoto.png" alt="login" className="loginimage" />
      </div>
      <div className="right-section">
        <div className="login-container">
          <h2>Enter OTP Number</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              OTP*
              <input
                type="number"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
                required
              />
            </label>
            <button type="submit" className="login-button">Submit</button>
            <Link to="/generatepass">
              <button type="button" className="button2">Generate</button>
            </Link>
          </form>
         
        </div>
      </div>
    </div>
  );
};

export default OTPverify;
