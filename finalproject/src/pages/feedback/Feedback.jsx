import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';
// import './notification.css'; // Import CSS for styling?

const URL_API = "http://localhost:5164/getall_army_feedback";

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);


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
        setFeedback(resData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="notification-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            {feedback.map((feedbacks, index) => (
            <tbody key={index}>
                {feedbacks.map((value, idx) => (
                <tr  key={idx}>
                  <td>{value[0]}</td>
                  <td>{value[1]}</td>
                  <td>{value[2]}</td>
                  
                  <td>
                    <button className="action-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Feedback;

