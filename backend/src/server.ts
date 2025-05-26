import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectToDB } from './config/config';
import setupSignalHandlers from './utils/signalHandler';
import notFound from './middleware/notFound';
import { errorHandler } from './utils/errorHandler';
import { config } from './config/variables';
import authRoutes from './routes/auth';
import postRoutes from './routes/posts';
import likeRoutes from './routes/likes';


const app = express();
const PORT: number = parseInt(config.PORT as string) || 3001;

// Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// 👇 if you hit "Response to preflight request doesn't pass..."
// handle pre‑flight for every route

app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
connectToDB();

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);

// Home route
app.get("/", (req: Request, res: Response) => {
  res.send("Social Posts Manager API is running");
});

// 404 handler - must be after all routes
app.use(notFound);

// Error handler - must be after 404 handler
app.use(errorHandler);

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
  // Setup signal handlers
  setupSignalHandlers(server);
}

export default app;
