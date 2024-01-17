// src/components/AddCourseForm.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddCourseForm.css"; // Import the CSS file

const AddCourseForm = ({ onAddCourse }) => {
  const [courses, setCourses] = useState([
    { courseName: "", howManyTimes: "", courseCode: "" },
    { courseName: "", howManyTimes: "", courseCode: "" },
    { courseName: "", howManyTimes: "", courseCode: "" },
  ]);
  const navigate = useNavigate();
  const [courseNames, setCourseNames] = useState([]);
  const [courseCodeMap, setCourseCodeMap] = useState({});

  useEffect(() => {
    // Fetch course names from your API or set them statically
    // For example, you can replace the following line with an API call
    const fetchedCourseData = [
      { name: "webtech", code: "1240" },
      { name: "system software", code: "1241" },
      { name: "soft engg", code: "1242" },
      { name: "statistics", code: "1243" },
      { name: "GTLA", code: "1244" },
      { name: "Basic mech engg", code: "1245" },
    ];

    const courseNames = fetchedCourseData.map((course) => course.name);
    const codeMap = fetchedCourseData.reduce((map, course) => {
      map[course.name] = course.code;
      return map;
    }, {});

    setCourseNames(courseNames);
    setCourseCodeMap(codeMap);
  }, []);

  const handleInputChange = (index, fieldName, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][fieldName] = value;
    if (fieldName === "courseName") {
      console.log("value:", value);
      const courseCode = courseCodeMap[value];
      updatedCourses[index]["courseCode"] = courseCode;
    }
    setCourses(updatedCourses);
  };

  const handleAddRow = () => {
    setCourses([
      ...courses,
      { courseName: "", howManyTimes: "", courseCode: "" },
    ]);
  };

  const handleAddCourse = async () => {
    const allFieldsFilled = courses.every(
      (course) =>
        course.courseName && course.howManyTimes !== "" && course.courseCode
    );

    const uniqueCourses = new Set();
    const hasDuplicate = courses.some((course) => {
      const courseKey = `${course.courseName}-${course.howManyTimes}`;
      if (uniqueCourses.has(courseKey)) {
        return true; // Found a duplicate
      }
      uniqueCourses.add(courseKey);
      return false;
    });

    if (hasDuplicate) {
      alert("Duplicate course selections are not allowed.");
      return;
    }

    // Check if "howManyTimes" is a valid number
    const validHowManyTimes = courses.every(
      (course) => !isNaN(course.howManyTimes)
    );

    if (allFieldsFilled && validHowManyTimes) {
      try {
        const response = await fetch("/api/addCourse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({courses : courses, email : localStorage.getItem('email')}),
        });

        const data = await response.json();
        if (data.success) {
          // Optionally do something upon successful addition
          alert("Courses added successfully!");
          setCourses([
            { courseName: "", howManyTimes: "", courseCode: "" },
            { courseName: "", howManyTimes: "", courseCode: "" },
            { courseName: "", howManyTimes: "", courseCode: "" },
          ]);
        } else {
          alert("Failed to add courses. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An unexpected error occurred.");
      }
    } else {
      if (!allFieldsFilled) {
        alert("Please fill in all fields.");
      } else {
        alert("Please ensure 'How Many Times' is a valid number.");
      }
    }
  };

  const handleDisplayCourses = () => {
    // Navigate to the DisplayCourses route
    navigate("/display");
  };

  return (
    <div className="add-course-form">
      <h2>Add Course</h2>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>How Many Times?</th>
            <th>Course Code</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>
                <select
                  value={course.courseName}
                  onChange={(e) =>
                    handleInputChange(index, "courseName", e.target.value)
                  }
                >
                  <option value="" disabled>
                    Select Course
                  </option>
                  {courseNames.map((name, optionIndex) => (
                    <option key={optionIndex} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={course.howManyTimes}
                  onChange={(e) =>
                    handleInputChange(index, "howManyTimes", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={course.courseCode}
                  onChange={(e) =>
                    handleInputChange(index, "courseCode", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons">
        <button onClick={handleAddRow}>Add Row</button>
        <button onClick={handleAddCourse}>Save</button>
        <button onClick={handleDisplayCourses}>Display Courses</button>
      </div>
    </div>
  );
};

export default AddCourseForm;
