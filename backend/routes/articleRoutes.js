// C:\Users\suyas\mobile-tech-automation-v2\backend\routes\articleRoutes.js
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// Get all articles with pagination and filtering
router.get('/articles', async (req, res) => {
    try {
        const { 
            siteId = 'techmobile', 
            category, 
            page = 1, 
            limit = 12,
            search 
        } = req.query;
        
        const query = { siteId };
        if (category && category !== 'all') query.category = category;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ];
        }
        
        const articles = await Article.find(query)
            .sort({ publishedAt: -1 })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .select('title slug category featuredImage publishedAt readingTime tags seoTitle metaDescription wordCount author');
        
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
                categories: ['all', 'today', 'current', 'historical', 'trendy']
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get single article by slug
router.get('/articles/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const { siteId = 'techmobile' } = req.query;
        
        const article = await Article.findOne({ slug, siteId });
        
        if (!article) {
            return res.status(404).json({
                success: false,
                message: 'Article not found'
            });
        }
        
        // Get related articles
        const relatedArticles = await Article.find({
            siteId,
            category: article.category,
            _id: { $ne: article._id }
        })
        .limit(3)
        .select('title slug featuredImage publishedAt readingTime category');
        
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

// Get articles by category
router.get('/articles/category/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const { siteId = 'techmobile', limit = 6 } = req.query;
        
        const articles = await Article.find({ siteId, category })
            .sort({ publishedAt: -1 })
            .limit(parseInt(limit))
            .select('title slug featuredImage publishedAt readingTime tags');
        
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

// Get site configuration
router.get('/site-config', async (req, res) => {
    try {
        const { siteId = 'techmobile' } = req.query;
        const siteConfig = require('../config/siteConfig');
        const config = siteConfig.getConfig(siteId);
        
        if (!config) {
            return res.status(404).json({
                success: false,
                message: 'Site configuration not found'
            });
        }
        
        // Get article statistics
        const stats = await Article.aggregate([
            { $match: { siteId } },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    latestArticle: { $max: '$publishedAt' }
                }
            }
        ]);
        
        res.json({
            success: true,
            data: {
                site: {
                    domain: config.domain,
                    brandName: config.brandName,
                    description: config.description,
                    author: config.author,
                    niche: config.niche
                },
                stats
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
