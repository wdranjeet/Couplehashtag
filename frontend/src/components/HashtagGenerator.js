import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './HashtagGenerator.css';
import hashtagGenerator from '../utils/hashtagGenerator';

const HashtagGenerator = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [hashtags, setHashtags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedTag, setCopiedTag] = useState('');

  const generateHashtags = async (e) => {
    e.preventDefault();
    
    if (!name1.trim() || !name2.trim()) {
      setError('Please enter both names');
      return;
    }

    setLoading(true);
    setError('');
    setHashtags([]);

    // Simulate a small delay for better UX (makes it feel like processing)
    setTimeout(() => {
      const result = hashtagGenerator.generateHashtags(name1, name2);

      if (result.success) {
        setHashtags(result.hashtags);
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
            <label htmlFor="name1" className="form-label">Partner 1 Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="name1"
              placeholder="Enter first name"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="name2" className="form-label">Partner 2 Name</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="name2"
              placeholder="Enter second name"
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

      {hashtags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="results mt-4"
        >
          <h3 className="results-title">Your Hashtag Suggestions</h3>
          <div className="hashtags-grid">
            {hashtags.map((tag, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
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
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default HashtagGenerator;
