const express = require('express');

const { sendTaskFour } = require('./task4.controller')

const router = express.Router();

// Middleware to log the time
router.use('/task4', function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// Route to serve the HTML file
router.get('/task4', sendTaskFour);

module.exports = router;
