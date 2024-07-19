const router = require('express').Router();
const userController = new (require('../Controllers/user.controller'));

// User signup
router.route('/user/sign_up').get(userController.signUp)

module.exports = router;