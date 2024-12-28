import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './StudentDashboard.css';
import Grades from './Grades';
import Materials from './Materials';

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleLogout = () => {
    // Redirect to the login page without refreshing the page
    window.location.href = '/student-login';
  };

  const handleLogoClick = () => {
    // Refresh the page when the logo is clicked
    window.location.reload();
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        {/* Clickable Logo that redirects to the default page (Instructor Hub) */}
        <Link to="/student-dashboard" className="logo" onClick={handleLogoClick}>
          Student Dashboard
        </Link>
        
        <nav className="nav">
          <button
            className={`nav-item ${activeSection === 'Profile' ? 'active' : ''}`}
            onClick={() => handleSectionChange('Profile')}
          >
            <i className="icon fas fa-users"></i>
            Profile
          </button>

          <button
            className={`nav-item ${activeSection === 'grades' ? 'active' : ''}`}
            onClick={() => handleSectionChange('grades')}
          >
            <i className="icon fas fa-question-circle"></i>
            Grades
          </button>


          <button
            className={`nav-item ${activeSection === 'materials' ? 'active' : ''}`}
            onClick={() => handleSectionChange('materials')}
          >
            <i className="icon fas fa-book"></i>
            Materials
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
            : 'Welcome to Student Hub'}
        </header>
        <div className="content">
          {activeSection === 'studentProfile' && <Profile />}
          {activeSection === 'grades' && <Grades />}
          {activeSection === 'materials' && <Materials />}
          {!activeSection && (
            <div className="welcome">
              <h2>Welcome to Student Hub</h2>
              <p>
                Select an option from the left menu.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
