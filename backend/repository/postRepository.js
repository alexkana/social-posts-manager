const Post = require("../models/Post");

class PostRepository {
  constructor(postModel = Post) {
    this.postModel = postModel;
  }

  async findById(id) {
    return this.postModel.findById(id).populate('user', ['name', 'email']);
  }

  async findByUserId(userId) {
    return this.postModel.find({ user: userId });
  }

  async findAll() {
    return this.postModel.find()
      .sort({ createdAt: -1 })
      .populate('user', ['name', 'email']);
  }

  async create(postData) {
    return this.postModel.create(postData);
  }

  async update(id, postData) {
    return this.postModel.findByIdAndUpdate(id, postData, { new: true });
  }

  async delete(id) {
    return this.postModel.findByIdAndDelete(id);
  }

  async count(filter = {}) {
    return this.postModel.countDocuments(filter);
  }

  async findByTags(tags) {
    return this.postModel.find({ tags: { $in: tags } });
  }

  async search(query) {
    return this.postModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } }
      ]
    });
  }
}

module.exports = PostRepository;
