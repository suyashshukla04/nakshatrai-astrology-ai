// // generators/DynamicTopicGenerator.js - Complete file with model fix
// const siteConfig = require("../config/siteConfig");
// const Article = require('../models/Article');
// const TopicHistory = require('../models/TopicHistory'); // Import from separate file
// const mongoose = require('mongoose');

// class DynamicTopicGenerator {
//     constructor(siteId) {
//         this.siteId = siteId;
//         this.config = siteConfig.getConfig(siteId);
//         this.usedTopics = new Set();
//         this.geminiApiKey = process.env.GEMINI_API_KEY;
//     }

//     generateDynamicSeeds() {
//         const now = new Date();
//         const seeds = this.config.dynamicSeeds;
        
//         return {
//             timeContext: {
//                 dayOfWeek: now.toLocaleDateString('en-US', { weekday: 'long' }),
//                 weekOfYear: Math.ceil((now - new Date(now.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000)),
//                 quarter: Math.ceil((now.getMonth() + 1) / 3),
//                 season: this.getSeason(now.getMonth()),
//                 timeOfDay: this.getTimeOfDay(now.getHours()),
//                 currentMonth: now.toLocaleString('default', { month: 'long' }),
//                 currentYear: now.getFullYear(),
//                 currentDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
//             },
//             marketContext: {
//                 randomBrand: this.getRandomElement(seeds.brands),
//                 randomFeature: this.getRandomElement(seeds.features),
//                 priceRange: this.getRandomElement(seeds.priceRanges),
//                 userType: this.getRandomElement(seeds.userTypes)
//             },
//             techContext: {
//                 emergingTech: this.getRandomElement(seeds.techFocus),
//                 industryFocus: this.getRandomElement(seeds.industryFocus),
//                 geographicFocus: this.getRandomElement(seeds.geographicFocus)
//             },
//             contentAngle: {
//                 perspective: this.getRandomElement(['consumer impact', 'industry disruption', 'technical innovation', 'market dynamics', 'user experience', 'competitive analysis']),
//                 timeframe: this.getRandomElement(['immediate', 'short-term', 'long-term', 'decade outlook']),
//                 complexity: this.getRandomElement(['beginner-friendly', 'technical deep-dive', 'executive summary', 'comprehensive analysis'])
//             }
//         };
//     }

//     async generateTopic(category) {
//         const dynamicSeeds = this.generateDynamicSeeds();
//         const { timeContext, marketContext, techContext, contentAngle } = dynamicSeeds;
//         const uniqueConstraint = await this.getUniqueConstraint(category);
        
//         const dynamicPrompts = {
//             today: `Generate a ${this.config.niche} news analysis focusing on ${marketContext.randomBrand}'s ${marketContext.randomFeature} developments. 

//             DYNAMIC CONTEXT:
//             - Current: ${timeContext.dayOfWeek}, Week ${timeContext.weekOfYear} of Q${timeContext.quarter}
//             - Date: ${timeContext.currentDate}
//             - Market focus: ${marketContext.priceRange} segment for ${marketContext.userType}
//             - Geographic angle: ${techContext.geographicFocus} market perspective
//             - Content approach: ${contentAngle.perspective} with ${contentAngle.complexity} depth
            
//             UNIQUENESS CONSTRAINT: ${uniqueConstraint}
            
//             CREATE something specific about: How ${marketContext.randomBrand}'s latest ${marketContext.randomFeature} innovation affects ${marketContext.userType} in ${techContext.geographicFocus} during ${timeContext.season} ${timeContext.currentYear}.
            
//             Return only a unique, specific topic title for ${this.config.niche}.`,

//             current: `Generate a ${this.config.niche} device analysis combining ${marketContext.randomFeature} performance with ${techContext.industryFocus} considerations.

//             DYNAMIC CONTEXT:
//             - Analysis timeframe: ${contentAngle.timeframe} impact assessment
//             - Current period: ${timeContext.currentMonth} ${timeContext.currentYear}
//             - Target demographic: ${marketContext.userType} in ${marketContext.priceRange} category
//             - Technical focus: ${techContext.emergingTech} implementation
            
//             UNIQUENESS CONSTRAINT: ${uniqueConstraint}
            
//             Return only a unique, analytical topic title for ${this.config.niche}.`,

//             historical: `Generate a ${this.config.niche} evolution analysis tracking ${techContext.emergingTech} development over time.

