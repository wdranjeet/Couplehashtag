import React from 'react';
import HashtagGenerator from './components/HashtagGenerator';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <div className="App">
      <HashtagGenerator />
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="/about" className="footer-link">About Us</a>
            <span className="footer-separator">•</span>
            <a href="/sitemap" className="footer-link">Sitemap</a>
            <span className="footer-separator">•</span>
            <a href="/terms" className="footer-link">Terms of Use</a>
            <span className="footer-separator">•</span>
            <a href="/privacy" className="footer-link">Privacy Policy</a>
          </div>
          <p className="footer-copyright">© {new Date().getFullYear()} Couple Hashtag Maker. All rights reserved.</p>
          <p className="footer-tagline">Made with ❤️ for couples everywhere</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
