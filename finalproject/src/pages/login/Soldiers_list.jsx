import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';
// import './notification.css'; // Import CSS for styling

const URL_API = "http://localhost:5164/getall_army_soldier";
const DELETE_API ="http://localhost:5164/delete_soldierlist"
const SoldiersList = () => {
  const [soldierlist, setSoldierlist] = useState([]);
  const [isDetailedView, setIsDetailedView] = useState(false);
  const [selectedSoldier, setSelectedSoldier] = useState(null);

  useEffect(() => {
    getData();
  }, []);
   

  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
      window.history.go(1);
  };

  
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
        setSoldierlist(resData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleViewDetailsClick = (soldier) => {
    setSelectedSoldier(soldier);
    setIsDetailedView(true);
  };

  const handleBackClick = () => {
    setIsDetailedView(false);
    setSelectedSoldier(null);
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
      console.log(response.data); 
      getData(); 
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="notification-table">
          {!isDetailedView ? (
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Password</th>
                  <th>Dob</th>
                  <th>Rank</th>
                  <th>Address</th>
                  <th>Unit</th>
                  <th>Degree</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {soldierlist.map((soldierGroup, index) => (
                  soldierGroup.map((soldier, idx) => (
                    <tr key={idx}>
                      <td>{soldier[0]}</td>
                      <td><img src={soldier[5]} style={{ width: '100px', height: 'auto' }} /></td>
                      <td>{soldier[1]}</td>
                      <td>{soldier[2]}</td>
                      <td>{soldier[3]}</td>
                      <td>{soldier[4]}</td>
                      <td>{soldier[6]}</td>
                      <td>{soldier[7]}</td>
                      <td>{soldier[8]}</td>
                      <td>{soldier[9]}</td>
                      <td>{soldier[10]}</td>
                      <td>
                        <button onClick={() => handleViewDetailsClick(soldier)} className="action-button">View</button>
                        <button className="action-button"  onClick={() => handleDelete(soldier[0])}>Delete</button>
                      </td>
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          ) : (
            selectedSoldier && (
              <div className="profile-card">
                <div className="user-details">
                  <button onClick={handleBackClick}>Back to Profile</button>
                  <img src={selectedSoldier[5]} alt="Profile" className="profile-image" />
                  <h2>{selectedSoldier[1]}</h2>
                  <p>Email: - {selectedSoldier[2]}</p>
                  <p>Phone: - {selectedSoldier[3]}</p>
                  <p>Date of Birth: - {selectedSoldier[6]}</p>
                  <p>Rank: - {selectedSoldier[7]}</p>
                  <p>Address: - {selectedSoldier[8]}</p>
                  <p>Unit: - {selectedSoldier[9]}</p>
                  <p>Degree: - {selectedSoldier[10]}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default SoldiersList;

