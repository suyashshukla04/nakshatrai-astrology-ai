// scheduler.js - Modular multi-site scheduler
const cron = require('node-cron');
const ContentGenerator = require('../generators/ContentGenerator.js');
const siteConfig = require("../config/siteConfig");

class ModularScheduler {
    constructor() {
        this.activeJobs = new Map();
        this.contentGenerators = new Map();
    }

    initializeAllSites() {
        const sites = siteConfig.getAllConfigs();
        
        sites.forEach(site => {
            this.initializeSite(site.id);
        });
        
        console.log(`Initialized ${sites.length} sites with modular scheduling`);
    }

    initializeSite(siteId) {
        const config = siteConfig.getConfig(siteId);
        if (!config) {
            console.error(`Site config not found for: ${siteId}`);
            return;
        }

        // Create content generator for this site
        const contentGenerator = new ContentGenerator(siteId);
        this.contentGenerators.set(siteId, contentGenerator);

        // Schedule all categories for this site
        Object.entries(config.schedule).forEach(([category, cronExpression]) => {
            const jobKey = `${siteId}_${category}`;
            
            const job = cron.schedule(cronExpression, async () => {
                try {
                    console.log(`Generating ${category} content for ${config.domain}...`);
                    await contentGenerator.generateCompleteArticle(category);
                    console.log(`✅ ${category} content generated for ${config.domain}`);
                } catch (error) {
                    console.error(`❌ Error generating ${category} content for ${config.domain}:`, error);
                }
            }, {
                scheduled: false,
                timezone: "Asia/Kolkata"
            });

            this.activeJobs.set(jobKey, job);
            job.start();
            
            console.log(`✅ Scheduled ${category} for ${config.domain}: ${cronExpression}`);
        });
    }

    addNewSite(siteConfig) {
        const config = siteConfig.addNewSite(siteConfig);
        this.initializeSite(config.id);
        return config;
    }

    removeSite(siteId) {
        // Stop all jobs for this site
        const config = siteConfig.getConfig(siteId);
        if (config) {
            config.categories.forEach(category => {
                const jobKey = `${siteId}_${category}`;
                const job = this.activeJobs.get(jobKey);
                if (job) {
                    job.stop();
                    this.activeJobs.delete(jobKey);
                }
            });
        }
        
        // Remove content generator
        this.contentGenerators.delete(siteId);
        console.log(`Removed site: ${siteId}`);
    }

    // Manual content generation for testing
    async generateManualContent(siteId, category) {
        const contentGenerator = this.contentGenerators.get(siteId);
        if (!contentGenerator) {
            throw new Error(`Content generator not found for site: ${siteId}`);
        }
        
        return await contentGenerator.generateCompleteArticle(category);
    }

    getStatus() {
        const sites = siteConfig.getAllConfigs();
        return {
            totalSites: sites.length,
            activeSites: sites.map(site => ({
                id: site.id,
                domain: site.domain,
                niche: site.niche,
                categories: site.categories.length,
                scheduledJobs: site.categories.length
            })),
            totalJobs: this.activeJobs.size
        };
    }
}

module.exports = new ModularScheduler();
