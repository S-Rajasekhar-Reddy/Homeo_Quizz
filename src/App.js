import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import StudentLogin from './components/StudentLogin';
import StudentSignup from './components/StudentSignup';
import InstructorLogin from './components/InstructorLogin';
import InstructorDashboard from './components/InstructorDashboard'; 
import StudentDashboard from './components/StudentDashboard';
import ResetPassword from './components/ResetPassword';
import StudentDetails from './components/StudentDetails';
import Profile from './components/Profile';
import Grades from './components/Grades';
import Materials from './components/Materials';




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/instructor-login" element={<InstructorLogin />} />
        <Route path="/instructor-dashboard" element={<InstructorDashboard />} /> {/* Add InstructorDashboard route */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/student-details/:id" element={<StudentDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/materials" element={<Materials />} />
        

      </Routes>
    </Router>
  );
};

export default App;
