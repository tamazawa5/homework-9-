const pool = require('../config/index')

module.exports = {
  getAllMovies: async(req, res) => {
    try {
        pool.query("SELECT*FROM movies LIMIT 10", (err, result) => {
          if (err) {
            console.log(err);
          }
          res.status(200).json({
            message: 'Success get all movies.',
            data: result.rows
          });
        });
    } catch (err) {
      console.log(err);
    }
  },

  createMovie: async(req, res) => {
    const { title, genres, year } = req.body;
    const query = {
      text: 'INSERT INTO movies (title, genres, year) VALUES ($1, $2, $3) RETURNING *',
      values: [title, genres, year],
    };
    try {
      await pool.query(query, (err, result) => {
        if (err) {
          console.log(err);
        }
        res.status(201).json({
          message: 'Movie created successfully.',
          data: result.rows
        });
      });
    } catch (err) {
      console.log(err);
    }
  },

  updateMovie: async(req, res) => {
    const { id } = req.params;
    const { title, genres, year } = req.body;
    const query = {
      text: 'UPDATE movies SET title=$1, genres=$2, year=$3 WHERE id=$4 RETURNING *',
      values: [title, genres, year, id],
    };
    try {
      await pool.query(query, (err, result) => {
        if (err) {
          console.log(err);
        }
        res.status(201).json({
          message: 'Movie updated successfully.',
          data: result.rows
        });
      });
    } catch (err) {
      console.log(err);
    }
  },

  deleteMovie: async(req, res) => {
    const { id } = req.params;
    const query = {
      text: 'DELETE FROM movies WHERE id=$1',
      values: [id],
    };
    try {
      await pool.query(query, (err, result) => {
        if (err) {
          console.log(err);
        }
        res.status(201).json({
          message: 'Movie deleted successfully.'
        });
      });
    } catch (err) {
      console.log(err);
    }
  }
}