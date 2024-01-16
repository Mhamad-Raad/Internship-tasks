const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'task8',
  password: '1234',
  port: 5432,
});

class Movies {
  constructor() {}

  async addMovie(newMovie) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const movieInsertQuery =
        'INSERT INTO movies (title, description, release_year, genre, director) VALUES ($1, $2, $3, $4, $5) RETURNING movie_id';
      const movieValues = [
        newMovie.title,
        newMovie.description,
        newMovie.release_year,
        newMovie.genre,
        newMovie.director,
      ];

      const movieResult = await client.query(movieInsertQuery, movieValues);
      const movieId = movieResult.rows[0].movie_id;

      if (newMovie.cast && newMovie.cast.length > 0) {
        const actorInsertQuery =
          'INSERT INTO actors (name, age, country_of_origin) VALUES ($1, $2, $3) RETURNING actor_id';

        const castInsertQuery =
          'INSERT INTO movie_cast (movie_id, actor_id) VALUES ($1, $2)';

        for (const actor of newMovie.cast) {
          const actorValues = [actor.name, actor.age, actor.country_of_origin];
          const actorResult = await client.query(actorInsertQuery, actorValues);
          const actorId = actorResult.rows[0].actor_id;
          const castValues = [movieId, actorId];
          await client.query(castInsertQuery, castValues);
        }
      }

      await client.query('COMMIT');

      return { movie_id: movieId, ...newMovie };
    } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error adding movie:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  async getAllMovies() {
    const client = await pool.connect();
    try {
      const result = await client.query(`
      SELECT
        movies.*,
        array_agg(jsonb_build_object('name', actors.name, 'age', actors.age, 'country_of_origin', actors.country_of_origin)) as cast
      FROM
        movies
      LEFT JOIN
        movie_cast ON movies.movie_id = movie_cast.movie_id
      LEFT JOIN
        actors ON movie_cast.actor_id = actors.actor_id
      GROUP BY
        movies.movie_id
    `);

      return result.rows;
    } finally {
      client.release();
    }
  }

  async updateMovie(movieId, updatedMovieData) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const updateMovieQuery =
        'UPDATE movies SET title = $2, description = $3, release_year = $4, genre = $5, director = $6 WHERE movie_id = $1 RETURNING *';
      const values = [
        movieId,
        updatedMovieData.title,
        updatedMovieData.description,
        updatedMovieData.release_year,
        updatedMovieData.genre,
        updatedMovieData.director,
      ];
      console.log(
        'Executing SQL query:',
        updateMovieQuery,
        'with values:',
        values
      );

      const updatedMovie = await client.query(updateMovieQuery, values);

      if (updatedMovie.rows.length === 0) {
        await client.query('ROLLBACK');
        return null;
      }

      await client.query('COMMIT');

      return updatedMovie.rows[0];
    } catch (error) {
      console.error('Error updating movie:', error);

      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async getMovieById(id) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT movies.*, 
        actors.name AS cast_name, 
        actors.age AS cast_age, 
        actors.country_of_origin AS cast_country
        FROM movies 
        LEFT JOIN movie_cast ON movies.movie_id = movie_cast.movie_id
        LEFT JOIN actors ON movie_cast.actor_id = actors.actor_id
        WHERE movies.movie_id = $1;`,
        [id]
      );

      if (result.rows.length === 0) {
        return null;
      }

      const movie = {
        movie_id: result.rows[0].movie_id,
        title: result.rows[0].title,
        description: result.rows[0].description,
        release_year: result.rows[0].release_year,
        genre: result.rows[0].genre,
        director: result.rows[0].director,
        likes: result.rows[0].likes,
        comments: result.rows[0].comments,
        cast: [],
      };

      result.rows.forEach((row) => {
        if (row.cast_name) {
          movie.cast.push({
            name: row.cast_name,
            age: row.cast_age,
            country_of_origin: row.cast_country,
          });
        }
      });

      return movie;
    } finally {
      client.release();
    }
  }

  async deleteMovie(movieId) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const deleteCastQuery = 'DELETE FROM movie_cast WHERE movie_id = $1';
      await client.query(deleteCastQuery, [movieId]);

      const deleteMovieQuery =
        'DELETE FROM movies WHERE movie_id = $1 RETURNING *';
      const deletedMovie = await client.query(deleteMovieQuery, [movieId]);

      if (deletedMovie.rows.length === 0) {
        await client.query('ROLLBACK');
        return false;
      }

      await client.query('COMMIT');

      return true;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async getMovieLikes(id) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT likes FROM movies WHERE movie_id = $1',
        [id]
      );
      return result.rows[0].likes;
    } finally {
      client.release();
    }
  }

  async addLikeToMovie(id) {
    const client = await pool.connect();
    try {
      await client.query(
        'UPDATE movies SET likes = likes + 1 WHERE movie_id = $1',
        [id]
      );
      const result = await client.query(
        'SELECT likes FROM movies WHERE movie_id = $1',
        [id]
      );
      return result.rows[0].likes;
    } finally {
      client.release();
    }
  }

  async getMovieComments(id) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT comments FROM movies WHERE movie_id = $1',
        [id]
      );
      return result.rows[0].comments;
    } finally {
      client.release();
    }
  }

  async addCommentToMovie(id, user, text) {
    const client = await pool.connect();
    try {
      await client.query(
        'UPDATE movies SET comments = array_append(comments, $1) WHERE movie_id = $2',
        [{ user, text }, id]
      );
      const result = await client.query(
        'SELECT comments FROM movies WHERE movie_id = $1',
        [id]
      );
      return result.rows[0].comments;
    } finally {
      client.release();
    }
  }

  async getMovieCast(id) {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT actors.* FROM actors INNER JOIN movie_cast ON actors.actor_id = movie_cast.actor_id WHERE movie_cast.movie_id = $1',
        [id]
      );
      return result.rows;
    } finally {
      client.release();
    }
  }
}

module.exports = Movies;
