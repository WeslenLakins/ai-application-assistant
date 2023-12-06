import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  // URLs for hosted images
  const heroImageURL =
    'https://onedrive.live.com/embed?resid=4B1C8510CEF67D18%218079&authkey=%21AFGzAbrOIssUjq8&width=512&height=512'
  const tailoredCoverLetterImageURL =
    'https://onedrive.live.com/embed?resid=4B1C8510CEF67D18%218080&authkey=%21AKmqOfKoD9fwt5I&width=384&height=384'
  const dataSecurityImageURL =
    'https://onedrive.live.com/embed?resid=4B1C8510CEF67D18%218082&authkey=%21AMGQQGjKVTfaJs8&width=384&height=384'
  const keywordOptimizationImageURL =
    'https://onedrive.live.com/embed?resid=4B1C8510CEF67D18%218081&authkey=%21ABLyq1iz4rc7q_I&width=384&height=384'

  return (
    <div className='home-container'>
      <section className='hero-section'>
        <div className='hero-content'>
          <h1 className='hero-title'>
            Boost Your Job Applications with Personalized Cover Letters
          </h1>
          <p className='hero-subtitle'>
            Write dozens of customized, high-impact cover letters in minutes.
            Stand out from the competition and increase the chances of landing
            your dream job.
          </p>
          <Link to='/new-job' className='hero-button'>
            Try for Free
          </Link>
          <p>No credit card required</p>
        </div>
        <div className='hero-image-container'>
          <img
            src={heroImageURL}
            alt='Job seeker with cover letters'
            className='hero-image'
          />
        </div>
      </section>

      <section className='services'>
        <div className='service'>
          <img
            src={tailoredCoverLetterImageURL}
            alt='Tailored Cover Letters'
            className='service-image'
          />
          <h2 className='service-title'>Tailored cover letters</h2>
          <p className='service-description'>
            Craft customized cover letters that perfectly align your skills and
            experiences with the job's specific requirements.
          </p>
        </div>
        <div className='service'>
          <img
            src={keywordOptimizationImageURL}
            alt='AI-powered Quality'
            className='service-image'
          />
          <h2 className='service-title'>Advanced Keyword Optimization</h2>
          <p className='service-description'>
            Leverage the power of AI to to identify and integrate key terms and
            phrases from job listings to ensure your application is not
            incorrectly filtered out by the automated hiring systems.
          </p>
        </div>
        <div className='service'>
          <img
            src={dataSecurityImageURL}
            alt='Data Privacy and Security'
            className='service-image'
          />
          <h2 className='service-title'>Advanced Error Checking</h2>
          <p className='service-description'>
            AI Application Assistant integrates cutting-edge error checking
            models to ensure the utmost accuracy and professionalism in every
            cover letter.
          </p>
        </div>
      </section>

      <section className='cta'>
        <h1 className='cta-title'>
          Boost Your Job Applications with Personalized Cover Letters
        </h1>
        <p className='cta-subtext'>
          Write dozens of customized cover letters that make an impact in
          minutes. Stand out from the competition and increase your chances of
          landing your dream job.
        </p>
        <button className='cta-button'>Try for free</button>
      </section>
    </div>
  )
}

export default Home
