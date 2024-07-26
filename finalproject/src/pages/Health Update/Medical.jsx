import React  ,{useEffect,useState}from 'react'
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';


const URL_API = "http://localhost:5164/getall_army_medicalAppointments"
const DELETE_API ="http://localhost:5164/delete_medicalappointment"

const Medical = () => {
  const [medical, setMedical] = useState([]);


  //for the restriction - we cant go to another page using back button of the website
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

  const getData = () => {
    const payload = {
      eventID: "1001",
      addInfo: {
        id: 'id' // Adjust as per your API requirements
      }
    };

    axios.post(URL_API, payload)
      .then(response => {
        const resData = response.data.result.rData.rMessage;
        setMedical(resData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="new">
    <Sidebar />
    <div className="newContainer">
      <Navbar />
      <div className="notification-table">
        <table>
          <thead>
            <tr>
            <th>ID</th>
              <th>Purpose</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Height</th>
              <th>Weight</th>
              <th>BP</th>
              <th>Actions</th>
            </tr>
          </thead>
          {medical.map((medicals, index) => (
          <tbody key={index}>
              {medicals.map((value, idx) => (
              <tr  key={idx}>

                <td>{value[0]}</td>
                <td>{value[1]}</td>
                <td>{value[2]}</td>
                <td>{value[3]}</td>
                <td>{value[4]}</td>
                <td>{value[5]}</td>
                <td>{value[6]}</td>
                <td>{value[7]}</td>
                <td>{value[8]}</td>
               
                <td>
                <button  variant="danger" className='button-mission2' role="button"  onClick={() => handleDelete(value[0])}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
          ))}
        </table>
      </div>
    </div>
  </div>
  )
}

export default Medical