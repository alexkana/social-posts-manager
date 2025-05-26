import jwt from "jsonwebtoken";
import { config } from "../config/variables";
import User from "../models/User";
import Post from "../models/Post";

interface TestUser {
  id: string;
  name: string;
  email: string;
}

export const createTestUser = (): TestUser => {
  return {
    id: "507f1f77bcf86cd799439011",
    name: "Test User",
    email: "test@example.com",
  };
};

export const generateTestToken = (user: TestUser): string => {
  return jwt.sign(
    {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
    config.JWT_SECRET,
    { expiresIn: "1h" },
  );
};

export const createTestPost = () => {
  return {
    _id: "68301d41cfa0c0a7e0c20f8a",
    title: "Test Post",
    content: "This is a test post content",
    user: "507f1f77bcf86cd799439011",
    createdAt: new Date(),
  };
};

// Helper to create actual user in database
export const createTestUserInDB = async () => {
  const testUser = createTestUser();
  const user = new User({
    _id: testUser.id,
    name: testUser.name,
    email: testUser.email,
    password: "testpassword123", // This will be hashed by the pre-save hook
  });
  await user.save();
  return testUser;
};

// Helper to create actual post in database
export const createTestPostInDB = async (userId: string) => {
  const testPost = createTestPost();
  const post = new Post({
    _id: testPost._id,
    title: testPost.title,
    content: testPost.content,
    user: userId,
    isPublic: true,
  });
  await post.save();
  return testPost;
};
