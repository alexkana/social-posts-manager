import mongoose from "mongoose";
import axios from "axios";

import User from "../models/User";
import Post from "../models/Post";
import { connectToDB } from "../config/config";

connectToDB();

// Function to create an admin user if not exists
/**const createAdminUser = async () => {
  try {
    let admin = await User.findOne({ email: 'admin@example.com' });
    
    if (!admin) {
      admin = new User({
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123'
      });
      
      await admin.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
    
    return admin;
  } catch (err) {
    console.error('Error creating admin user:', err);
    process.exit(1);
  }
}; */

// Function to fetch posts from JSONPlaceholder
const fetchPosts = async (): Promise<any[]> => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts",
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching posts from JSONPlaceholder:", err);
    process.exit(1);
  }
};

// Function to seed the database with posts
const seedPosts = async (): Promise<void> => {
  try {
    // Check if we already have posts in the database
    const existingPosts = await Post.countDocuments();

    if (existingPosts >= 100) {
      console.log(
        `Database already has ${existingPosts} posts, skipping seeding.`,
      );
      process.exit(0);
    }

    // Fetch posts from JSONPlaceholder
    const jsonPlaceholderPosts = await fetchPosts();

    // Map JSON Placeholder posts to our Post schema
    const postsToSeed = jsonPlaceholderPosts
      .slice(0, 100)
      .map((post: any, index: number) => {
        return {
          user: null,
          title: post.title,
          content: post.body,
          createdAt: new Date(Date.now() - index * 60 * 60 * 1000), // Stagger creation dates
        };
      });

    // Delete any existing posts
    await Post.deleteMany({ user: null });

    // Insert the posts
    await Post.insertMany(postsToSeed);

    console.log(
      `Successfully seeded ${postsToSeed.length} posts to the database`,
    );
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

// Run the seed function
seedPosts();