//             DYNAMIC CONTEXT:
//             - Historical span: From early adoption to ${timeContext.season} ${timeContext.currentYear}
//             - Industry focus: ${techContext.industryFocus} transformation
//             - Market evolution: ${marketContext.priceRange} segment changes
            
//             UNIQUENESS CONSTRAINT: ${uniqueConstraint}
            
//             Return only a unique, historical analysis topic title for ${this.config.niche}.`,

//             trendy: `Generate a ${this.config.niche} future prediction focusing on ${techContext.emergingTech} convergence with ${techContext.industryFocus}.

//             DYNAMIC CONTEXT:
//             - Prediction horizon: ${contentAngle.timeframe} outlook from ${timeContext.currentDate}
//             - Innovation driver: ${marketContext.randomBrand}'s approach to ${techContext.emergingTech}
//             - Market disruption: Impact on ${marketContext.priceRange} segment
            
//             UNIQUENESS CONSTRAINT: ${uniqueConstraint}
            
//             Return only a unique, forward-thinking topic title for ${this.config.niche}.`
//         };

//         try {
//             const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.config.aiSettings.model}:generateContent?key=${this.geminiApiKey}`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     contents: [{
//                         parts: [{ text: dynamicPrompts[category] }]
//                     }],
//                     generationConfig: {
//                         temperature: 0.9,
//                         topK: 40,
//                         topP: 0.95,
//                         maxOutputTokens: this.config.aiSettings.maxTokens
//                     }
//                 })
//             });

//             const data = await response.json();
//             const topic = data.candidates[0].content.parts[0].text.trim();
            
//             if (this.usedTopics.has(topic)) {
//                 return this.generateTopic(category);
//             }
            
//             this.usedTopics.add(topic);
//             await this.storeTopicInDB(topic, category, dynamicSeeds);
            
//             return topic;
//         } catch (error) {
//             console.error('Dynamic topic generation error:', error);
//             return this.getFallbackTopic(category);
//         }
//     }

//     async getUniqueConstraint(category) {
//         const recentTopics = await Article.find({ 
//             category,
//             siteId: this.siteId 
//         })
//         .sort({ publishedAt: -1 })
//         .limit(10)
//         .select('title');
        
//         const recentTitles = recentTopics.map(article => article.title);
        
//         if (recentTitles.length === 0) {
//             return "Focus on breaking new ground with this topic.";
//         }
        
//         return `MUST be completely different from these recent topics: ${recentTitles.join(', ')}. Create something entirely new.`;
//     }

//     async storeTopicInDB(topic, category, seeds) {
//         // Now using the imported model - no more compilation error
//         await new TopicHistory({
//             topic,
//             category,
//             siteId: this.siteId,
//             seeds
//         }).save();
//     }

//     getRandomElement(array) {
//         return array[Math.floor(Math.random() * array.length)];
//     }

//     getSeason(month) {
//         const seasons = ['Winter', 'Winter', 'Spring', 'Spring', 'Spring', 'Summer', 
//                         'Summer', 'Summer', 'Autumn', 'Autumn', 'Autumn', 'Winter'];
//         return seasons[month];
//     }

//     getTimeOfDay(hour) {
//         if (hour < 6) return 'early morning';
//         if (hour < 12) return 'morning';
//         if (hour < 17) return 'afternoon';
//         if (hour < 21) return 'evening';
//         return 'night';
//     }

//     getFallbackTopic(category) {
//         const fallbacks = {
//             today: `Latest ${this.config.niche} developments in ${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`,
//             current: `Comprehensive analysis of current ${this.config.niche} trends`,
//             historical: `The evolution of ${this.config.niche}: A retrospective analysis`,
//             trendy: `Future predictions for ${this.config.niche} industry`
//         };
//         return fallbacks[category];
//     }
// }

// module.exports = DynamicTopicGenerator;

// generators/DynamicTopicGenerator.js - Complete file with Interactive Headlines
const siteConfig = require("../config/siteConfig");
const Article = require('../models/Article');
const TopicHistory = require('../models/TopicHistory');
const mongoose = require('mongoose');

class DynamicTopicGenerator {
    constructor(siteId) {
        this.siteId = siteId;
        this.config = siteConfig.getConfig(siteId);
        this.usedTopics = new Set();
        this.geminiApiKey = process.env.GEMINI_API_KEY;
    }

