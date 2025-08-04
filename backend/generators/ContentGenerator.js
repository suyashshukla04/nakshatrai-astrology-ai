// // backend/generators/ContentGenerator.js - COMPLETE FILE
// const DynamicTopicGenerator = require('./DynamicTopicGenerator');
// const siteConfig = require('../config/siteConfig');
// const Article = require('../models/Article');
// const SpacesService = require('../services/spacesService');
// const OpenAI = require('openai');

// class ContentGenerator {
//     constructor(siteId) {
//         this.siteId = siteId;
//         this.config = siteConfig.getConfig(siteId);
//         this.topicGenerator = new DynamicTopicGenerator(siteId);
//         this.spacesService = new SpacesService();
        
//         // Initialize OpenAI for DALL-E image generation
//         this.openai = new OpenAI({
//             apiKey: process.env.OPENAI_API_KEY
//         });

//         // Initialize Gemini 2.5 Flash - Latest stable model
//         const { GoogleGenerativeAI } = require('@google/generative-ai');
//         this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//         this.model = this.genAI.getGenerativeModel({ 
//             model: 'gemini-2.5-flash',
//             generationConfig: {
//                 temperature: 0.7,
//                 topP: 0.8,
//                 topK: 40,
//                 maxOutputTokens: 4096,
//             }
//         });
//     }

//     // Clean markdown symbols from title
//     cleanMarkdownFromTitle(title) {
//         return title
//             .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove bold markers
//             .replace(/\*(.*?)\*/g, '$1')     // Remove italic markers
//             .replace(/#{1,6}\s*/g, '')       // Remove heading markers
//             .replace(/`(.*?)`/g, '$1')       // Remove code markers
//             .replace(/\n/g, ' ')             // Remove line breaks
//             .trim();
//     }

//     // Clean markdown from content and convert to HTML
//     cleanMarkdownFromContent(content) {
//         return content
//             .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Convert bold to HTML
//             .replace(/\*(.*?)\*/g, '<em>$1</em>')             // Convert italic to HTML
//             .replace(/#{3}\s*(.*?)$/gm, '<h3>$1</h3>')        // Convert h3
//             .replace(/#{2}\s*(.*?)$/gm, '<h2>$1</h2>')        // Convert h2
//             .replace(/#{1}\s*(.*?)$/gm, '<h1>$1</h1>')        // Convert h1
//             .replace(/\n\n/g, '</p><p>')                      // Convert paragraphs
//             .replace(/^(.*)$/gm, '<p>$1</p>')                 // Wrap in paragraphs
//             .replace(/<p><\/p>/g, '')                         // Remove empty paragraphs
//             .replace(/<p><h/g, '<h')                          // Fix heading wrapping
//             .replace(/<\/h([1-6])><\/p>/g, '</h$1>');         // Fix heading closing
//     }

//     // Generate themed image for article
//     async generateThemedImage(topic, category) {
//         try {
//             console.log(`🎨 Generating themed image for: ${topic}`);
            
//             const imageResult = await this.spacesService.generateAndUploadThemedImage(topic, category);
            
//             if (imageResult && imageResult.success) {
//                 console.log(`✅ Themed image generated and uploaded: ${imageResult.theme} theme`);
//                 return imageResult;
//             } else {
//                 console.log(`⚠️ Themed image generation failed: ${imageResult ? imageResult.error : 'Unknown error'}`);
//                 return null;
//             }

//         } catch (error) {
//             console.error('❌ Themed image generation error:', error);
//             return null;
//         }
//     }

//     // Generate URL-friendly slug
//     generateSlug(title) {
//         return title
//             .toLowerCase()
//             .replace(/[^\w\s-]/g, '')
//             .replace(/\s+/g, '-')
//             .replace(/-+/g, '-')
//             .substring(0, 60)
//             .trim();
//     }

//     // Generate meta description from content
//     generateMetaDescription(content) {
//         const textContent = content.replace(/<[^>]*>/g, ''); // Strip HTML
//         return textContent.substring(0, 155) + '...';
//     }

