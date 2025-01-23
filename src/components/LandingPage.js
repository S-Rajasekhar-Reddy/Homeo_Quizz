import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  // Dynamic Hero Section Content
  const [heroContent, setHeroContent] = useState({
    title: '',
    subtitle: '',
    tagline: '',
    image: '',
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });

    // Array of all images you want to use
    const images = ["/1.jpg", "/2.jpg", "/3.jpg", "/4.jpg", "/5.jpg", "/6.jpg"];

    // Randomly select an image
    const randomImage = images[Math.floor(Math.random() * images.length)];

    // Get current hour and set dynamic content based on time
    const hour = new Date().getHours();
    if (hour < 12) {
      setHeroContent({
        title: 'Good Morning, Welcome to Homeoguide',
        subtitle: 'Start your day with success.',
        tagline: 'Achieve your goals with us.',
        image: randomImage,
      });
    } else if (hour < 18) {
      setHeroContent({
        title: 'Good Afternoon, Welcome to Homeoguide',
        subtitle: 'Keep learning and growing.',
        tagline: 'Your journey to success continues.',
        image: randomImage,
      });
    } else {
      setHeroContent({
        title: 'Good Evening, Welcome to Homeoguide',
        subtitle: 'Relax and prepare for tomorrow.',
        tagline: 'Your future starts here.',
        image: randomImage,
      });
    }
  }, []);

  // Navigation handlers
  const handleLoginClick = () => navigate('/login');
  const scrollToFollowUs = () => {
    const followUsSection = document.querySelector('.follow-us-section');
    window.scrollTo({ top: followUsSection.offsetTop, behavior: 'smooth' });
  };

  return (
    <>
      {/* Hero Section with Navigation */}
      <div className="hero-section" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + heroContent.image})` }}>
        
        {/* Navigation Overlay on Background Image */}
        <div className="hero-nav">
          <span className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Homeoguide
          </span>
          <div className="hero-links">
            <span className="hero-link" onClick={handleLoginClick}>
              Login/Signup
            </span>
            <span className="hero-link" onClick={scrollToFollowUs}>
              Contact
            </span>
          </div>
        </div>

        {/* Main Hero Content */}
        <h1 className="main-title" data-aos="fade-down" data-aos-delay="200">
          {heroContent.title}
        </h1>
        <h2 className="subtitle" data-aos="fade-up">{heroContent.subtitle}</h2>
        <p className="hero-tagline" data-aos="fade-up">{heroContent.tagline}</p>
      </div>

      {/* Info Cards */}
      <div className="info-container">
        <div className="info-card" data-aos="flip-left" onClick={handleLoginClick}>
          <h3>Students</h3>
          <p>Excel with top-notch courses.</p>
        </div>

        <div className="info-card" data-aos="flip-left" onClick={handleLoginClick}>
          <h3>Instructors</h3>
          <p>Empower and guide minds.</p>
        </div>

        <div className="info-card" data-aos="flip-left" onClick={() => navigate('/community')}>
          <h3>Community</h3>
          <p>Connect & Thrive Together.</p>
        </div>
      </div>

      {/* Follow Us Section */}
      <div className="follow-us-section glassmorphism" data-aos="fade-up">
        <h2 className="follow-us-title">Follow Us</h2>
        <div className="social-media-icons">
          <a href="https://www.instagram.com/homoeo_universe/?igsh=aWFqamJiODdtemxs" target="_blank" rel="noopener noreferrer" className="social-icon">
            <img src="instagram.png" alt="Instagram" />
          </a>
          <a href="https://www.facebook.com/people/Homoeo-Universee/pfbid071qtMvSzQTLWyjPftJ79cjibi24J7KeCfa62DoasGPPmoZ7CQsraUrq9TER694E1l/?ref=xav_ig_profile_web" target="_blank" rel="noopener noreferrer" className="social-icon">
            <img src="facebook.png" alt="Facebook" />
          </a>
          <a href="https://linkedin.com/homoeouniverse" target="_blank" rel="noopener noreferrer" className="social-icon">
            <img src="linkedin.png" alt="LinkedIn" />
          </a>
        </div>
      </div>

      {/* About Me Section */}
      <div className="about-me-section" data-aos="fade-right">
        <h2 className="about-me-title">About Me</h2>
        <p className="about-me-description">
          Hi, I'm Dr. Mani Prasad, a passionate educator and founder of Homoe Universe. With years of experience in the field of homeopathy, I am committed to providing the best educational resources for students and professionals alike. My mission is to help you excel and succeed in your academic and professional endeavors.
        </p>
      </div>
    </>
  );
};

export default LandingPage;
