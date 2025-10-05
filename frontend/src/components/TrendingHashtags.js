import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './TrendingHashtags.css';

const TrendingHashtags = () => {
  const [trendingHashtags] = useState([
    '#CoupleGoals',
    '#ForeverTogether',
    '#LoveStory',
    '#WeddingVibes',
    '#EngagedLife',
    '#HappilyEverAfter',
    '#PowerCouple',
    '#SoulmatesForever',
    '#TrueLove',
    '#TogetherForever'
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      className="trending-hashtags-container"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h2 
        className="trending-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🔥 Trending Hashtags
      </motion.h2>
      <motion.p 
        className="trending-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Get inspired by popular couple hashtags
      </motion.p>
      <motion.div className="trending-hashtags-grid" variants={containerVariants}>
        {trendingHashtags.map((tag, index) => (
          <motion.div
            key={index}
            className="trending-hashtag-item"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.15, 
              rotate: [-2, 2, -2, 0],
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="trending-hashtag-text">{tag}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TrendingHashtags;
