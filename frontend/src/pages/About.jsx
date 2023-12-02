import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  const [activeTab, setActiveTab] = useState(1)
  const [activeFAQs, setActiveFAQs] = useState({ 0: true, 1: true, 2: true })
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  const testimonials = [
    {
      quote:
        'AI Application Assistant transformed how I approach job applications. Highly recommended!',
      author: 'Jamie',
    },
    {
      quote: 'The cover letters generated were spot on. Saved me hours!',
      author: 'Taylor',
    },
    {
      quote:
        'Great for quick, professional applications. I loved the customization!',
      author: 'Alex',
    },
    {
      quote: 'This tool made my job hunt so much easier and more efficient!',
      author: 'Jordan',
    },
    {
      quote: "I've never felt more confident in my applications. Thank you!",
      author: 'Casey',
    },
    {
      quote:
        "The AI's understanding of industry-specific terminology is impressive.",
      author: 'Morgan',
    },
    // Add more testimonials here
  ]

  const faqData = [
    {
      question: 'How is each cover letter personalized to my profile?',
      answer:
        'Our AI analyzes your resume and aligns it with the job description to create a unique cover letter.',
    },
    {
      question: 'What AI technology is used in the application?',
      answer:
        'We use advanced NLP algorithms to understand and match your skills with job requirements.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Yes, we prioritize data security and confidentiality in our application.',
    },
    {
      question: 'Can I customize the cover letter generated by the AI?',
      answer:
        'Yes, our AI provides a strong starting point, but you can customize and tweak the cover letter to your liking.',
    },
    {
      question: 'How long does it take to generate a cover letter?',
      answer:
        'Our AI works quickly! It typically takes just a few seconds to generate a personalized cover letter.',
    },
    {
      question:
        'Do you offer support if I encounter issues with the application?',
      answer:
        'Absolutely! We have a dedicated support team ready to assist you with any issues or questions.',
    },
    {
      question: 'Is AI Application Assistant suitable for all industries?',
      answer:
        'Yes, our AI is designed to cater to a wide range of industries by adapting to various job descriptions and resume styles.',
    },
    {
      question: 'How does your AI ensure the cover letter is free of errors?',
      answer:
        'Our AI incorporates advanced error-checking algorithms to ensure your cover letter is grammatically correct and free of typos.',
    },
    {
      question:
        'Can I use AI Application Assistant if I have a non-traditional career path?',
      answer:
        'Definitely. Our AI is adept at handling diverse career backgrounds and can highlight your unique experiences effectively.',
    },
    {
      question:
        'Is there a limit to how many cover letters I can generate with a subscription?',
      answer:
        'With a subscription, you can generate an unlimited number of cover letters during the subscription period.',
    },
  ]

  const nextTestimonial = () => {
    setTestimonialIndex((testimonialIndex + 1) % testimonials.length)
  }

  const previousTestimonial = () => {
    setTestimonialIndex(
      (testimonialIndex - 1 + testimonials.length) % testimonials.length
    )
  }

  const toggleFAQ = (index) => {
    setActiveFAQs((prevActiveFAQs) => {
      return { ...prevActiveFAQs, [index]: !prevActiveFAQs[index] }
    })
  }
  return (
    <div className='about-container'>
      <div className='about-section'>
        <h1>About AI Application Assistant</h1>
        <p>
          Keep reading to learn more about what our platform is capeable of.
        </p>
      </div>

      <br />
      <br />

      {/* Embedded Video or Demo Section */}
      <section className='video-demo-section'>
        <h1>See It In Action</h1>
        <br />
        <br />
        <iframe
          width='560'
          height='315'
          src='https://www.youtube.com/embed/1bJABKCcagg?si=tkbbXsP8IcaBz5bo'
          title='YouTube video player'
          frameborder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowfullscreen></iframe>
      </section>

      <br />
      <br />
      <br />

      {/* Interactive How It Works Section */}
      <div className='how-it-works'>
        <h1>How It Works</h1>
        <div className='tabs'>
          <button
            onClick={() => setActiveTab(1)}
            className={activeTab === 1 ? 'active' : ''}>
            Step 1
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className={activeTab === 2 ? 'active' : ''}>
            Step 2
          </button>
          <button
            onClick={() => setActiveTab(3)}
            className={activeTab === 3 ? 'active' : ''}>
            Step 3
          </button>
          <button
            onClick={() => setActiveTab(4)}
            className={activeTab === 4 ? 'active' : ''}>
            Step 4
          </button>
        </div>
        <div className='tab-content'>
          {activeTab === 1 && (
            <h2>
              1. Input Job Details: Enter the job title, company name, and
              location.
            </h2>
          )}
          {activeTab === 2 && (
            <h2>
              2. Paste Job Description: Copy the job description to provide
              context.
            </h2>
          )}
          {activeTab === 3 && (
            <h2>
              3. Copy & Paste Resume: Paste a copy of your resume for a
              personalized touch.
            </h2>
          )}
          {activeTab === 4 && (
            <h2>
              4. Create the Letter: Submit the form and receive a tailored cover
              letter in usually less than a minute.
            </h2>
          )}
        </div>
      </div>

      <br />
      <br />
      <br />

      {/* Interactive Testimonials Section */}
      <div className='testimonials-section'>
        <h1>User Testimonials</h1>
        <div className='testimonial'>
          <blockquote>
            "{testimonials[testimonialIndex].quote}" -{' '}
            {testimonials[testimonialIndex].author}
          </blockquote>
          <div className='testimonial-buttons'>
            <button onClick={previousTestimonial}>&lt;</button>
            <button onClick={nextTestimonial}>&gt;</button>
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />

      {/* FAQ Section with More Questions and Answers */}
      <div className='faq-section'>
        <h1>Frequently Asked Questions</h1>
        <div className='faq-list'>
          {faqData.map((faq, index) => (
            <div key={index} className='faq-item'>
              <div className='faq-question' onClick={() => toggleFAQ(index)}>
                <b>{faq.question}</b>
              </div>
              {activeFAQs[index] && (
                <div className='faq-answer'>{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <br />
      <br />
      <br />

      <div className='special-offer'>
        <h1>Ready to give it a try?</h1>
        <p>Create Two Cover Letters for Free by Creating an Account!</p>
        <Link to='/register' className='btn special-offer-btn'>
          Sign Up Now
        </Link>
      </div>

      <br />
      <br />
      <br />
    </div>
  )
}

export default About