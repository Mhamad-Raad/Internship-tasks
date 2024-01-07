// Movies.js

class Movies {
  constructor() {
    this.movies = [];
  }

  getAllMovies() {
    return this.movies;
  }

  getMovieById(id) {
    return this.movies.find((movie) => movie.id === id);
  }

  addMovie(newMovie) {
    this.movies.push(newMovie);
  }

  getMovieLikes(id) {
    const movie = this.movies.find((m) => m.id === id);
    return movie ? movie.likes : 0;
  }

  addLikeToMovie(id) {
    const movie = this.movies.find((m) => m.id === id);
    if (movie) {
      movie.likes += 1;
      return movie.likes;
    }
    return 0;
  }

  getMovieComments(id) {
    const movie = this.movies.find((m) => m.id === id);
    return movie ? movie.comments : [];
  }

  addCommentToMovie(id, user, text) {
    const movie = this.movies.find((m) => m.id === id);
    if (movie) {
      movie.comments.push({ user, text });
      return movie.comments;
    }
    return [];
  }
}

module.exports = Movies;
