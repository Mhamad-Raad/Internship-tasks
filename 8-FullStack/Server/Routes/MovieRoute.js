// moviesRoutes.js

const express = require('express');
const MoviesController = require('./moviesController'); // Adjust the path based on your project structure

const router = express.Router();
const moviesController = new MoviesController();

// Endpoint to get all movies
router.get('/', moviesController.getAllMovies);

// Endpoint to get a specific movie by ID
router.get('/:id', moviesController.getMovieById);

// Endpoint to add a new movie
router.post('/', moviesController.addMovie);

// Endpoint to get likes for a movie
router.get('/:id/likes', moviesController.getMovieLikes);

// Endpoint to add a like to a movie
router.post('/:id/likes', moviesController.addLikeToMovie);

// Endpoint to get comments for a movie
router.get('/:id/comments', moviesController.getMovieComments);

// Endpoint to add a comment to a movie
router.post('/:id/comments', moviesController.addCommentToMovie);

module.exports = router;
