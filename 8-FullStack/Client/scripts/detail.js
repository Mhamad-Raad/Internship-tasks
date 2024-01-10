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
    <input type="text" id="title" value="${movieDetails.title}" />
    <textarea id="description">${movieDetails.description}</textarea>
    <input type="number" id="releaseYear" value="${
      movieDetails.release_year
    }" />
    <input type="text" id="genre" value="${movieDetails.genre}" />
    <input type="text" id="director" value="${movieDetails.director}" />
    <p class="likes">Likes: ${movieDetails.likes}</p>
    <h4 class="cast">Cast</h4>
    <ul>
      ${movieDetails.cast
        .map(
          (member) =>
            `<li>${member.name}, ${member.age}, ${member.country_of_origin}</li>`
        )
        .join('')}
    </ul>
    <div class="comments">
    <h4>Comments</h4>
          ${
            movieDetails.comments.length > 0
              ? movieDetails.comments
                  .map((comment) => {
                    comment = JSON.parse(comment);
                    return `<p>${comment['text']} - ${comment['user']}</p>`;
                  })
                  .join('')
              : '<p>No comments yet</p>'
          }
    </div>
    <button onclick="editMovie(${movieDetails.movie_id})">Save</button>
    <button onclick="deleteMovie(${movieDetails.movie_id})">Delete</button>
  `;

  // You might want to add an event listener to the "Save" button here
  const saveButton = document.querySelector(
    '#movie-details button[onclick="editMovie"]'
  );

  saveButton.addEventListener('click', () => {
    // Call the editMovie function when the "Save" button is clicked
    editMovie(movieDetails.movie_id);
  });
}

async function editMovie(movieId) {
  // Fetch the updated movie details from input fields
  const updatedTitle = document.getElementById('title').value;
  const updatedDescription = document.getElementById('description').value;
  const updatedReleaseYear = document.getElementById('releaseYear').value;
  const updatedGenre = document.getElementById('genre').value;
  const updatedDirector = document.getElementById('director').value;

  // Create an object with the updated movie data
  const updatedMovieData = {
    title: updatedTitle,
    description: updatedDescription,
    release_year: updatedReleaseYear,
    genre: updatedGenre,
    director: updatedDirector,
  };

  try {
    // Send a PUT request to update the movie details
    const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovieData),
    });

    if (response.ok) {
      // Successfully updated movie, fetch and display updated movie list
      fetchMovies();
    } else {
      console.error('Failed to update movie');
    }
  } catch (error) {
    console.error('Error updating movie:', error);
  }
}

async function deleteMovie(movieId) {
  try {
    // Send a DELETE request to delete the movie
    const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Successfully deleted the movie, fetch and display updated movie list
      fetchMovies();
    } else {
      console.error('Failed to delete the movie');
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
  }
}
