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

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
        <img
        src="./images/army_logo.png"
        alt="login"

       style={{ height: '100px', width: '180px' ,paddingTop:'30px' }} 
        />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>


          <p className="title">LISTS</p>


          <Link to="/soldier_list" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Soldier's</span>
            </li>
          </Link>

        
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Mission's</span>
              <ul className="dropdown">
              <li>
                <Link to="/mission/missionform" style={{ textDecoration: "none" }}>
                Mission_Form</Link>
              </li>
              <li>
              <Link to="/mission/missionlist" style={{ textDecoration: "none" }}>
                Mission_List
              </Link>
             </li>
             </ul>
            </li>
    


          

            <li>
              <StoreIcon className="icon" />
              <span>Trainning's</span>
              <ul className="dropdown">
              <li>
                <Link to="/trainning/trainnigform" style={{ textDecoration: "none" }}>
                Training_Form</Link>
              </li>
              <li>
              <Link to="/trainning/trainninglist" style={{ textDecoration: "none" }}>
                Training_List
              </Link>
             </li>
             </ul>
            </li>
      

          <li>
          <StoreIcon className="icon" />
          <span>Assignments</span>
          <ul className="dropdown">
            <li>
              <Link to="/assignment/assignmentform" style={{ textDecoration: "none" }}>
                Assignment Form
              </Link>
            </li>
            <li>
              <Link to="/assignment/assignmentList" style={{ textDecoration: "none" }}>
                Assignment List
              </Link>
            </li>
          </ul>
        </li>

         
          <p className="title">USEFULs</p>



          {/* <li>
            <InsertChartIcon className="icon" />
            <span>Status</span>
          </li> */}


          <Link to="/notification" style={{ textDecoration: "none" }}>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          </Link>


          
          <Link to="/notificationlist" style={{ textDecoration: "none" }}>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications list</span>
          </li>
          </Link>

          <Link to="/feedback" style={{ textDecoration: "none" }}>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Feedback</span>
          </li>
          </Link>

          <Link to="/medicalappoint"  style={{ textDecoration: "none" }}>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>Medical Appointment's</span>
          </li>
          </Link>



          {/* <p className="title">SERVICES</p> */}
{/*           
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li> */}
          {/* <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
          <p className="title">ADMIN</p>



{/* 
          <Link to="/about"  style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>About</span>
          </li>
          </Link> */}


          {/* <Link to="/login"  style={{ textDecoration: "none" }}>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
          </Link> */}

          <Link  to='/login' onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login';
                }}>
                  <li>
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
              </li>
            </Link>
          

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

export default Sidebar;
