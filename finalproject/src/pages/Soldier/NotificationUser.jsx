import React, { useState, useEffect } from 'react';
import Sidebar2 from "../../components/sidebar/Sidebar2";
import Navbar2 from "../../components/navbar/Navbar2";
import axios from 'axios';
import './notificationUser.css';
import image2 from "./task4.jpg";


const URL_API = "http://localhost:5164/getall_army_notifications";
// const staticImage = "./public/images/task3.jpg"; // Replace with your static image path

const NotificationUser = () => {
  const [notifications, setNotifications] = useState([]);

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
        setNotifications(resData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  // const handleRead = (id) => {
  //   console.log("Read button clicked for ID:", id);
  //   // Implement read functionality
  // };

  // const handleRemove = (id) => {
  //   console.log("Remove button clicked for ID:", id);
  //   // Implement remove functionality
  // };

  return (
    <div className="new">
      <Sidebar2 />
      <div className="newContainer">
        <Navbar2 />
        <div className="notification-cards-container">
          {notifications.map((notification, index) => (
            <div className="notification-card" key={index}>
              {notification.map((value, idx) => (
                <div key={idx} className="notification-item">
                  <img src={image2} height={150} width={150} alt="AdminImage" className="notification-card-image" />
                  <div className="notification-card-content">
                    <h3 className="notification-card-title">{value[1]}</h3>
                    <p className="notification-card-message">{value[2]}</p>
                  </div>
                  {/* <div className="notification-card-actions">
                    <button className="notification-action-button read" onClick={() => handleRead(value[0])}>Read</button>
                    <button className="notification-action-button remove" onClick={() => handleRemove(value[0])}>Remove</button>
                  </div> */}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationUser;


