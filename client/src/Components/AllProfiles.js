import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllProfile.css'

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

  const columns = Object.keys(facultyData[0] || {});

  return (
    <div>
      <h1>All Faculty Details</h1>
      <table border="1" className='add-border'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th> 
            <th>Designation</th>
            <th>Qualification</th>
            <th>Area of Specialization</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th>Mobile Number</th>
            <th>Date of Birth</th>
            <th>Academic Performance</th>
          </tr>
        </thead>
        <tbody className='add-border'>
          {facultyData.map((facultyMember, index) => (
            <tr key={index} className='add-border'>
              <td>{facultyMember.name}</td>
              <td>{facultyMember.email}</td>
              <td>{facultyMember.designation}</td>
              <td>{facultyMember.qualification}</td>
              <td>{facultyMember.area_of_specialization}</td>
              <td>{facultyMember.address}</td>
              <td>{facultyMember.resi_contact_no}</td>
              <td>{facultyMember.mobile_no}</td>
              <td>{facultyMember.dob}</td>
              <td>
                <table border="1" className='add-border'>
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Board/University</th>
                      <th>Year of Passing</th>
                      <th>Class Obtained</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facultyMember.AcademicPerformance.map((performance, index2) => (
                      <tr key={index2}>
                        <td>{performance.course}</td>
                        <td>{performance.board_university}</td>
                        <td>{performance.year_of_passing}</td>
                        <td>{performance.class_obtained}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FetchAllFaculty;