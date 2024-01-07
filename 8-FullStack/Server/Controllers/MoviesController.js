// moviesController.js

const Movies = require('./Movies'); // Adjust the path based on your project structure

class MoviesController {
  constructor() {
    this.movies = new Movies();
  }

  getAllMovies(req, res) {
    const allMovies = this.movies.getAllMovies();
    res.json(allMovies);
  }

  getMovieById(req, res) {
    const movieId = parseInt(req.params.id);
    const movie = this.movies.getMovieById(movieId);

    if (movie) {
      res.json(movie);
    } else {
      res.status(404).send('Movie not found');
    }
  }

  addMovie(req, res) {
    const newMovie = req.body; // Assuming request body contains movie details
    this.movies.addMovie(newMovie);
    res.status(201).json(newMovie);
  }

  getMovieLikes(req, res) {
    const movieId = parseInt(req.params.id);
    const likes = this.movies.getMovieLikes(movieId);
    res.json({ likes });
  }

  addLikeToMovie(req, res) {
    const movieId = parseInt(req.params.id);
    const likes = this.movies.addLikeToMovie(movieId);
    res.json({ likes });
  }

  getMovieComments(req, res) {
    const movieId = parseInt(req.params.id);
    const comments = this.movies.getMovieComments(movieId);
    res.json(comments);
  }

  addCommentToMovie(req, res) {
    const movieId = parseInt(req.params.id);
    const { user, text } = req.body; // Assuming request body contains user and text
    const updatedComments = this.movies.addCommentToMovie(movieId, user, text);
    res.status(201).json(updatedComments);
  }
}

module.exports = MoviesController;
