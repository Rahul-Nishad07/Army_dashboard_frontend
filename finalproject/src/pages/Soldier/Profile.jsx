import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Sidebar2 from "../../components/sidebar/Sidebar2";
import Navbar2 from "../../components/navbar/Navbar2";
import axios from 'axios';
import './profile.css';

const URL_API = 'http://localhost:5164/getall_solidierbyemail';
const UPDATE_URL_API = 'http://localhost:5164/army_edit_soldier';

const Profile = () => {
  const [user, setUser] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDetailedView, setIsDetailedView] = useState(false); // New state for detailed view
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    image: null,
    dob: '',
    rank: '',
    address: '',
    unit: '',
    degree: '',
  });

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const userEmail = currentUser.email;

      const payload = {
        eventID: '1001',
        addInfo: {
          email: userEmail
        }
      };

      const response = await axios.post(URL_API, payload);
      const resData = response.data.result.rData.rMessage;
      setUser(resData);

      if (resData && resData.length > 0) {
        const userData = resData[0];
        setFormData({
          username: userData[1],
          email: userData[2],
          phone: userData[3],
          password: userData[4],
          image: userData[5],
          dob: userData[6],
          rank: userData[7],
          address: userData[8],
          unit: userData[9],
          degree: userData[10],
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, [e.target.name]: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
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
      const response = await axios.post(UPDATE_URL_API, payload);
      let res = response.data.result.rData.rMessage;
      console.log(response.data, 'api response');
      console.log('API Response:', response.data); // Log full response
  
      if (res === "Registration Successfulll") {
        alert(res);
        setIsEditMode(false);
        getData(); // Refresh data
      } else {
        alert(res);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleViewDetailsClick = () => {
    setIsDetailedView(true);
  };

  const handleBackClick = () => {
    setIsDetailedView(false);
  };

  return (
    <div className="new">
      <Sidebar2 />
      <div className="newContainer">
        <Navbar2 />
        {!isEditMode && !isDetailedView ? (
          user.map((users, index) => (
            <div className="profile-card" key={index}>
              {users.map((value, idx) => (
                <div className="card-header" key={idx}>
                  <div className="profile-info">
                    <div className="profile-image">
                        <img src={value[5]} alt="Profile" />
                    </div>
                    <h2>{value[1]}</h2>
                    <p>Email: {value[2]}</p>
                    <p>Phone: {value[3]}</p>
                    <button onClick={handleEditClick}>Edit</button>
                    <button onClick={handleViewDetailsClick}>View Full Details</button>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : isDetailedView ? (
          user.map((users, index) => (
            <div className="profile-card" key={index}>
           {users.map((value, idx) => (
          <div className="user-details" key={idx}>
            <button onClick={handleBackClick}>Back to Profile</button>
            <img src={value[5]} alt="Profile" className="profile-image" />
            <h2>{value[1]}</h2>
            <p>Email: - {value[2]}</p>
            <p>Phone: - {value[3]}</p>
            <p>Date of Birth: - {value[6]}</p>
            <p>Rank: - {value[7]}</p>
            <p>Address: - {value[8]}</p>
            <p>Unit: - {value[9]}</p>
            <p>Degree:  - {value[10]}</p>
          </div>
           ))}
          </div>
          ))
        ) : (
          <div className="edit-form-container">
            <form className="edit-form" onSubmit={handleSubmit}>
              <label>
                Username
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Username"
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                 
                />
              </label>
              <label>
                Phone
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Phone"
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Password"
                />
              </label>
              <label>
                Date of Birth
                <input
                  type="text"
                  name="dob"
                  id="dob"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  placeholder="Date Of Birth"
                  required
                />
              </label>
              <label>
                Rank
                <input
                  type="text"
                  name="rank"
                  id="rank"
                  value={formData.rank}
                  onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                  placeholder="Rank"
                  required
                />
              </label>
              
              <label>
                Address
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Address"
                  required
                />
              </label>
              <label>
                Unit
                <input
                  type="text"
                  name="unit"
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="Unit"
                  required
                />
              </label>
              <label>
                Degree
                <input
                  type="text"
                  name="degree"
                  id="degree"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="Degree"
                  required
                />
              </label>
              <label>
                Profile Image
                <input type="file" id="image" name="image" onChange={handleImageChange} />
              </label>
              <button type="submit">Save</button>
              <button type="button" onClick={() => setIsEditMode(false)}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

