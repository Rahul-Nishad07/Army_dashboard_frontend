import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

const Navbar2 = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          {/* <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div> */}
          <div className="item">
            <Link to="">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
            </Link>
          </div>
           {/* <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>  */}

         
          <div className="item">
          <Link to="/home2/notificationUser">
            <NotificationsNoneOutlinedIcon className="icon" />
            
            </Link>
          </div>


          <div className="item">
            <Link to="/home2/feedbackUser">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
           
            </Link>
          </div>
          
          <div className="item">
           <Link to="/home2/profile" style={{ textDecoration: "none" }}>
            
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
              
            /> 
    
          </Link>   

        
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
