const express = require('express');
const path = require('path');

const router = express.Router();

// Middleware to log the time
router.use('/task4', function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// Route to serve the HTML file
router.get('/task4', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

module.exports = router;
