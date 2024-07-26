import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget2 from "../../components/widget/Widget2";
// import Featured from "../../components/featured/Featured";
// import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import Sidebar2 from "../../components/sidebar/Sidebar2";
import React,{use} from "react";
import PieCharts from "../Soldier/PieChart";
import PieChartsAssignment from "../Soldier/PieChartsAssignment";

const Home2 = () => {

     //for the restriction - we cant go to another page using back button of the website
     window.history.pushState(null, null, window.location.href);
     window.onpopstate = function () {
         window.history.go(1);
     }; 

  return (
    <div className="home">
      <Sidebar2 />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
         
          <Widget2 type="order" />
          <Widget2 type="earning" />
          <Widget2 type="balance" />
        </div>
        <div className="charts">
          <PieCharts title="Mission Status" aspect={2 / 1} />
        </div>

        <div className="charts">
        <PieChartsAssignment title="Assignment status" aspect={2 / 1} />
        </div>
       
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div> */}
      </div>
    </div>
  );
};

export default Home2;
