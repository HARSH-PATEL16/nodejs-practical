const router = require('express').Router();
const userController = new (require('../Controllers/user.controller'));

// User signup
router.route('/user/sign_up').post(userController.signUp)