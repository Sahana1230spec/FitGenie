// server.js - FINAL WORKING VERSION
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes - FIXED TO USE YOUR EXISTING FILE
const generateRoutes = require('./routes/generate');

// Use routes
app.use('/api', generateRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'FitGenie Backend is healthy!',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log('🚀 FitGenie Backend Server running on port', PORT);
  console.log('📍 Health check:', `http://localhost:${PORT}/api/health`);
  console.log('🎨 Generate endpoint:', `http://localhost:${PORT}/api/generate-outfit`);
  console.log('✅ Server is ready to generate images!');
});