import request from "supertest";
import app from "../../../server";
import {
  createTestUser,
  generateTestToken,
  createTestUserInDB,
  createTestPostInDB,
} from "../../../shared/utils/helpers";
import { describe, it, beforeEach, expect } from "@jest/globals";

import "./setup";

describe("Posts API", () => {
  let testUser: ReturnType<typeof createTestUser>;
  let authToken: string;

  beforeEach(async () => {
    testUser = await createTestUserInDB();
    authToken = generateTestToken(testUser);
  });

  describe("GET /api/posts", () => {
    it("should get all posts for authenticated user", async () => {
      const response = await request(app)
        .get("/api/posts")
        .set("Cookie", `token=${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });

    it("should return 401 for unauthenticated request", async () => {
      await request(app).get("/api/posts").expect(401);
    });
  });

  describe("GET /api/posts/all", () => {
    it("should get all public posts", async () => {
      const response = await request(app)
        .get("/api/posts/all")
        .set("Cookie", `token=${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("GET /api/posts/:id", () => {
    it("should get a specific post by ID", async () => {
      const testPost = await createTestPostInDB(testUser.id);

      const response = await request(app)
        .get(`/api/posts/${testPost._id}`)
        .set("Cookie", `token=${authToken}`)
        .expect(200);
    });
  });
});
