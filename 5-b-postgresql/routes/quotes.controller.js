const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'task5',
  password: '1234',
  port: 5432, // Default PostgreSQL port
});

const getAllQuotes = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM quotes');
    console.log(rows);
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const addQuote = async (req, res) => {
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
};

const deleteQuote = async (req, res) => {
  console.log(req.body);

  const { quote } = req.body;

  try {
    await pool.query('DELETE FROM quotes WHERE quote = $1', [quote]);

    res.send('Done');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { getAllQuotes, addQuote, deleteQuote };
