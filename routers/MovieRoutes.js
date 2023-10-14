const express = require('express');
const router = express.Router();
const pool = require('../config/index');
const MovieController = require('../controllers/MovieController');

router.get("/", MovieController.getAllMovies);
router.post("/", MovieController.createMovie);
router.put("/:id", MovieController.updateMovie);
router.delete("/:id", MovieController.deleteMovie);

module.exports = router;