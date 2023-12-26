const express = require('express');

const { getAllQuotes, addQuote, deleteQuote } = require('./quotes.controller');

const router = express.Router();

router.get('/', getAllQuotes);
router.post('/', addQuote);
router.delete('/', deleteQuote);

module.exports = router;
