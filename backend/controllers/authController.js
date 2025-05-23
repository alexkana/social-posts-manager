const AuthService = require('../services/authService');
const variables = require('../config/variables');
// Register a new user
exports.register = async (req, res, next) => {
  try {
    const token = await AuthService.register(req.body);
    
    // Set token as HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: variables.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    });
    
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Login a user
exports.login = async (req, res, next) => {
  try {
    const token = await AuthService.login(req.body);
    
    // Set token as HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: variables.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
    });
    
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// Get current user
exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await AuthService.getCurrentUser(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Logout a user
exports.logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: variables.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(0)
  });
  
  res.json({ message: 'Logged out successfully' });
}; 