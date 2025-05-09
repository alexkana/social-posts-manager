const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 👇 if you hit “Response to preflight request doesn’t pass…”
      // handle pre‑flight for every route

app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
config.connectToDB();

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/likes', require('./routes/likes'));

// Home route
app.get('/', (req, res) => {
  res.send('Social Posts Manager API is running');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 