const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    niche: { type: String, required: true },
    siteId: { type: String, required: true },
    featuredImage: { type: String },
    originalImageUrl: { type: String },
    imageKey: { type: String },
    imageUploaded: { type: Boolean, default: false },
    author: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
    seoTitle: { type: String },
    metaDescription: { type: String },
    tags: [String],
    readingTime: { type: Number },
    wordCount: { type: Number },
    
    // NEW: Astrology-specific fields
    language: { type: String, enum: ['english', 'hindi'], default: 'english' },
    zodiacSign: { type: String },
    planetaryInfluence: { type: String },
    luckyNumbers: [Number],
    luckyColors: [String],
    auspiciousTime: { type: String },
    compatibilityScore: { type: Number, min: 0, max: 100 },
    recommendedGemstone: {
        english: String,
        hindi: String,
        planet: String
    },
    
    // AI and content metadata
    aiModel: { type: String, default: 'gemini-2.5-flash' },
    contentStyle: { type: String, default: 'practical-astrology' },
    qualityScore: { type: Number },
    mythologyReferences: [String]
}, {
    timestamps: true,
    collection: 'astrology_articles'
});

// Indexes for astrology queries
articleSchema.index({ siteId: 1, category: 1, publishedAt: -1 });
articleSchema.index({ language: 1, zodiacSign: 1 });
articleSchema.index({ slug: 1 }, { unique: true });

module.exports = mongoose.model('AstrologyArticle', articleSchema);
