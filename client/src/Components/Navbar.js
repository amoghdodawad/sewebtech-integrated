import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import kletechlogo from './kletechlogo.png'
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import toast from 'react-hot-toast';

function Navbar({ isLoggedIn, changeStatus }){
    const navigate = useNavigate();
    // const notify = () => toast('Welcome')
    function handleSignOutSignIn(){
        if(isLoggedIn){
            toast.success('You have been logged out',{ duration : 3000});
            changeStatus(false);
            localStorage.clear();
            navigate('/');
        } else {
            navigate('/login');
        }
    }
    function handleHomeButtonClick(){
        navigate('/');
    }

    function handleFacultyButtonClick() {
        navigate('/faculty');
    }

    function handleAdminButtonClick() {
        navigate('/admin');
    }

    return (
        <div className='navbar'>
            <div className='upper-box'>
                <div className='logo'>
                    <img src={kletechlogo} id='img'/>
                </div>
                <div className='faculty-management'>
                    {isLoggedIn ? 'Hello ' + localStorage.getItem('name').split(' ')[0] : 'Faculty Management'}
                </div>
            </div>
            <div className='lower-box'>
                <div className='links'>
                    <div className='items' onClick={handleHomeButtonClick}>
                        Home
                    </div>
                    <div className='items' onClick={handleFacultyButtonClick}>
                        Faculty
                    </div>
                    <div className='items' onClick={handleAdminButtonClick}>
                        Admin
                    </div>
                </div>
                <div className='login' onClick={handleSignOutSignIn}>
                    { isLoggedIn ? 'Logout' : 'Login'}
                </div>
            </div>
        </div>
    );
}

export default Navbar;