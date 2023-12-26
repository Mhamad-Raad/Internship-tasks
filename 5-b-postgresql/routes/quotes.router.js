const express = require('express');

const { getAllQuotes, addQuote } = require('./quotes.controller');

const router = express.Router();

router.get('/', getAllQuotes);

router.post('/', addQuote);

module.exports = router;
