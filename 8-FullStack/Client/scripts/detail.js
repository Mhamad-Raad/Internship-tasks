// Detail page logic
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('movieId');

  if (!movieId) {
    console.error('Movie ID not found in the URL parameters');
    return;
  }

  fetchMovieDetails(movieId);
});

async function fetchMovieDetails(movieId) {
  console.log(movieId);
  try {
    const response = await fetch(`http://localhost:3000/movies/${movieId}`);

    if (!response.ok) {
      console.error(
        `Failed to fetch movie details. Status: ${response.status}`
      );
      return;
    }

    const movieDetails = await response.json();
    displayMovieDetails(movieDetails);
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}

function displayMovieDetails(movieDetails) {
  console.log(movieDetails);
  const movieDetailsContainer = document.getElementById('movie-details');
  movieDetailsContainer.innerHTML = `
    <h3>${movieDetails.title}</h3>
    <p>Description: ${movieDetails.description}</p>
    <p>Release Year: ${movieDetails.release_year}</p>
    <p>Genre: ${movieDetails.genre}</p>
    <p>Director: ${movieDetails.director}</p>
    <p>Likes: ${movieDetails.likes}</p>
    <h4>Cast</h4>
    <ul>
      ${movieDetails.cast
        .map(
          (member) =>
            `<li>${member.name}, ${member.age}, ${member.country_of_origin}</li>`
        )
        .join('')}
    </ul>
    <button onclick="editMovie(${movieDetails.movie_id})">Edit</button>
    <button onclick="deleteMovie(${movieDetails.movie_id})">Delete</button>
  `;
}

function editMovie(movieId) {
  window.location.href = `edit.html?movieId=${movieId}`;
}

function deleteMovie(movieId) {
  // Add logic for deleting the movie
}
