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
      <input type="text" id="newComment" placeholder="Add a comment" />
      <button class="add" onclick="addNewComment(${
        movieDetails.movie_id
      })">Add Comment</button>
    </div>
    <button class="save" onclick="editMovie(${
      movieDetails.movie_id
    })">Save Changes</button>
    <button class="like" onclick="likeMovie(${
      movieDetails.movie_id
    })">Like</button>
    <button class="delete" onclick="deleteMovie(${
      movieDetails.movie_id
    })">Delete</button>
  `;
}

async function likeMovie(movieId) {
  try {
    const response = await fetch(
      `http://localhost:3000/movies/${movieId}/likes`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      fetchMovieDetails(movieId);
    } else {
      console.error('Failed to like the movie');
    }
  } catch (error) {
    console.error('Error liking the movie:', error);
  }
}

async function addNewComment(movieId) {
  const newCommentInput = document.getElementById('newComment');
  const newCommentText = newCommentInput.value.trim();

  if (newCommentText === '') {
    alert('Please enter a comment.');
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/movies/${movieId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: 'someone',
          text: newCommentText,
        }),
      }
    );

    if (response.ok) {
      fetchMovieDetails(movieId);
      newCommentInput.value = '';
    } else {
      console.error('Failed to add comment');
    }
  } catch (error) {
    console.error('Error adding comment:', error);
  }
}

async function editMovie(movieId) {
  const updatedTitle = document.getElementById('title').value;
  const updatedDescription = document.getElementById('description').value;
  const updatedReleaseYear = document.getElementById('releaseYear').value;
  const updatedGenre = document.getElementById('genre').value;
  const updatedDirector = document.getElementById('director').value;

  const updatedMovieData = {
    title: updatedTitle,
    description: updatedDescription,
    release_year: updatedReleaseYear,
    genre: updatedGenre,
    director: updatedDirector,
  };

  try {
    const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMovieData),
    });

    if (response.ok) {
      window.location.href = 'index.html';
      history.pushState(null, null, url.href);
      window.location.reload();
    } else {
      console.error('Failed to update movie');
    }
  } catch (error) {
    console.error('Error updating movie:', error);
  }
}

async function deleteMovie(movieId) {
  try {
    const response = await fetch(`http://localhost:3000/movies/${movieId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      window.location.href = 'index.html';
      history.pushState(null, null, url.href);
      window.location.reload();
    } else {
      console.error('Failed to delete the movie');
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
  }
}
