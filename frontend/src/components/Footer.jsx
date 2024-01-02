import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <p className='footer-tagline'>
          Empowering job seekers and recruiters with the latest AI technology.
        </p>
        <div className='footer-socials'>
          <a
            href='https://www.facebook.com/profile.php?id=61554165300225'
            className='social-link'>
            <FaFacebook />
          </a>
          <a
            href='https://www.instagram.com/aiapplicationassistant/'
            className='social-link'>
            <FaInstagram />
          </a>
          <a
            href='https://www.linkedin.com/company/ai-application-assistant/'
            className='social-link'>
            <FaLinkedin />
          </a>
          <a
            href='https://www.youtube.com/channel/UCoRBqqnjSJKohGIW3qNimaw'
            className='social-link'>
            <FaYoutube />
          </a>
        </div>
        <div className='footer-links'>
          <div className='link-section'>
            <h4>Company</h4>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/contact'>Contact</Link>
            <Link to='/contact'>Press</Link>
          </div>
          <div className='link-section'>
            <h4>Support</h4>
            <Link to='/about'>Pricing</Link>
            <Link to='/about'>Demo</Link>
            <Link to='/about'>FAQ</Link>
          </div>
          <div className='link-section'>
            <h4>Legal</h4>
            <Link to='/privacy'>Privacy</Link>
            <Link to='/terms'>Terms</Link>
            <Link to='/cookies'>Cookies</Link>
          </div>
          <div className='link-section'>
            <h4>Solutions</h4>
            <Link to='/dashboard'>Cover Letters</Link>
            <Link to='/dashboard'>Resumes</Link>
            <Link to='/dashboard'>Interviews</Link>
            <Link to='/dashboard'>Networking</Link>
          </div>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>© 2023 AI Application Assistant, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
