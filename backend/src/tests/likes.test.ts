import request from "supertest";
import app from "../server";
import {
  createTestUser,
  generateTestToken,
  createTestPost,
  createTestUserInDB,
  createTestPostInDB,
} from "./helpers";

require("./setup");

describe("Likes API", () => {
  let testUser: ReturnType<typeof createTestUser>;
  let authToken: string;

  beforeEach(async () => {
    testUser = await createTestUserInDB();
    authToken = generateTestToken(testUser);
  });

  describe("PUT /api/likes/:id", () => {
    it("should like a post", async () => {
      const testPost = await createTestPostInDB(testUser.id);

      const response = await request(app)
        .put(`/api/likes/${testPost._id}`)
        .set("Cookie", `token=${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should return 404 for non-existent post", async () => {
      await request(app)
        .put("/api/likes/507f1f77bcf86cd799439011")
        .set("Cookie", `token=${authToken}`)
        .expect(404);
    });
  });

  describe("GET /api/likes", () => {
    it("should get all liked posts for user", async () => {
      const testPost = await createTestPostInDB(testUser.id);

      // First like a post
      await request(app)
        .put(`/api/likes/${testPost._id}`)
        .set("Cookie", `token=${authToken}`);

      const response = await request(app)
        .get("/api/likes")
        .set("Cookie", `token=${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("DELETE /api/likes/:id", () => {
    it("should unlike a post", async () => {
      const testPost = await createTestPostInDB(testUser.id);

      // First like a post
      await request(app)
        .put(`/api/likes/${testPost._id}`)
        .set("Cookie", `token=${authToken}`);

      const response = await request(app)
        .delete(`/api/likes/${testPost._id}`)
        .set("Cookie", `token=${authToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);

      // Verify the post is no longer liked
      const likedPosts = await request(app)
        .get("/api/likes")
        .set("Cookie", `token=${authToken}`)
        .expect(200);

      expect(likedPosts.body.length).toBe(0);
    });
  });
});
