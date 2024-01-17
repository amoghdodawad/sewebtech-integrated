// import React from 'react'

// const  = () => {
//   return (
//     <div>
//       <h1>Teaching portfolio</h1>
//     </div>
//   )
// }

// export default TeachingPortfolio

// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddCourseForm from './AddCourseForm';
import DisplayCourses from './DisplayCourses';
import WelcomePage from './WelcomePage';
import SearchComponent from './SearchComponent';


const TeachingPortfolio = () => {

  const separatorStyle = {
    width: "100%",
    borderBottom: "2px solid black", // Add a black line as a separator
    marginBottom: "10px",
  };


  return (
    // <Router>
      <div style={{border:'2px solid rgb(229, 49, 85)', borderRadius: '12px', minHeight: '100vh',background:'linear-gradient(135deg, #fcfcfd, #fffaec)'}}>
        <div style={{
          boxSizing: 'border-box',
          fontFamily: 'Poppins',
          padding: '20px',
        }}>
        <div style={separatorStyle} /> {/* Black line separator */}
        </div>
        
        <div style={{
        color: 'rgb(229, 49, 85)',
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins',
        }}>
        {/* <Routes>
          
        </Routes> */}
        </div>
      </div>
    // </Router>
  );
};

export default TeachingPortfolio
