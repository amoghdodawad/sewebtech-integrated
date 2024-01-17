import React from 'react'
import { useState } from 'react'
import Dashboard from '../Components/Dashboard'
import Records from '../Components/Records'

function WorkExperience() {
  const [category,setCategory]=useState("Teaching");
  let faculty_role=localStorage.getItem("role");
  let email=localStorage.getItem('email');
  console.log(category);
  // console.log(DB.data[0])
  return (
    <div className='w-screen h-screen'>
    <Dashboard setCategory={setCategory}/>
    {category?(<Records admin={faculty_role=="admin"?true:false} category={category} email={email}/>):<></>}
    </div>
  )
}

export default WorkExperience