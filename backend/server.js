const express = require("express");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const config = require("./config/config");
const setupSignalHandlers = require("./utils/signalHandler");
const notFound = require("./middleware/notFound");
const { errorHandler } = require("./utils/errorHandler");
const variables = require("./config/variables");
const app = express();
const PORT = variables.PORT || 3001;

// Middleware
app.use((req, res, next) => {
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
config.connectToDB();

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/likes", require("./routes/likes"));

// Home route
app.get("/", (req, res) => {
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

module.exports = app;
