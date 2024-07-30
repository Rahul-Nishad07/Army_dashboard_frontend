// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Sidebar from '../../components/sidebar/Sidebar';
// import Navbar from '../../components/navbar/Navbar';
// import './training.css'

// const URL_API = 'http://localhost:5164/getall_army_training';

// const Training_list = () => {
//   const [trainings, setTrainings] = useState([]);

//   window.history.pushState(null, null, window.location.href);
//   window.onpopstate = function () {
//       window.history.go(1);
//   };
  

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = () => {
//     const payload = {
//       eventID: '1001',
//       addInfo: {
//         id: 'id' // Adjust as per your API requirements
//       }
//     };

//     axios
//       .post(URL_API, payload)
//       .then((response) => {
//         const resData = response.data.result.rData.rMessage;
//         setTrainings(resData);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   };

//   return (
//     <div className="training-list-container1">
//       <Sidebar />
//       <div className="training-list-content1">
//         <Navbar />
//         <div className="training-cards1">
//           {trainings.map((training, index) => (
//             <div key={index} className="training-card1">
//               {training.map((value, idx) => (
//                 <div className="card-content1" key={idx}>
//                   <h3 className="card-title1">{value[1]}</h3>
//                   <div className="details-container1">
//                     <div className="detail1">
//                       <img src={value[2]} alt={value[1]} className="card-image1" />
//                       <p className="card-text1">{value[3]}</p>
//                       <p className="card-text1">{value[4]}</p>
//                       <p className="card-text1">{value[5]}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Training_list;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Button } from '@mui/material';
import './training.css';

const URL_API = 'http://localhost:5164/getall_army_training';
const DELETE_API = 'http://localhost:5164/delete_training';
const UPDATE_API = 'http://localhost:5164/edit_training';

const Training_list = () => {
  const [trainings, setTrainings] = useState([]);
  const [editingTraining, setEditingTraining] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({
    programname1: '',
    image: '',
    objective: '',
    topic: '',
    duration: ''
   
  });

  useEffect(() => {
    getData();
  }, []);

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

  const handleEdit = (training) => {
    setEditingTraining(training);
    setUpdatedDetails({
      programname1: training[1],
      image: training[2],
      objective: training[3],
      topic: training[4],
      duration: training[5]
     
    });
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        eventID: "1001",
        addInfo: {
          id: editingTraining[0],
          programname1: updatedDetails.programname1,
          image: updatedDetails.image,
          objective: updatedDetails.objective,
          topic: updatedDetails.topic,
          duration: updatedDetails.duration
          
        }
      };
      const response = await axios.put(UPDATE_API, payload);
      console.log(response.data); // Handle response as needed
      getData(); // Refresh data after update
      setEditingTraining(null); // Close the edit form
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

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
                  <Button variant="contained" onClick={() => handleEdit(value)}>Edit</Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(value[0])}>Delete</Button>
                </div>
              ))}
            </div>
          ))}
        </div>
        {editingTraining && (
          <div className="edit-form">
            <h3>Edit Training</h3>
            <label>
              Program Name:
              <input
                type="text"
              
                onChange={(e) => setUpdatedDetails({ ...updatedDetails, programname1: e.target.value })}
              />
            </label>
            <label>
              Image:
              <input
                type="file"
                onChange={handleImageChange}
              />
            </label>
            <label>
              Objective:
              <input
                type="text"
               
                onChange={(e) => setUpdatedDetails({ ...updatedDetails, objective: e.target.value })}
              />
            </label>
            <label>
            Topic:
              <input
                type="text"
              
                onChange={(e) => setUpdatedDetails({ ...updatedDetails, topic: e.target.value })}
              />
            </label>
            <label>
              Duration:
              <input
                type="text"
               
                onChange={(e) => setUpdatedDetails({ ...updatedDetails, duration: e.target.value })}
              />
            </label>
           
            <button className="updatebutton" onClick={handleUpdate} variant="contained">Update</button>
            <button className="cancelbutton" onClick={() => setEditingTraining(null)} variant="outlined">Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Training_list;

