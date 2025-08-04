// test/contentTest.js - Automated testing script
const request = require('supertest');
const app = require('../app'); // Your main app

describe('Content Generation API Tests', () => {
    
    // Test topic generation
    it('should generate unique topics for mobile tech', async () => {
        const response = await request(app)
            .post('/api/test/topic/techmobile/today')
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.topic).toBeDefined();
        expect(response.body.topic.length).toBeGreaterThan(10);
        console.log('Generated Topic:', response.body.topic);
    });

    // Test full content generation
    it('should generate complete article with proper structure', async () => {
        const response = await request(app)
            .post('/api/test/generate/techmobile/current')
            .expect(200);

        const { article, contentAnalysis } = response.body;
        
        expect(article.wordCount).toBeGreaterThan(1200);
        expect(contentAnalysis.hasProperStructure).toBe(true);
        expect(contentAnalysis.hasPunctuation).toBe(true);
        expect(article.title).toBeDefined();
        expect(article.content).toContain('##');
        expect(article.content).toContain('Content Attribution');
        
        console.log('Article Analysis:', contentAnalysis);
        console.log('Article Title:', article.title);
        console.log('Word Count:', article.wordCount);
    });

    // Test system status
    it('should return system status', async () => {
        const response = await request(app)
            .get('/api/test/status')
            .expect(200);

        expect(response.body.success).toBe(true);
        expect(response.body.totalSites).toBeGreaterThan(0);
        console.log('System Status:', response.body);
    });
});
