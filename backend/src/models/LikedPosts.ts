import mongoose, { Schema, Model } from 'mongoose';
import { ILikedPost } from '../types/like';

// Static methods interface
interface ILikedPostStatics {
  hasLiked(userId: string, postId: string): Promise<boolean>;
  findLikedByUser(userId: string): Promise<ILikedPost[]>;
  findLikersOfPost(postId: string): Promise<ILikedPost[]>;
}

// Model interface combining document and statics
interface LikedPostModel extends Model<ILikedPost>, ILikedPostStatics {}

const likedPostsSchema = new Schema<ILikedPost, LikedPostModel>({
  // Reference to the user who liked the post
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Reference to the post that was liked
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  // Timestamp for when the like was created
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: false });

// Compound index for user and post to ensure a user can only like a post once
// and to make queries by user or post more efficient
likedPostsSchema.index({ user: 1, post: 1 }, { unique: true });

// Method to check if a user has liked a post
likedPostsSchema.statics.hasLiked = async function(userId: string, postId: string): Promise<boolean> {
  return await this.findOne({ user: userId, post: postId }).exec() !== null;
};

// Method to get all posts liked by a user
likedPostsSchema.statics.findLikedByUser = function(userId: string): Promise<ILikedPost[]> {
  return this.find({ user: userId }).populate('post').sort({ createdAt: -1 }).exec();
};

// Method to get all users who liked a post
likedPostsSchema.statics.findLikersOfPost = function(postId: string): Promise<ILikedPost[]> {
  return this.find({ post: postId }).populate('user').sort({ createdAt: -1 }).exec();
};

export default mongoose.model<ILikedPost, LikedPostModel>('LikedPosts', likedPostsSchema);
