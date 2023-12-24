const path = require('path');

const sendTaskFour = (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
}

module.exports = { sendTaskFour };
