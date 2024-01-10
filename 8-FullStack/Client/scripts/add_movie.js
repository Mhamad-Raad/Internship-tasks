let castCounter = 1;

// Function to add a new set of cast inputs
function addCastInput() {
  if (castCounter < 3) {
    castCounter++;

    const castsContainer = document.getElementById('casts-container');
    const newCastInput = document.createElement('div');
    newCastInput.classList.add('cast-input');
    newCastInput.id = `cast-${castCounter}`;

    newCastInput.innerHTML = `
      <label for="castName${castCounter}">Name:</label>
      <input type="text" id="castName${castCounter}" required>
      
      <label for="castAge${castCounter}">Age:</label>
      <input type="number" id="castAge${castCounter}" required>
      
      <label for="castCountry${castCounter}">Country of Origin:</label>
      <input type="text" id="castCountry${castCounter}" required>
    `;

    castsContainer.appendChild(newCastInput);
  } else {
    alert('You can only add up to 3 casts!');
  }
}

async function addMovie() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const releaseYear = document.getElementById('releaseYear').value;
  const genre = document.getElementById('genre').value;
  const director = document.getElementById('director').value;

  // Collect cast data
  const castData = [];
  for (let i = 1; i <= castCounter; i++) {
    const name = document.getElementById(`castName${i}`).value;
    const age = document.getElementById(`castAge${i}`).value;
    const country = document.getElementById(`castCountry${i}`).value;
    castData.push({ name, age, country_of_origin: country });
  }

  const response = await fetch('http://localhost:3000/movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      release_year: releaseYear,
      genre,
      director,
      cast: castData,
    }),
  });

  if (response.ok) {
    // Successfully added movie, fetch and display updated movie list
    window.location.href = 'index.html';
    history.pushState(null, null, url.href);
    window.location.reload();
  } else {
    console.error('Failed to add movie');
  }
}
