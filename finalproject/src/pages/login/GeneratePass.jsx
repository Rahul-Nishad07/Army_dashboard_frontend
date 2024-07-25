// import React, { useState } from 'react';
// import './login.scss';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const GeneratePass = () => {
//   const navigate = useNavigate();
//   const[email,setEmail] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handlePasswordUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       if (newPassword !== confirmPassword) {
//         alert('Passwords do not match.');
//         return;
//       }

//       const updatePayload = {
//         eventID: "1001",
//         addInfo: {
//           email: email,
//           password: newPassword
//         }
//       };  

//       console.log('Update Payload:', updatePayload);

//       const response = await axios.post('http://localhost:5164/updatepasswordarmy', updatePayload);
//       const { data } = response;

//       console.log('Update Response:', data);
    

//       if (data && data.resData.message && data.resData.success) {
//           alert("Password updated successfully.");
//         navigate('');
//       } else {
//         alert(data.resData.message);
//       }

//     } catch (error) {
//       console.error('Error updating password:', error);
//       alert('Error updating password. Please try again.');
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="left-section">
//         <div className="logo">NEW PASSWORD</div>
//         <img src="./images/loginPhoto.png" alt="login" className="loginimage" />
//       </div>
//       <div className="right-section">
//         <div className="login-container">
//           <h2>Enter New Password</h2>
//           <form className="login-form" onSubmit={handlePasswordUpdate}>
//           <label>
//               Enter a Email*
//               <input
//                 type="email"
//                 placeholder="Enter a Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </label>

//             <label>
//               New Password*
//               <input
//                 type="password"
//                 placeholder="Enter new password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//               />
//             </label>
//             <label>
//               Confirm Password*
//               <input
//                 type="password"
//                 placeholder="Confirm password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             </label>
//             <button type="submit" className="login-button">Submit</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GeneratePass;




import React, { useState } from 'react';
import './login.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GeneratePass = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
  
      const updatePayload = {
        eventID: "1001",
        addInfo: {
          email: email,
          password: newPassword
        }
      };  
  
      console.log('Update Payload:', updatePayload);
  
      const response = await axios.post('http://localhost:5164/updatepasswordarmy', updatePayload);
      const { data } = response;
  
      console.log('Update Response:', data);
  
      if (data) {
        alert('Password Updated Successfully');
          navigate('/login'); 
        } else {
          alert(data.resData.rData.message); 
        }
   
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Error updating password. Please try again.');
    }
  };
  

  return (
    <div className="login-page">
      <div className="left-section">
        <div className="logo">NEW PASSWORD</div>
        <img src="./images/loginPhoto.png" alt="login" className="loginimage" />
      </div>
      <div className="right-section">
        <div className="login-container">
          <h2>Enter New Password</h2>
          <form className="login-form" onSubmit={handlePasswordUpdate}>
            <label>
              Enter Email*
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              New Password*
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </label>
            <label>
              Confirm Password*
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit" className="login-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GeneratePass;
