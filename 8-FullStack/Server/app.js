// app.js

const express = require('express');
const MoviesRoutes = require('./Routes/Movies.route'); // Adjust the path based on your project structure

const app = express();
const port = 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Welcome route
app.get('/', (req, res) => {
  res.send('Welcome to your Movie Library!');
});

// Movies routes
app.use('/movies', MoviesRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
