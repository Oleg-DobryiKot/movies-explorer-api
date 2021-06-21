const Movie = require('../models/movie');

const err = new Error();

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(200).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const owner = req.user._id;
  const data = { owner, ...req.body };
  const arrOfValues = Object.values(data);
  if (arrOfValues.length !== 12) {
    err.name = 'ValidationError';
    next(err);
  }
  Movie.create(data)
    .then((movie) => res.status(200).send(movie))
    .catch(next);
};

const deleteMovieById = (req, res, next) => {
  const { _id } = req.params;
  if (!_id) {
    err.name = 'NotValidID';
    next(err);
  }
  Movie.findById(_id)
    .orFail(new Error('NotValidID'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        err.name = 'YouCantDeleteMovie';
        next(err);
      } else {
        Movie.findByIdAndRemove(_id)
          .orFail(new Error('NotValidID'))
          .then((rmMovie) => {
            if (!rmMovie) {
              err.name = 'MovieNotFound';
              return next(err);
            }
            return res.status(200).send({ message: `Фильм с ID ${rmMovie._id} удален владельцем.` });
          })
          .catch((e) => {
            if (e.message === 'NoMovie') {
              e.name = 'MovieNotFound';
            }
            if (e.message === 'NotValidID') {
              e.name = 'NotValidID';
            }
            next(e);
          });
      }
    })
    .catch((e) => {
      if (e.message === 'NoMovie') {
        e.name = 'MovieNotFound';
      }
      if (e.message === 'NotValidID') {
        e.name = 'NotValidID';
      }
      next(e);
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovieById,
};
