import React from 'react';
import { Github, Linkedin, Twitter, Facebook } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>elevate jobs is dedicated to connecting talented individuals with disabilities to meaningful employment opportunities.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a href="https://github.com/"><Github size={20} /></a>
            <a href="https://linkedin.com/"><Linkedin size={20} /></a>
            <a href="https://x.com/"><Twitter size={20} /></a>
            <a href="https://facebook.com/"><Facebook size={20} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="disclaimer">
          <p>Disclaimer: This platform aims to provide equal opportunities for all individuals. We do not discriminate based on disability type or severity.</p>
        </div>
        <div className="developers">
          <p>Developed with ❤️ by:</p>
          <p>Jayesh Ahirrao</p>
          <p>Jidnya Mahajan</p>
          <p>Rohit Kumar</p>
          <p>Satyam Kharote</p>
        </div>
        <div className="copyright">
          <p>&copy; 2025 AbilityJobs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;