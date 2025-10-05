import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import './HashtagGenerator.css';
import hashtagGenerator from '../utils/hashtagGenerator';
import TrendingHashtags from './TrendingHashtags';

const HashtagGenerator = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [allHashtags, setAllHashtags] = useState([]);
  const [displayedHashtags, setDisplayedHashtags] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedTag, setCopiedTag] = useState('');
  const [showTrending, setShowTrending] = useState(true);

  // Load more hashtags when scrolling
  const handleScroll = useCallback(() => {
    if (allHashtags.length === 0) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    // Load more when user scrolls to 80% of the page
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      if (visibleCount < allHashtags.length) {
        setVisibleCount(prev => Math.min(prev + 10, allHashtags.length));
      }
    }
  }, [allHashtags.length, visibleCount]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setDisplayedHashtags(allHashtags.slice(0, visibleCount));
  }, [allHashtags, visibleCount]);

  const generateHashtags = async (e) => {
    e.preventDefault();
    
    if (!name1.trim() || !name2.trim()) {
      setError('Please enter both names');
      return;
    }

    setLoading(true);
    setError('');
    setAllHashtags([]);
    setDisplayedHashtags([]);
    setVisibleCount(10);
    setShowTrending(false); // Hide trending hashtags when generating

    // Simulate a small delay for better UX (makes it feel like processing)
    setTimeout(() => {
      const result = hashtagGenerator.generateHashtags(name1, name2);

      if (result.success) {
        setAllHashtags(result.hashtags);
      } else {
        setError(result.error || 'Failed to generate hashtags');
      }
      
      setLoading(false);
    }, 500);
  };

  const copyToClipboard = (tag) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(''), 2000);
  };

  const shareOnSocial = (platform, tag) => {
    const text = encodeURIComponent(tag);
    let url = '';

    switch (platform) {
      case 'instagram':
        copyToClipboard(tag);
        alert('Hashtag copied! Open Instagram to paste it.');
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${text}`;
        window.open(url, '_blank');
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${text}`;
        window.open(url, '_blank');
        break;
      case 'arattai':
        // Arattai sharing - copy to clipboard as it doesn't have a web share URL
        copyToClipboard(tag);
        alert('Hashtag copied! Open Arattai to paste it.');
        break;
      default:
        break;
    }
  };

  return (
    <div className="hashtag-generator">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="header"
      >
        <h1>💑 Couple Name Hashtag Maker</h1>
        <p className="subtitle">Create unique and creative hashtags for your love story</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        onSubmit={generateHashtags}
        className="input-form"
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="name1" className="form-label">Your Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="name1"
              placeholder="Enter your name"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="name2" className="form-label">Your Partner Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="name2"
              placeholder="Enter partner's name"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg generate-btn"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Generating...
            </>
          ) : (
            '✨ Generate Hashtags'
          )}
        </button>
      </motion.form>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="alert alert-danger mt-4"
        >
          {error}
        </motion.div>
      )}

      {showTrending && displayedHashtags.length === 0 && (
        <TrendingHashtags />
      )}

      {displayedHashtags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="results mt-4"
        >
          <h3 className="results-title">
            Your Hashtag Suggestions 
            <span className="hashtag-count"> ({displayedHashtags.length} of {allHashtags.length})</span>
          </h3>
          <div className="hashtags-grid">
            {displayedHashtags.map((tag, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
                className="hashtag-card"
              >
                <span className="hashtag-text">{tag}</span>
                <div className="hashtag-actions">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => copyToClipboard(tag)}
                    title="Copy to clipboard"
                  >
                    {copiedTag === tag ? '✓ Copied' : '📋 Copy'}
                  </button>
                  <div className="dropdown d-inline">
                    <button
                      className="btn btn-sm btn-outline-secondary dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Share
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => shareOnSocial('instagram', tag)}
                        >
                          📸 Instagram
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => shareOnSocial('whatsapp', tag)}
                        >
                          💬 WhatsApp
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => shareOnSocial('twitter', tag)}
                        >
                          🐦 Twitter/X
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => shareOnSocial('arattai', tag)}
                        >
                          💭 Arattai
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {visibleCount < allHashtags.length && (
            <motion.div 
              className="text-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="load-more-text">Scroll down to load more hashtags...</p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default HashtagGenerator;
