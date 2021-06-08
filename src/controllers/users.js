const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const err = new Error();

const { JWT_SECRET = 'ewev434iwq98hcfereset3$GSGFQEFnfgnasdf23@sdvfbtr$534n3ox48f3oh4cp' } = process.env;

const getUserMe = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    err.name = 'NoToken';
    next(err);
  }

  const token = authorization.replace('Bearer ', '');
  try {
    const { _id } = jwt.verify(token, JWT_SECRET);

    User.findById(_id)
      .orFail(new Error('NoUser'))
      .then((user) => {
        if (!user) {
          err.name = 'UserNotFound';
          return next(err);
        }
        return res.send(user);
      })
      .catch((e) => {
        if (e.message === 'NoUser') {
          e.name = 'UserNotFound';
        }
        return next(e);
      });
  } catch (e) {
    e.name = 'NoAuth';
    next(e);
  }
};

const patchUserMe = (req, res, next) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
  };
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, data,
    {
      new: true,
      runValidators: true,
      upsert: false,
    })
    .orFail(new Error('WrongUser'))
    .then((user) => res.send(user))
    .catch((e) => {
      if (e.message === 'WrongUser') {
        e.name = 'WrongUserID';
      }
      next(e);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    err.name = 'NoAuthData';
    return next(err);
  }

  if (typeof password !== 'string' || password.length < 6) {
    err.name = 'CastError';
    return next(err);
  }

  return User.findOne({ email }).select('+password')
    .orFail(() => {
      err.name = 'ValidationError';
      return err;
    })
    .then((user) => {
      if (!user) {
        err.name = 'UserNotFound';
        return next(err);
      }
      return bcrypt.compare(password, user.password, ((error, isValid) => {
        if (error) {
          err.name = 'CryptError';
          return next(err);
        }
        if (isValid) {
          const token = jwt.sign({
            _id: user._id,
          }, JWT_SECRET, { expiresIn: '7d' });
          return res.status(200).send({ name: user.name, email: user.email, token });
        }
        if (!isValid) {
          err.name = 'WrongPassword';
          return next(err);
        }
        return next(err);
      }));
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  if (!email || !password || !name) {
    err.name = 'NoAuthData';
    return next(err);
  }

  if (typeof password !== 'string') {
    err.name = 'CastError';
    return next(err);
  }

  return User.findOne({ email })
    .then((user) => {
      if (user) {
        err.name = 'UserExist';
        return next(err);
      }
      return bcrypt.hash(password, 13)
        .then((hash) => {
          User.create({
            name, email, password: hash,
          })
            .then((hashUser) => res.status(200).send({
              name: hashUser.name, email: hashUser.email,
            }));
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getUserMe,
  patchUserMe,
  login,
  createUser,
};
