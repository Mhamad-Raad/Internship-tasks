const express = require('express');
const MoviesController = require('../Controllers/Movies.Controller');

const moviesController = new MoviesController();
const router = express.Router();

router.post('/', async (req, res) => {
  console.log('here')
  await moviesController.addMovie(req, res);
});

router.get('/', async (req, res) => {
  await moviesController.getAllMovies(req, res);
});

router.put('/:id', moviesController.updateMovie);

router.delete('/:id', moviesController.deleteMovie);

router.get('/:id', async (req, res) => {
  await moviesController.getMovieById(req, res);
});

router.get('/:id/likes', async (req, res) => {
  await moviesController.getMovieLikes(req, res);
});

router.post('/:id/likes', async (req, res) => {
  await moviesController.addLikeToMovie(req, res);
});

router.get('/:id/comments', async (req, res) => {
  await moviesController.getMovieComments(req, res);
});

router.post('/:id/comments', async (req, res) => {
  await moviesController.addCommentToMovie(req, res);
});

router.get('/:id/cast', async (req, res) => {
  await moviesController.getMovieCast(req, res);
});

module.exports = router;
