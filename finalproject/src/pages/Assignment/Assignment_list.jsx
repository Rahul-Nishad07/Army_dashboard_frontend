import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import './assign.css'; // Import CSS for styling
import { Button } from '@mui/material';

const URL_API = "http://localhost:5164/getall_army_assignment";
const DELETE_API ="http://localhost:5164/delete_assignmentlist"

const Assignment_list = () => {
  const [assignments, setAssignments] = useState([]);

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
                  <button  variant="danger" className='button-mission2' role="button"  onClick={() => handleDelete(value[0])}>Delete</button>
                  
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

export default Assignment_list;
