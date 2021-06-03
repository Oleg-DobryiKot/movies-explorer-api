const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'ewev434iwq98hcfer$%^!#$!eset3$%!2#~@#GSGFQEFnfgnasdf23@$534n3ox48f3oh4cp' } = process.env;
const err = new Error();

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    err.name = 'NoToken';
    next(err);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    e.name = 'NoAuth';
    next(e);
  }
  req.user = payload;
  next();
};

module.exports = auth;
