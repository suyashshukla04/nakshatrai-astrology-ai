// backend/routes/articleRoutes.js - ASTROLOGY PLATFORM ROUTES
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// Get all articles with pagination and filtering (updated for astrology)
router.get('/articles', async (req, res) => {
    try {
        const { 
            siteId = 'astroai', 
            category, 
            language,
            page = 1, 
            limit = 12,
            search 
        } = req.query;
        
        const query = { siteId };
        if (category && category !== 'all') query.category = category;
        if (language && language !== 'all') query.language = language;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } },
                { zodiacSign: { $regex: search, $options: 'i' } },
                { planetaryInfluence: { $regex: search, $options: 'i' } }
            ];
        }
        
        const articles = await Article.find(query)
            .sort({ publishedAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .select('title slug category featuredImage publishedAt readingTime tags seoTitle metaDescription wordCount author language zodiacSign planetaryInfluence');
        
        const total = await Article.countDocuments(query);
        
        res.json({
            success: true,
            data: {
                articles,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / parseInt(limit)),
                    totalArticles: total,
                    hasNext: page < Math.ceil(total / parseInt(limit)),
                    hasPrev: page > 1
                },
                categories: [
                    'all', 
                    'daily-horoscope', 
                    'love-compatibility', 
                    'career-guidance', 
                    'health-predictions', 
                    'lucky-suggestions', 
                    'festival-significance', 
                    'gemstone-guide', 
                    'muhurat-timing'
                ],
                languages: ['all', 'english', 'hindi']
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get single article by slug (updated for astrology)
router.get('/articles/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const { siteId = 'astroai' } = req.query;
        console.log("inside articles/slug route")
        const article = await Article.findOne({ slug, siteId });
        
        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Astrology article not found'
            });
        }
        
        // Get related articles by zodiac sign or category
        const relatedArticles = await Article.find({
            siteId,
            $or: [
                { category: article.category },
                { zodiacSign: article.zodiacSign },
                { planetaryInfluence: article.planetaryInfluence }
            ],
            _id: { $ne: article._id }
        })
        .limit(3)
        .select('title slug featuredImage publishedAt readingTime category language zodiacSign');
        
        res.json({
            success: true,
            data: {
                article,
                relatedArticles
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get articles by category (updated for astrology)
router.get('/articles/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const { siteId = 'astroai', limit = 6, language } = req.query;
        
        const query = { siteId, category };
        if (language && language !== 'all') query.language = language;
        
        const articles = await Article.find(query)
            .sort({ publishedAt: -1 })
            .limit(parseInt(limit))
            .select('title slug featuredImage publishedAt readingTime tags language zodiacSign planetaryInfluence');
        
        res.json({
            success: true,
            data: articles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get articles by zodiac sign (NEW - astrology specific)
router.get('/articles/zodiac/:zodiacSign', async (req, res) => {
    try {
        const { zodiacSign } = req.params;
        const { siteId = 'astroai', limit = 6, language } = req.query;
        
        const query = { siteId, zodiacSign };
        if (language && language !== 'all') query.language = language;
        
        const articles = await Article.find(query)
            .sort({ publishedAt: -1 })
            .limit(parseInt(limit))
            .select('title slug featuredImage publishedAt readingTime category language');
        
        res.json({
            success: true,
            data: articles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get articles by language (NEW - multi-language support)
router.get('/articles/language/:language', async (req, res) => {
    try {
        const { language } = req.params;
        const { siteId = 'astroai', limit = 12, category } = req.query;
        
        const query = { siteId, language };
        if (category && category !== 'all') query.category = category;
        
        const articles = await Article.find(query)
            .sort({ publishedAt: -1 })
            .limit(parseInt(limit))
            .select('title slug featuredImage publishedAt readingTime category zodiacSign planetaryInfluence');
        
        res.json({
            success: true,
            data: articles
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get site configuration (updated for astrology)
router.get('/site-config', async (req, res) => {
    try {
        const { siteId = 'astroai' } = req.query;
        const siteConfig = require('../config/siteConfig');
        const config = siteConfig.getConfig(siteId);
        
        if (!config) {
            return res.status(404).json({
                success: false,
                message: 'Astrology site configuration not found'
            });
        }
        
        // Get article statistics with language breakdown
        const stats = await Article.aggregate([
            { $match: { siteId } },
            {
                $group: {
                    _id: { 
                        category: '$category',
                        language: '$language'
                    },
                    count: { $sum: 1 },
                    latestArticle: { $max: '$publishedAt' }
                }
            }
        ]);
        
        // Get zodiac sign distribution
        const zodiacStats = await Article.aggregate([
            { $match: { siteId } },
            {
                $group: {
                    _id: '$zodiacSign',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);
        
        res.json({
            success: true,
            data: {
                site: {
                    domain: config.domain,
                    brandName: config.brandName,
                    description: config.description,
                    author: config.author,
                    niche: config.niche,
                    languages: config.languages,
                    categories: config.categories
                },
                stats,
                zodiacStats
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get today's horoscope (NEW - astrology specific)
router.get('/todays-horoscope', async (req, res) => {
    try {
        const { siteId = 'astroai', language = 'english' } = req.query;
        
        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const todaysHoroscope = await Article.find({
            siteId,
            category: 'daily-horoscope',
            language,
            publishedAt: {
                $gte: today,
                $lt: tomorrow
            }
        })
        .sort({ publishedAt: -1 })
        .select('title slug featuredImage zodiacSign planetaryInfluence readingTime');
        
        res.json({
            success: true,
            data: todaysHoroscope
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
