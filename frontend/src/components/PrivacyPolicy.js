import React from 'react';
import { Link } from 'react-router-dom';
import './FooterPages.css';

const PrivacyPolicy = () => {
  return (
    <div className="footer-page">
      <div className="footer-page-content">
        <h1>Privacy Policy</h1>
        <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="page-section">
          <h2>1. Introduction</h2>
          <p>
            At Couple Hashtag Maker, we respect your privacy and are committed to protecting your personal 
            information. This Privacy Policy explains how we collect, use, and safeguard your information 
            when you use our service.
          </p>
        </section>

        <section className="page-section">
          <h2>2. Information We Collect</h2>
          <h3>Information You Provide</h3>
          <p>
            We collect the names you enter into our hashtag generator. This information is processed 
            temporarily in your browser and is not permanently stored on our servers.
          </p>
          
          <h3>Automatically Collected Information</h3>
          <ul className="terms-list">
            <li>Browser type and version</li>
            <li>Device information</li>
            <li>Usage statistics (pages visited, time spent)</li>
            <li>IP address (for security purposes)</li>
          </ul>
        </section>

        <section className="page-section">
          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul className="terms-list">
            <li>Generate personalized hashtag suggestions</li>
            <li>Improve our service and user experience</li>
            <li>Analyze usage patterns and trends</li>
            <li>Maintain security and prevent abuse</li>
          </ul>
        </section>

        <section className="page-section">
          <h2>4. Data Storage and Security</h2>
          <p>
            The names you enter are processed client-side in your browser and are not permanently stored 
            on our servers. We use industry-standard security measures to protect any data that is collected.
          </p>
        </section>

        <section className="page-section">
          <h2>5. Cookies and Tracking</h2>
          <p>
            We may use cookies and similar tracking technologies to enhance your experience on our website. 
            You can control cookies through your browser settings.
          </p>
        </section>

        <section className="page-section">
          <h2>6. Third-Party Services</h2>
          <p>
            When you share hashtags to social media platforms (Instagram, WhatsApp, Twitter/X), you are 
            subject to those platforms' privacy policies. We do not control or have access to data shared 
            through these third-party services.
          </p>
        </section>

        <section className="page-section">
          <h2>7. Children's Privacy</h2>
          <p>
            Our service is not intended for children under 13 years of age. We do not knowingly collect 
            personal information from children under 13.
          </p>
        </section>

        <section className="page-section">
          <h2>8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="terms-list">
            <li>Know what data we collect about you</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of data collection where applicable</li>
            <li>Update or correct your information</li>
          </ul>
        </section>

        <section className="page-section">
          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by 
            posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section className="page-section">
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through our website.
          </p>
        </section>

        <div className="back-link">
          <Link to="/">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
