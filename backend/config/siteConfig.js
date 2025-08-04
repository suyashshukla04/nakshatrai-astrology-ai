// config/siteConfig.js - Complete modular configuration
class SiteConfigManager {
    constructor() {
        this.configs = new Map();
        this.loadConfigurations();
    }

    loadConfigurations() {
        // Load all site configurations
        const sites = [
            {
                id: 'techmobile',
                domain: 'techmobileinsights.com',
                niche: 'mobile technology',
                author: 'TechAI-1',
                brandName: 'Tech Mobile Insights',
                description: 'AI-powered mobile technology analysis and insights',
                categories: ['today', 'current', 'historical', 'trendy'],
                schedule: {
                    today: '0 21 * * *',    // 9 PM daily
                    current: '0 8 * * *',   // 8 AM daily
                    historical: '0 10 */3 * *', // Every 3 days at 10 AM
                    trendy: '0 12 * * 0'    // Weekly Sunday 12 PM
                },
                aiSettings: {
                    temperature: 0.7,
                    maxTokens: 2048,
                    model: 'gemini-2.0-flash-exp'
                },
                seoSettings: {
                    titleSuffix: ' | Tech Mobile Insights',
                    defaultMetaDescription: 'Expert AI analysis of mobile technology trends, reviews, and insights.',
                    keywords: ['mobile technology', 'smartphone reviews', 'tech analysis', 'AI insights']
                },
                attributionTemplate: `Analysis produced by {author}, AI agent of {domain}
Analytical methodology inspired by Marques Brownlee's detailed review methodology
Computational analysis and data processing by AI systems`,
                dynamicSeeds: {
                    brands: ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Oppo', 'Vivo', 'Nothing', 'Realme', 'Honor'],
                    features: ['camera', 'battery', 'display', 'processor', 'AI capabilities', 'charging speed', 'design', 'software', 'security', 'connectivity'],
                    priceRanges: ['budget', 'mid-range', 'flagship', 'premium'],
                    userTypes: ['professionals', 'gamers', 'photographers', 'students', 'seniors', 'content creators', 'business users'],
                    techFocus: ['5G', '6G research', 'foldable displays', 'under-display cameras', 'satellite connectivity', 'AR integration', 'quantum encryption', 'wireless charging'],
                    industryFocus: ['sustainability', 'privacy', 'accessibility', 'enterprise solutions', 'health monitoring', 'productivity', 'gaming performance'],
                    geographicFocus: ['India', 'China', 'US', 'Europe', 'Southeast Asia', 'Latin America', 'global', 'emerging markets']
                }
            }
            // Add more site configurations here for scaling
        ];

        sites.forEach(site => {
            this.configs.set(site.id, site);
        });
    }

    getConfig(siteId) {
        return this.configs.get(siteId);
    }

    getAllConfigs() {
        return Array.from(this.configs.values());
    }

    addNewSite(config) {
        this.configs.set(config.id, config);
        return config;
    }

    // Generate new site configuration template
    generateNewSiteConfig(niche, domain, authorName) {
        const siteId = domain.split('.')[0];
        return {
            id: siteId,
            domain: domain,
            niche: niche,
            author: authorName,
            brandName: this.generateBrandName(niche),
            description: `AI-powered ${niche} analysis and insights`,
            categories: ['today', 'current', 'historical', 'trendy'],
            schedule: {
                today: '0 21 * * *',
                current: '0 8 * * *',
                historical: '0 10 */3 * *',
                trendy: '0 12 * * 0'
            },
            aiSettings: {
                temperature: 0.7,
                maxTokens: 2048,
                model: 'gemini-2.0-flash-exp'
            },
            seoSettings: {
                titleSuffix: ` | ${this.generateBrandName(niche)}`,
                defaultMetaDescription: `Expert AI analysis of ${niche} trends, reviews, and insights.`,
                keywords: this.generateKeywords(niche)
            },
            attributionTemplate: `Analysis produced by {author}, AI agent of {domain}
Analytical methodology inspired by industry experts
Computational analysis and data processing by AI systems`,
            dynamicSeeds: this.generateDynamicSeeds(niche)
        };
    }

    generateBrandName(niche) {
        const words = niche.split(' ');
        return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') + ' Insights';
    }

    generateKeywords(niche) {
        return [niche, `${niche} reviews`, `${niche} analysis`, 'AI insights', `${niche} trends`];
    }

    generateDynamicSeeds(niche) {
        // This would be customized based on niche
        // For now, returning a generic template
        return {
            brands: ['Brand A', 'Brand B', 'Brand C'], // Customize per niche
            features: ['feature1', 'feature2', 'feature3'], // Customize per niche
            priceRanges: ['budget', 'mid-range', 'premium'],
            userTypes: ['professionals', 'enthusiasts', 'beginners'],
            techFocus: ['innovation1', 'innovation2', 'innovation3'], // Customize per niche
            industryFocus: ['sustainability', 'performance', 'accessibility'],
            geographicFocus: ['India', 'US', 'Europe', 'global']
        };
    }
}

module.exports = new SiteConfigManager();
