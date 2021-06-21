const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'ewev434iwq98hcferset32GSGFQEFnf5' } = process.env;
const err = new Error();

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    err.name = 'NoToken';
    return next(err);
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
  return next();
};

module.exports = auth;
