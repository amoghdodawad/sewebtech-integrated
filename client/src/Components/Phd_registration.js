import React, { useState } from 'react'
import './Phd_registration.css'
import { MdAppRegistration } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { toast } from 'react-hot-toast';
import Table from './Table';

const Phd_registration = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        Nameofresearch : "",
        Topic : "",
        date : "",
        service:"",
        Nameofguide : "",
        Status :""
    });
    
    function inputChangeHandler(event){
        const {name, type, value, checked} = event.target;
        
        setFormData(prevState => {
            return({
                ...prevState,
                [name] : type === 'checkbox' ? checked : value
            })
        });
    }

    function submitHandler(event){
        event.preventDefault();
        console.log(formData);
        const email = localStorage.getItem('email');
        const newUser = { ...formData, email }; // Create a copy of formData
        setUsers((prevUsers) => [...prevUsers, newUser]); // Add the new user to the array
    
        console.log(users);
        fetch('/t9', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              toast.success('Added successfully');
            })
            .catch((error) => {
              console.error('Error:', error);
              toast.error('Error adding PhD data');
            });
    }
  return (
    <div className='phd-wrapper'>
        <div className='container'>
            
            <div className='heading'>
                <h2>PhD Registration Details <div className='icon'><MdAppRegistration /></div></h2>
            </div>
            
            <form className='flexclass' onSubmit={submitHandler}>
                <label for='input1'>Name of Research Centre :</label>
                <input type='text' id='input1' 
                 placeholder='&nbsp;&nbsp;&nbsp;JNTU Hyderabad'
                 className='input'
                 name='Nameofresearch'
                 onChange={inputChangeHandler}
                 value={formData.Nameofresearch}
                 required></input>

                <label for='input2'>Topic/Area</label>
                <input type='text' id='input2'
                 placeholder='&nbsp;&nbsp;&nbsp;Computer vision' 
                 className='input'
                 name='Topic'
                 onChange={inputChangeHandler}
                 value={formData.Topic}
                 required></input>

                <label for='input3'>Date of Registration</label>
                <input type='date' id='input3' 
                className='input'
                name='date'
                onChange={inputChangeHandler}
                value={formData.date}
                required></input>
                <div className='lineheight'>
                <label for='input4' id='spacer' >Services :-</label>
                <label>Full time<input type='radio' id='input5' name='service' value='full time' onChange={inputChangeHandler}></input></label>
                <label>Part time<input type='radio' id='input4' name='service' value='part time' onChange={inputChangeHandler}></input></label>
                </div>
                <label for='guide'>Name of the Guide :-</label>
                <input type='text' id='guide' 
                className='input' placeholder='....'
                onChange={inputChangeHandler}
                name='Nameofguide'
                value={formData.Nameofguide}
                required></input>

                <label for='option'>Status of the work :-</label>
                <select className='input' id='option' 
                onChange={inputChangeHandler}
                value={formData.Status}
                name='Status'>
                    <option selected disabled>Select option</option>
                    <option>Submited</option>
                    <option>Completed</option>
                    <option>Registered</option>
                    <option>In Process</option>
                </select>

                <div className='lastclass'>
                <button type='submit' className='submit'>Submit &nbsp;<IoSend/></button>
                </div>
            </form>
        <br></br>
            <Table data={users}></Table>
        </div>
    </div>
  )
}

export default Phd_registration