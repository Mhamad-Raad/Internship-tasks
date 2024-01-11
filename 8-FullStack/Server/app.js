const express = require('express');
const cors = require('cors');
const MoviesRoutes = require('./Routes/Movies.route');

const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:5500/8-FullStack/Client/index.html',
  ],
};

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to your Movie Library!');
});

app.use('/movies', MoviesRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
