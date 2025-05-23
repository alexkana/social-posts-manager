const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const { registerValidation, loginValidation } = require('../validators/authValidators');
const { validate } = require('../middleware/validation');
const { loginLimiter, registerLimiter } = require('../middleware/rateLimiter');

// @route   POST /api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', registerLimiter, registerValidation, validate, authController.register);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginLimiter, loginValidation, validate, authController.login);

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, authController.getCurrentUser);

// @route   POST /api/auth/logout
// @desc    Logout user by clearing the cookie
// @access  Public
router.post('/logout', authController.logout);

module.exports = router; 