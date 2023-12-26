const sqlite3 = require('sqlite3');
db = new sqlite3.Database('database.db');

db.run(
  `
    CREATE TABLE quotes (
        [id] INTEGER PRIMARY KEY,
        [author] NVARCHAR(255),
        [quote] NVARCHAR(255)
    )
    `
);
