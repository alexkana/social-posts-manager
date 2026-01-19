import type { Model } from "mongoose";

import type { ILikedPost, ILikeRepository } from "../types/like";
import LikedPost from "../models/LikedPosts";

class LikeRepository implements ILikeRepository {
  private likedPostModel: Model<ILikedPost>;

  constructor(likedPostModel: Model<ILikedPost> = LikedPost) {
    this.likedPostModel = likedPostModel;
  }

  async findByUserId(userId: string): Promise<ILikedPost[]> {
    return this.likedPostModel
      .find({ user: userId })
      .populate({
        path: "post",
        populate: {
          path: "user",
          select: ["name", "email"],
        },
      })
      .populate("user", "name email")
      .sort({ createdAt: -1 });
  }

  async findByPostId(postId: string): Promise<ILikedPost[]> {
    return this.likedPostModel
      .find({ post: postId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });
  }

  async create(likeData: Partial<ILikedPost>): Promise<ILikedPost> {
    const like = await this.likedPostModel.create(likeData);
    return this.likedPostModel
      .findById(like._id)
      .populate("user", "name email")
      .populate({
        path: "post",
        populate: {
          path: "user",
          select: ["name", "email"],
        },
      }) as Promise<ILikedPost>;
  }

  async delete(id: string): Promise<void> {
    await this.likedPostModel.findByIdAndDelete(id);
  }

  async findOne(query: any): Promise<ILikedPost | null> {
    return this.likedPostModel.findOne(query);
  }

  async deleteOne(query: any): Promise<void> {
    await this.likedPostModel.deleteOne(query);
  }

  async deleteMany(query: any): Promise<{ deletedCount?: number }> {
    return this.likedPostModel.deleteMany(query);
  }

  async count(filter: any = {}): Promise<number> {
    return this.likedPostModel.countDocuments(filter);
  }

  async bulkCreate(
    likeDataArray: Partial<ILikedPost>[],
  ): Promise<ILikedPost[]> {
    const result = await this.likedPostModel.insertMany(likeDataArray);
    return result as ILikedPost[];
  }

  async isPostLiked(userId: string, postId: string): Promise<boolean> {
    const like = await this.likedPostModel.findOne({
      user: userId,
      post: postId,
    });
    return !!like;
  }

  async getLikeCount(postId: string): Promise<number> {
    return this.likedPostModel.countDocuments({ post: postId });
  }

  async toggleLike(
    userId: string,
    postId: string,
  ): Promise<{ liked: boolean; count: number }> {
    const existingLike = await this.likedPostModel.findOne({
      user: userId,
      post: postId,
    });

    if (existingLike) {
      await this.likedPostModel.deleteOne({ user: userId, post: postId });
      const count = await this.getLikeCount(postId);
      return { liked: false, count };
    } else {
      await this.likedPostModel.create({ user: userId, post: postId });
      const count = await this.getLikeCount(postId);
      return { liked: true, count };
    }
  }
}

export default LikeRepository;
