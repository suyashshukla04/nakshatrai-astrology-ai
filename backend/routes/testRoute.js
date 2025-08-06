// routes/testRoute.js - ASTROLOGY PLATFORM TEST ENDPOINTS
const express = require('express');
const router = express.Router();
const ContentGenerator = require('../generators/ContentGenerator');
const siteConfig = require("../config/siteConfig");
const Article = require('../models/Article.js');

// Test content generation for specific site and category (enhanced for astrology)
router.post('/test/generate/:siteId/:category', async (req, res) => {
    try {
        const { siteId, category } = req.params;
        const { language } = req.query; // Optional language parameter
        
        // Validate site exists
        const config = siteConfig.getConfig(siteId);
        if (!config) {
            return res.status(404).json({
                error: 'Astrology site not found',
                availableSites: siteConfig.getAllConfigs().map(s => s.id)
            });
        }

        // Validate category (updated for astrology categories)
        const categoryIds = config.categories.map(cat => cat.id || cat);
        if (!categoryIds.includes(category)) {
            return res.status(400).json({
                error: 'Invalid astrology category',
                availableCategories: categoryIds
            });
        }

        console.log(`🌟 Testing astrology content generation for ${siteId} - ${category}`);
        
        // Generate astrology content
        const contentGenerator = new ContentGenerator(siteId);
        const article = await contentGenerator.generateCompleteArticle(category);

        // Return detailed response for astrology testing
        res.json({
            success: true,
            siteId,
            category,
            config: {
                domain: config.domain,
                niche: config.niche,
                author: config.author,
                languages: config.languages
            },
            article: {
                id: article._id,
                title: article.title,
                slug: article.slug,
                language: article.language,
                zodiacSign: article.zodiacSign,
                planetaryInfluence: article.planetaryInfluence,
                wordCount: article.wordCount,
                readingTime: article.readingTime,
                tags: article.tags,
                seoTitle: article.seoTitle,
                metaDescription: article.metaDescription,
                featuredImage: article.featuredImage,
                contentPreview: article.content.substring(0, 500) + '...',
                fullContent: article.content,
                publishedAt: article.publishedAt,
                aiModel: article.aiModel,
                contentStyle: article.contentStyle
            },
            astrologyAnalysis: {
                hasProperStructure: article.content.includes('<h2>') || article.content.includes('<h3>'),
                hasAstrologyTerms: /\b(राशि|ज्योतिष|astrology|zodiac|planet|horoscope|cosmic|vedic)\b/i.test(article.content),
                hasCulturalReferences: /\b(ramayana|mahabharata|hanuman|sanskrit|vedic|ancient)\b/i.test(article.content),
                wordCount: article.wordCount,
                isMultiLanguage: article.language === 'hindi' ? 'Hindi Content' : 'English Content',
                hasZodiacContext: !!article.zodiacSign,
                hasPlanetaryInfluence: !!article.planetaryInfluence,
                estimatedQuality: article.wordCount > 1200 ? 'Excellent' : article.wordCount > 800 ? 'Good' : 'Short'
            }
        });

    } catch (error) {
        console.error('❌ Astrology content generation test error:', error);
        res.status(500).json({
            error: 'Astrology content generation failed',
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Test astrology topic generation only
router.post('/test/topic/:siteId/:category', async (req, res) => {
    try {
        const { siteId, category } = req.params;
        const { language = 'english' } = req.query;
        
        const config = siteConfig.getConfig(siteId);
        if (!config) {
            return res.status(404).json({ error: 'Astrology site not found' });
        }

        const contentGenerator = new ContentGenerator(siteId);
        const topic = await contentGenerator.topicGenerator.generateTopic(category, language);

        res.json({
            success: true,
            siteId,
            category,
            language,
            topic,
            config: {
                niche: config.niche,
                supportedLanguages: config.languages.supported,
                dynamicSeeds: {
                    zodiacSigns: config.dynamicSeeds.zodiacSigns.length,
                    planets: config.dynamicSeeds.planetaryBodies.length,
                    festivals: config.dynamicSeeds.festivals.length,
                    gemstones: config.dynamicSeeds.gemstones.length
                }
            }
        });

    } catch (error) {
        res.status(500).json({
            error: 'Astrology topic generation failed',
            message: error.message
        });
    }
});

// Get recent astrology articles for a site
router.get('/test/articles/:siteId', async (req, res) => {
    try {
        const { siteId } = req.params;
        const limit = parseInt(req.query.limit) || 10;
        const { language, category } = req.query;
        
        const query = { siteId };
        if (language) query.language = language;
        if (category) query.category = category;
        
        const articles = await Article.find(query)
            .sort({ publishedAt: -1 })
            .limit(limit)
            .select('title category wordCount publishedAt tags language zodiacSign planetaryInfluence aiModel');

        res.json({
            success: true,
            siteId,
            totalArticles: articles.length,
            articles: articles.map(article => ({
                id: article._id,
                title: article.title,
                category: article.category,
                language: article.language,
                zodiacSign: article.zodiacSign,
                planetaryInfluence: article.planetaryInfluence,
                wordCount: article.wordCount,
                publishedAt: article.publishedAt,
                tags: article.tags,
                aiModel: article.aiModel
            }))
        });

    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch astrology articles',
            message: error.message
        });
    }
});

// Test astrology system status
router.get('/test/status', async (req, res) => {
    try {
        const scheduler = require('../config/scheduler.js');
        const status = scheduler.getStatus();
        
        res.json({
            success: true,
            systemStatus: 'operational',
            platform: 'Astrology AI Platform',
            ...status,
            timestamp: new Date()
        });

    } catch (error) {
        res.status(500).json({
            error: 'Failed to get astrology system status',
            message: error.message
        });
    }
});

// Bulk test - generate content for all astrology categories
router.post('/test/bulk/:siteId', async (req, res) => {
    try {
        const { siteId } = req.params;
        
        const config = siteConfig.getConfig(siteId);
        if (!config) {
            return res.status(404).json({ error: 'Astrology site not found' });
        }

        const contentGenerator = new ContentGenerator(siteId);
        const results = [];
        const categoryIds = config.categories.map(cat => cat.id || cat);

        for (const category of categoryIds) {
            try {
                console.log(`🌟 Generating ${category} astrology content for bulk test...`);
                const article = await contentGenerator.generateCompleteArticle(category);
                
                results.push({
                    category,
                    success: true,
                    articleId: article._id,
                    title: article.title,
                    language: article.language,
                    zodiacSign: article.zodiacSign,
                    planetaryInfluence: article.planetaryInfluence,
                    wordCount: article.wordCount,
                    aiModel: article.aiModel
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
            platform: 'Astrology AI Platform',
            totalCategories: categoryIds.length,
            results
        });

    } catch (error) {
        res.status(500).json({
            error: 'Astrology bulk test failed',
            message: error.message
        });
    }
});

// NEW: Test multi-language content generation
router.post('/test/multilang/:siteId/:category', async (req, res) => {
    try {
        const { siteId, category } = req.params;
        
        const config = siteConfig.getConfig(siteId);
        if (!config) {
            return res.status(404).json({ error: 'Astrology site not found' });
        }

        const contentGenerator = new ContentGenerator(siteId);
        const results = [];

        // Test both English and Hindi
        for (const language of ['english', 'hindi']) {
            try {
                console.log(`🌍 Testing ${language} content for ${category}...`);
                
                // Force language for testing
                const originalDetermineLanguage = contentGenerator.determineContentLanguage;
                contentGenerator.determineContentLanguage = () => language;
                
                const article = await contentGenerator.generateCompleteArticle(category);
                
                // Restore original method
                contentGenerator.determineContentLanguage = originalDetermineLanguage;
                
                results.push({
                    language,
                    success: true,
                    articleId: article._id,
                    title: article.title,
                    wordCount: article.wordCount,
                    zodiacSign: article.zodiacSign,
                    contentPreview: article.content.substring(0, 200) + '...'
                });
            } catch (error) {
                results.push({
                    language,
                    success: false,
                    error: error.message
                });
            }
        }

        res.json({
            success: true,
            siteId,
            category,
            multiLanguageTest: results
        });

    } catch (error) {
        res.status(500).json({
            error: 'Multi-language test failed',
            message: error.message
        });
    }
});

// NEW: Test zodiac-specific content
router.post('/test/zodiac/:siteId/:zodiacSign', async (req, res) => {
    try {
        const { siteId, zodiacSign } = req.params;
        
        const articles = await Article.find({ 
            siteId, 
            zodiacSign: { $regex: zodiacSign, $options: 'i' }
        })
        .sort({ publishedAt: -1 })
        .limit(5)
        .select('title category language zodiacSign planetaryInfluence publishedAt');

        res.json({
            success: true,
            siteId,
            zodiacSign,
            totalArticles: articles.length,
            articles
        });

    } catch (error) {
        res.status(500).json({
            error: 'Zodiac test failed',
            message: error.message
        });
    }
});

module.exports = router;
