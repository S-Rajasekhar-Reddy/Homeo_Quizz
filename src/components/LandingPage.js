import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  // Dynamic Hero Section Content
  const [heroContent, setHeroContent] = useState({
    title: 'Welcome to Homeoguide',
    subtitle: 'By DR. MANI PRASAD | AIR 38',
    tagline: 'Prepare for Success',
  });

  useEffect(() => {
    AOS.init({ duration: 1000 }); 
    // Example: Change hero content dynamically based on time of day
    const hour = new Date().getHours();
    if (hour < 12) {
      setHeroContent({
        title: 'Good Morning, Welcome to Homeoguide!',
        subtitle: 'Start your day with success.',
        tagline: 'Achieve your goals with us.',
        image: 'morning.jpeg',
      });
    } else if (hour < 18) {
      setHeroContent({
        title: 'Good Afternoon, Welcome to Homeoguide!',
        subtitle: 'Keep learning and growing.',
        tagline: 'Your journey to success continues.',
        image: 'afternoon.jpeg',
      });
    } else {
      setHeroContent({
        title: 'Good Evening, Welcome to Homeoguide!',
        subtitle: 'Relax and prepare for tomorrow.',
        tagline: 'Your future starts here.',
        image: 'evening.jpeg',
      });
    }
  }, []);

  // Navigation handlers
  const handleStudentClick = () => navigate('/student-login');
  const handleInstructorClick = () => navigate('/instructor-login');
  const handleCommunityClick = () => navigate('/community');

  const scrollToFollowUs = () => {
    document.querySelector('.follow-us-section').scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    document.documentElement.scrollTop = 0; // Scroll to the top of the page
    document.body.scrollTop = 0; // Scroll to the top of the page for Safari
  };

  return (
    <>
      {/* Header */}
      <header className="header glassmorphism">
        <div className="header-left">
          <span className="logo" onClick={scrollToTop}>
            Homeoguide
          </span>
        </div>
        <div className="header-right">
          <span className="header-link" onClick={handleStudentClick}>
            Login/Signup
          </span>
          <span className="header-link" onClick={scrollToFollowUs}>
            Contact
          </span>
        </div>
      </header>

      {/* Landing Page Content */}
      <section className="landing-page">
        {/* Fullscreen Hero Section */}
        <div className="hero-section" style={{ backgroundImage: `url(${heroContent.image})` }}>
          <h1 className="main-title" data-aos="fade-down">{heroContent.title}</h1>
          <h2 className="subtitle" data-aos="fade-up">{heroContent.subtitle}</h2>
          <p className="hero-tagline" data-aos="fade-up">{heroContent.tagline}</p>
        </div>

        {/* Info Cards */}
        <div className="info-container">
          <div className="info-card" data-aos="flip-left" onClick={handleStudentClick}>
            <h3>Students</h3>
            <p>Excel with top-notch courses.</p>
          </div>

          <div className="info-card" data-aos="flip-left" onClick={handleInstructorClick}>
            <h3>Instructors</h3>
            <p>Empower and guide minds.</p>
          </div>

          <div className="info-card" data-aos="flip-left" onClick={handleCommunityClick}>
            <h3>Community</h3>
            <p>Connect & Thrive Together.</p>
          </div>
        </div>

        {/* Follow Us Section */}
        <div className="follow-us-section glassmorphism" data-aos="fade-up">
          <h2 className="follow-us-title">Follow Us</h2>
          <div className="social-media-icons">
            <a
              href="https://www.instagram.com/homoeo_universe/?igsh=aWFqamJiODdtemxs"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <img src="instagram.png" alt="Instagram" />
            </a>
            <a
              href="https://www.facebook.com/people/Homoeo-Universee/pfbid071qtMvSzQTLWyjPftJ79cjibi24J7KeCfa62DoasGPPmoZ7CQsraUrq9TER694E1l/?ref=xav_ig_profile_web"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <img src="facebook.png" alt="Facebook" />
            </a>
            <a
              href="https://linktr.ee/homoeouniverse"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <img src="linktree.png" alt="Linktree" />
            </a>
          </div>
        </div>

        {/* About Me Section */}
        <div className="about-me-section" data-aos="fade-right">
          <h2 className="about-me-title">About Me</h2>
          <p className="about-me-description">
            Hi, I'm Dr. Mani Prasad, a passionate educator and founder of Homoe Universe. With years of experience
            in the field of homeopathy, I am committed to providing the best educational resources for students and
            professionals alike. My mission is to help you excel and succeed in your academic and professional endeavors.
          </p>
          <img src="/screen3-about.jpg" alt="About Me" className="screen-image" />
        </div>
      </section>
    </>
  );
};

export default LandingPage;
