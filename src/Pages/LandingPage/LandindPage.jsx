import React from 'react';
import Navbar from '../LandingPage/Navbar/Navbar';
import JobCard from '../LandingPage/JobCard/JobCard';
import Footer from '../LandingPage/Footer/Footer';
import './LandingPage.css';
import { Link, Slide } from '@mui/material';
import SlideShow from './SlideShow/SlideShow';


function LandingPage() {
  const featuredJobs = [
    {
      title: 'Software Developer',
      company: 'Tech Corp',
      location: 'Remote',
      type: 'Full-time',
      salaryRange: '8-12 LPA',
      experience: '2-4 years',
      deadline: 'Mar 30, 2024'
    },
    {
      title: 'Customer Service',
      company: 'Service Inc',
      location: 'Bangalore',
      type: 'Part-time',
      salaryRange: '3-5 LPA',
      experience: '1-2 years',
      deadline: 'Mar 25, 2024'
    },
    {
      title: 'Data Analyst',
      company: 'Data Co',
      location: 'Mumbai',
      type: 'Contract',
      salaryRange: '6-8 LPA',
      experience: '2-3 years',
      deadline: 'Apr 5, 2024'
    }
  ];
  

  return (
    <div className="">
      <Navbar />
      {/* <Link to></Link> */}

      <SlideShow/>
      
      <main className="main-content">
        <section className="hero-section">
          <h1 className='hero-Welcome'>Welcome to <span style={{color : "#38bff0", letterSpacing : "-4px"}}>elevate</span></h1>
          <p>Empowering careers, embracing abilities</p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Find Jobs</button>
            <button className="btn btn-secondary">Post a Job</button>
          </div>
        </section>

        <section className="featured-jobs">
          <h2>Featured Jobs</h2>
          <div className="job-grid">
            {featuredJobs.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </div>
        </section>

        <section className="info-section">
          <h2>Why Choose <span style={{letterSpacing : "-3px"}}>elevate</span> ?</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>Inclusive Opportunities</h3>
              <p>We partner with companies committed to creating an inclusive workplace.</p>
            </div>
            <div className="info-card">
              <h3>Accessible Platform</h3>
              <p>Our platform is designed with accessibility in mind, ensuring a seamless experience for all users.</p>
            </div>
            <div className="info-card">
              <h3>Support Network</h3>
              <p>Connect with a community that understands and supports your career journey.</p>
            </div>
          </div>
        </section>

        <section className="thank-you">
          <h2>thank you for choosing <span style={{fontFamily:"League Spartan"}}>us :) </span></h2>
          <p>we're committed to breaking down barriers and creating equal opportunities in the workplace.</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;