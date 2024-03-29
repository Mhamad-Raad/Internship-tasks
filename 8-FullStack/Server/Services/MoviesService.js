// moviesService.js

const Movies = require('../Modules/Movies');

const movies = new Movies();

class MoviesService {
  constructor() {}

  async addMovie(newMovie) {
    return movies.addMovie(newMovie);
  }

  async getAllMovies() {
    return movies.getAllMovies();
  }

  async updateMovie(id, updatedMovieData) {
    return movies.updateMovie(id, updatedMovieData);
  }

  async getMovieById(id) {
    return movies.getMovieById(id);
  }

  async deleteMovie(id) {
    return movies.deleteMovie(id);
  }

  async getMovieLikes(id) {
    return movies.getMovieLikes(id);
  }

  async addLikeToMovie(id) {
    return movies.addLikeToMovie(id);
  }

  async getMovieComments(id) {
    return movies.getMovieComments(id);
  }

  async addCommentToMovie(id, user, text) {
    return movies.addCommentToMovie(id, user, text);
  }

  async getMovieCast(id) {
    return movies.getMovieCast(id);
  }
}

module.exports = MoviesService;
