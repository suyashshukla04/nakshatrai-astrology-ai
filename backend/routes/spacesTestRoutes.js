const express = require('express');
const router = express.Router();
const SpacesService = require('../services/spacesService');

// Test Spaces connection
router.get('/spaces/test', async (req, res) => {
    try {
        const spacesService = new SpacesService();
        const result = await spacesService.testConnection();
        
        res.json({
            success: result.success,
            message: result.success ? 'DigitalOcean Spaces connection successful' : 'Connection failed',
            error: result.error || null,
            config: {
                endpoint: process.env.SPACES_ENDPOINT,
                bucket: process.env.SPACES_BUCKET,
                region: process.env.SPACES_REGION
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Spaces test failed',
            error: error.message
        });
    }
});

// Test image upload
router.post('/spaces/test-upload', async (req, res) => {
    try {
        const { imageUrl, filename } = req.body;
        
        if (!imageUrl || !filename) {
            return res.status(400).json({
                success: false,
                message: 'imageUrl and filename are required'
            });
        }
        
        const spacesService = new SpacesService();
        const result = await spacesService.uploadImage(imageUrl, filename, 'test');
        
        res.json({
            success: result.success,
            message: result.success ? 'Image uploaded successfully' : 'Upload failed',
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Upload test failed',
            error: error.message
        });
    }
});

// List images in Spaces
router.get('/spaces/images', async (req, res) => {
    try {
        const { category, limit } = req.query;
        const spacesService = new SpacesService();
        const result = await spacesService.listImages(category || '', parseInt(limit) || 50);
        
        res.json(result);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to list images',
            error: error.message
        });
    }
});

module.exports = router;
