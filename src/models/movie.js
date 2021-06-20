const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Страна производства должна быть обязательно заполнена!'],
  },
  director: {
    type: String,
    required: [true, 'Режисера нужно обязательно заполнить!'],
  },
  duration: {
    type: Number,
    required: [true, 'Длительность фильма обязательна для заполнения!'],
  },
  year: {
    type: String,
    required: [true, 'Не забудьте записать год фильма!'],
  },
  description: {
    type: String,
    required: [true, 'Описание для фильма нужно заполнить!'],
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, { protocols: ['http', 'https'], require_protocol: true, require_host: true }),
      message: 'Ссылка на постер должна быть валидной!',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, { protocols: ['http', 'https'], require_protocol: true, require_host: true }),
      message: 'Ссылка на трейлер фильма должна быть валидной!',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v, { protocols: ['http', 'https'], require_protocol: true, require_host: true }),
      message: 'Ссылка на мини-постер должна быть валидной!',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: [true, 'ID фильма должен быть указан!'],
    unique: true,
  },
  nameRU: {
    type: String,
    required: [true, 'Описание фильма RU обязательно для заполнения!'],
  },
  nameEN: {
    type: String,
    required: [true, 'Описание фильма EN обязательно для заполнения!'],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('movie', movieSchema);
