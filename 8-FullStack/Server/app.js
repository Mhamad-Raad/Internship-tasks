const express = require('express');
const app = express();
const port = 3000; // Choose a port number

app.get('/', (req, res) => {
  res.send('Hello, this is your Express.js server!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
