const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const hashtagRoutes = require('../routes/hashtags');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', hashtagRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Couple Hashtag API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Couple Hashtag API server running on port ${PORT}`);
  console.log(`📡 API endpoints:`);
  console.log(`   - POST http://localhost:${PORT}/api/generateHashtags`);
  console.log(`   - GET  http://localhost:${PORT}/api/trending`);
  console.log(`   - GET  http://localhost:${PORT}/health`);
});

module.exports = app;
