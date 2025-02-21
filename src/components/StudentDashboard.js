import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './StudentDashboard.css';
import StudentProfile from './StudentProfile';
import StudentQuizzes from './StudentQuizzes';
import Grades from './Grades';
import StudentsSectionMaterial from './StudentsSectionMaterial';

const StudentDashboard = () => {
  const location = useLocation();
  const [message, setMessageData] = useState({
    tokenData: location.state.token,
    params: []
  });
  const isNavVisible = location.state.Status === 'Approved' ? true : false;
  const studentName = location.state.studentName;
  const [activeSection, setActiveSection] = useState('Welcome');
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSectionChange = async (section) => {
    if (section === 'StudentProfile') {

      try {
        const response = await fetch(`${apiUrl}/getStudentDetails/`+location.state.studentId, { // change the database address to prod
          method: "GET",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${message.tokenData}`
          }
        });

        if (!response.ok) {
          // If the response status is not ok (e.g., 400 or 401), throw an error
          throw new Error("No database Connection. Please try again.");
        }
        const rawData = await response.json();
        const studentDetails = {
          id: rawData[0].Id,
          userName: rawData[0].UserName,
          email: rawData[0].Email,
          firstName: rawData[0].First_Name,
          lastName: rawData[0].Last_Name,
          fullName: rawData[0].Student_Name,
          contactNum: rawData[0].PhoneNum
        };
        setMessageData({
          ...message,
          params: studentDetails
        });
        setActiveSection(section);

      } catch (err) {
        console.error("Database Connection failed", err);
      }
    } else if (section === 'Grades') {

      try {
        const response = await fetch(`${apiUrl}//studentGrades/`+location.state.studentId, { // change the database address to prod
          method: "GET",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${message.tokenData}`
          }
        });

        if (!response.ok) {
          // If the response status is not ok (e.g., 400 or 401), throw an error
          throw new Error("No database Connection. Please try again.");
        }
        const rawData = await response.json();
        if (rawData.length === 0) {
          setMessageData({
            ...message,
            params: []
          });
          setActiveSection(section);
          return;
        }
        const studentQuizDetails = {
          id: rawData[0].Id,
          userName: rawData[0].Username,
          fullName: rawData[0].Student_Name,
          quizData: []
        };
        rawData.forEach((quiz) => {
          studentQuizDetails.quizData.push({
            quizId: quiz.Quiz_Number,
            quizName: quiz.Quiz_Name,
            score: ((quiz.Grade / quiz.Max_Grade) * 100).toFixed(2),
            maxScore: quiz.Max_Grade,
            status: (quiz.Grade / quiz.Max_Grade) * 100 > 75 ? 'Pass' : 'Fail',
            date: new Date(quiz.Date_Attempted).toLocaleDateString("en-US"),
            remAttempt: quiz.Rem_Attempts
          });
        });

        setMessageData({
          ...message,
          params: studentQuizDetails
        });
        setActiveSection(section);

      } catch (err) {
        console.error("Database Connection failed", err);
      }
    } else if (section === 'StudentQuizzes') {
      
      try {
        const response = await fetch(`${apiUrl}//getQuizDetails/`+location.state.studentId, { // change the database address to prod
          method: "GET",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${message.tokenData}`
          }
        });

        if (!response.ok) {
          // If the response status is not ok (e.g., 400 or 401), throw an error
          throw new Error("No database Connection. Please try again.");
        }
        
        const rawData = await response.json();
        if (rawData.results.length === 0) {
          setMessageData({
            ...message,
            params: []
          });
          setActiveSection(section);
          return;
        }
        const quizListDetails = {
          id: location.state.studentId,
          userName: location.state.userName,
          fullName: studentName,
          quizList: []
        };
        rawData.results.forEach((quiz) => {
          quizListDetails.quizList.push({
            quizId: quiz.Quiz_Number,
            quizName: quiz.Quiz_Name,
            remattempt: quiz.Rem_Attempts,
          });
        });
        setMessageData({
          ...message,
          params: quizListDetails
        });
        setActiveSection(section);

      } catch (err) {
        console.error("Database Connection failed", err);
      }
    } else {
      setActiveSection(section);
    }
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
        {isNavVisible && (<nav className="header-nav">
          <button onClick={() => handleSectionChange('StudentProfile')} className="header-nav-item">
            Profile
          </button>
          <button onClick={() => handleSectionChange('StudentQuizzes')} className="header-nav-item">
            Quizzes
          </button>
          <button onClick={() => handleSectionChange('Grades')} className="header-nav-item">
            Grades
          </button>
          <button onClick={() => handleSectionChange('Study Material')} className="header-nav-item">
            Resources
          </button>
        </nav>
        )}
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
        <div className="contentWelcome">
          {activeSection === 'Welcome' && (
            <div className="welcome">
              <h2>Welcome  <b>{studentName}</b></h2>
              {isNavVisible && (<p>“Success is no accident; it’s hard work and perseverance.”</p>)}
              {!isNavVisible && (<p>Please contact the instructor for student dashboard permissions.</p>)}
            </div>
          )}
          {activeSection === 'StudentProfile' && <StudentProfile message={message}/>}
          {activeSection === 'StudentQuizzes' && <StudentQuizzes message={message}/>}
          {activeSection === 'Grades' && <Grades message={message}/>}
          {activeSection === 'Study Material' && <StudentsSectionMaterial message={message}/>}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
