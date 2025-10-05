const express = require('express');
const router = express.Router();
const hashtagGenerator = require('../src/hashtagGenerator');

// Store for trending analytics (in-memory for now)
const hashtagStats = new Map();

/**
 * POST /api/generateHashtags
 * Generate hashtags from two names
 */
router.post('/generateHashtags', (req, res) => {
  try {
    const { name1, name2 } = req.body;
    
    if (!name1 || !name2) {
      return res.status(400).json({
        success: false,
        error: 'Both name1 and name2 are required'
      });
    }
    
    const result = hashtagGenerator.generateHashtags(name1, name2);
    
    if (result.success) {
      // Track usage for trending
      result.hashtags.forEach(tag => {
        const count = hashtagStats.get(tag) || 0;
        hashtagStats.set(tag, count + 1);
      });
      
      res.json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * GET /api/trending
 * Get most popular hashtags
 */
router.get('/trending', (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    
    // Sort by usage count
    const trending = Array.from(hashtagStats.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([hashtag, count]) => ({ hashtag, count }));
    
    res.json({
      success: true,
      trending: trending,
      count: trending.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
});

module.exports = router;
