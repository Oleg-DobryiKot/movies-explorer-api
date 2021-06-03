const router = require('express').Router();
const {
  getUserMe,
  patchUserMe,
} = require('../controllers/users');

router.get('/me', getUserMe);
router.patch('/me', patchUserMe);

module.exports = router;
