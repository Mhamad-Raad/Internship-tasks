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

app.use(express.json());

app.get('/quotes', (req, res) => {
  db.all('SELECT * FROM quotes', {}, (error, rows) => {
    console.log(rows);
    res.send(rows);
  });
});

app.post('/quotes', (req, res) => {
  console.log(req.body);

  db.run(
    `
        INSERT INTO quotes 
        (
            author,
            quote
        )
        VALUES
        (
            "${req.body.author}",
            "${req.body.quote}"
        )
        `,
    (error) => {
      if (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
      } else {
        res.send('Done');
      }
    }
  );
});

// Mhamad Raad
// 0770 184 4913
