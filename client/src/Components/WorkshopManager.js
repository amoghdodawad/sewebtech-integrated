import React, { useState, useEffect } from "react";
import "./WorkshopManager.css";

function WorkshopManager() {
  const [workshopsData, setWorkshopsData] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    action: "Add",
    currentRowIndex: null,
    workshopDetails: "",
    startDate: "",
    endDate: "",
  });

  const [filterOption, setFilterOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchWorkshopsData();
  }, []);

  const fetchWorkshopsData = () => {
    fetch("/workshops/all")
      .then((response) => response.json())
      .then((data) => {
        setWorkshopsData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const openWorkshopModal = (action, rowIndex) => {
    const selectedWorkshop = workshopsData[rowIndex];
    setModal((prevModal) => ({
      ...prevModal,
      open: true,
      action: action,
      currentRowIndex: rowIndex,
      workshopDetails: selectedWorkshop?.workshopDetails || "",
      startDate: selectedWorkshop?.start_date || "",
      endDate: selectedWorkshop?.end_date || "",
    }));
  };

  const closeWorkshopModal = () => {
    setModal((prevModal) => ({ ...prevModal, open: false }));
  };

  const saveWorkshop = () => {
    if (!modal.workshopDetails || !modal.startDate || !modal.endDate) {
      alert("Please fill in all fields.");
      return;
    }

    const workshopData = {
      workshopDetails: modal.workshopDetails,
      start_date: modal.startDate,
      end_date: modal.endDate,
    };

    const url =
      modal.action === "Add"
        ? "/workshops/add"
        : `/workshops/edit/${
            modal.currentRowIndex !== null
              ? workshopsData[modal.currentRowIndex]._id
              : ""
          }`;

    fetch(url, {
      method: modal.action === "Add" ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workshopData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        fetchWorkshopsData();
        closeWorkshopModal();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteWorkshop = (rowIndex) => {
    const workshopId = workshopsData[rowIndex]._id;

    fetch(`/workshops/delete/${workshopId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete workshop");
        }
        console.log("Success: Workshop deleted");
        fetchWorkshopsData();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const filterWorkshops = () => {
    if (filterOption === "name") {
      if (!searchTerm) {
        alert("Please enter a workshop name.");
        return;
      }
      const matchingWorkshops = workshopsData.filter((workshop) =>
        workshop.workshopDetails.toLowerCase() === searchTerm.toLowerCase()
      );
      setSearchResults(matchingWorkshops);
    } else if (filterOption === "dateRange") {
      if (!startDate || !endDate) {
        alert("Please enter both start date and end date.");
        return;
      }
      const workshopsInDateRange = workshopsData.filter((workshop) => {
        const workshopStartDate = new Date(workshop.start_date);
        const workshopEndDate = new Date(workshop.end_date);
        const filterStartDate = new Date(startDate);
        const filterEndDate = new Date(endDate);
        return (
          workshopStartDate >= filterStartDate &&
          workshopEndDate <= filterEndDate
        );
      });
      setSearchResults(workshopsInDateRange);
    }
  };
  

  const renderSearchResultsTable = () => {
    if (searchResults.length > 0) {
      return (
        <div>
          <h2>Search Results</h2>
          <table className="workshopTable">
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Workshop Details</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((workshop, index) => {
                const dateOptions = {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                };
                return (
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{workshop.workshopDetails}</td>
                    <td>
                      {new Date(workshop.start_date).toLocaleDateString(
                        undefined,
                        dateOptions
                      )}
                    </td>
                    <td>
                      {new Date(workshop.end_date).toLocaleDateString(
                        undefined,
                        dateOptions
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    } else if (filterOption) {
      return <p>No search results.</p>;
    } else {
      return null;
    }
  };

  return (
    <div className="workshop">
      <div className="workshop-heading">
        <h1>Workshops Conducted</h1>
      </div>

      <table className="workshopTable">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Workshop Details</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {workshopsData.map((workshop, index) => {
            const dateOptions = {
              day: "numeric",
              month: "numeric",
              year: "numeric",
            };
            return (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{workshop.workshopDetails}</td>
                <td>
                  {new Date(workshop.start_date).toLocaleDateString(
                    undefined,
                    dateOptions
                  )}
                </td>
                <td>
                  {new Date(workshop.end_date).toLocaleDateString(
                    undefined,
                    dateOptions
                  )}
                </td>
                <td className="action-column">
                  <div className="action-buttons">
                    <button onClick={() => openWorkshopModal("Edit", index)}>
                      Edit
                    </button>
                    <button onClick={() => deleteWorkshop(index)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="action-buttons action1">
        <button onClick={() => openWorkshopModal("Add")}>Add Workshop</button>
        <button onClick={() => setFilterOption("name")}>
          Search by Workshop Name
        </button>
        <button onClick={() => setFilterOption("dateRange")}>
          Search by Date Range
        </button>
      </div>

      {filterOption === "name" && (
        <div className="search-input">
          <label htmlFor="workshopNameInput">Workshop Name:</label>
          <input
            type="text"
            id="workshopNameInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setSearchTerm("")}>Clear</button>
          <button onClick={filterWorkshops}>Search</button>
        </div>
      )}

      {filterOption === "dateRange" && (
        <div className="date-range-input">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
          >
            Clear
          </button>

          <button onClick={filterWorkshops}>Search</button>
        </div>
      )}

      {renderSearchResultsTable()}

      {modal.open && (
        <div className="overlay">
          <div className="workshop-modal">
            <h2>Add Workshop</h2>
            <label htmlFor="workshopDetails">Workshop Details:</label>
            <input
              type="text"
              id="workshopDetails"
              name="workshopDetails"
              required
              value={modal.workshopDetails}
              onChange={(e) =>
                setModal((prevModal) => ({
                  ...prevModal,
                  workshopDetails: e.target.value,
                }))
              }
            />
            <br />
            <br />

            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              required
              value={modal.startDate}
              onChange={(e) =>
                setModal((prevModal) => ({
                  ...prevModal,
                  startDate: e.target.value,
                }))
              }
            />
            <br />
            <br />

            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              required
              value={modal.endDate}
              onChange={(e) =>
                setModal((prevModal) => ({
                  ...prevModal,
                  endDate: e.target.value,
                }))
              }
            />
            <br />
            <br />

            <button
              type="button"
              className="overlay-button"
              onClick={saveWorkshop}
            >
              Save
            </button>

            <button
              type="button"
              className="overlay-button"
              onClick={closeWorkshopModal}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkshopManager;
