import React,{useEffect,useState} from 'react'
import axios from 'axios';
import Sidebar2 from "../../components/sidebar/Sidebar2";
import Navbar2 from "../../components/navbar/Navbar2";


const URL_API = 'http://localhost:5164/getall_army_training';
const TrainingUser = () => {

    const [trainingsuser, setTrainingsuser] = useState([]);
       //for the restriction - we cant go to another page using back button of the website
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
    window.history.go(1);
    }; 

    useEffect(() => {
      getData();
    }, []);
  
    const getData = () => {
      const payload = {
        eventID: '1001',
        addInfo: {
          id: 'id' 
        }
      };
  
      axios
        .post(URL_API, payload)
        .then((response) => {
          const resData = response.data.result.rData.rMessage;
          setTrainingsuser(resData);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    };
  
    return (
      <div className="training-list-container1">
        <Sidebar2 />
        <div className="training-list-content1">
          <Navbar2 />
          <h1>TRAINING & COURSES</h1>
          <div className="training-cards1">
            {trainingsuser.map((training, index) => (
              <div key={index} className="training-card1">
                {training.map((value, idx) => (
                  <div className="card-content1" key={idx}>
                    <h3 className="card-title1">{value[1]}</h3>
                    <div className="details-container1">
                      <div className="detail1">
                        <img src={value[2]} alt={value[1]} className="card-image1" />
                        <p className="card-text1">Objective:--  {value[3]}</p>
                        <p className="card-text1">Toipc:--  {value[4]}</p>
                        <p className="card-text1">Duration:--  {value[5]}</p>
                      </div>
                      {/* <button className='button-33' role="button" >Enroll Now</button> */}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
}
  

export default TrainingUser