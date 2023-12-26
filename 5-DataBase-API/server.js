const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('database.db');

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

// Mhamad Raad
// 0770 184 4913
