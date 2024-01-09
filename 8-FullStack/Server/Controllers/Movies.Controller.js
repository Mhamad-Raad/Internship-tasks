// moviesController.js

const MoviesService = require('../Services/MoviesService');

const moviesService = new MoviesService();

class MoviesController {
  constructor() {}

  async addMovie(req, res) {
    const newMovie = req.body;

    try {
      const insertedMovie = await moviesService.addMovie(newMovie);
      res.status(201).json(insertedMovie);
      console.log('done')
    } catch (error) {
      console.error('Error adding movie:', error);
      res.status(500).send('Internal Server Error');
    }
    console.log('problema')
  }

  async getAllMovies(req, res) {
    try {
      const allMovies = await moviesService.getAllMovies();
      res.json(allMovies);
    } catch (error) {
      console.error('Error getting all movies:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getMovieById(req, res) {
    const movieId = parseInt(req.params.id);

    try {
      const movie = await moviesService.getMovieById(movieId);
      if (movie) {
        res.json(movie);
      } else {
        res.status(404).send('Movie not found');
      }
    } catch (error) {
      console.error('Error getting movie by ID:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getMovieLikes(req, res) {
    const movieId = parseInt(req.params.id);

    try {
      const likes = await moviesService.getMovieLikes(movieId);
      res.json({ likes });
    } catch (error) {
      console.error('Error getting movie likes:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async addLikeToMovie(req, res) {
    const movieId = parseInt(req.params.id);

    try {
      const likes = await moviesService.addLikeToMovie(movieId);
      res.json({ likes });
    } catch (error) {
      console.error('Error adding like to movie:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getMovieComments(req, res) {
    const movieId = parseInt(req.params.id);

    try {
      const comments = await moviesService.getMovieComments(movieId);
      res.json(comments);
    } catch (error) {
      console.error('Error getting movie comments:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async addCommentToMovie(req, res) {
    const movieId = parseInt(req.params.id);
    const { user, text } = req.body;

    try {
      const updatedComments = await moviesService.addCommentToMovie(movieId, user, text);
      res.status(201).json(updatedComments);
    } catch (error) {
      console.error('Error adding comment to movie:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  // Additional method to get movie cast
  async getMovieCast(req, res) {
    const movieId = parseInt(req.params.id);

    try {
      const cast = await moviesService.getMovieCast(movieId);
      res.json(cast);
    } catch (error) {
      console.error('Error getting movie cast:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  deleteMovie(req, res) {
    const movieId = parseInt(req.params.id);

    // Call the deleteMovie method from your Movies module (assuming you have this method)
    const result = moviesService.deleteMovie(movieId);

    if (result) {
      res.status(204).end(); // 204 No Content for successful deletion
    } else {
      res.status(404).send('Movie not found');
    }
  }
}

module.exports = MoviesController;
