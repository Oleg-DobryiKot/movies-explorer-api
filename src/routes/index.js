const router = require('express').Router();
const { celebrate } = require('celebrate');

const auth = require('../middlewares/auth');
const {
  createUser,
  login,
} = require('../controllers/users');
const {
  createUserValidation,
  loginUserValidation,
} = require('../schemas/auth-req');

const err = new Error();

const userRouter = require('./users');
const movieRouter = require('./movies');

router.post('/signup', celebrate({ body: createUserValidation }), createUser);
router.post('/signin', celebrate({ body: loginUserValidation }), login);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use('*', (req, res, next) => {
  err.name = 'ResourseNotFound';
  next(err);
});

module.exports = router;
