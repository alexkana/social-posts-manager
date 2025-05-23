const request = require('supertest');
const app = require('../server');
const { createTestUser, createTestPosts } = require('./helpers');

describe('Posts API', () => {
  let user;
  let token;
  let posts;

  beforeEach(async () => {
    // Create test user and get auth token
    const testUser = await createTestUser();
    user = testUser.user;
    token = testUser.token;

    // Create test posts
    posts = await createTestPosts(user._id);
  });

  describe('GET /api/posts', () => {
    it('should get all posts for authenticated user', async () => {
      const response = await request(app)
        .get('/api/posts')
        .set('Cookie', [`token=${token}`]);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(posts.length);
      expect(response.body[0]).toHaveProperty('title');
      expect(response.body[0]).toHaveProperty('content');
    });

    it('should return 401 for unauthenticated request', async () => {
      const response = await request(app)
        .get('/api/posts');

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/posts/all', () => {
    it('should get all public posts', async () => {
      const response = await request(app)
        .get('/api/posts/all')
        .set('Cookie', [`token=${token}`]);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(posts.length);
    });
  });


}); 