import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Mission from "./pages/Mission/Mission";
import { Assessment } from "@mui/icons-material";
import Assignment from "./pages/Assignment/Assignment";
import Trainning from "./pages/Training/Trainning";
import Notification from "./pages/Notification/Notification";
import Medical from "./pages/Health Update/Medical";
import Assignment_list from "./pages/Assignment/Assignment_list";
import Training_list from "./pages/Training/Training_list";
import Mission_list from "./pages/Mission/Mission_list";
import Feedback from "./pages/feedback/Feedback";
import About from "./pages/About/About";
import Soldier from "./pages/login/Soldier";
import Home2 from "./pages/home/Home2";
import Profile from "./pages/Soldier/Profile.jsx"
import MissionUser from "./pages/Soldier/MissionUser.jsx";
import AssignmentUser from "./pages/Soldier/AssignmentUser.jsx";
import NotificationUser from "./pages/Soldier/NotificationUser.jsx";
import AboutUser from "./pages/Soldier/AboutUser.jsx";
import TrainingUser from "./pages/Soldier/TrainingUser.jsx";
import MedicalAppointment from "./pages/Soldier/MedicalAppointment.jsx";
import FeedbackUser from "./pages/Soldier/FeedbackUser.jsx";
import SignUp from "./pages/login/SignUp.jsx";
import VerifyEmail from "./pages/login/VerifyEmail.jsx";
import OTPverify from "./pages/login/OTPverify.jsx";
import GeneratePass from "./pages/login/GeneratePass.jsx";
import Notification_list from "./pages/Notification/Notification_list.jsx"
import Soldiers_list from "./pages/login/Soldiers_list.jsx";
import PieChart from "./pages/Soldier/PieChart.jsx";
import PieChartsAssignment from "./pages/Soldier/PieChartsAssignment.jsx";




function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="soldier" element={<Soldier />} />
            <Route path="signup" element={<SignUp/>} />
            <Route path="verifyEmail" element={<VerifyEmail/>} />
            <Route path="generatepass" element={<GeneratePass/>} />
            <Route path="otpverify" element={<OTPverify/>} />



{/* 
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>  */}

            <Route path="soldier_list">
              <Route index element={<Soldiers_list />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>

            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="mission" element={<Mission />} />
            <Route path="mission/missionform" element={<Mission />} />
            <Route path="mission/missionlist" element={<Mission_list />} />


            <Route path="assignment" element={<Assignment />} />
            <Route path="assignment/assignmentform" element={<Assignment />} />
            <Route path="assignment/assignmentList" element={<Assignment_list />} />


            <Route path="trainning" element={<Trainning />} />
            <Route path="trainning/trainnigform" element={<Trainning />} />
            <Route path="trainning/trainninglist" element={<Training_list/>} />
            <Route path="notification" element={<Notification />} />
            <Route path="notificationlist" element={<Notification_list/>} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="medicalappoint" element={<Medical />} />
            <Route path="about" element={<About />} />
          </Route>





          <Route path="/home2">
            <Route index element={<Home2 />} />
            <Route path="profile" element={<Profile />} />
            <Route path="missionUser" element={<MissionUser />} />
            <Route path="assignmentUser" element={<AssignmentUser />} />
            <Route path="notificationUser" element={<NotificationUser />} />
            <Route path="aboutUser" element={<AboutUser />} />
            <Route path="trainingUser" element={<TrainingUser/>} />
            <Route path="medicalappointment" element={<MedicalAppointment/>} />
            <Route path="feedbackUser" element={<FeedbackUser/>} />
            <Route path="piechart" element={<PieChart/>} />
            <Route path="piechartAssign" element={<PieChartsAssignment/>} />

            
            




            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>


            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>


            <Route path="mission" element={<Mission />} />
            <Route path="mission/missionform" element={<Mission />} />
            <Route path="mission/missionlist" element={<Mission_list />} />


            <Route path="assignment" element={<Assignment />} />
            <Route path="assignment/assignmentform" element={<Assignment />} />
            <Route path="assignment/assignmentList" element={<Assignment_list />} />


            <Route path="trainning" element={<Trainning />} />
            <Route path="trainning/trainnigform" element={<Trainning />} />
            <Route path="trainning/trainninglist" element={<Training_list/>} />


            <Route path="notification" element={<Notification />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="medicalappoint" element={<Medical />} />
           
          </Route>

         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
