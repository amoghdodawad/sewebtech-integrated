// SearchComponent.js

import React, { useState, useEffect } from "react";
import "./SearchComponent.css"; // Import the CSS file

const SearchComponent = () => {
  const [fId, setFId] = useState("");
  const [result, setResult] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Fetch courses data from the server when fId changes
    if (formSubmitted && fId) {
      fetch(`/api/details/${fId}/${localStorage.getItem('email')}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length === 0) { // Check if the result is empty
            alert("Invalid course name entered. Please try again.");
            setFormSubmitted(false); // Reset formSubmitted to allow re-submission
          } else {
            setResult(data);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [fId, formSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fId) {
      setFormSubmitted(true);
    } else {
      alert("Please enter a valid Faculty Id before submitting.");
    }
  };

  const handleChange = (e) => {
    setFId(e.target.value);
    setFormSubmitted(false);
  };

  return (
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
        <label className="form-label">
          Enter Course Name:
          <input
            type="text"
            value={fId}
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>

      {formSubmitted && result.length > 0 && (
        <div className="result-container d-flex justify-content-center">
          <h3 className="result-heading">
            Details of Teachers Teaching Course: {fId}
          </h3>
          <div className="w-50">
            <table className="result-table">
              <thead>
                <tr>
                  <th>Faculty Id</th>
                  <th>Course Name</th>
                  <th>How Many Times</th>
                  <th>Course Code</th>
                </tr>
              </thead>
              <tbody>
                {result.map((course, index) => (
                    <tr key={index}>
                      <td>{course.fId}</td>
                      <td>{course.courseName}</td>
                      <td>{course.howManyTimes}</td>
                      <td>{course.courseCode}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
