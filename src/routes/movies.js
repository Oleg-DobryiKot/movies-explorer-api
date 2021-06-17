const router = require('express').Router();
const { celebrate } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const {
  greateMovieValidation,
  deleteMovieValidation,
} = require('../schemas/movie-req');

router.get('/', getMovies);
router.post('/', celebrate({ body: greateMovieValidation }), createMovie);
router.delete('/:movieId', celebrate({ params: deleteMovieValidation }), deleteMovieById);

module.exports = router;
