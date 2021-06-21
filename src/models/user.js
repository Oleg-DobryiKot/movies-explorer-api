const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Имя обязательно для заполнения!'],
    minlength: [2, 'Имя пользователя должно лежать в диаппазоне от 2 до 30 символов!'],
    maxlength: [30, 'Имя пользователя не может превышать 30 символов'],
  },
  email: {
    type: String,
    required: [true, 'Поле e-mail обязательно для заполнения!'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Поле email должно быть email-адресом',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле пароля обязательно для заполнения!'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