    // 🎯 NEW: Generate interactive headline patterns
    getInteractivePatterns(category) {
        const patterns = {
            today: [
                "Did You Know {BRAND} Just Changed Everything About {FEATURE}? Here's What It Means for You",
                "This New {DEVICE} Feature Will Make You Forget About {COMPETITOR} - Here's Why",
                "{BRAND} Users Are Going Crazy Over This Secret {FEATURE} - Should You Care?",
                "Why Everyone's Talking About {BRAND}'s Latest {TECH} Move (And Why You Should Too)",
                "{BRAND} Just Solved the Biggest {DEVICE} Problem - Here's How It Affects You",
                "Have You Heard About {BRAND}'s Game-Changing {FEATURE}? It's Pretty Amazing",
                "What if I Told You {BRAND} Just Made {COMPETITOR} Look Outdated?",
                "The {FEATURE} Update That's Making {BRAND} Users Smile - Here's Why"
            ],
            current: [
                "{DEVICE} vs {COMPETITOR}: Which One Actually Wins for Real People?",
                "Is {BRAND}'s {FEATURE} Worth the Hype? We Break It Down in Simple Terms",
                "The Truth About {TECH} That {BRAND} Doesn't Want You to Know",
                "Why Your Next Phone Upgrade Should (Or Shouldn't) Be This {DEVICE}",
                "{BRAND}'s {FEATURE} Explained: What It Really Means for Your Daily Life",
                "Thinking About {BRAND}? Here's What Real Users Are Actually Saying",
                "The {FEATURE} Showdown: {BRAND} vs Everyone Else",
                "Should You Trust {BRAND}'s Claims About {FEATURE}? Let's Find Out"
            ],
            historical: [
                "Remember When {DEVICE}s Couldn't Do {FEATURE}? Here's How Far We've Come",
                "The {DEVICE} Feature That Changed Everything (And Why It Still Matters Today)",
                "From {OLD_TECH} to {NEW_TECH}: The Journey That Blew Our Minds",
                "How {BRAND} Went From Zero to Hero with {FEATURE} - The Untold Story",
                "The Biggest {DEVICE} Mistake {BRAND} Ever Made (And How They Fixed It)",
                "What if I Told You {FEATURE} Almost Never Happened? Here's the Story",
                "The Day {BRAND} Changed {INDUSTRY} Forever - And You Probably Missed It",
                "Before {FEATURE} Existed: How Did We Even Survive?"
            ],
            trendy: [
                "The {DEVICE} Feature Coming in 2025 That Will Change Everything",
                "{BRAND}'s Secret Plan for Future {DEVICE}s - Here's What We Know",
                "Why Your Current {DEVICE} Will Feel Ancient in 2 Years",
                "The Next Big {DEVICE} Innovation That Nobody's Talking About",
                "{BRAND}'s 2025 {DEVICE} Plans: Should You Wait or Buy Now?",
                "What if Future {DEVICE}s Could Do This? (Spoiler: They Will)",
                "The {FEATURE} Revolution Coming to {DEVICE}s - Are You Ready?",
                "Leaked: {BRAND}'s Mind-Blowing Plans for {TECH} in {DEVICE}s"
            ]
        };
        
        return patterns[category] || patterns['current'];
    }

    // 🎯 NEW: Apply interactive patterns to topics
    makeTopicInteractive(baseTopic, category) {
        const patterns = this.getInteractivePatterns(category);
        const dynamicSeeds = this.generateDynamicSeeds();
        const { marketContext, techContext } = dynamicSeeds;
        
        // Select random pattern
        const pattern = patterns[Math.floor(Math.random() * patterns.length)];
        
        // Replace placeholders with dynamic content
        let interactiveTopic = pattern
            .replace(/{BRAND}/g, marketContext.randomBrand)
            .replace(/{FEATURE}/g, marketContext.randomFeature)
            .replace(/{DEVICE}/g, this.config.niche.replace('mobile technology', 'smartphone').replace('tech', 'device'))
            .replace(/{COMPETITOR}/g, this.getRandomCompetitor(marketContext.randomBrand))
            .replace(/{TECH}/g, techContext.emergingTech)
            .replace(/{OLD_TECH}/g, this.getOldTech())
            .replace(/{NEW_TECH}/g, techContext.emergingTech)
            .replace(/{INDUSTRY}/g, techContext.industryFocus);
        
        // If pattern doesn't fit, use the base topic with interactive prefix
        if (interactiveTopic.includes('{') || interactiveTopic.includes('}')) {
            const interactivePrefixes = [
                "Ever Wondered About",
                "The Truth Behind",
                "What You Need to Know About",
                "Here's Why Everyone's Talking About",
                "Did You Know"
            ];
            const prefix = interactivePrefixes[Math.floor(Math.random() * interactivePrefixes.length)];
            interactiveTopic = `${prefix} ${baseTopic}`;
        }
        
        return interactiveTopic;
    }

