import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FacultyCard from './FacultyCard';
import './FacultyProfile.css';
import { useRef } from 'react';
import './Faculty.css';

const FetchAllFaculty = () => {
  const SearchRef = useRef(null);
  const [facultyData, setFacultyData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const img = '';

  const [FacultyBody, setFacultyBody] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/fetch/users');
        setFacultyData(response.data);
        var bdy = response.data.map(function (e) {
          return <FacultyCard key={e.email} img={img} name={e.name} email={e.email} role={e.role} />;
        })
        setFacultyBody(bdy);
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

  function UpdateFacultyHandler() {
    if (loading) return;

    const value = SearchRef.current.value.toLowerCase();

    const filteredData = facultyData.filter(e => {
      return (
        e.name.toLowerCase().includes(value) ||
        e.email.toLowerCase().includes(value) ||
        e.role.toLowerCase().includes(value)
      );
    });

    const updatedFacultyBody = filteredData.map(e => (
      <FacultyCard key={e.email} img={img} name={e.name} email={e.email} role={e.role} />
    ));

    setFacultyBody(updatedFacultyBody);
  }

  return (
    <div>
      <h1 className='FacultyTitle'>Registered Faculty Details</h1>
      <div className='FacultySearch'>
        <input type='search' placeholder="🔍 Search .." ref={SearchRef} onChange={UpdateFacultyHandler} ></input>
      </div>
      <div className='FacultyAdmin'>
        {FacultyBody}
      </div>
    </div>
  );
};

export default FetchAllFaculty;