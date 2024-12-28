import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  // Navigation handlers
  const handleStudentClick = () => {
    navigate('/student-login');
  };

  const handleInstructorClick = () => {
    navigate('/instructor-login');
  };

  const handleCommunityClick = () => {
    navigate('/community');
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <span className="logo">Homoe Universe</span>
        </div>
        <div className="header-center">
          <div className="navbar">
          </div>
        </div>

         {/*<button onClick={Student_Signin.html}>Student Sign Up</button>*/}
        <div className="header-right">
        
          <input type="text" className="search-box" placeholder="Search..." />
        </div>


      </header>

      {/* Landing Page Content */}
      <section className="landing-page">
        {/* First Screen (Welcome Message with Image) */}
        <div className="hero-section">
          <h1 className="main-title">Welcome to Homoe Universe</h1>
          <h2 className="subtitle">By DR. MANI PRASAD | AIR 38</h2>
          <p className="hero-tagline">Prepare for Success</p>
          
          {/* Image for screen 2 */}
          <img src="1.jpeg" alt="Students" className="screen-image" /> 
        </div>
        <br>
        </br>

        {/* Second Screen (Students, Instructors, Community) with Image */}
        <div className="info-container">
          <div className="info-card" onClick={handleStudentClick}>
            <h3>Students</h3>
            <p>Excel with top-notch courses.</p>
      
          </div>

          <div className="info-card" onClick={handleInstructorClick}>
            <h3>Instructors</h3>
            <p>Empower and guide minds.<br /> Login In</p>
            
          </div>

          <div className="info-card" onClick={handleCommunityClick}>
            <h3>Community</h3>
            <p>Connect & Thrive Together.</p>
            
          </div>
        </div>

        {/* Third Screen (Follow Us and About Me with Image) */}
        <div className="follow-us-section">
          <h2 className="follow-us-title">Follow Us</h2>
          <div className="social-media-icons">
            <a href="https://www.instagram.com/homoeo_universe/?igsh=aWFqamJiODdtemxs" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src="instagram.png" alt="Instagram" />
            </a>
            <a href="https://www.facebook.com/people/Homoeo-Universee/pfbid071qtMvSzQTLWyjPftJ79cjibi24J7KeCfa62DoasGPPmoZ7CQsraUrq9TER694E1l/?ref=xav_ig_profile_web" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src="facebook.png" alt="Facebook" />
            </a>
            <a href="https://linktr.ee/homoeouniverse" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src="linktree.png" alt="linktree" />
            </a>
          </div>
          <div className="social-handles">
            <p>Instagram: @homoeo_universe</p>
            <p>Facebook: @Homoeo Universee </p>
            <p>Linktree: @homoeouniverse</p>
          </div>
        </div>    
        
        <div className="about-me-section">
          <h2 className="about-me-title">About Me</h2>
          <p className="about-me-description">
            Hi, I'm Dr. Mani Prasad, a passionate educator and founder of Homoe Universe. With years of experience
            in the field of homeopathy, I am committed to providing the best educational resources for students and
            professionals alike. My mission is to help you excel and succeed in your academic and professional endeavors.
          </p>
          {/* Image for screen 3 */}
          <img src="/screen3-about.jpg" alt="About Me" className="screen-image" />
        </div>
      </section>
    </>
  );
};

export default LandingPage;