//     // Generate tags from title and content
//     generateTags(title, content) {
//         const baseTags = ['mobile technology', 'smartphone reviews', 'tech analysis', 'AI insights'];
//         const titleWords = title.toLowerCase().split(' ').filter(word => word.length > 3);
//         const contentWords = content.toLowerCase().match(/\b\w{4,}\b/g) || [];
        
//         const uniqueWords = [...new Set([...titleWords, ...contentWords])]
//             .slice(0, 6);
        
//         return [...baseTags, ...uniqueWords];
//     }

//     // Calculate reading time
//     calculateReadingTime(content) {
//         const wordsPerMinute = 200;
//         const wordCount = this.countWords(content);
//         return Math.ceil(wordCount / wordsPerMinute);
//     }

//     // Count words in content
//     countWords(content) {
//         const textContent = content.replace(/<[^>]*>/g, ''); // Strip HTML
//         return textContent.split(/\s+/).filter(word => word.length > 0).length;
//     }

//     // Assess content quality - THIS WAS THE MISSING METHOD
//     assessContentQuality(content) {
//         const wordCount = this.countWords(content);
//         const hasHeadings = content.includes('<h2>') || content.includes('<h3>');
//         const hasTechnicalTerms = /\b(processor|camera|battery|display|5G|AI|smartphone|mobile|technology|performance|specs|review|analysis)\b/i.test(content);
//         const hasProperStructure = content.includes('<p>') && content.length > 500;
        
//         let qualityScore = 0;
//         if (wordCount >= 1200) qualityScore += 25;
//         if (wordCount >= 800) qualityScore += 15;
//         if (hasHeadings) qualityScore += 25;
//         if (hasTechnicalTerms) qualityScore += 25;
//         if (hasProperStructure) qualityScore += 10;
        
//         return {
//             wordCount: wordCount,
//             meetsMinimum: wordCount >= 1200,
//             hasStructure: hasHeadings,
//             hasTechnicalContent: hasTechnicalTerms,
//             hasProperFormatting: hasProperStructure,
//             overallScore: qualityScore,
//             grade: this.getQualityGrade(qualityScore)
//         };
//     }

//     // Get quality grade based on score
//     getQualityGrade(score) {
//         if (score >= 90) return 'Excellent';
//         if (score >= 75) return 'Good';
//         if (score >= 60) return 'Fair';
//         return 'Needs Improvement';
//     }

//     // Content generation with fallback strategy
//     async generateContentWithFallback(prompt) {
//         const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];
        
//         for (const modelName of models) {
//             try {
//                 const model = this.genAI.getGenerativeModel({ 
//                     model: modelName,
//                     generationConfig: {
//                         temperature: 0.7,
//                         topP: 0.8,
//                         topK: 40,
//                         maxOutputTokens: 4096,
//                     }
//                 });
//                 const result = await model.generateContent(prompt);
//                 console.log(`✅ Content generated successfully with ${modelName}`);
//                 return result.response.text();
//             } catch (error) {
//                 console.log(`⚠️ ${modelName} failed: ${error.message}`);
//                 if (modelName === models[models.length - 1]) {
//                     throw error; // If last model fails, throw the error
//                 }
//                 continue;
//             }
//         }
//     }

//     // Main article generation method
//     async generateCompleteArticle(category) {
//         try {
//             console.log(`🚀 Generating ${category} article for ${this.config.domain} using Gemini 2.5 Flash...`);

//             // Generate dynamic topic
//             const topic = await this.topicGenerator.generateTopic(category);
//             console.log(`📝 Topic: ${topic}`);

//             // Clean the topic title
//             const cleanTopic = this.cleanMarkdownFromTitle(topic);

//             // Generate themed image
//             const imageResult = await this.generateThemedImage(cleanTopic, category);

//             // Enhanced content prompt optimized for Gemini 2.5 Flash
//             const contentPrompt = `You are MobileTechAI, an expert mobile technology analyst. Write a comprehensive, professional article about: "${cleanTopic}"

// CRITICAL FORMATTING REQUIREMENTS:
// - Title: Write WITHOUT any markdown symbols (**, ##, etc.)
// - Content: Use clean HTML tags only (<h2>, <h3>, <strong>, <em>)
// - NO markdown syntax anywhere in the response
// - Professional, analytical tone with technical depth
// - Include specific model numbers, specifications, and market data when relevant

