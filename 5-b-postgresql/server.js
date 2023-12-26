const express = require('express');
const app = express();
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'task5',
  password: '1234',
  port: 5432, // Default PostgreSQL port
});

const task4Route = require('./routes/task4.router');

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//for the css
app.use(express.static(path.join(__dirname, 'client')));

app.get('/task4', task4Route);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.use(express.json());

app.get('/quotes', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM quotes');
    console.log(rows);
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/quotes', async (req, res) => {
  console.log(req.body);

  const { author, quote } = req.body;

  try {
    await pool.query('INSERT INTO quotes (author, quote) VALUES ($1, $2)', [
      author,
      quote,
    ]);

    res.send('Done');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Mhamad Raad
// 0770 184 4913
