import React, { useState, useEffect } from 'react';
import Sidebar2 from "../../components/sidebar/Sidebar2";
import Navbar2 from "../../components/navbar/Navbar2";
import './assingmentuser.css'; // Import CSS for styling
import axios from 'axios';

const Api = "http://localhost:5164/asisignmentStatus";
const URL_API = "http://localhost:5164/getall_army_assignment";

const AssignmentUser = () => {
  
  const [assignmentUser, setAssignmentUser] = useState([]);

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
        setAssignmentUser(resData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleAccept1 = (id) => {
    const payload = {
      eventID: "1001", // Assuming this is the event ID for accept action
      addInfo: {
        id: id,
        status: "Accept"
      }
    };

    axios.post(Api, payload)
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

    axios.post(Api, payload)
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

    axios.post(Api, payload)
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
          <h1>ASSIGNMENT LIST</h1>
 
          <div className="assignment-cards">
            {assignmentUser.map((assignmentsforuser, index) => (
              <div key={index} className="assignment-card">
                {assignmentsforuser.map((value, idx) => (
                  <div className="card-content" key={idx}>
                    <img src={value[2]} alt={value[1]} className="card-image" />
                    <h3 className="card-title">{value[1]}</h3>
                    <p className="card-text">{value[3]}</p>
                    <p><strong>Assign Personnel:</strong> {value[4]}</p>
                    <p><strong>Due Date:</strong> {value[5]}</p>
                    <button className='button-mission2' onClick={() => handleAccept1(value[0])}>Accept</button>
                    <button className='button-mission2' onClick={() => handleSubmit(value[0])}>Submit</button>
                    <button className='button-mission3' onClick={() => handleCancel(value[0])}>Cancel</button>
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

export default AssignmentUser;
