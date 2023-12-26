const express = require('express');
const app = express();
const path = require('path');

const task4Route = require('./routes/task4.router');
const quotesRoute = require('./routes/quotes.router');

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

//for the css
app.use(express.static(path.join(__dirname, 'client')));

app.use(express.json());

app.get('/task4', task4Route);

app.use('/quotes', quotesRoute);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

// Mhamad Raad
// 0770 184 4913