// ARTICLE STRUCTURE (1200+ words):
// 1. **Compelling Introduction** (150-200 words)
//    - Hook the reader with a surprising insight or trend
//    - Establish the significance of this topic
//    - Preview what readers will learn

// 2. **Technical Analysis** (400-500 words)
//    - Deep dive into specifications and features
//    - Compare with competitors and previous generations
//    - Explain the technology in accessible terms

// 3. **Market Impact & User Experience** (300-400 words)
//    - Real-world performance implications
//    - Target audience and use cases
//    - Price positioning and value proposition

// 4. **Industry Context** (200-300 words)
//    - How this fits into broader mobile trends
//    - Impact on the competitive landscape
//    - Future implications for the industry

// 5. **Conclusion & Outlook** (150-200 words)
//    - Summarize key insights
//    - Predict future developments
//    - Final recommendation or assessment

// TONE: Professional yet engaging, like a seasoned tech journalist
// AUDIENCE: Mobile technology enthusiasts and industry professionals
// TARGET: Exactly 1200-1400 words

// Write the complete article now:`;

//             // Generate content with fallback strategy
//             let content = await this.generateContentWithFallback(contentPrompt);

//             // Clean any remaining markdown from content
//             content = this.cleanMarkdownFromContent(content);

//             // Assess content quality
//             const qualityAssessment = this.assessContentQuality(content);
//             console.log(`📊 Content Quality: ${qualityAssessment.grade} (${qualityAssessment.overallScore}/100)`);

//             // Create article object with enhanced metadata
//             const article = new Article({
//                 title: cleanTopic,
//                 slug: this.generateSlug(cleanTopic),
//                 content: content,
//                 category: category,
//                 niche: this.config.niche,
//                 siteId: this.siteId,
//                 author: this.config.author,
//                 featuredImage: imageResult ? imageResult.featuredImage : null,
//                 originalImageUrl: imageResult ? imageResult.originalImageUrl : null,
//                 imageKey: imageResult ? imageResult.imageKey : null,
//                 imageUploaded: imageResult ? imageResult.imageUploaded : false,
//                 seoTitle: cleanTopic.substring(0, 60),
//                 metaDescription: this.generateMetaDescription(content),
//                 tags: this.generateTags(cleanTopic, content),
//                 readingTime: this.calculateReadingTime(content),
//                 wordCount: this.countWords(content),
//                 publishedAt: new Date(),
//                 aiModel: 'gemini-2.5-flash'
//             });

//             // Save to database
//             const savedArticle = await article.save();
//             console.log(`✅ Article generated with Gemini 2.5 Flash: ${savedArticle._id}`);
//             console.log(`📊 Word count: ${savedArticle.wordCount}, Reading time: ${savedArticle.readingTime} min`);
//             console.log(`🎨 Image theme: ${imageResult ? imageResult.theme : 'No image'}`);

//             return savedArticle;

//         } catch (error) {
//             console.error('❌ Article generation error:', error);
//             throw error;
//         }
//     }

//     // Generate multiple articles for bulk testing
//     async generateBulkArticles(categories, count = 1) {
//         const results = [];
        
//         for (const category of categories) {
//             for (let i = 0; i < count; i++) {
//                 try {
//                     console.log(`📝 Generating article ${i + 1}/${count} for category: ${category}`);
//                     const article = await this.generateCompleteArticle(category);
//                     results.push({
//                         success: true,
//                         category: category,
//                         article: {
//                             id: article._id,
//                             title: article.title,
//                             wordCount: article.wordCount,
//                             theme: article.imageKey ? 'themed' : 'fallback'
//                         }
//                     });
//                 } catch (error) {
//                     results.push({
//                         success: false,
//                         category: category,
//                         error: error.message
//                     });
//                 }
//             }
//         }
        
//         return results;
//     }

//     // Test content generation without saving
//     async testContentGeneration(topic) {
//         try {
//             const testPrompt = `Write a brief 200-word analysis about: "${topic}"
            
// Requirements:
// - Professional tone
// - Technical accuracy
// - No markdown symbols
// - HTML formatting only

