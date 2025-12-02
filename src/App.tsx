import React, { JSX } from 'react';
// import LandingPage from './pages/LandingPage'; 
import MentorPage from './pages/MentorPage';
import Notifications from './pages/Notifications'


function App(): JSX.Element {
  return (
    <div>
    {/* <LandingPage />; */}
    <MentorPage/>
    <Notifications/>
    </div>
    
)}

export default App;
