const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');
const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/logout').get(userController.logout);

userRouter.route('/profile/update-password')
    .get(userController.renderUpdatePassword)
    .post(userController.updatePassword);

userRouter.route('/profile')
    .get(userController.renderMyProfile)
    .post(userController.updateProfile);

userRouter.route('/login')
    .get(userController.renderLoginPage)
    .post(userController.login);

userRouter.route('/register')
    .get(userController.renderRegisterPage)
    .post(userController.register);

module.exports = userRouter;