// Write the analysis now:`;

//             const content = await this.generateContentWithFallback(testPrompt);
//             const quality = this.assessContentQuality(content);
            
//             return {
//                 success: true,
//                 content: content,
//                 wordCount: this.countWords(content),
//                 quality: quality
//             };
            
//         } catch (error) {
//             return {
//                 success: false,
//                 error: error.message
//             };
//         }
//     }
// }

// module.exports = ContentGenerator;



// backend/generators/ContentGenerator.js - COMPLETE FILE WITH CLEAN FORMATTING
const DynamicTopicGenerator = require('./DynamicTopicGenerator');
const siteConfig = require('../config/siteConfig');
const Article = require('../models/Article');
const SpacesService = require('../services/spacesService');
const OpenAI = require('openai');

class ContentGenerator {
    constructor(siteId) {
        this.siteId = siteId;
        this.config = siteConfig.getConfig(siteId);
        this.topicGenerator = new DynamicTopicGenerator(siteId);
        this.spacesService = new SpacesService();
        
        // Initialize OpenAI for DALL-E image generation
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        // Initialize Gemini 2.5 Flash - Latest stable model
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.model = this.genAI.getGenerativeModel({ 
            model: 'gemini-2.5-flash',
            generationConfig: {
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
                maxOutputTokens: 4096,
            }
        });
    }

