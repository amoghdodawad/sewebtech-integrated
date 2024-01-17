import React, { useEffect, useRef, useState } from 'react';
import { checkValidData } from '../utils/validate';
import { useNavigate, useSearchParams } from 'react-router-dom';
import KLETechBackground from './KLETechBackground.jpg';
import './Login.css'
// import { toast } from 'react-toastify';
import toast from 'react-hot-toast';
// import 'react-toastify/dist/ReactToastify.css';

function TempLogin({ changeStatus }){
    const [ isSignInForm, setIsSignInForm ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef (null);
    const isAdmin = useRef('faculty');
    const navigate = useNavigate();
    const next = useSearchParams()[0].get('next');
    const toastOptions = {
        duration : 2000
    }

    useEffect(()=>{
        if(errorMessage !== null) toast.error(errorMessage,toastOptions);
    },[errorMessage])

    function handleFormTypeChange (){
        setIsSignInForm(!isSignInForm);
    }

    function handleFormSubmit(){
        // toast.promise('Authenticating',toastOptions);
        // toast.loading('Authenticating',{duration : 700})
        email.current.value = email.current.value.split(' ')[0];
        const response = checkValidData(email.current.value ,password.current.value);
        setErrorMessage(response);
        if(response) {
            return;
        }

        if(!isSignInForm){
            // SignUp logic
            async function signUp(){
                const response = await fetch('/api/auth/signup',{
                    method : 'POST',
                    body : JSON.stringify({
                        name : name.current.value,
                        email : email.current.value,
                        password : password.current.value,
                        role : isAdmin.current
                    }),
                    headers : {
                        'Content-Type' : 'application/json; charset=UTF-8'
                    }
                })
                if(response.status === 200){
                    const json = await response.json();
                    // toast.promise('testing',toastOptions)
                    toast.success(`Loggged in as ${json.role}`,toastOptions);
                    localStorage.setItem('name',json.name);
                    const token = response.headers.get('token');
                    localStorage.setItem('token',token);
                    changeStatus(true);
                    localStorage.setItem('isLoggedIn','true')
                    localStorage.setItem('role',json.role);
                    localStorage.setItem('email',json.email);
                    // next ? navigate(`/${next}`) : navigate('/faculty');
                    // navigate(`/${json.role}`);
                    json.role === 'admin' ? navigate('/admin') : next ? navigate(`/${next}`) : navigate('/faculty');
                } else if(response.status === 400){
                    const message = await response.json();
                    setErrorMessage(message.message);
                }
            }
            // toast.
            signUp();
        } else {
            async function signIn(){
                const response = await fetch('/api/auth/login',{
                        method : 'POST',
                        body : JSON.stringify({
                            name : 'Test',
                            email : email.current.value,
                            password : password.current.value,
                            role : isAdmin.current
                        }),
                        headers : {
                            'Content-Type' : 'application/json; charset=UTF-8'
                        }
                })
                if(response.status === 200){
                    const json = await response.json();
                    console.log(json);
                    toast.success(`Loggged in as ${json.role}`,toastOptions);
                    localStorage.setItem('name',json.name);
                    localStorage.setItem('email',json.email);
                    const token = response.headers.get('token');
                    localStorage.setItem('token',token);
                    changeStatus(true);
                    localStorage.setItem('isLoggedIn','true')
                    // next ? navigate(`/${next}`) : navigate('/faculty');
                    localStorage.setItem('role',json.role);
                    // navigate(`/${json.role}`);
                    json.role === 'admin' ? navigate('/admin') : next ? navigate(`/${next}`) : navigate('/faculty');
                } else if(response.status === 400 || response.status === 401) {
                    const message = await response.json();
                    setErrorMessage(message.message);
                }
            }
            signIn();
        }
    }

    return (
        <div className='login-top-container'>
            <div className='home-container-login'>
                <div className='kletech-background-container'>
                    <img src={KLETechBackground} id='kletech-background'/>
                </div>
            </div>
            <div className='login-container-login'>
                <form className='form' onSubmit={(event) => {
                    event.preventDefault();
                }}>
                    <h1 className='sign-in'>{isSignInForm ? 'Sign in' : 'Sign up'}</h1>
                    <div className='input-container'>
                        {!isSignInForm && <input ref={name} type='text' placeholder='Full name' className='input'></input>}
                        <input ref={email} type='text' placeholder='Email address' className='input'></input>
                        <input ref={password} type='password' placeholder='Password' className='input'></input>
                        {!isSignInForm && <div className='checkbox'>
                            <label htmlFor='admin-input' id=''>Sign up as admin?</label>
                            <input type='checkbox' id='admin-input' onChange={()=>{
                                if(isAdmin.current === 'faculty') isAdmin.current = 'admin';
                                else isAdmin.current = 'faculty';
                            }}/>
                        </div>}
                        <p className={`error`}>{errorMessage}</p>
                        <button className='submit' onClick={handleFormSubmit}>{isSignInForm ? 'Sign in' : 'Sign up'}</button>
                    </div> 
                    <p className='button' onClick={handleFormTypeChange}>{isSignInForm ? 'New to Website? Sign up now' : 'Already registered? Sign in'}</p>
                </form>
            </div>
        </div>
    )
}

export default TempLogin;