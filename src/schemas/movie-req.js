const { Joi } = require('celebrate');

// const regexURL = /(^https?:\/\/)?[a-z0-9~_\-.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;

const greateMovieValidation = Joi.object().keys({
  country: Joi.string().required(),
  director: Joi.string().required(),
  duration: Joi.number().required(),
  year: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  trailer: Joi.string().required(),
  thumbnail: Joi.string().required(),
  movieId: Joi.string().required(),
  nameRU: Joi.string().required(),
  nameEN: Joi.string().required(),
}).unknown(true);

// todo: test regex to match url
// image: Joi.string().required().pattern(regexURL),
// trailer: Joi.string().required().pattern(regexURL),
// thumbnail: Joi.string().required().pattern(regexURL),

const deleteMovieValidation = Joi.object().keys({
  movieId: Joi.string().required(),
});

module.exports = {
  greateMovieValidation,
  deleteMovieValidation,
};
