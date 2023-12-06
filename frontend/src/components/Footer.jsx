import React from 'react'
import { Link } from 'react-router-dom'

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
            Facebook
          </a>
          <a
            href='https://www.instagram.com/aiapplicationassistant/'
            className='social-link'>
            Instagram
          </a>
          <a href='https://twitter.com/AIAppAssistant' className='social-link'>
            Twitter
          </a>
          <a
            href='https://www.youtube.com/channel/UCoRBqqnjSJKohGIW3qNimaw'
            className='social-link'>
            YouTube
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
            <Link to='/cookies'>Cookie</Link>
          </div>
          <div className='link-section'>
            <h4>Solutions</h4>
            <Link to='/'>Cover Letters</Link>
            <Link to='/'>Resumes</Link>
          </div>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>© 2023 AI Application Assistant, Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
