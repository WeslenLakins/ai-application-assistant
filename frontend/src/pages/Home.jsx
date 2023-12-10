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
            Boost Your Job Applications with AI Application Assistant
          </h1>
          <p className='hero-subtitle'>
            Write dozens of customized, high-impact cover letters in minutes.
            Stand out from the competition and increase the chances of landing
            your dream job.
          </p>
          <Link to='/new-job' className='hero-button'>
            Try for Free
          </Link>
        </div>
        <div className='hero-image-container'>
          <img
            src={heroImageURL}
            alt='Job seeker with cover letters'
            className='hero-image'
          />
        </div>
      </section>

      <section className='video-demo-section'>
        <div className='video-wrapper'>
          <iframe
            width='560'
            height='315'
            src='https://www.youtube.com/embed/bEvKt9SNuW4?si=NIQEm-8VvzTgJLog'
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowfullscreen></iframe>
        </div>
      </section>

      <section className='services'>
        <div className='service'>
          <img
            src={tailoredCoverLetterImageURL}
            alt='Tailored Cover Letters'
            className='service-image'
          />
          <h2 className='service-title'>Tailored Cover Letters</h2>
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
          <h2 className='service-title'>Keyword Optimization</h2>
          <p className='service-description'>
            Leverage the power of AI to to identify and integrate key terms and
            phrases from job listings to ensure your application is not
            incorrectly filtered out by automated hiring systems.
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
          Don't Let Your Application Get Lost in the Shuffle
        </h1>
        <p className='cta-subtext'>
          In the modern job market, AI algorithms are the new gatekeepers. They
          scan, filter, and rank your application before a human ever sees it.
          AI Application Assistant is excited to offer a solution that not only
          saves you time and helps you stand out, but also improves your odds of
          getting hired.
        </p>
        <Link to='/new-job' className='cta-button'>
          Beat the Bots
        </Link>
      </section>
    </div>
  )
}

export default Home
