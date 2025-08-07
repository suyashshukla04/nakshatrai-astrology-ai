// // models/TopicHistory.js - Separate model file
// const mongoose = require('mongoose');

// const topicHistorySchema = new mongoose.Schema({
//     topic: { type: String, required: true },
//     category: { type: String, required: true },
//     siteId: { type: String, required: true },
//     seeds: { type: Object, required: true },
//     createdAt: { type: Date, default: Date.now }
// }, {
//     timestamps: true
// });

// // Index for efficient querying
// topicHistorySchema.index({ siteId: 1, category: 1, createdAt: -1 });

// module.exports = mongoose.model('TopicHistory', topicHistorySchema);

const mongoose = require('mongoose');

const topicHistorySchema = new mongoose.Schema({
    topic: { type: String, required: true },
    category: { type: String, required: true },
    siteId: { type: String, required: true },
    seeds: { type: Object, required: true },
    language: { type: String, default: 'hindi' }, // ADDED: Track language with Hindi default
    isAstrology: { type: Boolean, default: true }, // ADDED: Track if astrology content
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true
});

// Index for efficient querying
topicHistorySchema.index({ siteId: 1, category: 1, createdAt: -1 });
topicHistorySchema.index({ language: 1, category: 1 }); // ADDED: Language-based indexing

module.exports = mongoose.model('TopicHistory', topicHistorySchema);

