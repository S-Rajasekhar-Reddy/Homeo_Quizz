import React from 'react';
import './CommunityPage.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom'; // Add this import

const CommunityPage = () => {
  const navigate = useNavigate(); // Initialize navigate hook

  // Initialize AOS (animations)
  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Navigation Handlers
  const handleLoginClick = () => navigate('/login');
  const handleBackToHomeClick = () => navigate('/'); // Add this handler

  return (
    <>
      {/* Header */}
      <header className="header glassmorphism">
        <div className="header-left">
          <span className="logo" onClick={handleBackToHomeClick}> {/* Use the handler here */}
            Homeoguide
          </span>
        </div>
        <div className="header-right">
          <span className="header-link" onClick={handleLoginClick}>
            Login/Signup
          </span>
          <span className="header-link" onClick={handleBackToHomeClick}> {/* Use the handler here */}
            Back to Home
          </span>
        </div>
      </header>

      {/* Community Page Content */}
      <section className="community-page">
        {/* Hero Section */}
        <div className="hero-section" data-aos="fade-up">
          <h1 className="hero-title">Welcome to the Homeoguide Community!</h1>
          <p className="hero-description">
            Connect with fellow homeopathy students, instructors, and professionals to learn, share, and grow together.
          </p>
        </div>

        {/* WhatsApp Groups Section */}
        <div className="whatsapp-section" data-aos="fade-up">
          <h2 className="section-title">Join Our WhatsApp Groups</h2>
          <div className="whatsapp-group-container">
            <div className="whatsapp-group" data-aos="flip-left">
              <h3>Group 1: Homeopathy Aspirants</h3>
              <p>Join this group to connect with other homeopathy aspirants and exchange study tips.</p>
              <a href="https://wa.me/yourwhatsapplink1" target="_blank" className="btn">Join Now</a>
            </div>
            <div className="whatsapp-group" data-aos="flip-left" data-aos-delay="200">
              <h3>Group 2: Instructor Insights</h3>
              <p>Get valuable guidance and insights from experienced homeopathy instructors.</p>
              <a href="https://wa.me/yourwhatsapplink2" target="_blank" className="btn">Join Now</a>
            </div>
          </div>
        </div>

        {/* Payment Plans Section */}
        <div className="payment-plans-section" data-aos="fade-up">
          <h2 className="section-title">Choose Your Payment Plan</h2>
          <div className="payment-plan-container">
            <div className="payment-plan" data-aos="flip-left">
              <h3>Basic Plan</h3>
              <p>Access to study materials and community groups.</p>
              <p className="price">$29/month</p>
            </div>
            <div className="payment-plan" data-aos="flip-left" data-aos-delay="200">
              <h3>Premium Plan</h3>
              <p>Everything in Basic Plan plus exclusive webinars and 1-on-1 sessions with instructors.</p>
              <p className="price">$59/month</p>
            </div>
            <div className="payment-plan" data-aos="flip-left" data-aos-delay="400">
              <h3>Ultimate Plan</h3>
              <p>All features of the Premium Plan with access to exclusive exam preparation resources.</p>
              <p className="price">$99/month</p>
            </div>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="events-section" data-aos="fade-up">
          <h2 className="section-title">Upcoming Events</h2>
          <div className="event" data-aos="fade-right">
            <h3>Webinar on Homeopathy Exam Strategies</h3>
            <p>Date: January 10, 2025</p>
            <p>Join Dr. Mani Prasad for a live webinar to discuss the best strategies for acing homeopathy exams.</p>
          </div>
        </div>

        {/* Community Guidelines Section */}
        <div className="guidelines-section" data-aos="fade-up">
          <h2 className="section-title">Community Guidelines</h2>
          <ul className="guidelines-list">
            <li>Be respectful to all members.</li>
            <li>Contribute valuable resources and experiences.</li>
            <li>Engage in discussions and ask questions.</li>
            <li>No spamming or irrelevant content.</li>
          </ul>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-section" data-aos="fade-up">
          <h2 className="section-title">Success Stories</h2>
          <div className="testimony" data-aos="zoom-in">
            <p>"The Homeoguide community has been a game-changer for me. The WhatsApp groups have provided support and study resources that helped me ace my exams!"</p>
            <p>- Jane Doe, Homeopathy Aspirant</p>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>&copy; 2025 Homeoguide. All Rights Reserved.</p>
        </div>
      </section>
    </>
  );
};

export default CommunityPage;
