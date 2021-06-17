const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET = 'ewev434iwq98hcferset32GSGFQEFnf5' } = process.env;
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
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'ewev434iwq98hcferset32GSGFQEFnf5');
  } catch (e) {
    e.name = 'NoAuth';
    next(e);
  }
  req.user = payload;
  next();
};

module.exports = auth;
