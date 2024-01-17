import { useState, useEffect } from "react";


export default function Records(props) {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState([]);
  const [years,setYears]= useState([]);
  const [showData,setShowData]=useState([]);
  const [inputRecord, setInputRecord] = useState({});
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const updateYear = ()=>{
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, index) => currentYear - index);
    setYears([...years]);
  }

  const fetchData = async () => {
    try {
      const response = props.admin?await fetch(`/fetch/workexperience/experience_type/${props.category}`):await fetch(`/fetch/workexperience/experience_type,email/${props.category+","+props.email}`);
      const result = await response.json();
      setData([...result]);
      setShowData([...result]);
      console.log(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const updateData = async () => {
    console.log(inputRecord);
    try {
      const response = await fetch(`/update/workexperience/_id/${data[selectedRowIndex]._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          faculty_id: data[selectedRowIndex].faculty_id,
          institute_name: inputRecord.NameofIndustry,
          experience_type: data[selectedRowIndex].category,
          from_to: inputRecord.From + ',' + inputRecord.To,
          designation: inputRecord.Designation,
          total_years: parseInt(inputRecord.To) - parseInt(inputRecord.From)
         }),
      });

      if (response.ok) {
        console.log('Update successful');
      } else {
        console.error('Update failed');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
    
  const deleteData = async (index) => {
    try {
      const response = await fetch(`/delete/workexperience/_id/${data[index]._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Delete successful');
        fetchData();
      } else {
        console.error('Delete failed');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };
  const insertData = async () => {
    try {
      const response = await fetch('/insert/workexperience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('email'),
          institute_name: inputRecord.NameofIndustry,
          experience_type: props.category,
          from_to: inputRecord.From + ',' + inputRecord.To,
          designation: inputRecord.Designation,
          total_years: parseInt(inputRecord.To) - parseInt(inputRecord.From)
        }),
      });

      if (response.ok) {
        console.log('Insert successful');
        fetchData();
      } else {
        console.error('Insert failed');
      }
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };
  useEffect(() => {
    fetchData();
    updateYear();
  }, [props.category,props.faculty_id,props.admin]);

  const handleFilter = (event) => {
    event.preventDefault();
    // setShowData(data);
    // Filtering the data array based on the filter data
    const filteredData = data.filter((d) => {
      // Applying filters only if they are provided (not empty)
      const industryFilter = filters.industry
        ? d.institute_name.toLowerCase().includes(filters.industry.toLowerCase())
        : true;

      const designationFilter = filters.designation
        ? d.designation.toLowerCase().includes(filters.designation.toLowerCase())
        : true;
      const years = d.from_to.split(',');
      const yoeFilter = filters.yoe
        ? parseInt(years[1]) - parseInt(years[0]) >= parseInt(filters.yoe, 10)
        : true;

      // Combine the filters using AND logic
      return industryFilter && designationFilter && yoeFilter;
    });
    // Handle the filtered data as needed (e.g., update state, display, etc.)
    setShowData([...filteredData])
    setFilters({
      industry: '',
      designation: '',
      yoe: ''
    });
  };
  const handleInputRecord = (event) => {
    event.preventDefault();
    insertData();
    setInputRecord({
      From: '',
      To: '',
      NameofIndustry: '',
      Designation: '',
    });
  }
  const handleEdit = (index) => {
    setShowEditForm(true);
    setSelectedRowIndex(index);
  };

  const handleCancelEdit = () => {
    setInputRecord({
      From: '',
      To: '',
      NameofIndustry: '',
      Designation: '',
    });
    setShowEditForm(false);
    setSelectedRowIndex(null);
  };

  const handleSaveEdit = () => {
    // Implement your save edit logic here
    updateData();
    fetchData();
    setShowEditForm(false);
    setSelectedRowIndex(null);
    
    setInputRecord({
      From: '',
      To: '',
      NameofIndustry: '',
      Designation: '',
    });
  };
  return (
    <div className="container mx-auto my-8 relative">
      <h2 className="text-2xl font-bold mb-4">{props.category} Experience Records</h2>
      <div className="flex  justify-around">
        <form className="py-5 flex flex-col w-1/4" action="__blank" onSubmit={handleFilter}>
          <h3 className="text-2xl mb-4">Search</h3>
          <label htmlFor="industry">Name of the Industry</label>
          <input className="border border-black px-5 mx-2" value={filters.industry} onChange={(event) => { setFilters({ ...filters, industry: event.target.value }) }} id="industry" type="text" />
          <label htmlFor="designation">Designation</label>
          <input className="border border-black px-5 mx-2" value={filters.designation} onChange={(event) => { setFilters({ ...filters, designation: event.target.value }) }} id="designation" type="text" />
          <label htmlFor="experience">Minimum Years of Experience</label>
          <input className="border border-black px-5 mx-2" value={filters.yoe} onChange={(event) => { setFilters({ ...filters, yoe: event.target.value }) }} id="experience" type="number" />
          <button type="submit" className="p-2 my-8 bg-linear-br from-[#fcfcfd] to-[#fffaec] border-[2px] border-[rgb(241,84,116)] rounded-xl font-bold">Filter</button>
        </form>
        {!props.admin&&<form className="py-5 flex flex-col w-1/4" action="__blank" onSubmit={handleInputRecord}>
          <h3 className="text-2xl mb-4">Add Record</h3>
          <label htmlFor="fromInput">From</label>
          <select className="border border-black px-5 mx-2" value={inputRecord.From} onChange={(event) => { setInputRecord({ ...inputRecord, From: event.target.value }) }} id="fromInput">
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
          </select>
          <label htmlFor="toInput">To</label>
          <select className="border border-black px-5 mx-2" value={inputRecord.To} onChange={(event) => { setInputRecord({ ...inputRecord, To: event.target.value }) }} id="toInput">
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
          </select>
          <label htmlFor="industryInput">Name of Industry</label>
          <input className="border border-black px-5 mx-2" value={inputRecord.NameofIndustry} onChange={(event) => { setInputRecord({ ...inputRecord, NameofIndustry: event.target.value }) }} id="industryInput" type="text" />
          <label htmlFor="designationInput">Designation</label>
          <input className="border border-black px-5 mx-2" value={inputRecord.Designation} onChange={(event) => { setInputRecord({ ...inputRecord, Designation: event.target.value }) }} id="designationInput" type="text" />
          <button type="submit" className="p-2 my-8 bg-linear-br from-[#fcfcfd] to-[#fffaec] border-[2px] border-[rgb(241,84,116)] rounded-xl font-bold">Submit</button>
        </form>}
        {showEditForm && (
          <div className="overlay-form bg-black text-white w-[100%] flex flex-col items-center absolute z-10 ">
            <form className="flex flex-col" action="__blank" onSubmit={handleInputRecord}>
              <h3 className="text-2xl mb-4">Edit Record</h3>
              <label htmlFor="fromInput">From</label>
              <input className="border border-black px-5 mx-2 text-black" value={inputRecord.From} onChange={(event) => { setInputRecord({ ...inputRecord, From: event.target.value }) }} id="fromInput" type="text" />
              <label htmlFor="toInput">To</label>
              <input className="border border-black px-5 mx-2 text-black" value={inputRecord.To} onChange={(event) => { setInputRecord({ ...inputRecord, To: event.target.value }) }} id="toInput" type="text" />
              <label htmlFor="industryInput">Name of Industry</label>
              <input className="border border-black px-5 mx-2 text-black" value={inputRecord.NameofIndustry} onChange={(event) => { setInputRecord({ ...inputRecord, NameofIndustry: event.target.value }) }} id="industryInput" type="text" />
              <label htmlFor="designationInput">Designation</label>
              <input className="border border-black px-5 mx-2 text-black" value={inputRecord.Designation} onChange={(event) => { setInputRecord({ ...inputRecord, Designation: event.target.value }) }} id="designationInput" type="text" />

              <div className="flex justify-evenly m-4">
                <button className="bg-red-500 text-white px-2 py-1" onClick={handleCancelEdit}>Cancel</button>
                <button className="bg-green-500 text-white px-2 py-1" onClick={handleSaveEdit}>Save</button>
              </div>
            </form>
          </div>
        )}
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            {props.admin&&<th className="py-2 px-4 border-b">email</th>}
            <th className="py-2 px-4 border-b">From</th>
            <th className="py-2 px-4 border-b">To</th>
            <th className="py-2 px-4 border-b">Name of Industry</th>
            <th className="py-2 px-4 border-b">Designation</th>
            <th className="py-2 px-4 border-b">Years of Experience</th>
            {!props.admin&&<th className='py-2 px-4 border-b'>opt</th>}
          </tr>
        </thead>
        <tbody>
          {showData.map((d, index) => (
            <tr key={index}>
              {props.admin&&<td className="py-2 px-4 border-b text-center">{d.email}</td>}
              <td className="py-2 px-4 border-b text-center">{d.from_to.slice(0, 4)}</td>
              <td className="py-2 px-4 border-b text-center">{d.from_to.slice(5, 9)}</td>
              <td className="py-2 px-4 border-b text-center">{d.institute_name}</td>
              <td className="py-2 px-4 border-b text-center">{d.designation}</td>
              <td className="py-2 px-4 border-b text-center">{d.total_years}</td>
              {!props.admin&&<td className='py-2 px-4 border-b text-center'>
                <button
                  onClick={() => handleEdit(index)}
                  className="px-2 py-1 mr-2 my-8 bg-linear-br from-[#fcfcfd] to-[#fffaec] border-[2px] border-[rgb(241,84,116)] rounded-xl font-bold"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteData(index)}
                  className="px-2 py-1 bg-linear-br from-[#fcfcfd] to-[#fffaec] border-[2px] border-[rgb(241,84,116)] rounded-xl font-bold"
                >
                  Delete
                </button>
              </td>}
            </tr>
          )
          )
          }
        </tbody>
      </table>
    </div>
  );
};