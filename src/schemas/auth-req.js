const { Joi } = require('celebrate');

const createUserValidation = Joi.object().keys({
  name: Joi.string().required().min(2).max(30),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

const loginUserValidation = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

module.exports = {
  createUserValidation,
  loginUserValidation,
};
