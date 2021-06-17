const { Joi } = require('celebrate');

const getUserMeValidation = Joi.object().keys({
  authorization: Joi.string().required(),
});

const patchUserMeValidation = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  email: Joi.string().required().email(),
});

module.exports = {
  getUserMeValidation,
  patchUserMeValidation,
};
