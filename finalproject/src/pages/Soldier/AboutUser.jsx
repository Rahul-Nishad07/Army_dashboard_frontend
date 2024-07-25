import React from 'react';
import Sidebar2 from "../../components/sidebar/Sidebar2";
import Navbar2 from "../../components/navbar/Navbar2";
// import './AboutPage.css'; // Import your CSS file for styling if needed

const AboutUser = () => {
  
  return (
    <div className="new">
    <Sidebar2 />
    <div className="newContainer">
        <Navbar2 />
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


export default AboutUser