import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import './assign.css'; // Import CSS for styling
import { Button } from '@mui/material';
// import './public/images/army_logo.png'

const URL_API = "http://localhost:5164/getall_army_assignment";
const DELETE_API = "http://localhost:5164/delete_assignmentlist";
const UPDATE_API = "http://localhost:5164/edit_assignment";

const Assignment_list = () => {
  const [assignments, setAssignments] = useState([]);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({
    taskname: '',
    image:'',
    description: '',
    personnel: '',
    duedate: '',
    status:''
  });

  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
    window.history.go(1);
  };

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

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
    setUpdatedDetails({
      taskname: assignment[1],
      image: assignment[2],
      description: assignment[3],
      personnel: assignment[4],
      duedate: assignment[5],
      status: assignment[6]
    });
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        eventID: "1001",
        addInfo: {
          id: editingAssignment[0],
          taskname: updatedDetails.taskname,
          image: updatedDetails.image,
          description: updatedDetails.description,
          personnel: updatedDetails.personnel,
          duedate: updatedDetails.duedate,
          status: updatedDetails.status
        }
      };
      const response = await axios.put(UPDATE_API, payload);
      console.log(response.data); // Handle response as needed
      getData(); // Refresh data after update
      setEditingAssignment(null); // Close the edit form
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

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
        setAssignments(resData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setAssignments({ ...assignments, [e.target.name]: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <Navbar />

         

          <div className="assignment-cards">
            {assignments.map((assignment, index) => (
              <div key={index} className="assignment-card">
                {assignment.map((value, idx) => (
                  <div className="card-content" key={idx}>
                    <img src={value[2]} alt={value[1]} className="card-image" />
                    <h3 className="card-title">{value[1]}</h3>
                    <p className="card-text">{value[3]}</p>
                    <p><strong>Assign Personnel:</strong> {value[4]}</p>
                    <p><strong>Due Date:</strong> {value[5]}</p>
                    <Button variant="contained" onClick={() => handleEdit(value)}>Edit</Button>
                    <Button variant="contained" color="error" onClick={() => handleDelete(value[0])}>Delete</Button>
                  </div>
                ))}
              </div>
            ))}

          
          </div>
          
          {editingAssignment && (
              <div className="edit-form">
                <h3>Edit Assignment</h3>
                <label>
                  Task Name:
                  <input
                    type="text"
                   
                  onChange={handleImageChange}
                  />
                </label>

                <label>
                  Image :
                  <input
                    type="file"
                    // value={updatedDetails}
                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, title: e.target.value })}
                  />
                </label>


                <label>
                  Description:
                  <input
                    // value={updatedDetails.description}
                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, description: e.target.value })}
                  />
                </label>
                <label>
                  Assign Personnel:
                  <input
                    type="text"
                    // value={updatedDetails.personnel}
                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, personnel: e.target.value })}
                  />
                </label>
                <label>
                  Due Date:
                  <input
                    type="text"
                    // value={updatedDetails.dueDate}
                    onChange={(e) => setUpdatedDetails({ ...updatedDetails, duedate: e.target.value })}
                  />
                </label>
                <Button  className='updatebutton' onClick={handleUpdate} variant="contained">Update</Button>
                <Button  className='cancelbutton' onClick={() => setEditingAssignment(null)} variant="outlined">Cancel</Button>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Assignment_list;
