// TableData.jsx:
import React, { useState, useEffect } from 'react';
import ConferenceForm from './ConferenceForm';

function TableData() {
    const [studentData, setStudentData] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('/test2');
            const data = await response.json();
            setStudentData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
    };

    const handleSaveEdit = async (updatedData) => {
        try {
            const response = await fetch(`/update/${updatedData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error('Error updating data');
            }

            const updatedStudentData = [...studentData];
            updatedStudentData[editingIndex] = updatedData;
            setStudentData(updatedStudentData);
            setEditingIndex(null);
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            console.log(id);
            const response = await fetch(`/delete/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error deleting data');
            }

            // Update the state after successful deletion
            const updatedStudentData = studentData.filter((student) => student.id !== id);
            setStudentData(updatedStudentData);

            // Additional code after successful deletion (if needed)

        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const tableRows = studentData
        .filter((info) => info.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            const yearA = parseInt(a.year, 10);
            const yearB = parseInt(b.year, 10);

            return sortOrder === 'asc' ? yearA - yearB : yearB - yearA;
        })
        .map((info, index) => {
            const srNo = index + 1;

            return (
                <tr key={info.id}>
                    <td>{srNo}</td>
                    <td>{info.title}</td>
                    <td>{info.details_of_conferences}</td>
                    <td>{info.year}</td>
                    <td>{info.Awards}</td>
                    <td>
                        <button className="delete-button" onClick={() => handleDelete(info.id)}>Delete</button>
                    </td>
                </tr>
            );
        });

    const handleAddRow = (newRow) => {
        const updatedStudentData = [...studentData, newRow];
        setStudentData(updatedStudentData);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSortByAsc = () => {
        setSortOrder('asc');
    };

    const handleSortByDesc = () => {
        setSortOrder('desc');
    };

    return (
        <div className="table-container">
            <h1 style={{ marginTop:"30px",textAlign: 'center', fontSize: '30px', fontWeight: 'bold' }}>Details of Conferences attended</h1>


            <input style={{marginTop: "30px", width: "80%",marginBottom:"30px"}}
                id="search"
                type="text"
                placeholder="Search by Title"
                value={searchQuery}
                onChange={handleSearch}
            />
            <div className="Option-buttons">
                <button className="Sorting-button" onClick={handleSortByAsc}>
                    Sort by Year Ascending
                </button>
                <button className="Sorting-button" onClick={handleSortByDesc}>
                    Sort by Year Descending
                </button>
            </div>
            <table className="table table-stripped" border="2" style={{marginTop:"20px",marginBottom:"30px"}}>
                <thead>
                    <tr>
                        <th style={{color:'white'}}>Sr.NO</th>
                        <th style={{color:'white'}}>Title of the paper</th>
                        <th style={{color:'white'}}>National or International Journal conferences details</th>
                        <th style={{color:'white'}}>Year</th>
                        <th style={{color:'white'}}>Awards</th>
                        <th style={{color:'white'}}>Action</th>
                    </tr>
                </thead>
                <tbody>{tableRows}</tbody>
            </table>
            {editingIndex !== null ? (
                <ConferenceForm
                    func={handleSaveEdit}
                    onCancel={handleCancelEdit}
                    initialData={studentData[editingIndex]}
                />
            ) : (
                <ConferenceForm onAddRow={handleAddRow} />
            )}
        </div>
    );
}

export default TableData;
