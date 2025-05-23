const User = require("../models/User");

class UserRepository {
  constructor(userModel = User) {
    this.userModel = userModel;
  }

  async findByEmail(email) {
    return this.userModel.findOne({ email });
  }

  async findById(id) {
    return this.userModel.findById(id);
  }

  async create(userData) {
    return this.userModel.create(userData);
  }

  async update(id, userData) {
    return this.userModel.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id) {
    return this.userModel.findByIdAndDelete(id);
  }
}

module.exports = UserRepository;
