const router = require('express').Router();
const { celebrate } = require('celebrate');
const {
  getUserMe,
  patchUserMe,
} = require('../controllers/users');
const {
  // getUserMeValidation,
  patchUserMeValidation,
} = require('../schemas/user-req');

// router.get('/me',
//   celebrate({
//     headers: getUserMeValidation
//   },
//     options: { allowUnknown: true
// }), getUserMe);

router.get('/me', getUserMe);

router.patch('/me', celebrate({ body: patchUserMeValidation }), patchUserMe);

module.exports = router;
