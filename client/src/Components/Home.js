import React from 'react';
import KLETechBackground from './KLETechBackground.jpg';
import './Home.css'

const Home = () => {
  return (
    <div className='home-container'>
      <div className='kletech-background-container'>
        <img src={KLETechBackground} id='kletech-background'/>
      </div>
      <div className='kletech-welcome-container'>
        <div className='kletech-welcome'>
          Welcome to KLETech faculty management system.
        </div>
      </div>
    </div>
    
  )
}

export default Home;