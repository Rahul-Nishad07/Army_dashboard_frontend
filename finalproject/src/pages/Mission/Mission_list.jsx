
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import './mission.css'; // Import CSS for styling
import { Button } from '@mui/material';

const URL_API = 'http://localhost:5164/getall_army_mission';
const DELETE_API ="http://localhost:5164/delete_missionlist"

const MissionList = () => {
  const [missions, setMissions] = useState([]);

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
          <button className="delete-button"  onClick={() => handleDelete(value2[0])}>Delete</button>
        </div>
        
                ))}
           </div>
           
           ))}
     </div>

      </div>
      </div>
    </div>
  );
}

export default MissionList;

