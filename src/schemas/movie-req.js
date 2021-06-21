const { Joi } = require('celebrate');

const regexURL = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:~+#-]*[\w@?^=%&amp;~+#-])?/i;

const greateMovieValidation = Joi.object().keys({
  country: Joi.string().required(),
  director: Joi.string().required(),
  duration: Joi.number().required(),
  year: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required().pattern(regexURL),
  trailer: Joi.string().required().pattern(regexURL),
  thumbnail: Joi.string().required().pattern(regexURL),
  movieId: Joi.string().required(),
  nameRU: Joi.string().required(),
  nameEN: Joi.string().required(),
}).unknown(true);

const deleteMovieValidation = Joi.object().keys({
  _id: Joi.string().length(24).hex(),
});

module.exports = {
  greateMovieValidation,
  deleteMovieValidation,
};
