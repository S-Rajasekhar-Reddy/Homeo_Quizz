import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import StudentLogin from './components/StudentLogin';
import StudentSignup from './components/StudentSignup';
import InstructorLogin from './components/InstructorLogin';
import InstructorDashboard from './components/InstructorDashboard'; // Import InstructorDashboard
import StudentDashboard from './components/StudentDashboard';

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
      </Routes>
    </Router>
  );
};

export default App;
