import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HashtagGenerator from './components/HashtagGenerator';
import AboutUs from './components/AboutUs';
import Sitemap from './components/Sitemap';
import TermsOfUse from './components/TermsOfUse';
import PrivacyPolicy from './components/PrivacyPolicy';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <HashtagGenerator />
              <footer className="footer">
                <div className="footer-content">
                  <div className="footer-links">
                    <Link to="/about" className="footer-link">About Us</Link>
                    <span className="footer-separator">•</span>
                    <Link to="/sitemap" className="footer-link">Sitemap</Link>
                    <span className="footer-separator">•</span>
                    <Link to="/terms" className="footer-link">Terms of Use</Link>
                    <span className="footer-separator">•</span>
                    <Link to="/privacy" className="footer-link">Privacy Policy</Link>
                  </div>
                  <p className="footer-copyright">© {new Date().getFullYear()} Couple Hashtag Maker. All rights reserved.</p>
                  <p className="footer-tagline">Made with ❤️ for couples everywhere</p>
                </div>
              </footer>
            </>
          } />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
