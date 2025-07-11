import React from 'react';
import './CommunityPage.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const CommunityPage = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleLoginClick = () => navigate('/login');
  const handleBackToHomeClick = () => navigate('/');

  return (
    <>
      {/* Header */}
      <header className="header glassmorphism">
        <div className="header-left">
          <span className="logo" onClick={handleBackToHomeClick}>Homeoguide</span>
        </div>
        <div className="header-right">
          <span className="header-link" onClick={handleLoginClick}>Login/Signup</span>
          <span className="header-link" onClick={handleBackToHomeClick}>Back to Home</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" data-aos="fade-up">
        <h1 className="hero-title">Welcome to the Homeoguide Family!</h1>
        <p className="hero-description">
          HOMOEO GUIDE is your trusted companion for mastering Homeopathy. Get ready to unlock your potential with expert coaching for AIAPGET, NTET, NEXT, and PSC exams. Let's embark on this journey together!
        </p>
      </section>

      {/* Key Features Section */}
      <section className="features-section" data-aos="fade-up">
        <h2 className="section-title">Why Choose HOMOEO GUIDE?</h2>
        <p className="long-description">
          Join us to experience personalized learning that adapts to your pace. Our platform is designed to make studying Homeopathy easy, engaging, and most importantly—effective.
        </p>
        <ul className="offerings-list">
          <li><strong>Interactive Classes:</strong> Participate in live sessions, ask questions, and collaborate with peers.</li>
          <li><strong>Custom Study Plans:</strong> Study at your own pace with plans designed just for you.</li>
          <li><strong>Real-Time Assessments:</strong> Test yourself with regular quizzes and mock exams.</li>
          <li><strong>24/7 Support:</strong> Reach out to us anytime via WhatsApp for any help you need.</li>
        </ul>
        <a href="/enroll" className="btn-enroll">Get Started Now</a>
      </section>

      {/* WhatsApp Group Section */}
      <section className="whatsapp-section" data-aos="fade-up">
        <h2 className="section-title">Join Our WhatsApp Groups</h2>
        <div className="whatsapp-group-container">
          <div className="whatsapp-group" data-aos="flip-left">
            <h3>Group 1: Homeopathy Learners</h3>
            <p>Connect with fellow aspirants, share tips, and stay motivated.</p>
            <a href="https://wa.me/yourwhatsapplink1" target="_blank" className="btn">Join Now</a>
          </div>
          <div className="whatsapp-group" data-aos="flip-left" data-aos-delay="200">
            <h3>Group 2: Instructors' Insights</h3>
            <p>Gain expert advice from our experienced instructors.</p>
            <a href="https://wa.me/yourwhatsapplink2" target="_blank" className="btn">Join Now</a>
          </div>
        </div>
      </section>

      {/* Payment Plans Section */}
      <section className="payment-plans-section" data-aos="fade-up">
        <h2 className="section-title">Pick Your Plan</h2>
        <div className="payment-plan-container">
          <div className="payment-plan" data-aos="flip-left">
            <h3>Basic Plan</h3>
            <p>Access all study materials and connect with peers.</p>
            <p className="price">1500₹/month</p>
          </div>
          <div className="payment-plan" data-aos="flip-left" data-aos-delay="200">
            <h3>Premium Plan</h3>
            <p>Everything in Basic plus one-on-one sessions and webinars.</p>
            <p className="price">1800₹/month</p>
          </div>
          <div className="payment-plan" data-aos="flip-left" data-aos-delay="400">
            <h3>Ultimate Plan</h3>
            <p>All Premium features with exclusive exam resources.</p>
            <p className="price">2000₹/month</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Homeoguide. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default CommunityPage;
