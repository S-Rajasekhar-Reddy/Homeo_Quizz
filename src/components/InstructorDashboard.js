import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './InstructorDashboard.css';
import StudentManagement from './StudentManagement';
import Quizzes from './Quizzes';
import Materials from './Materials';

const InstructorDashboard = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    window.location.href = '/instructor-login';
  };

  const handleLogoClick = () => {
    window.location.reload();
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <Link to="/instructor-dashboard" className="logo" onClick={handleLogoClick}>
          Instructor<span>Hub</span>
        </Link>
        
        <nav className="nav">
          <button
            className={`nav-item ${activeSection === 'studentManagement' ? 'active' : ''}`}
            onClick={() => handleSectionChange('studentManagement')}
          >
            <i className="icon fas fa-users"></i>
            Student Management
          </button>
          <button
            className={`nav-item ${activeSection === 'quiz' ? 'active' : ''}`}
            onClick={() => handleSectionChange('quiz')}
          >
            <i className="icon fas fa-question-circle"></i>
            Quizzes
          </button>
          <button
            className={`nav-item ${activeSection === 'materials' ? 'active' : ''}`}
            onClick={() => handleSectionChange('materials')}
          >
            <i className="icon fas fa-book"></i>
            Add Materials
          </button>
        </nav>
        
        <button className="logout-button" onClick={handleLogout}>
          <i className="icon fas fa-sign-out-alt"></i>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          {activeSection
            ? activeSection.replace(/([A-Z])/g, ' $1')
            : 'Welcome to Instructor Hub'}
        </header>
        <div className="content">
          {activeSection === 'studentManagement' && <StudentManagement />}
          {activeSection === 'quiz' && <Quizzes />}
          {activeSection === 'materials' && <Materials />}
          {!activeSection && (
            <div className="welcome">
              <h2>Welcome to Instructor Hub</h2>
              <p>
                Select an option from the left menu to manage students, create quizzes, or upload materials.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default InstructorDashboard;
