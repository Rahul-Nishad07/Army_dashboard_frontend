import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";


const Sidebar2 = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/home2" style={{ textDecoration: "none" }}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd3OWL0zqs1KeoQAy28_bXLyLmQxr3wgpVEOXNmq161creo-h4PacmJ5vWU6dHiXmIKU4&usqp=CAU"
        // src="./images/army_logo.png"
        alt="login"

        style={{ height: '140px', width: '250px' ,paddingTop:'60px', paddingLeft:'auto' ,paddingRight:'auto' }} 
        />
        </Link>
      </div>
      
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/home2" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>


          <p className="title">LISTS</p>


          <Link to="/home2/profile" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>


          <Link to="/home2/missionUser"  style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Mission's</span>
          </li>
          </Link>


          <Link to="/home2/assignmentUser"  style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Assignment's</span>
          </li>
          </Link>

        
          <Link to="/home2/trainingUser"  style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Training's</span>
          </li>
          </Link>
         
          <p className="title">USEFULs</p>



         
          <Link to="/home2/notificationUser"  style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Notification's</span>
          </li>
          </Link>


          <Link to="/home2/feedbackUser" style={{ textDecoration: "none" }}>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Feedback</span>
          </li>
          </Link>

          <Link to="/home2/medicalappointment"  style={{ textDecoration: "none" }}>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>Medical Appointment's</span>
          </li>
          </Link>

          <p className="title">USER</p>

            <Link  to='/soldier' onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/soldier';
            }}>
                  <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
              </li>
            </Link>
          
          

          {/* <Link to="/login"  style={{ textDecoration: "none" }}>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
          </Link> */}
          

        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar2;
