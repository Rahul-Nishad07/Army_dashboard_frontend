



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import './mission.css'; // Import CSS for styling
import { Button } from '@mui/material';

const URL_API = 'http://localhost:5164/getall_army_mission';
const DELETE_API = 'http://localhost:5164/delete_missionlist';
const UPDATE_API = 'http://localhost:5164/edit_mission';

const MissionList = () => {
  const [missions, setMissions] = useState([]);
  const [editingMission, setEditingMission] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({
    missionname: '',
    image1: '',
    image2: '',
    desc1: '',
    desc2: '',
    status: ''
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const payload = {
      eventID: "1001",
      addInfo: {
        id: 'id' // Adjust as per your API requirements
      }
    };

    axios.post(URL_API, payload)
      .then(response => {
        const resData = response.data.result.rData.rMessage;
        setMissions(resData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDelete = async (id) => {
    try {
      const payload = {
        eventID: "1001",
        addInfo: {
          id: id
        }
      };
      const response = await axios.post(DELETE_API, payload);
      console.log(response.data); // Handle response as needed
      getData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (mission) => {
    setEditingMission(mission);
    setUpdatedDetails({
      missionname: mission[1],
      image1: mission[2],
      image2: mission[3],
      desc1: mission[4],
      desc2: mission[5],
      status: mission[6]
    });
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        eventID: "1001",
        addInfo: {
          id: editingMission[0],
          missionname: updatedDetails.missionname,
          image1: updatedDetails.image1,
          image2: updatedDetails.image2,
          desc1: updatedDetails.desc1,
          desc2: updatedDetails.desc2,
          status: updatedDetails.status
        }
      };
      const response = await axios.put(UPDATE_API, payload);
      console.log(response.data); // Handle response as needed
      getData(); // Refresh data after update
      setEditingMission(null); // Close the edit form
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUpdatedDetails({ ...updatedDetails, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="New">
      <Sidebar />
      <div className="NewContainer">
        <Navbar />
        <div className='Forcardsflex'>
          <div className="Mission-cards">
            {missions.map((mission, index) => (
              <div key={index} className="Mission-card">
                {mission.map((value2, idx) => (
                  <div className="Mission-card" key={idx}>
                    <h3 className="Card-title">{value2[1]}</h3>
                    <div className="Details-container">
                      <div className="Detail">
                        <img src={value2[2]} alt={value2[1]} className="Card-image" />
                        <p className="Card-text">{value2[3]}</p>
                      </div>
                      <div className="Detail">
                        <img src={value2[4]} alt={value2[1]} className="Card-image" />
                        <p className="Card-text">{value2[5]}</p>
                      </div>
                    </div>
                    <button className='EDITBUTTON' variant="contained" onClick={() => handleEdit(value2)}>Edit</button>
                    <button  className='DELETEBUTTON'variant="contained" color="error" onClick={() => handleDelete(value2[0])}>Delete</button>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {editingMission && (
            <div className="edit-form">
              <h3>Edit Mission</h3>
              <label>
                Mission Name:
                <input
                  type="text"
                  // value={updatedDetails.missionname}
                  onChange={(e) => setUpdatedDetails({ ...updatedDetails, missionname: e.target.value })}
                />
              </label>
              <label>
                Image-1:
                <input
                  type="file"
                  onChange={handleImageChange}
                />
              </label>
              <label>
                Image-2:
                <input
                  type="file"
                  onChange={handleImageChange}
                />
              </label>
              <label>
                Description - 1:
                <input
                  type="text"
                  // value={updatedDetails.desc1}
                  onChange={(e) => setUpdatedDetails({ ...updatedDetails, desc1: e.target.value })}
                />
              </label>
              <label>
                Description - 2:
                <input
                  type="text"
                  // value={updatedDetails.desc2}
                  onChange={(e) => setUpdatedDetails({ ...updatedDetails, desc2: e.target.value })}
                />
              </label>
             
              <button className='updatebutton' onClick={handleUpdate} >Update</button>
              <button onClick={() => setEditingMission(null)} className='cancelbutton'>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionList;

