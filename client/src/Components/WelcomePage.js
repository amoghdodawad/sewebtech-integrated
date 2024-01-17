// src/components/WelcomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css'; // Import the CSS file

const WelcomePage = () => {
  return (
    <div className="welcomePageContainer">
      <h1>Welcome to Faculty-Course details Module</h1>
      <h2>Services offered :</h2>
      <br />
      <div className="buttonContainer">
        <Link to="/add" className="linkStyle">
          <button className="addButton" title="Add your courses">
            ADD COURSES
          </button>
        </Link>
        
        <Link to="/display" className="linkStyle">
          <button className="buttonBase" title="Display the courses">
            DISPLAY COURSES
          </button>
        </Link>
        <Link to="/search" className="linkStyle">
          <button className="buttonBase" title="search the courses">
            SEARCH DETAILS
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
