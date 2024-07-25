import React, { useState } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import { useNavigate } from 'react-router-dom';

const Trainning = ({ title }) => {
  

    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    programname1:'',
    image: '',
    objective:'',
    topic: '',
    duration: ''
  });

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
        programname1: formData.programname1,
        image: formData.image,
        objective: formData.objective,
        topic: formData.topic,
        duration: formData.duration
      }
    };
    try {
      const response = await axios.post('http://localhost:5164/army_trainingform', payload);
      let res = response.data.result.rData.rMessage;
      console.log(response.data, 'api response'); // handle response
      if(res === "Mission added SuccessFully") {
        alert(res);
        navigate('trainning/trainninglist');
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
                                <label htmlFor="programname1">Program Name:</label>
                                <input type="text" id="programname1" name="programname1" value={formData.programname1} onChange={(e) => setFormData({ ...formData, programname1: e.target.value })}/>
                            </div>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input type="file" id="image" name="image" onChange={handleImageChange} />
                            </div>

                            <div className="formInput">
                                <label htmlFor="objective">Objective:</label>
                                <input type="text" id="objective" name="objective" value={formData.objective} onChange={(e) => setFormData({ ...formData, objective: e.target.value })}/>
                            </div>

                            <div className="formInput">
                                <label htmlFor="topic">Topic:</label>
                                <input type="text" id="topic" name="topic" value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })}/>
                            </div>

                            <div className="formInput">
                                <label htmlFor="duration">Duration:</label>
                                <input type="text" id="duration" name="duration" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })}/>
                            </div>

                            <button type="submit">Create Program</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trainning;
