import React, { useState } from 'react';
import './StudentDashboard.css';
import StudentProfile from './StudentProfile';
import StudentQuizzes from './StudentQuizzes';
import Grades from './Grades';
import StudentsSectionMaterial from './StudentsSectionMaterial';

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('Welcome');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleLogoClick = () => {
    // Reset to the Welcome section
    setActiveSection('Welcome');
  };

  const handleLogout = () => {
    // Redirect to the login page without refreshing the page
    window.location.href = '/';
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="logo" onClick={handleLogoClick}>
          Student Dashboard
        </div>
        <nav className="header-nav">
          <button onClick={() => handleSectionChange('StudentProfile')} className="header-nav-item">
            Student Profile
          </button>
          <button onClick={() => handleSectionChange('StudentQuizzes')} className="header-nav-item">
            Quizzes
          </button>
          <button onClick={() => handleSectionChange('Grades')} className="header-nav-item">
            Grades
          </button>
          <button onClick={() => handleSectionChange('Study Material')} className="header-nav-item">
            Study Resources
          </button>
        </nav>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          {activeSection === 'Welcome'
            ? 'Welcome to the Student Dashboard'
            : activeSection.replace(/([A-Z])/g, ' $1')}
        </header>
        <div className="content">
          {activeSection === 'Welcome' && (
            <div className="welcome">
              <h2>Welcome back, [Student's Name]!</h2>
              <p>“Success is no accident; it’s hard work and perseverance.”</p>
            </div>
          )}
          {activeSection === 'StudentProfile' && <StudentProfile />}
          {activeSection === 'StudentQuizzes' && <StudentQuizzes />}
          {activeSection === 'Grades' && <Grades />}
          {activeSection === 'Study Material' && <StudentsSectionMaterial />}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
