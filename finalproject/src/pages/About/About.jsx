import React from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import './AboutPage.css'; // Import your CSS file for styling if needed

const About = () => {
  
  return (
    <div className="new">
    <Sidebar />
    <div className="newContainer">
        <Navbar />
      <h2>About Our Organization</h2>
      <div className="organization-info">
        <img src="/path/to/your/image.jpg" alt="Organization Image" className="org-image" />
        <div className="org-details">
          <h3>Organization Name</h3>
          <p>
            Insert a brief history or description of your organization here. You can provide 
            details about its founding, mission statement, and key achievements.
          </p>
        </div>
      </div>
    </div>
    </div>
  );
}


export default About