    // Helper method to get competitors
    getRandomCompetitor(currentBrand) {
        const competitors = {
            'Apple': ['Samsung', 'Google Pixel', 'OnePlus'],
            'Samsung': ['Apple iPhone', 'Google Pixel', 'Xiaomi'],
            'Google': ['Apple iPhone', 'Samsung Galaxy', 'OnePlus'],
            'OnePlus': ['Apple iPhone', 'Samsung Galaxy', 'Google Pixel'],
            'Xiaomi': ['Samsung Galaxy', 'OnePlus', 'Realme']
        };
        
        const competitorList = competitors[currentBrand] || ['other flagship phones'];
        return competitorList[Math.floor(Math.random() * competitorList.length)];
    }

    // Helper method to get old tech references
    getOldTech() {
        const oldTech = ['basic cameras', 'slow processors', 'small screens', 'poor battery life', 'limited storage'];
        return oldTech[Math.floor(Math.random() * oldTech.length)];
    }

    generateDynamicSeeds() {
        const now = new Date();
        const seeds = this.config.dynamicSeeds;
        
        return {
            timeContext: {
                dayOfWeek: now.toLocaleDateString('en-US', { weekday: 'long' }),
                weekOfYear: Math.ceil((now - new Date(now.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000)),
                quarter: Math.ceil((now.getMonth() + 1) / 3),
                season: this.getSeason(now.getMonth()),
                timeOfDay: this.getTimeOfDay(now.getHours()),
                currentMonth: now.toLocaleString('default', { month: 'long' }),
                currentYear: now.getFullYear(),
                currentDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            },
            marketContext: {
                randomBrand: this.getRandomElement(seeds.brands),
                randomFeature: this.getRandomElement(seeds.features),
                priceRange: this.getRandomElement(seeds.priceRanges),
                userType: this.getRandomElement(seeds.userTypes)
            },
            techContext: {
                emergingTech: this.getRandomElement(seeds.techFocus),
                industryFocus: this.getRandomElement(seeds.industryFocus),
                geographicFocus: this.getRandomElement(seeds.geographicFocus)
            },
            contentAngle: {
                perspective: this.getRandomElement(['consumer impact', 'industry disruption', 'technical innovation', 'market dynamics', 'user experience', 'competitive analysis']),
                timeframe: this.getRandomElement(['immediate', 'short-term', 'long-term', 'decade outlook']),
                complexity: this.getRandomElement(['beginner-friendly', 'technical deep-dive', 'executive summary', 'comprehensive analysis'])
            }
        };
    }

    // 🔥 UPDATED: Generate topic with interactive headlines
    async generateTopic(category) {
        const dynamicSeeds = this.generateDynamicSeeds();
        const { timeContext, marketContext, techContext, contentAngle } = dynamicSeeds;
        const uniqueConstraint = await this.getUniqueConstraint(category);
        
        const dynamicPrompts = {
            today: `Generate a conversational, engaging ${this.config.niche} topic that sounds like a friend telling you exciting news.

            DYNAMIC CONTEXT:
            - Current: ${timeContext.dayOfWeek}, Week ${timeContext.weekOfYear} of Q${timeContext.quarter}
            - Date: ${timeContext.currentDate}
            - Market focus: ${marketContext.priceRange} segment for ${marketContext.userType}
            - Geographic angle: ${techContext.geographicFocus} market perspective
            - Content approach: ${contentAngle.perspective} with ${contentAngle.complexity} depth
            
            UNIQUENESS CONSTRAINT: ${uniqueConstraint}
            
            TOPIC STYLE: Make it sound exciting and curiosity-inducing about ${marketContext.randomBrand}'s latest ${marketContext.randomFeature} innovation affecting ${marketContext.userType} in ${techContext.geographicFocus} during ${timeContext.season} ${timeContext.currentYear}.
            
            Use conversational language, avoid corporate speak. Make people want to click and read.
            
            Return only a unique, engaging topic title for ${this.config.niche}.`,

            current: `Generate an engaging ${this.config.niche} comparison or analysis topic that helps real people make decisions.

            DYNAMIC CONTEXT:
            - Analysis timeframe: ${contentAngle.timeframe} impact assessment
            - Current period: ${timeContext.currentMonth} ${timeContext.currentYear}
            - Target demographic: ${marketContext.userType} in ${marketContext.priceRange} category
            - Technical focus: ${techContext.emergingTech} implementation
            
            UNIQUENESS CONSTRAINT: ${uniqueConstraint}
            
            Make it practical and helpful, focusing on ${marketContext.randomFeature} performance with ${techContext.industryFocus} considerations.
            
            Return only a unique, helpful topic title for ${this.config.niche}.`,

            historical: `Generate an interesting story-based ${this.config.niche} topic about evolution and change over time.

            DYNAMIC CONTEXT:
            - Historical span: From early adoption to ${timeContext.season} ${timeContext.currentYear}
            - Industry focus: ${techContext.industryFocus} transformation
            - Market evolution: ${marketContext.priceRange} segment changes
            
            UNIQUENESS CONSTRAINT: ${uniqueConstraint}
            
            Make it engaging and story-driven, tracking ${techContext.emergingTech} development over time.
            Focus on interesting changes people can relate to.
            
            Return only a unique, story-based topic title for ${this.config.niche}.`,

            trendy: `Generate an exciting future-focused ${this.config.niche} topic about what's coming next.

            DYNAMIC CONTEXT:
            - Prediction horizon: ${contentAngle.timeframe} outlook from ${timeContext.currentDate}
            - Innovation driver: ${marketContext.randomBrand}'s approach to ${techContext.emergingTech}
            - Market disruption: Impact on ${marketContext.priceRange} segment
            
            UNIQUENESS CONSTRAINT: ${uniqueConstraint}
            
            Make it forward-thinking and exciting, focusing on ${techContext.emergingTech} convergence with ${techContext.industryFocus}.
            Build anticipation and curiosity about the future.
            
            Return only a unique, future-focused topic title for ${this.config.niche}.`
        };

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.config.aiSettings.model}:generateContent?key=${this.geminiApiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: dynamicPrompts[category] }]
                    }],
                    generationConfig: {
                        temperature: 0.9,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: this.config.aiSettings.maxTokens
                    }
                })
            });

            const data = await response.json();
            let baseTopic = data.candidates[0].content.parts[0].text.trim();
            
            // 🎯 Apply interactive pattern to make it more engaging
            let interactiveTopic = this.makeTopicInteractive(baseTopic, category);
            
            // Ensure uniqueness
            if (this.usedTopics.has(interactiveTopic)) {
                return this.generateTopic(category);
            }
            
            this.usedTopics.add(interactiveTopic);
            await this.storeTopicInDB(interactiveTopic, category, dynamicSeeds);
            
            return interactiveTopic;
        } catch (error) {
            console.error('Dynamic topic generation error:', error);
            return this.getFallbackTopic(category);
        }
    }

    async getUniqueConstraint(category) {
        const recentTopics = await Article.find({ 
            category,
            siteId: this.siteId 
        })
        .sort({ publishedAt: -1 })
        .limit(10)
        .select('title');
        
        const recentTitles = recentTopics.map(article => article.title);
        
        if (recentTitles.length === 0) {
            return "Focus on breaking new ground with this topic.";
        }
        
        return `MUST be completely different from these recent topics: ${recentTitles.join(', ')}. Create something entirely new and engaging.`;
    }

    async storeTopicInDB(topic, category, seeds) {
        await new TopicHistory({
            topic,
            category,
            siteId: this.siteId,
            seeds,
            isInteractive: true // NEW: Mark as interactive topic
        }).save();
    }

    getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    getSeason(month) {
        const seasons = ['Winter', 'Winter', 'Spring', 'Spring', 'Spring', 'Summer', 
                        'Summer', 'Summer', 'Autumn', 'Autumn', 'Autumn', 'Winter'];
        return seasons[month];
    }

    getTimeOfDay(hour) {
        if (hour < 6) return 'early morning';
        if (hour < 12) return 'morning';
        if (hour < 17) return 'afternoon';
        if (hour < 21) return 'evening';
        return 'night';
    }

    // 🔥 UPDATED: Interactive fallback topics
    getFallbackTopic(category) {
        const fallbacks = {
            today: `What's Happening Right Now in ${this.config.niche} That You Should Know About`,
            current: `The ${this.config.niche} Question Everyone's Asking: Which One's Actually Worth It?`,
            historical: `The ${this.config.niche} Story You Probably Never Heard (But Should Know)`,
            trendy: `What if I Told You the Future of ${this.config.niche} Is About to Change Everything?`
        };
        return fallbacks[category];
    }
}

module.exports = DynamicTopicGenerator;
