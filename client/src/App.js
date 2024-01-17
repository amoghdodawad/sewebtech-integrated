import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './Components/Home';
// import Faculty from './Components/Faculty';
import UnProtected from './Components/UnProtected';
import Protected from './Components/Protected';
import Login from './Components/Login';
import Admin from './Components/Admin';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import Profile from './Components/Profile';
// import TeachingPortfolio from './Components/TeachingPortfolio';
import ResearchPublications from './Components/ResearchPublication';
import ConferenceParticipation from './Components/ConferenceParticapation';
import ResearchFunding from './Components/ResearchFunding';
import WorkshopManagement from './Components/WorkshopManegement';
// import ProfessionalExperience from './Components/ProfessionalExperience';
import FacultyProfile from './Components/FacultyProfile';
import WelcomePage from './Components/WelcomePage';
import AddCourseForm from './Components/AddCourseForm';
import DisplayCourses from './Components/DisplayCourses';
import SearchComponent from './Components/SearchComponent';
import WorkExperience from './page/WorkExperience';
import AllProfiles from './Components/AllProfiles'
import AddProfiles from './Components/AddProfiles';
import WorkshopManager from './Components/WorkshopManager';
import Phd_registration from './Components/Phd_registration';
function App() {
  const [courses, setCourses] = useState([]);

  const handleAddCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true' ? true : false);
  const changeStatus = (status) => {
    setIsLoggedIn(status);
  }


  async function verify() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      return;
    }
    if (localStorage.getItem('token') === undefined) {
      return;
    }
    try {
      const response = await fetch('/api/auth/verifyloggedin', {
        method: 'POST',
        body: JSON.stringify({
          token: localStorage.getItem('token')
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      })
      const json = await response.json();
      if (response.status === 401) {
        setIsLoggedIn(false);
        localStorage.clear()
      } else if (response.status === 200) {
        localStorage.setItem('token', json.token);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    verify()
  }, [])

  return (
    <div className='app'>
      <Router>
        {/* <ToastContainer /> */}
        <Toaster />
        <Navbar isLoggedIn={isLoggedIn} changeStatus={changeStatus} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/display' element={
            <Protected isLoggedIn={isLoggedIn} next='display'>
              <DisplayCourses courses={courses} />
            </Protected>
          } />
          <Route path='/add' element={
            <Protected isLoggedIn={isLoggedIn} next='add'>
              <AddCourseForm onAddCourse={handleAddCourse}/>
            </Protected>
          } />
          <Route path='/search' element={
            <Protected isLoggedIn={isLoggedIn} next='search'>
              <SearchComponent />
            </Protected>
          } />
          <Route path='/login' element={
            <UnProtected isLoggedIn={isLoggedIn}>
              <Login changeStatus={changeStatus} />
            </UnProtected>
          } />
          <Route path="/faculty" element={
            <Protected isLoggedIn={isLoggedIn} next='faculty'>
              <Profile />
            </Protected>
          } />
          <Route path="/admin" element={
            <Protected isLoggedIn={isLoggedIn} next='admin'>
              <Admin />
            </Protected>
          } />
          <Route path="/professional-experience" element={
            <Protected isLoggedIn={isLoggedIn} next='professional-experience'>
              <WorkExperience />
            </Protected>
          } />
          <Route path="/teaching-portfolio" element={
            <Protected isLoggedIn={isLoggedIn} next='teaching-portfolio'>
              <WelcomePage />
            </Protected>
            } />
          <Route path="/research-publications" element={
            <Protected isLoggedIn={isLoggedIn} next='research-publications'>
              <Phd_registration />
            </Protected>
          } />
          <Route path="/conference-participation" element={
            <Protected isLoggedIn={isLoggedIn} next='conference-participation'>
              <ConferenceParticipation />
            </Protected>
          } />
          <Route path="/research-funding" element={
            <Protected isLoggedIn={isLoggedIn} next='research-funding'>
              <ResearchFunding />
            </Protected>
          } />
          <Route path="/workshop-management" element={
            <Protected isLoggedIn={isLoggedIn} next='workshop-management'>
              <WorkshopManager />
            </Protected>
          } />
          <Route path="/faculty-profile" element={
            <Protected isLoggedIn={isLoggedIn} next='faculty-profile'>
              <FacultyProfile email_id={localStorage.getItem('email')} />
            </Protected>
          } />
          <Route path='/AllProfiles' element={
            <Protected isLoggedIn={isLoggedIn} next='AllProfiles'>
              <AllProfiles />
            </Protected>
          } />
          <Route path='/AddProfiles' element={
            <Protected isLoggedIn={isLoggedIn} next='AddProfiles'>
              <AddProfiles />
            </Protected>
          } />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App;
