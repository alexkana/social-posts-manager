# Social Posts Manager

A comprehensive social media management platform for creating, scheduling, and managing posts across multiple platforms.

## Project Overview

The Social Posts Manager is a full-stack application designed to help users manage their social media content. It allows users to create, view, like, and manage posts with a clean and intuitive interface.

## Features

- User authentication (register, login)
- Create, read, update, and delete posts
- Schedule posts for future publishing
- Support for multiple social media platforms
- Like/unlike posts functionality
- View and manage liked posts
- 100 sample posts from JSONPlaceholder

## Tech Stack

### Frontend
- **React** (v19) - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Query** - Data fetching & state management
- **React Router** - Routing
- **React Hook Form** - Form handling
- **Tailwind CSS** - Styling
- **Axios** - API requests

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **cookie-parser** - HTTP cookie handling

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB account (or local MongoDB)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the backend directory with the following variables:
   ```
   PORT=3001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

   The server will start on http://localhost:3001

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the frontend directory:
   ```
   VITE_API_URL=http://localhost:3001/api
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

   The application will be available at http://localhost:5173

## Database Configuration

This project uses MongoDB as its database. For the purposes of this technical assignment, you can use the MongoDB connection string provided in the `.env.example` file which will connect to a temporary database that will be available for a limited time.

## Seed Data

To populate the database with sample data:

```bash
cd backend
npm run seed
```

This will create sample users and posts for testing.

## Key Technical Decisions

### Authentication with HTTP Only Cookies
Instead of using localStorage for storing JWT tokens, this application uses HTTP-only cookies for enhanced security. This approach protects against XSS attacks since JavaScript cannot access the HTTP-only cookies directly.

### State Management with React Query
React Query is used for server state management, providing:
- Automatic caching and background refetching
- Loading and error states with minimal boilerplate
- Optimistic updates for a better user experience
- Normalized data with cache key management

### Modular, Reusable Components
The frontend is built using a component-based architecture with reusable UI elements. This promotes:
- Consistent styling across the application
- Reduced code duplication
- Easier maintenance and scalability

### Custom Hooks
Reusable custom hooks encapsulate complex logic and state management:
- `usePosts` - Fetches and manages posts data
- `useLikes` - Handles post liking functionality
- `useAuth` - Manages authentication state

### Backend MVC Architecture
The backend follows the Model-View-Controller (MVC) pattern:
- **Models**: Define database schemas and business logic
- **Controllers**: Handle request processing and response formatting
- **Routes**: Define API endpoints and connect them to controllers

### Type Safety with TypeScript
TypeScript provides type safety throughout the application, reducing runtime errors and improving developer experience through better tooling and autocompletion.

## License

This project is part of a technical assignment and is not licensed for public distribution.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user profile

### Posts
- `GET /api/posts/all` - Get all public posts
- `GET /api/posts` - Get all posts for the authenticated user
- `POST /api/posts` - Create a new post
- `GET /api/posts/:id` - Get a specific post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

### Likes
- `PUT /api/likes/:id` - Like a post
- `DELETE /api/likes/:id` - Unlike a post
- `GET /api/likes` - Get all liked posts for the current user
- `DELETE /api/likes` - Clear all liked posts for the current user 