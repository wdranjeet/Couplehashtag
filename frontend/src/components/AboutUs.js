import React from 'react';
import { Link } from 'react-router-dom';
import './FooterPages.css';

const AboutUs = () => {
  return (
    <div className="footer-page">
      <div className="footer-page-content">
        <h1>About Us</h1>
        <p className="lead">Welcome to Couple Hashtag Maker - Your perfect companion for creating unique and memorable couple hashtags!</p>
        
        <section className="page-section">
          <h2>Our Story</h2>
          <p>
            Couple Hashtag Maker was born from the idea that every love story deserves its own unique identity. 
            Whether you're planning a wedding, celebrating an anniversary, or just want to share your love story 
            on social media, we're here to help you create the perfect hashtag.
          </p>
        </section>

        <section className="page-section">
          <h2>What We Do</h2>
          <p>
            We use creative algorithms to generate hundreds of unique hashtag combinations from your names. 
            Our tool combines your names in various creative ways, adds popular suffixes and prefixes, 
            and provides you with trending hashtag suggestions to make your love story stand out on social media.
          </p>
        </section>

        <section className="page-section">
          <h2>Why Choose Us?</h2>
          <ul className="feature-list">
            <li>✨ Generate hundreds of unique hashtag combinations instantly</li>
            <li>💝 Easy to use - just enter two names and click generate</li>
            <li>📱 Share directly to Instagram, WhatsApp, and Twitter/X</li>
            <li>🔥 Get inspired by trending couple hashtags</li>
            <li>💯 Completely free to use</li>
          </ul>
        </section>

        <section className="page-section">
          <h2>Our Mission</h2>
          <p>
            Our mission is to help couples around the world celebrate their love stories with unique, 
            creative, and memorable hashtags. We believe every couple deserves a special hashtag that 
            represents their unique bond.
          </p>
        </section>

        <div className="back-link">
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
