const request = require('supertest');
const app = require('../server');
const { createTestUser, createTestPosts } = require('./helpers');

describe('Likes API', () => {
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

  describe('PUT /api/likes/:id', () => {
    it('should like a post', async () => {
      const postId = posts[0]._id;
      const response = await request(app)
        .put(`/api/likes/${postId}`)
        .set('Cookie', [`token=${token}`]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);
    });

    it('should return 404 for non-existent post', async () => {
      const response = await request(app)
        .put('/api/likes/507f1f77bcf86cd799439011')
        .set('Cookie', [`token=${token}`]);

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/likes', () => {
    it('should get all liked posts for user', async () => {
      // First like a post
      const postId = posts[0]._id;
      await request(app)
        .put(`/api/likes/${postId}`)
        .set('Cookie', [`token=${token}`]);

      // Then get liked posts
      const response = await request(app)
        .get('/api/likes')
        .set('Cookie', [`token=${token}`]);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0]._id.toString()).toBe(postId.toString());
    });
  });

  describe('DELETE /api/likes/:id', () => {
    it('should unlike a post', async () => {
      // First like a post
      const postId = posts[0]._id;
      await request(app)
        .put(`/api/likes/${postId}`)
        .set('Cookie', [`token=${token}`]);

      // Then unlike it
      const response = await request(app)
        .delete(`/api/likes/${postId}`)
        .set('Cookie', [`token=${token}`]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('success', true);

      // Verify post is no longer in liked posts
      const likedPosts = await request(app)
        .get('/api/likes')
        .set('Cookie', [`token=${token}`]);

      expect(likedPosts.body.length).toBe(0);
    });
  });
}); 