import React from 'react';
import { Link } from 'react-router-dom';
import './FooterPages.css';

const Sitemap = () => {
  return (
    <div className="footer-page">
      <div className="footer-page-content">
        <h1>Sitemap</h1>
        <p className="lead">Navigate through all pages of Couple Hashtag Maker</p>
        
        <section className="page-section">
          <h2>Main Pages</h2>
          <ul className="sitemap-list">
            <li>
              <Link to="/">🏠 Home</Link>
              <p>Generate unique couple hashtags from two names</p>
            </li>
          </ul>
        </section>

        <section className="page-section">
          <h2>Information Pages</h2>
          <ul className="sitemap-list">
            <li>
              <Link to="/about">ℹ️ About Us</Link>
              <p>Learn more about Couple Hashtag Maker and our mission</p>
            </li>
            <li>
              <Link to="/terms">📋 Terms of Use</Link>
              <p>Read our terms and conditions for using the service</p>
            </li>
            <li>
              <Link to="/privacy">🔒 Privacy Policy</Link>
              <p>Understand how we protect and handle your data</p>
            </li>
            <li>
              <Link to="/sitemap">🗺️ Sitemap</Link>
              <p>Navigate through all pages (you are here)</p>
            </li>
          </ul>
        </section>

        <section className="page-section">
          <h2>Features</h2>
          <ul className="feature-list">
            <li>✨ Generate hundreds of unique hashtag combinations</li>
            <li>🔥 View trending couple hashtags</li>
            <li>📋 Copy hashtags with one click</li>
            <li>📱 Share directly to social media (Instagram, WhatsApp, Twitter/X)</li>
            <li>💯 Completely free to use</li>
          </ul>
        </section>

        <section className="page-section">
          <h2>Social Sharing</h2>
          <p>Share your generated hashtags on:</p>
          <ul className="terms-list">
            <li>📸 Instagram</li>
            <li>💬 WhatsApp</li>
            <li>🐦 Twitter/X</li>
          </ul>
        </section>

        <div className="back-link">
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
