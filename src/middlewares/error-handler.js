const errorHandler = (err, req, res, next) => {
  const error = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Ошибка сервера',
  };
  if (err.name === 'ValidationError') {
    error.statusCode = 401;
    error.message = 'Ошибка данных. Проверьте правильность переданных значений.';
  }
  if (err.name === 'NotValidID') {
    error.statusCode = 400;
    error.message = 'Ошибка. Передан невалидный ID!';
  }
  if (err.name === 'UserExist') {
    error.statusCode = 409;
    error.message = 'Такой пользователь уже существует. Авторизуйтесь!';
  }
  if (err.name === 'WrongUserID') {
    error.statusCode = 404;
    error.message = 'Ошибка обновления пользователя. Пользователь с таким ID не найден!';
  }
  if (err.name === 'UserNotFound') {
    error.statusCode = 404;
    error.message = 'Пользователь не найден!';
  }
  if (err.name === 'WrongPassword') {
    error.statusCode = 401;
    error.message = 'Проверьте правильность логина и пароля. Данные не совпадают!';
  }
  if (err.name === 'ResourseNotFound') {
    error.statusCode = 404;
    error.message = 'Запрашиваемый ресурс не найден';
  }
  if (err.name === 'CryptError') {
    error.statusCode = 401;
    error.message = 'Ошибка авторизации. Проверьте правильность логина и пароля!';
  }
  if (err.name === 'NoAuth') {
    error.statusCode = 401;
    error.message = 'Ошибка авторизации. Для продолжения необходимо авторизоваться';
  }
  if (err.name === 'NoToken') {
    error.statusCode = 401;
    error.message = 'Ошибка авторизации. Возможно истек срок действия токена.';
  }
  if (err.name === 'YouCantDeleteMovie') {
    error.statusCode = 403;
    error.message = 'Нельзя удалять созданное другими. Это чужой фильм.';
  }
  if (err.name === 'MovieNotFound') {
    error.statusCode = 404;
    error.message = 'Фильм с таким ID не найден!';
  }
  if (err.name === 'MongoError' && err.code === 11000) {
    error.statusCode = 409;
    error.message = 'Пользователь с таким email уже есть. Попробуйте вспомнить пароль или зарегистрировться с другими данными.';
  }
  if (err.name === 'NoAuthData') {
    error.statusCode = 400;
    error.message = 'Пароль, Имя или e-mail не могут быть пустыми!';
  }
  if (err.name === 'CastError') {
    error.statusCode = 400;
    error.message = 'В запросе переданы не валидные значения или данные неправильного типа';
  }

  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
