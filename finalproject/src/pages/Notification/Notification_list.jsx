// import React, { useState, useEffect } from 'react';
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import axios from 'axios';
// import './notification.css'; // Import CSS for styling

// const URL_API = "http://localhost:5164/getall_army_notifications";
// const DELETE_API ="http://localhost:5164/delete_notification";

// const Notification_list = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = () => {
//     const payload = {
//       eventID: "1001",
//       addInfo: {
//         id: 'id' // Adjust as per your API requirements
//       }
//     };

//     axios.post(URL_API, payload)
//       .then(response => {
//         const resData = response.data.result.rData.rMessage;
//         setNotifications(resData);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   };

//   const handleDelete = async (id) => {
//     try {
//       const payload = {
//         eventID: "1001",
//         addInfo: {
//           id: id
//         }
//       };
//       const response = await axios.post(DELETE_API, payload);
//       console.log(response.data); // Handle response as needed
//       getData(); // Refresh data after deletion
//     } catch (error) {
//       console.error('Error deleting item:', error);
//     }
//   };


//   return (
//     <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         <div className="notification-table">
//           <table>
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Message</th>
//                 <th>Status</th>
//                 <th>Date</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             {notifications.map((notification, index) => (
//             <tbody key={index}>
//                 {notification.map((value, idx) => (
//                 <tr  key={idx}>
//                   <td>{value[1]}</td>
//                   <td>{value[2]}</td>
//                   <td>{value[3]}</td>
//                   <td>{value[4]}</td>
//                   <td>
//                   <button variant="danger" className='button-mission2' role="button"  onClick={() => handleDelete(value[0])}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//             ))}
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Notification_list;

import React, { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from 'axios';
import './notification.css'; // Import CSS for styling

const URL_API = "http://localhost:5164/getall_army_notifications";
const DELETE_API = "http://localhost:5164/delete_notification";

const Notification_list = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Restrict user from navigating away from the webpage
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };

        getData();
    }, []);

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
                setNotifications(resData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

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

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="notification-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Message</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {notifications.map((notification, index) => (
                            <tbody key={index}>
                                {notification.map((value, idx) => (
                                    <tr key={idx}>
                                        <td>{value[1]}</td>
                                        <td>{value[2]}</td>
                                        <td>{value[3]}</td>
                                        <td>{value[4]}</td>
                                        <td>
                                            <button variant="danger" className='button-mission2' role="button" onClick={() => handleDelete(value[0])}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Notification_list;