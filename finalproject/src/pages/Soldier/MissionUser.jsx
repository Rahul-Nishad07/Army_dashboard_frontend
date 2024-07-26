
import React, { useEffect, useState } from 'react';
import Sidebar2 from "../../components/sidebar/Sidebar2";
import Navbar2 from "../../components/navbar/Navbar2";
import './missionuser.css'; // Import CSS for styling
import axios from 'axios';


const APi = "http://localhost:5164/army_missionstatus"
const URL_API = "http://localhost:5164/getall_army_mission"; // Base URL for your API endpoints

const MissionUser = () => {
  const [missionsuser, setMissionsuser] = useState([]);

     //for the restriction - we cant go to another page using back button of the website
     window.history.pushState(null, null, window.location.href);
     window.onpopstate = function () {
         window.history.go(1);
     }; 

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
        const payload = {
          eventID: "1001",
          addInfo: {
            id: 'id' 
          }
        };
    
        axios.post(URL_API, payload)
          .then(response => {
            const resData = response.data.result.rData.rMessage;
            setMissionsuser(resData);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      };
    

  // Handler for accepting a mission
  const handleAccept = (id) => {
    const payload = {
      eventID: "1001", // Assuming this is the event ID for accept action
      addInfo: {
        id: id,
        status: "Accept"
      }
    };

    axios.post(APi, payload)
      .then(response => {
     
        console.log(response.data.result.rData.rMessage);
        getData(); 
      })
      .catch(error => {
        console.error('Error accepting mission:', error);
      });
  };

  
  const handleSubmit = (id) => {
    const payload = {
      eventID: "1001", 
      addInfo: {
        id: id,
        status: "Submit"
      }
    };

    axios.post(APi, payload)
      .then(response => {
    
        console.log(response.data.result.rData.rMessage);
        getData(); 
      })
      .catch(error => {
        console.error('Error submitting mission:', error);
      });
  };

  
  const handleCancel = (id) => {
    const payload = {
      eventID: "1001", 
      addInfo: {
        id: id,
        status: "Reject"
      }
    };

    axios.post(APi, payload)
      .then(response => {
    
        console.log(response.data.result.rData.rMessage);
        getData(); 
      })
      .catch(error => {
        console.error('Error canceling mission:', error);
      });
  };


  return (
    <div>
      <div className="new">
        <Sidebar2 />
        <div className="newContainer">
          <Navbar2 />
          <h1>MISSION LIST</h1>

          <div className='forcardsflex'>
            {missionsuser.map((missions, index) => (
              <div key={index} className="mission-cards">
                {missions.map((value2, idx) => (
                  <div key={idx} className="mission-card">
                    <h3 className="card-title">{value2[1]}</h3>
                    <div className="details-container">
                      <div className="detail">
                        <img src={value2[2]} alt={value2[1]} className="card-image" />
                        <p className="card-text">{value2[3]}</p>
                      </div>
                      <div className="detail">
                        <img src={value2[4]} alt={value2[1]} className="card-image" />
                        <p className="card-text">{value2[5]}</p>
                      </div>
                    </div>
                  
                    {/* <button className='button-mission' onClick={() => handleAccept(value2[0])}>Accept</button>
                    <button className='button-mission' onClick={() => handleSubmit(value2[0])}>Submit</button>
                    <button className='button-mission1' onClick={() => handleCancel(value2[0])}>Cancel</button> */}

                   <button 
                    className='button-mission'
                    onClick={() => handleAccept(value2[0])}
                    disabled={value2[6] === "Accepted"}
                  >
                    Accept
                  </button>
                  {value2[6] === "Accepted" && (
                    <button 
                      className='button-mission'
                      onClick={() => handleSubmit(value2[0])}
                    >
                      Submit
                    </button>
                  )}
                  <button 
                    className='button-mission1'
                    onClick={() => handleCancel(value2[0])}
                  >
                    Cancel
                  </button>
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

export default MissionUser;
