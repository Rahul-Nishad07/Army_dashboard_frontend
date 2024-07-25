// import React, { useState } from 'react';
// import './signup.css';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router'
// import axios from 'axios'

// const SignUp = () => {

//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     phone:'',
//     password: '',
//     image:'null',
//     dob:'null',
//     rank:'null',
//     address:'null',
//     unit:'null',
//     degree:'null',

   
//   });


//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData({
//   //     ...formData,
//   //     [name]: value
//   //   });
//   // };

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//         eventID: "1001",
//         addInfo: {
         
//             username: formData.username,
//             email: formData.email,
//             phone: formData.phone,
//             password: formData.password    
            
//         }
//     };
//     try {
//         const response = await axios.post('http://localhost:5164/army_soldier', payload);
       
//         let res = response.data.result.rData.rMessage;
//         console.log(response.data, 'api response'); // handle response
      
//          if(res=="Registration Successfulll"){

//           alert(res);
//           navigate('/soldier')
//          }
//         else{ 
//           alert(res);
//           navigate('/signup')

//         }
//     } catch (error) {
//         console.error('Error signing up:', error);
//         // Handle error
//     }
// };

//   return (
//     <div className="signup-page">
//       <div className="left-section">
//         <div className="logo">ARMY DASHBOARD</div>
//         <img src="./images/loginPhoto.png" alt="signup" className="signupimage" />
//       </div>
//       <div className="right-section">
//         <div className="signup-container">
//           <h2>Welcome to Indian Army</h2>
        
//           <form className="signup-form" onSubmit={handleSubmit}>
//             <label>
//               Username*
//               <input 
//                 type="text" 
//                 name="username" 
//                 id="username"
//                 value={formData.username} onChange={(e)=>setFormData({...formData,username:e.target.value})}
//                 placeholder="Username" 
//                 required 
//               />
//             </label>


//             <label>
//               Email*
//               <input 
//                 type="email" 
//                 name="email" 
//                 id="email"
//                 value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})}
//                 placeholder="email" 
//                 required 
//               />
//             </label>

//             <label>
//               Phone*
//               <input 
//                 type="tel" 
//                 name="phone" 
//                 id="phone"
//                 value={formData.phone} onChange={(e)=>setFormData({...formData,phone:e.target.value})}
//                 placeholder="Phone" 
//                 required 
//               />
//             </label>


//             <label>
//               Password*
//               <input 
//                 type="password" 
//                 name="password" 
//                 id="password"
//                 value={formData.password} onChange={(e)=>setFormData({...formData,password:e.target.value})}
//                 placeholder="********" 
//                 required 
//               />
//             </label>
           
            
//             {/* <Link to="/soldier"> */}
//             <button type="submit" className="signup-button">SignUp</button>
//             {/* </Link> */}
//           </form>
         
//         </div>
//       </div>
//     </div>
//   );
// }



// export default SignUp


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

            {/* Optional Fields
            <label>
              Date of Birth
              <input
                type="date"
                name="dob"
                id="dob"
                value={formData.dob || ''}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              />
            </label>

            <label>
              Rank
              <input
                type="text"
                name="rank"
                id="rank"
                value={formData.rank || ''}
                onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                placeholder="Rank"
              />
            </label>

            <label>
              Address
              <input
                type="text"
                name="address"
                id="address"
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Address"
              />
            </label>

            <label>
              Unit
              <input
                type="text"
                name="unit"
                id="unit"
                value={formData.unit || ''}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="Unit"
              />
            </label>

            <label>
              Degree
              <input
                type="text"
                name="degree"
                id="degree"
                value={formData.degree || ''}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                placeholder="Degree"
              />
            </label>

            <label>
              Profile Image
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
              />
            </label> */}

            <button type="submit" className="signup-button">SignUp</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
