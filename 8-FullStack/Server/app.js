// app.js

const express = require('express');
const cors = require('cors');
const MoviesRoutes = require('./Routes/Movies.route'); // Adjust the path based on your project structure

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:5500/8-FullStack/Client/index.html',
  ],
};

const app = express();
app.use(cors());
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
