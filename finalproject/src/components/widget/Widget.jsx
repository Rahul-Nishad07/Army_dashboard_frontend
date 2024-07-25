import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  let data;

  // Temporary amount
  // const amount = 100;

  switch (type) {
    case "user":
      data = {
        title: "SOLDIER'S",
        isMoney: false,
        link: <Link to="/soldier_list" style={{color:"white"}}>See all Soldier's</Link>,
        // icon: <PersonOutlinedIcon className="icon" />,
      };
      break;
    case "order":
      data = {
        title: "MISSIONS",
        isMoney: false, 
        link: <Link to="mission/missionlist" style={{color:"white"}}>See all Mission's</Link>,
        // icon: <ShoppingCartOutlinedIcon className="icon" />,
      };
      break;
    case "earning":
      data = {
        title: "TASK",
        isMoney: true,
        link: <Link to="assignment/assignmentList" style={{color:"white"}}>See all Task</Link>,
        // icon: <MonetizationOnOutlinedIcon className="icon" />,
      };
      break;
    case "balance":
      data = {
        title: "Feedback",
        isMoney: true,
        link: <Link to="/feedback" style={{color:"white"}}>See all Feedback</Link>,
        // icon: <AccountBalanceWalletOutlinedIcon className="icon" />,
      };
      break;
    default:
      break;
  }

  return (
    <div className={`widget ${type}`}>
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney ? "" : ""}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          {/* Add percentage text if needed */}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
