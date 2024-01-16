document.addEventListener('DOMContentLoaded', fetchMovies);

async function fetchMovies() {
  try {
    const response = await fetch('http://localhost:3000/movies');

    if (!response.ok) {
      console.error(`Failed to fetch movies. Status: ${response.status}`);
      return;
    }

    const movies = await response.json();
    displayMovies(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

function displayMovies(movies) {
  const moviesContainer = document.getElementById('movies-container');
  moviesContainer.innerHTML = '';

  movies.forEach((movie) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
      <h3>${movie.title}</h3>
      <p>${movie.description}</p>
      <p>Likes: ${movie.likes}</p>
      <p>Comments: ${movie.comments.length}</p>
    `;
    movieCard.addEventListener('click', () => viewMovieDetails(movie.movie_id));

    moviesContainer.appendChild(movieCard);
  });
}

function viewMovieDetails(movieId) {
  window.location.href = `detail.html?movieId=${movieId}`;
}

function navigateToAddMovie() {
  window.location.href = 'add_movie.html';
}
