import React, { useState } from 'react'
import Sidebar2 from '../../components/sidebar/Sidebar2';
import Navbar2 from "../../components/navbar/Navbar2";
import axios from 'axios';

const FeedbackUser = ({title}) => {


    const [formData, setFormData] = useState({
        title:'',
        message: ''
      });

      const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
          eventID: "1001",
          addInfo: {
            title: formData.title,
            message: formData.message
          }
        };

        try {
            const response = await axios.post('http://localhost:5164/army_feedback', payload);
            let res = response.data.result.rData.rMessage;
            console.log(response.data, 'api response'); // handle response
            if(res === "Feedback Added SuccessFully") {
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
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="right">
                        <form onSubmit={handleSubmit}>
                          

                            <div className="formInput">
                                <label htmlFor="title">Subject/Title:</label>
                                <input type="text" id="title" name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })}/>
                            </div>

                            <div className="formInput">
                                <label htmlFor="message">Message:</label>
                                <textarea
                                   type="text" id="message" name="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                />
                            </div>

                            <button type="submit">Send Feedback</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default FeedbackUser