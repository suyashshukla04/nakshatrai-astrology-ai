const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    niche: { type: String, required: true },
    siteId: { type: String, required: true },
    featuredImage: { type: String }, // CDN URL from Spaces
    originalImageUrl: { type: String }, // Original DALL-E URL
    imageKey: { type: String }, // Spaces key for management
    imageUploaded: { type: Boolean, default: false },
    author: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now },
    seoTitle: { type: String },
    metaDescription: { type: String },
    tags: [String],
    readingTime: { type: Number },
    wordCount: { type: Number },
    status: { type: String, enum: ['draft', 'published'], default: 'published' }
}, {
    timestamps: true
});

articleSchema.index({ siteId: 1, category: 1, publishedAt: -1 });
articleSchema.index({ slug: 1, siteId: 1 }, { unique: true });

module.exports = mongoose.model('Article', articleSchema);
