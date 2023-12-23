const express = require('express');
const app = express();
const path = require('path');

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/task4', (req, res) => {
  app.use(express.static('public'));
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
