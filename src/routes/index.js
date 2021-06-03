const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  createUser,
  login,
} = require('../controllers/users');

const err = new Error();

const userRouter = require('./users');
const movieRouter = require('./movies');

router.post('/signup', createUser);
router.post('/signin', login);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use('*', (req, res, next) => {
  err.name = 'ResourseNotFound';
  next(err);
});

module.exports = router;