    // Clean markdown symbols from title
    cleanMarkdownFromTitle(title) {
        return title
            .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove bold markers
            .replace(/\*(.*?)\*/g, '$1')     // Remove italic markers
            .replace(/#{1,6}\s*/g, '')       // Remove heading markers
            .replace(/`(.*?)`/g, '$1')       // Remove code markers
            .replace(/\n/g, ' ')             // Remove line breaks
            .replace(/"/g, '')               // Remove quotes
            .trim();
    }

    // 🔥 ENHANCED: Clean and properly format content
    cleanAndFormatContent(content) {
        // First, clean up messy formatting
        content = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Convert bold to HTML
            .replace(/\*(.*?)\*/g, '<em>$1</em>')             // Convert italic to HTML
            .replace(/#{3}\s*(.*?)$/gm, '<h3>$1</h3>')        // Convert h3
            .replace(/#{2}\s*(.*?)$/gm, '<h2>$1</h2>')        // Convert h2
            .replace(/#{1}\s*(.*?)$/gm, '<h1>$1</h1>')        // Convert h1
            
            // Clean up quotes and formatting issues
            .replace(/"/g, '')                                // Remove all quotes
            .replace(/'/g, "'")                               // Fix apostrophes
            .replace(/💡\s*\n/g, '')                         // Remove standalone emojis
            .replace(/🤔\s*\n/g, '')                         // Remove standalone emojis
            .replace(/\n{3,}/g, '\n\n')                      // Remove excessive line breaks
            
            // Create proper paragraphs
            .replace(/\n\n/g, '</p><p>')                      // Convert paragraphs
            .replace(/^(.*)$/gm, '<p>$1</p>')                 // Wrap in paragraphs
            .replace(/<p><\/p>/g, '')                         // Remove empty paragraphs
            .replace(/<p><h/g, '<h')                          // Fix heading wrapping
            .replace(/<\/h([1-6])><\/p>/g, '</h$1>')          // Fix heading closing
            
            // Clean up any remaining formatting issues
            .replace(/<p>\s*<\/p>/g, '')                      // Remove empty paragraphs again
            .replace(/\s+/g, ' ')                             // Normalize spaces
            .replace(/<p>\s+/g, '<p>')                        // Clean paragraph starts
            .replace(/\s+<\/p>/g, '</p>');                    // Clean paragraph ends

        return content;
    }

    // 🎯 NEW: Add proper blogging elements
    addBloggingElements(content, topic) {
        // Add proper heading structure
        content = content.replace(/<h2>/g, '<h2 class="blog-heading">');
        content = content.replace(/<h3>/g, '<h3 class="blog-subheading">');
        
        // Add highlight boxes for key insights
        const keyPhrases = [
            'Here\'s the thing',
            'Think of it this way',
            'Here\'s why this matters',
            'Bottom line',
            'Here\'s what this means',
            'Let me break this down',
            'Here\'s the cool part',
            'Imagine this',
            'What if I told you'
        ];
        
        keyPhrases.forEach(phrase => {
            const regex = new RegExp(`(${phrase}[^.]*\.?)`, 'gi');
            content = content.replace(regex, '<div class="highlight-box">💡 $1</div>');
        });

        // Add question call-outs
        const questionRegex = /(Ever wondered[^?]*\?|Have you ever[^?]*\?|What if[^?]*\?|Did you know[^?]*\?)/gi;
        content = content.replace(questionRegex, '<div class="question-callout">🤔 $1</div>');
        
        // Add proper paragraph spacing and structure
        content = content.replace(/<p>/g, '<p class="blog-paragraph">');
        
        return content;
    }

    // 🔥 NEW: Generate clean, well-formatted interactive content
    async generateInteractiveContent(topic, category) {
        const cleanTopic = this.cleanMarkdownFromTitle(topic);
        
        // 🎯 ENHANCED PROMPT WITH CLEAN FORMATTING INSTRUCTIONS
        const interactivePrompt = `You are a friendly tech blogger writing for a professional blog. Write about: "${cleanTopic}"

STRICT FORMATTING RULES:
- NO quotation marks anywhere in the content
- NO unnecessary bold text or emphasis
- Use simple, clean sentences
- Each paragraph should be 2-4 sentences maximum
- Use headings to break up content clearly
- Write in a conversational but professional tone

WRITING STYLE EXAMPLES:

❌ AVOID (Messy Formatting):
"Ever wondered why your phone gets choppy during games?" Think of your screen like a car that's stuck in one gear - **pretty inefficient**, right? Well, Apple just figured out how to give your phone an "automatic transmission..."

✅ DO THIS (Clean Formatting):
Ever wondered why your phone gets choppy during games? Think of your screen like a car stuck in one gear. Pretty inefficient, right? Well, Apple just figured out how to give your phone an automatic transmission.

❌ AVOID (Scattered Formatting):
💡 Here's the thing - this is **really** important and you should "definitely" pay attention to this!

✅ DO THIS (Professional):
Here's the thing - this is really important and you should definitely pay attention to this!

CONTENT STRUCTURE (1200+ words):

Write only the main content - no extra quotes, no scattered emojis, no excessive formatting.

## The Hook (150-200 words)
Start with a relatable problem that gets readers nodding along. Use simple, direct language.

## Let Me Explain This Simply (400-500 words)
Break down the technical aspects using everyday analogies. Keep paragraphs short and scannable.

## Why This Matters to You (300-400 words)
Focus on real-world benefits using concrete examples. Make it personal and relevant.

## The Bigger Picture (200-300 words)
Explain industry impact in simple terms. Use sports or business analogies.

## What You Should Do Next (150-200 words)
Give clear, actionable advice. Be direct and helpful.

TONE: Professional but friendly - like a knowledgeable friend explaining something interesting
FORMATTING: Clean, scannable paragraphs with clear headings
NO: Quotes, excessive bold, scattered emojis, messy punctuation

Write the complete article now with clean, professional formatting:`;

        try {
            let content = await this.generateContentWithFallback(interactivePrompt);
            
            // Apply comprehensive cleaning and formatting
            content = this.cleanAndFormatContent(content);
            content = this.addBloggingElements(content, cleanTopic);
            
            return content;
        } catch (error) {
            console.error('Interactive content generation error:', error);
            throw error;
        }
    }

    // Generate themed image for article
    async generateThemedImage(topic, category) {
        try {
            console.log(`🎨 Generating themed image for: ${topic}`);
            
            const imageResult = await this.spacesService.generateAndUploadThemedImage(topic, category);
            
            if (imageResult && imageResult.success) {
                console.log(`✅ Themed image generated and uploaded: ${imageResult.theme} theme`);
                return imageResult;
            } else {
                console.log(`⚠️ Themed image generation failed: ${imageResult ? imageResult.error : 'Unknown error'}`);
                return null;
            }

        } catch (error) {
            console.error('❌ Themed image generation error:', error);
            return null;
        }
    }

    // Generate URL-friendly slug
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .substring(0, 60)
            .trim();
    }

    // Generate meta description from content
    generateMetaDescription(content) {
        const textContent = content.replace(/<[^>]*>/g, ''); // Strip HTML
        return textContent.substring(0, 155) + '...';
    }

    // Generate tags from title and content
    generateTags(title, content) {
        const baseTags = ['mobile technology', 'smartphone reviews', 'tech analysis', 'AI insights'];
        const titleWords = title.toLowerCase().split(' ').filter(word => word.length > 3);
        const contentWords = content.toLowerCase().match(/\b\w{4,}\b/g) || [];
        
        const uniqueWords = [...new Set([...titleWords, ...contentWords])]
            .slice(0, 6);
        
        return [...baseTags, ...uniqueWords];
    }

    // Calculate reading time
    calculateReadingTime(content) {
        const wordsPerMinute = 200;
        const wordCount = this.countWords(content);
        return Math.ceil(wordCount / wordsPerMinute);
    }

    // Count words in content
    countWords(content) {
        const textContent = content.replace(/<[^>]*>/g, ''); // Strip HTML
        return textContent.split(/\s+/).filter(word => word.length > 0).length;
    }

    // 🔥 ENHANCED: Better quality assessment
    assessContentQuality(content) {
        const wordCount = this.countWords(content);
        const hasHeadings = content.includes('<h2>') || content.includes('<h3>');
        const hasTechnicalTerms = /\b(processor|camera|battery|display|5G|AI|smartphone|mobile|technology|performance|specs|review|analysis)\b/i.test(content);
        const hasProperStructure = content.includes('<p>') && content.length > 500;
        const hasInteractiveElements = content.includes('Ever wondered') || content.includes('What if') || content.includes('Here\'s why');
        const isWellFormatted = !content.includes('""') && !content.includes('💡\n') && content.split('<p>').length > 5;
        
        let qualityScore = 0;
        if (wordCount >= 1200) qualityScore += 25;
        if (wordCount >= 800) qualityScore += 15;
        if (hasHeadings) qualityScore += 25;
        if (hasTechnicalTerms) qualityScore += 20;
        if (hasProperStructure) qualityScore += 10;
        if (hasInteractiveElements) qualityScore += 15;
        if (isWellFormatted) qualityScore += 20; // NEW: Bonus for clean formatting
        
        return {
            wordCount: wordCount,
            meetsMinimum: wordCount >= 1200,
            hasStructure: hasHeadings,
            hasTechnicalContent: hasTechnicalTerms,
            hasProperFormatting: hasProperStructure,
            hasInteractiveElements: hasInteractiveElements,
            isWellFormatted: isWellFormatted,
            overallScore: qualityScore,
            grade: this.getQualityGrade(qualityScore)
        };
    }

    // Get quality grade based on score
    getQualityGrade(score) {
        if (score >= 100) return 'Excellent';
        if (score >= 85) return 'Very Good';
        if (score >= 70) return 'Good';
        if (score >= 55) return 'Fair';
        return 'Needs Improvement';
    }

    // Content generation with fallback strategy
    async generateContentWithFallback(prompt) {
        const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];
        
        for (const modelName of models) {
            try {
                const model = this.genAI.getGenerativeModel({ 
                    model: modelName,
                    generationConfig: {
                        temperature: 0.7,
                        topP: 0.8,
                        topK: 40,
                        maxOutputTokens: 4096,
                    }
                });
                const result = await model.generateContent(prompt);
                console.log(`✅ Content generated successfully with ${modelName}`);
                return result.response.text();
            } catch (error) {
                console.log(`⚠️ ${modelName} failed: ${error.message}`);
                if (modelName === models[models.length - 1]) {
                    throw error; // If last model fails, throw the error
                }
                continue;
            }
        }
    }

    // 🔥 MAIN: Article generation method with clean formatting
    async generateCompleteArticle(category) {
        try {
            console.log(`🚀 Generating clean ${category} article for ${this.config.domain} using Gemini 2.5 Flash...`);

            // Generate dynamic topic with interactive headline
            const topic = await this.topicGenerator.generateTopic(category);
            console.log(`📝 Topic: ${topic}`);

            // Clean the topic title
            const cleanTopic = this.cleanMarkdownFromTitle(topic);

            // Generate themed image
            const imageResult = await this.generateThemedImage(cleanTopic, category);

            // 🎯 Generate clean, well-formatted content
            const content = await this.generateInteractiveContent(cleanTopic, category);

            // Assess content quality
            const qualityAssessment = this.assessContentQuality(content);
            console.log(`📊 Content Quality: ${qualityAssessment.grade} (${qualityAssessment.overallScore}/130)`);
            console.log(`🎯 Interactive Elements: ${qualityAssessment.hasInteractiveElements ? 'Yes' : 'No'}`);
            console.log(`✨ Well Formatted: ${qualityAssessment.isWellFormatted ? 'Yes' : 'No'}`);

            // Create article object with enhanced metadata
            const article = new Article({
                title: cleanTopic,
                slug: this.generateSlug(cleanTopic),
                content: content,
                category: category,
                niche: this.config.niche,
                siteId: this.siteId,
                author: this.config.author,
                featuredImage: imageResult ? imageResult.featuredImage : null,
                originalImageUrl: imageResult ? imageResult.originalImageUrl : null,
                imageKey: imageResult ? imageResult.imageKey : null,
                imageUploaded: imageResult ? imageResult.imageUploaded : false,
                seoTitle: cleanTopic.substring(0, 60),
                metaDescription: this.generateMetaDescription(content),
                tags: this.generateTags(cleanTopic, content),
                readingTime: this.calculateReadingTime(content),
                wordCount: this.countWords(content),
                publishedAt: new Date(),
                aiModel: 'gemini-2.5-flash',
                contentStyle: 'interactive-clean',
                qualityScore: qualityAssessment.overallScore
            });

            // Save to database
            const savedArticle = await article.save();
            console.log(`✅ Clean interactive article generated: ${savedArticle._id}`);
            console.log(`📊 Word count: ${savedArticle.wordCount}, Reading time: ${savedArticle.readingTime} min`);
            console.log(`🎨 Image theme: ${imageResult ? imageResult.theme : 'No image'}`);
            console.log(`🎯 Quality Score: ${qualityAssessment.overallScore}/130 (${qualityAssessment.grade})`);

            return savedArticle;

        } catch (error) {
            console.error('❌ Clean article generation error:', error);
            throw error;
        }
    }

    // Generate multiple articles for bulk testing
    async generateBulkArticles(categories, count = 1) {
        const results = [];
        
        for (const category of categories) {
            for (let i = 0; i < count; i++) {
                try {
                    console.log(`📝 Generating clean article ${i + 1}/${count} for category: ${category}`);
                    const article = await this.generateCompleteArticle(category);
                    results.push({
                        success: true,
                        category: category,
                        article: {
                            id: article._id,
                            title: article.title,
                            wordCount: article.wordCount,
                            qualityScore: article.qualityScore,
                            contentStyle: article.contentStyle,
                            theme: article.imageKey ? 'themed' : 'fallback'
                        }
                    });
                } catch (error) {
                    results.push({
                        success: false,
                        category: category,
                        error: error.message
                    });
                }
            }
        }
        
        return results;
    }

    // Test content generation without saving
    async testContentGeneration(topic) {
        try {
            const testPrompt = `Write a brief, clean 200-word analysis about: "${topic}"
            
Requirements:
- Professional but friendly tone
- Ask at least 2 questions naturally
- Use simple analogies
- Focus on user benefits
- NO quotation marks anywhere
- Clean, scannable paragraphs
- HTML formatting only

Write the analysis now:`;

            const content = await this.generateContentWithFallback(testPrompt);
            const processedContent = this.cleanAndFormatContent(content);
            const finalContent = this.addBloggingElements(processedContent, topic);
            const quality = this.assessContentQuality(finalContent);
            
            return {
                success: true,
                content: finalContent,
                wordCount: this.countWords(finalContent),
                quality: quality,
                interactive: quality.hasInteractiveElements,
                wellFormatted: quality.isWellFormatted
            };
            
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
}

module.exports = ContentGenerator;
