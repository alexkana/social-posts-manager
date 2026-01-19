import mongoose from "mongoose";

import type { IUser, IUserRepository } from "../types/user";
import User from "../models/User";

export default class UserRepository implements IUserRepository {
  private userModel: mongoose.Model<IUser>;

  constructor(userModel: mongoose.Model<IUser> = User) {
    this.userModel = userModel;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.userModel.findOne({ email: email });
  }

  async findById(id: string): Promise<IUser | null> {
    return this.userModel.findById(id);
  }

  async create(userData: Partial<IUser>): Promise<IUser> {
    return this.userModel.create(userData);
  }

  async update(id: string, userData: Partial<IUser>): Promise<IUser | null> {
    return this.userModel.findByIdAndUpdate(id, userData, { new: true });
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id);
  }

  async findByName(name: string): Promise<IUser[]> {
    return this.userModel.find({ name: new RegExp(name, "i") });
  }

  async search(query: string): Promise<IUser[]> {
    return this.userModel.find({
      $or: [
        { name: new RegExp(query, "i") },
        { email: new RegExp(query, "i") },
      ],
    });
  }

  async count(filter: any = {}): Promise<number> {
    return this.userModel.countDocuments(filter);
  }
}
