
import Sidebar2 from "../../components/sidebar/Sidebar2";
import Navbar2 from "../../components/navbar/Navbar2";
import React, { useState } from 'react';
import './medicalapointment.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MedicalAppointment = () => {
const [formData,setFormData] = useState({
    purpose:'',
    name:'',
    dob:'',
    contact:'',
    email:'',
    height:'',
    weight:'',
    bloodPressure:'',
     
})

const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      eventID: "1001",
      addInfo: {
        purpose: formData.purpose,
        name: formData.name,
        dob: formData.dob,
        contact: formData.contact,
        email: formData.email,
        height: formData.height,
        weight: formData.weight,
        bloodPressure: formData.bloodPressure

        
      }
    };
    try {
        const response = await axios.post('http://localhost:5164/army_medicalappointment', payload);
        let res = response.data.result.rData.rMessage;
        console.log(response.data, 'api response'); // handle response
        if(res === "Your Appointment is Submitted Successfully....") {
          alert(res);
        //   navigate('/notificationlist');
        } else {
          alert(res);
        }
      } catch (error) {
        console.error('Error adding mission:', error);
      }
    };
  
    
        return (

            <div className="new">
            <Sidebar2 />
            <div className="newContainer">
                <Navbar2 />
            <div className="medical-appointment-form">
                <h2>Medical Appointment</h2>
                <form onSubmit={handleSubmit}>
                    {/* Purpose of the Appointment */}
                    <div className="form-group">
                        <label htmlFor="purpose">Purpose of the Appointment:</label>
                        <textarea
                           type="text" id="purpose" name="purpose" value={formData.purpose} onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                        />
                    </div>
    
                    {/* Personal Information */}
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text" id="name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth:</label>
                        <input
                             type="text" id="dob" name="dob" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="contact">Contact Number:</label>
                        <input
                             type="text" id="contact" name="contact" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                           type="text" id="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
    
                    {/* Physical Information */}
                    <div className="form-group">
                        <label htmlFor="height">Height:</label>
                        <input
                            type="text" id="height" name="height" value={formData.height} onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="weight">Weight:</label>
                        <input
                             type="text" id="weight" name="weight" value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bloodPressure">Blood Pressure:</label>
                        <input
                             type="text" id="bloodPressure" name="bloodPressure" value={formData.bloodPressure} onChange={(e) => setFormData({ ...formData, bloodPressure: e.target.value })}
                            required
                        />
                    </div>
    
                    <button type="submit">Submit</button>
                </form>
            </div>
            </div>
            </div>
        );
    };
    
 

export default MedicalAppointment