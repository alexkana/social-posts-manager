const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post');
const variables = require('../config/variables');

// Create a test user and return auth token
const createTestUser = async () => {
  const user = await User.create({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  });

  const token = jwt.sign(
    { user: { id: user._id } },
    variables.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { user, token };
};

// Create test posts
const createTestPosts = async (userId, count = 3) => {
  const posts = [];
  for (let i = 0; i < count; i++) {
    const post = await Post.create({
      title: `Test Post ${i + 1}`,
      content: `Test content ${i + 1}`,
      user: userId
    });
    posts.push(post);
  }
  return posts;
};

module.exports = {
  createTestUser,
  createTestPosts
}; 