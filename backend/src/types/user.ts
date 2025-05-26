import { Document } from "mongoose";

// User Interface
export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Basic CRUD operations
export interface IUserCrud {
  create(userData: Partial<IUser>): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  update(id: string, updateData: Partial<IUser>): Promise<IUser | null>;
  delete(id: string): Promise<void>;
}

// Authentication-related operations
export interface IUserAuth {
  findByEmail(email: string): Promise<IUser | null>;
  validateCredentials(email: string, password: string): Promise<IUser | null>;
}

// Search and query operations
export interface IUserQuery {
  findByName(name: string): Promise<IUser[]>;
  search(query: string): Promise<IUser[]>;
  count(filter?: any): Promise<number>;
}

// Main repository interface combining all domains
export interface IUserRepository extends IUserCrud, IUserAuth, IUserQuery {}
