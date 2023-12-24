const express = require('express');
const app = express();
const path = require('path');

const task4Route = require('./routes/task4.router')

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(express.static(path.join(__dirname, 'client')));

//add a middle ware for /task4 route
app.get('/task4', task4Route) 

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
