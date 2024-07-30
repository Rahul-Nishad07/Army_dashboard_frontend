
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import "./assign.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";


const Assignment = ({ title }) => {
 
const navigate = useNavigate();
    const [formData, setFormData] = useState({
        taskname:'',
      image: '',
      description:'',
      personnel: '',
      duedate: '',
      status:''
      
    });

    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
        window.history.go(1);
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, [e.target.name]: reader.result });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const payload = {
        eventID: "1001",
        addInfo: {
          taskname: formData.taskname,
          image: formData.image,
          description: formData.description,
          personnel: formData.personnel,
          duedate: formData.duedate,
          status: formData.status
        }
      };
      try {
        const response = await axios.post('http://localhost:5164/army_assignmentform', payload);
        let res = response.data.result.rData.rMessage;
        console.log(response.data, 'api response'); // handle response
        if(res === "Assignment added SuccessFully") {
          alert(res);
          navigate('/assignment/assignmentList');
        } else {
          alert(res);
        }
      } catch (error) {
        console.error('Error adding mission:', error);
      }
    };

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit}>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input type="file" id="image" name="image" onChange={handleImageChange} />
                            </div>

                            <div className="formInput">
                                <label htmlFor="taskname">Task Name:</label>
                                <input type="text" id="taskname" name="taskname" value={formData.taskname} onChange={(e) => setFormData({ ...formData, taskname: e.target.value })}/>
                            </div>

                            <div className="formInput">
                                <label htmlFor="description">Description:</label>
                                <input type="text" id="description" name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}/>
                            </div>

                            <div className="formInput">
                                <label htmlFor="personnel">Assign Personnel:</label>
                                <input type="text" id="personnel" name="personnel" value={formData.personnel} onChange={(e) => setFormData({ ...formData, personnel: e.target.value })}/>
                            </div>

                            <div className="formInput">
                                <label htmlFor="dueDate">Due Date:</label>
                                <input type="text" id="duedate" name="duedate" value={formData.duedate} onChange={(e) => setFormData({ ...formData, duedate: e.target.value })}/>
                            </div>

                            <button type="submit">Assign Task</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Assignment