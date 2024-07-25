import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate } from 'react-router-dom';

const Notification = ({ title }) => {


 const navigate = useNavigate();
    const [formData, setFormData] = useState({
        subject:'',
        message: '',
        status:'',
        date:''
      
      });

    

    const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      eventID: "1001",
      addInfo: {
        subject: formData.subject,
        message: formData.message,
        status: formData.status,
        date: formData.date
        
      }
    };
    try {
      const response = await axios.post('http://localhost:5164/army_notifications', payload);
      let res = response.data.result.rData.rMessage;
      console.log(response.data, 'api response'); // handle response
      if(res === "Notification send SuccessFully") {
        alert(res);
        navigate('/notificationlist');
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
                                <label htmlFor="subject">Subject/Title:</label>
                                <input type="text" id="subject" name="subject" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}/>
                            </div>

                            <div className="formInput">
                                <label htmlFor="message">Message:</label>
                                <input type="text" id="message" name="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}/>
                            </div>
                            <div className="formInput">
                                <label htmlFor="status">Status:</label>
                                <input type="text" id="status" name="status" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}/>
                            </div>
                            <div className="formInput">
                                <label htmlFor="date">Date:</label>
                                <input type="text" id="date" name="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })}/>
                            </div>
                            <button type="submit">Send Notification</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notification;
