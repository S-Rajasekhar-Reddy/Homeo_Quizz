import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import StudentSignup from './components/StudentSignup';
import Login from './components/Login';
import InstructorDashboard from './components/InstructorDashboard'; 
import StudentDashboard from './components/StudentDashboard';
import ResetPassword from './components/ResetPassword';
import StudentDetails from './components/StudentDetails';
import Profile from './components/Profile';
import Grades from './components/Grades';
import Materials from './components/Materials';
import CommunityPage from './components/CommunityPage';




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/community" element={<CommunityPage />} /> {/* Community page */}
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} /> {/* Add InstructorDashboard route */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/student-details/:id" element={<StudentDetails />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/grades" element={<Grades />} />
        <Route path="/materials" element={<Materials />} />
        

      </Routes>
    </Router>
  );
};

export default App;
