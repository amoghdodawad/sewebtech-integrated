import React from "react";
import { useState } from "react";
import './FacultyCard.css'
import defaultImg from './image.jpeg';
import axios from 'axios';
import { useRef } from "react";

function FacultyCard(props) {
    const NodeRef = useRef(null)
    var data = {
        img: (props.img === '') ? defaultImg : props.img,
        name: props.name,
        email: props.email,
        role: props.role
    };

    const defaultButton = (<div className="FacultyOptions">
        <button type="button" onClick={UpdateForm}>Edit Role</button>
        <button type="button" onClick={DeleteForm}>Delete</button>
    </div>);

    const [ViewData, SetViewData] = useState(<div className="CardInputs">
        <label htmlFor="role">Role</label>
        <input name="role" defaultValue={data['role']} readOnly></input>
    </div>);
    const [ButtonData, SetButtonData] = useState(defaultButton);

    function ShowDefualt() {
        SetViewData(<div className="CardInputs">
            <label htmlFor="role">Role</label>
            <input name="role" defaultValue={data['role']} readOnly></input>
        </div>);;
        SetButtonData(defaultButton);
    }

    const handleUpdateUser = async () => {
        try {
            const response = await axios.put(`/update/users/email/${data.email}`, data);
            console.log(response.data);
        } catch (error) {
            alert("Error While updating role");
        }
        ShowDefualt();
    };

    const handleDeleteUser = async () => {
        try {
            const response = await axios.delete(`/delete/users/email/${data.email}`);
            console.log(response.data);
            NodeRef.current.style.display = 'none'
        } catch (error) {
            console.error('Error Deleting user:', error);
            ShowDefualt();
        }
    };

    const RolehandleChange = (e) => {
        data['role'] = e.target.value;
    };

    function UpdateForm() {
        data.role="faculty";
        SetViewData(<div className="CardInputs">
            <label htmlFor="role">Role</label>
            <input type="radio" name="role" value="faculty" onChange={RolehandleChange} defaultChecked />Faculty
            <input type="radio" name="role" value="admin" onChange={RolehandleChange} />Admin
        </div>)
        SetButtonData(<div className="FacultyOptions">
            <button type="button" onClick={handleUpdateUser}>Update Role</button>
        </div>)
    }

    function DeleteForm() {
        SetButtonData(<div className="FacultyOptions">
            <button type="button" onClick={handleDeleteUser}>Confirm</button>
            <button type="button" onClick={ShowDefualt}>Go Back</button>
        </div>)
    }
    return (
        <div ref={NodeRef} className="FacultyCard">
            <div className="FacultyView">
                <img src={data['img']}></img>
                <div className="FacultyDetails">
                    <div className="CardInputs">
                        <label htmlFor="name">Name</label>
                        <input name="name" defaultValue={data['name']} readOnly></input>
                    </div>
                    <div className="CardInputs">
                        <label htmlFor="email">Email</label>
                        <input name="email" defaultValue={data['email']} readOnly></input>
                    </div>
                    {ViewData}
                    <div className="FacultyOptions">
                        {ButtonData}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FacultyCard;