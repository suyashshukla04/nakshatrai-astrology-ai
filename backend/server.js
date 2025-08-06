//C:\Users\suyas\astrology-ai-platform\backend\server.js

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
const demoRoutes = require('./routes/demoRoutes');
const spacesTestRoutes = require('./routes/spacesTestRoutes');

app.use('/api', contactRoutes);
app.use('/api', testRoutes);
app.use('/api', articleRoutes);
app.use('/api', demoRoutes);
app.use('/api', spacesTestRoutes);

// MongoDB connection for astrology platform
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/astroai')
    .then(() => console.log('✅ MongoDB connected - Astrology AI Platform'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Initialize scheduler for astrology automation
const scheduler = require('./config/scheduler');
scheduler.initializeAllSites();

const PORT = process.env.BACKEND_PORT || 5001;
app.listen(PORT, () => {
    console.log(`🌟 Astrology AI Platform server running on port ${PORT}`);
    console.log(`🔗 API endpoints: http://localhost:${PORT}/api`);
});

module.exports = app;
