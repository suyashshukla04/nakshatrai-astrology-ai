// routes/testRoutes.js - API endpoints for testing content generation
const express = require('express');
const router = express.Router();
const ContentGenerator = require('../generators/ContentGenerator');
const siteConfig = require("../config/siteConfig");
const Article = require('../models/Article.js');
// Test content generation for specific site and category
router.post('/test/generate/:siteId/:category', async (req, res) => {
    try {
        const { siteId, category } = req.params;
        
        // Validate site exists
        const config = siteConfig.getConfig(siteId);
        if (!config) {
            return res.status(404).json({
                error: 'Site not found',
                availableSites: siteConfig.getAllConfigs().map(s => s.id)
            });
        }

        // Validate category
        if (!config.categories.includes(category)) {
            return res.status(400).json({
                error: 'Invalid category',
                availableCategories: config.categories
            });
        }

        console.log(`Testing content generation for ${siteId} - ${category}`);
        
        // Generate content
        const contentGenerator = new ContentGenerator(siteId);
        const article = await contentGenerator.generateCompleteArticle(category);

        // Return detailed response for testing
        res.json({
            success: true,
            siteId,
            category,
            config: {
                domain: config.domain,
                niche: config.niche,
                author: config.author
            },
            article: {
                id: article._id,
                title: article.title,
                slug: article.slug,
                wordCount: article.wordCount,
                readingTime: article.readingTime,
                tags: article.tags,
                seoTitle: article.seoTitle,
                metaDescription: article.metaDescription,
                featuredImage: article.featuredImage,
                contentPreview: article.content.substring(0, 500) + '...',
                fullContent: article.content,
                publishedAt: article.publishedAt
            },
            contentAnalysis: {
                hasProperStructure: article.content.includes('##'),
                hasPunctuation: !article.content.includes('It is'),
                wordCount: article.wordCount,
                paragraphCount: article.content.split('\n\n').length,
                hasAttribution: article.content.includes('Content Attribution'),
                estimatedReadability: article.wordCount > 1200 ? 'Good' : 'Too Short'
            }
        });

    } catch (error) {
        console.error('Content generation test error:', error);
        res.status(500).json({
            error: 'Content generation failed',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Test topic generation only
router.post('/test/topic/:siteId/:category', async (req, res) => {
    try {
        const { siteId, category } = req.params;
        
        const config = siteConfig.getConfig(siteId);
        if (!config) {
            return res.status(404).json({ error: 'Site not found' });
        }

        const contentGenerator = new ContentGenerator(siteId);
        const topic = await contentGenerator.topicGenerator.generateTopic(category);

        res.json({
            success: true,
            siteId,
            category,
            topic,
            config: {
                niche: config.niche,
                dynamicSeeds: contentGenerator.topicGenerator.generateDynamicSeeds()
            }
        });

    } catch (error) {
        res.status(500).json({
            error: 'Topic generation failed',
            message: error.message
        });
    }
});

// Get recent articles for a site
router.get('/test/articles/:siteId', async (req, res) => {
    try {
        const { siteId } = req.params;
        const limit = parseInt(req.query.limit) || 10;
        
        
        const articles = await Article.find({ siteId })
            .sort({ publishedAt: -1 })
            .limit(limit)
            .select('title category wordCount publishedAt tags');

        res.json({
            success: true,
            siteId,
            totalArticles: articles.length,
            articles: articles.map(article => ({
                id: article._id,
                title: article.title,
                category: article.category,
                wordCount: article.wordCount,
                publishedAt: article.publishedAt,
                tags: article.tags
            }))
        });

    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch articles',
            message: error.message
        });
    }
});

// Test system status
router.get('/test/status', async (req, res) => {
    try {
        const scheduler = require('../config/scheduler.js');
        const status = scheduler.getStatus();
        
        res.json({
            success: true,
            systemStatus: 'operational',
            ...status,
            timestamp: new Date()
        });

    } catch (error) {
        res.status(500).json({
            error: 'Failed to get system status',
            message: error.message
        });
    }
});

// Bulk test - generate content for all categories of a site
router.post('/test/bulk/:siteId', async (req, res) => {
    try {
        const { siteId } = req.params;
        
        const config = siteConfig.getConfig(siteId);
        if (!config) {
            return res.status(404).json({ error: 'Site not found' });
        }

        const contentGenerator = new ContentGenerator(siteId);
        const results = [];

        for (const category of config.categories) {
            try {
                console.log(`Generating ${category} content for bulk test...`);
                const article = await contentGenerator.generateCompleteArticle(category);
                
                results.push({
                    category,
                    success: true,
                    articleId: article._id,
                    title: article.title,
                    wordCount: article.wordCount
                });
            } catch (error) {
                results.push({
                    category,
                    success: false,
                    error: error.message
                });
            }
        }

        res.json({
            success: true,
            siteId,
            totalCategories: config.categories.length,
            results
        });

    } catch (error) {
        res.status(500).json({
            error: 'Bulk test failed',
            message: error.message
        });
    }
});

module.exports = router;
