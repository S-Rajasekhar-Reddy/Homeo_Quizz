import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './InstructorDashboard.css';
import StudentManagement from './StudentManagement';
import Quizzes from './Quizzes';
import Materials from './Materials';

const InstructorDashboard = () => {
  const location = useLocation();
  const tokenData = location.state.token;
  const [activeSection, setActiveSection] = useState('Welcome');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    window.location.href = '/login';
  };


  return (
    <div className="dashboard">
      {/* Header with navigation */}
      <header className="header">
        <div className="logo" onClick={() => handleSectionChange('Welcome')}>
          Instructor<span>Hub</span>
        </div>
        
        <nav className="header-nav">
          <button
            className={`header-nav-item ${activeSection === 'Student Management System' ? 'active' : ''}`}
            onClick={() => handleSectionChange('Student Management System')}
          >
            Student Management
          </button>
          <button
            className={`header-nav-item ${activeSection === 'Quiz Index' ? 'active' : ''}`}
            onClick={() => handleSectionChange('Quiz Index')}
          >
            Quizzes
          </button>
          <button
            className={`header-nav-item ${activeSection === 'Materials' ? 'active' : ''}`}
            onClick={() => handleSectionChange('Materials')}
          >
            Add Materials
          </button>
        </nav>
        
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          {activeSection
            ? activeSection.replace(/([A-Z])/g, ' $1')
            : 'Welcome to Instructor Hub'}
        </header>
        <div className="content">
          {activeSection === 'Student Management System' && <StudentManagement message={tokenData} />}
          {activeSection === 'Quiz Index' && <Quizzes message={tokenData} />}
          {activeSection === 'Materials' && <Materials message={tokenData} />}
          {activeSection === 'Welcome' && (
            <div className="welcome">
              <h2>Welcome to Instructor Hub</h2>
              <p>
                Select an option from the menu to manage students, create quizzes, or upload materials.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboard;
