// models/TopicHistory.js - Separate model file
const mongoose = require('mongoose');

const topicHistorySchema = new mongoose.Schema({
    topic: { type: String, required: true },
    category: { type: String, required: true },
    siteId: { type: String, required: true },
    seeds: { type: Object, required: true },
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

// Index for efficient querying
topicHistorySchema.index({ siteId: 1, category: 1, createdAt: -1 });

module.exports = mongoose.model('TopicHistory', topicHistorySchema);
