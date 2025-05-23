const LikedPost = require('../models/LikedPosts');

class LikeRepository {
  constructor(likedPostModel = LikedPost) {
    this.likedPostModel = likedPostModel;
  }

  async findByUserId(userId) {
    return this.likedPostModel.findLikedByUser(userId);
  }

  async findByPostId(postId) {
    return this.likedPostModel.find({ post: postId });
  }

  async create(likeData) {
    return this.likedPostModel.create(likeData);
  }

  async delete(id) {
    return this.likedPostModel.findByIdAndDelete(id);
  }
  
  async findOne(query) {
    return this.likedPostModel.findOne(query);
  }
  
  async deleteOne(query) {
    return this.likedPostModel.deleteOne(query);
  }
  
  async deleteMany(query) {
    return this.likedPostModel.deleteMany(query);
  }
}

module.exports = LikeRepository;