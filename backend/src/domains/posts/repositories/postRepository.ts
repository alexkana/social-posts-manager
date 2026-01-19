import mongoose from "mongoose";

import type { IPost, IPostRepository } from "../types/post";
import Post from "../models/Post";

export default class PostRepository implements IPostRepository {
  private postModel: mongoose.Model<IPost>;

  constructor(postModel: mongoose.Model<IPost> = Post) {
    this.postModel = postModel;
  }

  async findById(id: string): Promise<IPost | null> {
    return this.postModel.findById(id).populate("user", ["name", "email"]);
  }

  async findByUserId(userId: string): Promise<IPost[]> {
    return this.postModel
      .find({ user: userId })
      .populate("user", ["name", "email"]);
  }

  async findAll(): Promise<IPost[]> {
    return this.postModel
      .find()
      .sort({ createdAt: -1 })
      .populate("user", ["name", "email"]);
  }

  async create(postData: Partial<IPost>): Promise<IPost> {
    const post = await this.postModel.create(postData);
    return this.postModel
      .findById(post._id)
      .populate("user", ["name", "email"]) as Promise<IPost>;
  }

  async update(id: string, postData: Partial<IPost>): Promise<IPost | null> {
    return this.postModel
      .findByIdAndUpdate(id, postData, { new: true })
      .populate("user", ["name", "email"]);
  }

  async delete(id: string): Promise<void> {
    await this.postModel.findByIdAndDelete(id);
  }

  async count(filter: any = {}): Promise<number> {
    return this.postModel.countDocuments(filter);
  }

  async findByTags(tags: string[]): Promise<IPost[]> {
    return this.postModel
      .find({ tags: { $in: tags } })
      .populate("user", ["name", "email"]);
  }

  async search(query: string): Promise<IPost[]> {
    return this.postModel
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { content: { $regex: query, $options: "i" } },
        ],
      })
      .populate("user", ["name", "email"]);
  }
}
