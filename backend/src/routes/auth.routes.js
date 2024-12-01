const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validate.middleware');
const { userValidation } = require('../config/validation');

// Auth routes
router.post('/register', validate(userValidation.register), authController.register);
router.post('/login', validate(userValidation.login), authController.login);
router.post('/forgot-password', validate(userValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(userValidation.resetPassword), authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);

// Protected routes
router.use(authController.protect);
router.post('/logout', authController.logout);
router.post('/change-password', validate(userValidation.changePassword), authController.changePassword);

module.exports = router;