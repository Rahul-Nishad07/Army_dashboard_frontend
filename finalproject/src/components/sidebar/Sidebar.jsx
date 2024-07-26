import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd3OWL0zqs1KeoQAy28_bXLyLmQxr3wgpVEOXNmq161creo-h4PacmJ5vWU6dHiXmIKU4&usqp=CAU"
        // src="./images/army_logo.png"
        alt="login"

        style={{ height: '140px', width: '250px' ,paddingTop:'60px', paddingLeft:'auto' ,paddingRight:'auto' }}  
        />
        </Link>
      </div>
      {/* <hr /> */}
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
                        Mission_Form
                    </Link>
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
            <span>Training's</span>
            <ul className="dropdown">
                <li>
                    <Link to="/trainning/trainnigform" style={{ textDecoration: "none" }}>
                        Training_Form
                    </Link>
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
                    <Link to="/assignment/assignmentlist" style={{ textDecoration: "none" }}>
                        Assignment List
                    </Link>
                </li>
            </ul>
        </li>

        <p className="title">USEFULs</p>

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

        <Link to="/medicalappoint" style={{ textDecoration: "none" }}>
            <li>
                <SettingsSystemDaydreamOutlinedIcon className="icon" />
                <span>Medical Appointment's</span>
            </li>
        </Link>

        <p className="title">ADMIN</p>

        <Link to='/login' onClick={() => {
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
    <div className="colorOption" onClick={() => dispatch({ type: "LIGHT" })}></div>
    <div className="colorOption" onClick={() => dispatch({ type: "DARK" })}></div>
</div>

    </div>
  );
};

export default Sidebar;
