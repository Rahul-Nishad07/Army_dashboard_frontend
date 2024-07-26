import React, { useState } from 'react';
import "./mission.scss";
import axios from 'axios'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useNavigate } from 'react-router-dom';

const Mission = ({title }) => {
  const navigate = useNavigate();
  
  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function () {
      window.history.go(1);
  };


  const [formData, setFormData] = useState({
    missionname:'',
    image1: '',
    image2:'',
    desc1: '',
    desc2: '',
    status:''
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
        missionname: formData.missionname,
        image1: formData.image1,
        image2: formData.image2,
        desc1: formData.desc1,
        desc2: formData.desc2,
        status: formData.status
      }
    };
    try {
      const response = await axios.post('http://localhost:5164/army_missionform', payload);
      let res = response.data.result.rData.rMessage;
      console.log(response.data, 'api response'); // handle response
      if(res === "Mission added SuccessFully") {
        alert(res);
        navigate('/mission/missionlist');
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
                <label htmlFor="missionname">Mission Name:</label>
                <input type="text" id="missionname" name="missionname" value={formData.missionname} onChange={(e) => setFormData({ ...formData, missionname: e.target.value })}/>
              </div>
              <div className="formInput">
                <label htmlFor="image1">
                  Image 1: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="image1" name="image1" onChange={handleImageChange} />
              </div>
              <div className="formInput">
                <label htmlFor="desc1">Description 1:</label>
                <input type="text" id="desc1" name="desc1" value={formData.desc1} onChange={(e) => setFormData({ ...formData, desc1: e.target.value })}/>
              </div>
              <div className="formInput">
                <label htmlFor="image2">
                  Image 2: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="image2" name="image2" onChange={handleImageChange} />
              </div>
              <div className="formInput">
                <label htmlFor="desc2">Description 2:</label>
                <input type="text" id="desc2" name="desc2" value={formData.desc2} onChange={(e) => setFormData({ ...formData, desc2: e.target.value })}/>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;

