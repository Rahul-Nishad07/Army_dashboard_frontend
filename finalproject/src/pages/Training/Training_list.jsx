import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './training.css'

const URL_API = 'http://localhost:5164/getall_army_training';

const Training_list = () => {
  const [trainings, setTrainings] = useState([]);

  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
      window.history.go(1);
  };
  

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const payload = {
      eventID: '1001',
      addInfo: {
        id: 'id' // Adjust as per your API requirements
      }
    };

    axios
      .post(URL_API, payload)
      .then((response) => {
        const resData = response.data.result.rData.rMessage;
        setTrainings(resData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="training-list-container1">
      <Sidebar />
      <div className="training-list-content1">
        <Navbar />
        <div className="training-cards1">
          {trainings.map((training, index) => (
            <div key={index} className="training-card1">
              {training.map((value, idx) => (
                <div className="card-content1" key={idx}>
                  <h3 className="card-title1">{value[1]}</h3>
                  <div className="details-container1">
                    <div className="detail1">
                      <img src={value[2]} alt={value[1]} className="card-image1" />
                      <p className="card-text1">{value[3]}</p>
                      <p className="card-text1">{value[4]}</p>
                      <p className="card-text1">{value[5]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Training_list;
