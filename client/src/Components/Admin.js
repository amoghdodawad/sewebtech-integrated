import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './AdminProfile.css'; 
import image from './image.jpeg'; 


const FetchAllFaculty = () => {
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/fetch/Faculty');
        setFacultyData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
   
  const AdminData = {
    name: 'Admin',
    designation: 'Professor',
    qualification: 'Ph.D. in Computer Science',
    photoURL: image,
};

  const columns = Object.keys(facultyData[0] || {});

  return (
    
    <div className="admin-container">
          <h1>Admin Handle</h1>
          <div className="admin-info">
              <img src={AdminData.photoURL} alt="Admin" />
              <div className="admin-details">
                  <h2>{localStorage.getItem('name')}</h2>
                  <div>
                      <p className="designation">{facultyData.designation}</p>
                      <p className="qualification">{facultyData.qualification}</p>
                  </div>
              </div>
          </div>
          <ul className="module-links">
             <li className="module-link">
            <Link to={`/AllProfiles`}>
                <button>
                <h4>All profiles</h4>
                <p>Manages personal details and qualifications of faculty members.</p>
               </button>
            </Link>
            </li>
           </ul>
           <ul className="module-links">
             <li className="module-link">
            <Link to={`/AddProfiles`}>
                <button>
                <h4>Add/Edit Profiles</h4>
                <p>Add/ Edit details of faculty members.</p>
               </button>
            </Link>
            </li>
           </ul>
      </div>
);
};

export default FetchAllFaculty;
