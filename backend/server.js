//C:\Users\suyas\mobile-tech-automation-v2\backend\server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const testRoutes = require('./routes/testRoute');
const articleRoutes = require('./routes/articleRoutes');
const contactRoutes = require('./routes/contactRoutes');
const demoRoutes = require("./routes/demoRoutes")
app.use('/api', contactRoutes);
app.use('/api', testRoutes);
app.use('/api', articleRoutes);
app.use('/api',demoRoutes)
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techai')
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Initialize scheduler
const scheduler = require('./config/scheduler');
scheduler.initializeAllSites();

const PORT = process.env.BACKEND_PORT || 5000;
app.listen(PORT, () => {
    console.log(`��� Backend server running on port ${PORT}`);
    console.log(`��� API endpoints: http://localhost:${PORT}/api`);
});

module.exports = app;

// Add Spaces test routes
const spacesTestRoutes = require('./routes/spacesTestRoutes');
app.use('/api', spacesTestRoutes);
