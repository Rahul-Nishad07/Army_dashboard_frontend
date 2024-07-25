import React from 'react';
import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { Link } from "react-router-dom";

const Widget2 = ({ type }) => {
  let data;
  let widgetClass;
  let icon;

  // Temporary
  // const amount = 100;

  switch (type) {
    case "user":
      data = {
        title: "PROFILE",
        isMoney: false,
        link: <Link to="/isDetailedView" style={{color:"white"}}>See all Soldier's</Link>,
      };
      widgetClass = "user";
     
      break;
    case "order":
      data = {
        title: "MISSIONS",
        isMoney: false,
        link: <Link to="/home2/missionUser"  style={{color:"white"}}>See all Mission's</Link>,
      };
      widgetClass = "order";
    
      break;
    case "earning":
      data = {
        title: "TASK",
        isMoney: true,
        link: <Link to="/home2/assignmentUser" style={{color:"white"}}>See all Task</Link>,
      };
      widgetClass = "earning";
      
      break;
    case "balance":
      data = {
        title: "Feedback",
        isMoney: true,
        link: <Link to="/home2/notificationUser" style={{color:"white"}}>See all Notification's</Link>,
      };
      widgetClass = "balance";
     
      break;
    default:
      widgetClass = "";
      icon = null;
      break;
  }

  return (
    <div className={`widget ${widgetClass}`}>
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney ? "" : ""} 
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          {/* You can add percentage info here */}
        </div>
        {icon}
      </div>
    </div>
  );
};

export default Widget2;
