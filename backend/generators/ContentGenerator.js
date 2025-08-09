// // backend/generators/ContentGenerator.js - COMPLETE ASTROLOGY PLATFORM
// const DynamicTopicGenerator = require('./DynamicTopicGenerator');
// const siteConfig = require('../config/siteConfig');
// const Article = require('../models/Article');
// const SpacesService = require('../services/spacesService');
// const OpenAI = require('openai');

// class AstrologyContentGenerator {
//     constructor(siteId) {
//         this.siteId = siteId;
//         this.config = siteConfig.getConfig(siteId);
//         this.topicGenerator = new DynamicTopicGenerator(siteId);
//         this.spacesService = new SpacesService();
        
//         // Initialize OpenAI for DALL-E image generation
//         this.openai = new OpenAI({
//             apiKey: process.env.OPENAI_API_KEY
//         });
        
//         // Initialize Gemini for content generation
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

//         // Initialize Perplexity for real-time content
//         this.perplexityApiKey = process.env.PERPLEXITY_API_KEY;
//     }

//     // Determine content language based on strategy
//     determineContentLanguage() {
//         const languages = this.config.languages;
//         const ratio = languages.contentRatio;
        
//         // Rotate based on current time and ratio
//         const random = Math.random() * 100;
//         return random < ratio.english ? 'english' : 'hindi';
//     }

//     // Get localized zodiac sign
//     getLocalizedZodiacSign(language = 'english') {
//         const signs = this.config.dynamicSeeds.zodiacSigns;
//         const randomSign = signs[Math.floor(Math.random() * signs.length)];
//         return randomSign[language] || randomSign.english;
//     }

//     // Get localized planet
//     getLocalizedPlanet(language = 'english') {
//         const planets = this.config.dynamicSeeds.planetaryBodies;
//         const randomPlanet = planets[Math.floor(Math.random() * planets.length)];
//         return randomPlanet[language] || randomPlanet.english;
//     }

//     // Clean markdown symbols from title
//     cleanMarkdownFromTitle(title) {
//         return title
//             .replace(/\*\*(.*?)\*\*/g, '$1')
//             .replace(/\*(.*?)\*/g, '$1')
//             .replace(/#{1,6}\s*/g, '')
//             .replace(/`(.*?)`/g, '$1')
//             .replace(/\n/g, ' ')
//             .replace(/"/g, '')
//             .trim();
//     }

//     // Clean and format content
//     cleanAndFormatContent(content) {
//         return content
//             .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
//             .replace(/\*(.*?)\*/g, '<em>$1</em>')
//             .replace(/#{3}\s*(.*?)$/gm, '<h3>$1</h3>')
//             .replace(/#{2}\s*(.*?)$/gm, '<h2>$1</h2>')
//             .replace(/#{1}\s*(.*?)$/gm, '<h1>$1</h1>')
//             .replace(/"/g, '')
//             .replace(/'/g, "'")
//             .replace(/💡\s*\n/g, '')
//             .replace(/🤔\s*\n/g, '')
//             .replace(/\n{3,}/g, '\n\n')
//             .replace(/\n\n/g, '</p><p>')
//             .replace(/^(.*)$/gm, '<p>$1</p>')
//             .replace(/<p><\/p>/g, '')
//             .replace(/<p><h/g, '<h')
//             .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
//             .replace(/<p>\s*<\/p>/g, '')
//             .replace(/\s+/g, ' ')
//             .replace(/<p>\s+/g, '<p>')
//             .replace(/\s+<\/p>/g, '</p>');
//     }

//     // Generate astrology content with language support
//     async generateAstrologyContent(topic, category, language) {
//         const cleanTopic = this.cleanMarkdownFromTitle(topic);
        
//         // Determine which AI to use based on category
//         const usePerplexity = ['daily-horoscope', 'lucky-suggestions', 'muhurat-timing'].includes(category);
        
//         // Get localized astrology data
//         const zodiacSign = this.getLocalizedZodiacSign(language);
//         const planet = this.getLocalizedPlanet(language);
        
//         // Language-specific prompts
//         const prompt = language === 'hindi' 
//             ? this.getHindiPrompt(cleanTopic, category, zodiacSign, planet)
//             : this.getEnglishPrompt(cleanTopic, category, zodiacSign, planet);

//         try {
//             let content;
            
//             if (usePerplexity && this.perplexityApiKey) {
//                 content = await this.generateWithPerplexity(prompt);
//             } else {
//                 content = await this.generateWithGemini(prompt);
//             }
            
//             content = this.cleanAndFormatContent(content);
            
//             return {
//                 content,
//                 language,
//                 zodiacSign,
//                 planet
//             };
//         } catch (error) {
//             console.error('Astrology content generation error:', error);
//             throw error;
//         }
//     }

//     // English content prompt
//     getEnglishPrompt(topic, category, zodiacSign, planet) {
//         return `You are a wise astrology expert combining ancient Vedic wisdom with practical modern life guidance. Write about: "${topic}"

// UNIQUE APPROACH - PRACTICAL ASTROLOGY:
// Like Hanuman bringing the Sanjeevani mountain (representing abundant healing herbs, not literal mountain), explain astrological concepts through practical applications.

// CURRENT COSMIC CONTEXT:
// - Featured Zodiac: ${zodiacSign}
// - Planetary Influence: ${planet}
// - Category: ${category}

// WRITING STYLE:
// - Use stories from Ramayana/Mahabharata to illustrate points
// - Explain WHY astrological influences work psychologically
// - Provide actionable, specific advice
// - Avoid superstitious language
// - Focus on empowerment and wisdom

// CONTENT STRUCTURE (1200+ words):
// ## Ancient Wisdom Meets Modern Life (200 words)
// ## The Astrological Perspective (400 words)  
// ## Practical Applications (400 words)
// ## Ancient Stories for Modern Challenges (200 words)

// TONE: Wise but accessible, like a knowledgeable friend
// LANGUAGE: English with occasional Sanskrit terms
// FOCUS: Practical wisdom and real-world applications

// Write the complete article now:`;
//     }

//     // Hindi content prompt
//     getHindiPrompt(topic, category, zodiacSign, planet) {
//         return `आप एक ज्ञानी ज्योतिष विशेषज्ञ हैं जो प्राचीन वैदिक ज्ञान को आधुनिक जीवन के व्यावहारिक मार्गदर्शन के साथ जोड़ते हैं। इस विषय पर लिखें: "${topic}"

// विशेष दृष्टिकोण - व्यावहारिक ज्योतिष:
// जैसे हनुमान संजीवनी पर्वत लाए (जो वास्तव में बहुत सारी औषधीय जड़ी-बूटियों का प्रतीक था), ज्योतिषीय अवधारणाओं को व्यावहारिक अनुप्रयोगों के माध्यम से समझाएं।

// वर्तमान कॉस्मिक संदर्भ:
// - राशि: ${zodiacSign}
// - ग्रह प्रभाव: ${planet}
// - श्रेणी: ${category}

// लेखन शैली:
// - रामायण/महाभारत की कहानियों का उपयोग करें
// - ज्योतिषीय प्रभावों का मनोवैज्ञानिक कारण बताएं
// - व्यावहारिक, विशिष्ट सलाह दें
// - अंधविश्वास की भाषा से बचें
// - सशक्तिकरण और ज्ञान पर ध्यान दें

// सामग्री संरचना (1200+ शब्द):
// ## प्राचीन ज्ञान आधुनिक जीवन से मिलता है (200 शब्द)
// ## ज्योतिषीय दृष्टिकोण (400 शब्द)
// ## व्यावहारिक अनुप्रयोग (400 शब्द)
// ## आधुनिक चुनौतियों के लिए प्राचीन कहानियां (200 शब्द)

// स्वर: ज्ञानी लेकिन सुलभ, एक जानकार मित्र की तरह
// भाषा: हिंदी संस्कृत शब्दों के साथ
// फोकस: व्यावहारिक ज्ञान और वास्तविक अनुप्रयोग

// अब पूरा लेख लिखें:`;
//     }

//     // Generate with Perplexity (for real-time content)
//     async generateWithPerplexity(prompt) {
//         const response = await fetch('https://api.perplexity.ai/chat/completions', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${this.perplexityApiKey}`,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 model: 'sonar',
//                 messages: [{ role: 'user', content: prompt }],
//                 max_tokens: 1000,
//                 temperature: 0.7,
//                 top_p: 0.8,
//                 stream: false
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`Perplexity API error: ${response.status}`);
//         }

//         const data = await response.json();
//         return data.choices[0].message.content;
//     }

//     // Generate with Gemini (for analytical content)
//     async generateWithGemini(prompt) {
//         const result = await this.model.generateContent(prompt);
//         return result.response.text();
//     }

//     // Generate themed astrology image
//     async generateThemedImage(topic, category) {
//         try {
//             console.log(`🎨 Generating astrology image for: ${topic}`);
//             const imageResult = await this.spacesService.generateAndUploadThemedImage(topic, category);
//             return imageResult;
//         } catch (error) {
//             console.error('❌ Astrology image generation error:', error);
//             return null;
//         }
//     }

//     // Main article generation method
//     async generateCompleteArticle(category) {
//         try {
//             // Determine content language
//             const language = this.determineContentLanguage();
            
//             console.log(`🌟 Generating ${category} astrology article in ${language}...`);

//             // Generate dynamic topic using AstrologyTopicGenerator
//             const topic = await this.topicGenerator.generateTopic(category, language);
//             console.log(`📝 Topic (${language}): ${topic}`);

//             const cleanTopic = this.cleanMarkdownFromTitle(topic);
//             const imageResult = await this.generateThemedImage(cleanTopic, category);
//             const contentResult = await this.generateAstrologyContent(cleanTopic, category, language);

//             const article = new Article({
//                 title: cleanTopic,
//                 slug: this.generateSlug(cleanTopic),
//                 content: contentResult.content,
//                 category: category,
//                 niche: this.config.niche,
//                 siteId: this.siteId,
//                 author: this.config.author,
//                 featuredImage: imageResult ? imageResult.featuredImage : null,
//                 originalImageUrl: imageResult ? imageResult.originalImageUrl : null,
//                 imageKey: imageResult ? imageResult.imageKey : null,
//                 imageUploaded: imageResult ? imageResult.imageUploaded : false,
//                 seoTitle: cleanTopic.substring(0, 60),
//                 metaDescription: this.generateMetaDescription(contentResult.content),
//                 tags: this.generateAstrologyTags(cleanTopic, contentResult.content, category, language),
//                 readingTime: this.calculateReadingTime(contentResult.content),
//                 wordCount: this.countWords(contentResult.content),
//                 publishedAt: new Date(),
//                 aiModel: category.includes('daily') ? 'perplexity-sonar' : 'gemini-2.5-flash',
//                 contentStyle: 'practical-astrology',
                
//                 // Multi-language specific fields
//                 language: language,
//                 zodiacSign: contentResult.zodiacSign,
//                 planetaryInfluence: contentResult.planet
//             });

//             const savedArticle = await article.save();
//             console.log(`✅ Astrology article generated in ${language}: ${savedArticle._id}`);
            
//             return savedArticle;

//         } catch (error) {
//             console.error('❌ Astrology article generation error:', error);
//             throw error;
//         }
//     }

//     // Helper methods
//     generateAstrologyTags(title, content, category, language) {
//         const baseTags = language === 'hindi' 
//             ? ['ज्योतिष', 'राशिफल', 'वैदिक ज्योतिष', 'भविष्यवाणी']
//             : ['astrology', 'horoscope', 'vedic astrology', 'predictions'];
            
//         return [...baseTags, category, language];
//     }

//     generateSlug(title) {
//         return title
//             .toLowerCase()
//             .replace(/[^\w\s-]/g, '')
//             .replace(/\s+/g, '-')
//             .replace(/-+/g, '-')
//             .substring(0, 60)
//             .trim();
//     }

//     generateMetaDescription(content) {
//         const textContent = content.replace(/<[^>]*>/g, '');
//         return textContent.substring(0, 155) + '...';
//     }

//     calculateReadingTime(content) {
//         const wordsPerMinute = 200;
//         const wordCount = this.countWords(content);
//         return Math.ceil(wordCount / wordsPerMinute);
//     }

//     countWords(content) {
//         const textContent = content.replace(/<[^>]*>/g, '');
//         return textContent.split(/\s+/).filter(word => word.length > 0).length;
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

//     // Assess content quality
//     assessContentQuality(content) {
//         const wordCount = this.countWords(content);
//         const hasHeadings = content.includes('<h2>') || content.includes('<h3>');
//         const hasAstrologyTerms = /\b(राशि|ज्योतिष|astrology|zodiac|planet|horoscope|cosmic|vedic)\b/i.test(content);
//         const hasProperStructure = content.includes('<p>') && content.length > 500;
//         const hasCulturalTerms = /\b(ramayana|mahabharata|hanuman|sanskrit|vedic|ancient)\b/i.test(content);
        
//         let qualityScore = 0;
//         if (wordCount >= 1200) qualityScore += 25;
//         if (wordCount >= 800) qualityScore += 15;
//         if (hasHeadings) qualityScore += 25;
//         if (hasAstrologyTerms) qualityScore += 20;
//         if (hasProperStructure) qualityScore += 10;
//         if (hasCulturalTerms) qualityScore += 15;
        
//         return {
//             wordCount: wordCount,
//             meetsMinimum: wordCount >= 1200,
//             hasStructure: hasHeadings,
//             hasAstrologyContent: hasAstrologyTerms,
//             hasCulturalElements: hasCulturalTerms,
//             overallScore: qualityScore,
//             grade: this.getQualityGrade(qualityScore)
//         };
//     }

//     // Get quality grade based on score
//     getQualityGrade(score) {
//         if (score >= 100) return 'Excellent';
//         if (score >= 85) return 'Very Good';
//         if (score >= 70) return 'Good';
//         if (score >= 55) return 'Fair';
//         return 'Needs Improvement';
//     }
// }

// module.exports = AstrologyContentGenerator;


// backend/generators/ContentGenerator.js - 100% HINDI ASTROLOGY PLATFORM
const DynamicTopicGenerator = require('./DynamicTopicGenerator');
const siteConfig = require('../config/siteConfig');
const Article = require('../models/Article');
const SpacesService = require('../services/spacesService');
const OpenAI = require('openai');

class AstrologyContentGenerator {
    constructor(siteId) {
        this.siteId = siteId;
        this.config = siteConfig.getConfig(siteId);
        this.topicGenerator = new DynamicTopicGenerator(siteId);
        this.spacesService = new SpacesService();
        
        // Initialize OpenAI for DALL-E image generation
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        
        // Initialize Gemini for content generation
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

        // Initialize Perplexity for real-time content
        this.perplexityApiKey = process.env.PERPLEXITY_API_KEY;
    }

    // CHANGED: Always return Hindi (removed language selection logic)
    determineContentLanguage() {
        return 'hindi'; // Always Hindi now
    }

    // CHANGED: Get Hindi zodiac sign by default
    getLocalizedZodiacSign(language = 'hindi') {
        const signs = this.config.dynamicSeeds.zodiacSigns;
        const randomSign = signs[Math.floor(Math.random() * signs.length)];
        return randomSign[language] || randomSign.hindi; // Default to Hindi
    }

    // CHANGED: Get Hindi planet by default
    getLocalizedPlanet(language = 'hindi') {
        const planets = this.config.dynamicSeeds.planetaryBodies;
        const randomPlanet = planets[Math.floor(Math.random() * planets.length)];
        return randomPlanet[language] || randomPlanet.hindi; // Default to Hindi
    }

    // Clean markdown symbols from title
    cleanMarkdownFromTitle(title) {
        return title
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/\*(.*?)\*/g, '$1')
            .replace(/#{1,6}\s*/g, '')
            .replace(/`(.*?)`/g, '$1')
            .replace(/\n/g, ' ')
            .replace(/"/g, '')
            .trim();
    }

    // Clean and format content
    cleanAndFormatContent(content) {
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/#{3}\s*(.*?)$/gm, '<h3>$1</h3>')
            .replace(/#{2}\s*(.*?)$/gm, '<h2>$1</h2>')
            .replace(/#{1}\s*(.*?)$/gm, '<h1>$1</h1>')
            .replace(/"/g, '')
            .replace(/'/g, "'")
            .replace(/💡\s*\n/g, '')
            .replace(/🤔\s*\n/g, '')
            .replace(/\n{3,}/g, '\n\n')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(.*)$/gm, '<p>$1</p>')
            .replace(/<p><\/p>/g, '')
            .replace(/<p><h/g, '<h')
            .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
            .replace(/<p>\s*<\/p>/g, '')
            .replace(/\s+/g, ' ')
            .replace(/<p>\s+/g, '<p>')
            .replace(/\s+<\/p>/g, '</p>');
    }

    // CHANGED: Always generate Hindi content (removed language parameter logic)
    async generateAstrologyContent(topic, category, language = 'hindi') {
        const cleanTopic = this.cleanMarkdownFromTitle(topic);
        
        // Determine which AI to use based on category
        const usePerplexity = ['daily-horoscope', 'lucky-suggestions', 'muhurat-timing'].includes(category);
        
        // Get Hindi astrology data
        const zodiacSign = this.getLocalizedZodiacSign('hindi');
        const planet = this.getLocalizedPlanet('hindi');
        
        // CHANGED: Always use Hindi prompt
        const prompt = this.getHindiPrompt(cleanTopic, category, zodiacSign, planet);

        try {
            let content;
            
            if (usePerplexity && this.perplexityApiKey) {
                content = await this.generateWithPerplexity(prompt);
            } else {
                content = await this.generateWithGemini(prompt);
            }
            
            content = this.cleanAndFormatContent(content);
            
            return {
                content,
                language: 'hindi', // Always Hindi
                zodiacSign,
                planet
            };
        } catch (error) {
            console.error('Astrology content generation error:', error);
            throw error;
        }
    }

    // REMOVED: English prompt method (not needed anymore)

    // ENHANCED: Hindi content prompt for 100% Hindi audience
    getHindiPrompt(topic, category, zodiacSign, planet) {
        return `आप एक अनुभवी ज्योतिष विशेषज्ञ हैं जो प्राचीन वैदिक ज्ञान को आधुनिक जीवन के व्यावहारिक मार्गदर्शन के साथ जोड़ते हैं। भारतीय हिंदी भाषी दर्शकों के लिए इस विषय पर विस्तृत लेख लिखें: "${topic}"

विशेष दृष्टिकोण - व्यावहारिक ज्योतिष:
जैसे हनुमानजी संजीवनी पर्वत लाए (जो वास्तव में अनेक औषधीय जड़ी-बूटियों का प्रतीक था), वैसे ही ज्योतिषीय अवधारणाओं को व्यावहारिक अनुप्रयोगों के माध्यम से समझाएं।

वर्तमान कॉस्मिक संदर्भ:
- राशि: ${zodiacSign}
- ग्रह प्रभाव: ${planet}
- श्रेणी: ${category}

लेखन शैली (हिंदी दर्शकों के लिए):
- रामायण/महाभारत की कहानियों का उपयोग करके बिंदुओं को स्पष्ट करें
- ज्योतिषीय प्रभावों का मनोवैज्ञानिक कारण बताएं
- व्यावहारिक, विशिष्ट सलाह दें जो दैनिक जीवन में उपयोगी हो
- अंधविश्वास की भाषा से बचें, तर्कसंगत व्याख्या करें
- पाठकों को सशक्त बनाने और ज्ञान बढ़ाने पर ध्यान दें
- भारतीय संस्कृति और परंपराओं का सम्मान करें

सामग्री संरचना (कम से कम 1200 शब्द):
## प्राचीन ज्ञान का आधुनिक जीवन से मेल (200 शब्द)
- वैदिक ज्योतिष का वैज्ञानिक आधार
- आज के समय में इसकी प्रासंगिकता

## ज्योतिषीय दृष्टिकोण (400 शब्द)
- ${zodiacSign} और ${planet} का प्रभाव
- इस विषय का गहरा ज्योतिषीय विश्लेषण
- शास्त्रीय ग्रंथों के अनुसार व्याख्या

## व्यावहारिक अनुप्रयोग और सुझाव (400 शब्द)
- दैनिक जीवन में कैसे उपयोग करें
- व्यावहारिक उपाय और तरीके
- सफलता के लिए कार्य योजना

## आधुनिक चुनौतियों के लिए प्राचीन समाधान (200 शब्द)
- पुराणों और महाकाव्यों से सीख
- आज की समस्याओं का प्राचीन समाधान

भाषा और स्वर:
- शुद्ध हिंदी में लेकिन सरल और समझने योग्य
- संस्कृत शब्दों का उपयोग करें लेकिन उनका अर्थ भी स्पष्ट करें
- मित्रवत लेकिन ज्ञानपूर्ण स्वर बनाए रखें
- पाठकों से सीधा संवाद करें

फोकस:
- व्यावहारिक ज्ञान और वास्तविक अनुप्रयोग
- भारतीय जीवनशैली के अनुकूल सुझाव
- आत्मनिर्भरता और सकारात्मक सोच को बढ़ावा

अब पूरा लेख हिंदी में लिखें:`;
    }

    // Generate with Perplexity (for real-time content) - UPDATED Hindi prompt
    // async generateWithPerplexity(prompt) {
    //     const response = await fetch('https://api.perplexity.ai/chat/completions', {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': `Bearer ${this.perplexityApiKey}`,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             model: 'sonar',
    //             messages: [{ 
    //                 role: 'user', 
    //                 content: prompt + "\n\nकृपया उत्तर हिंदी में दें।" // Always request Hindi response
    //             }],
    //             max_tokens: 1000,
    //             temperature: 0.7,
    //             top_p: 0.8,
    //             stream: false
    //         })
    //     });

    //     if (!response.ok) {
    //         throw new Error(`Perplexity API error: ${response.status}`);
    //     }

    //     const data = await response.json();
    //     return data.choices[0].message.content;
    // }
    async generateWithPerplexity(prompt) {
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${this.perplexityApiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'sonar',
            messages: [{ 
                role: 'user', 
                content: prompt + "\n\nकृपया उत्तर हिंदी में दें।"
            }],
            max_tokens: 4000, // Increased to 4000
            temperature: 0.7,
            top_p: 0.8,
            stream: false
        })
    });
    }

    // Generate with Gemini (for analytical content)
    async generateWithGemini(prompt) {
        const result = await this.model.generateContent(prompt);
        return result.response.text();
    }

    // Generate themed astrology image
    async generateThemedImage(topic, category) {
        try {
            console.log(`🎨 Generating astrology image for: ${topic}`);
            const imageResult = await this.spacesService.generateAndUploadThemedImage(topic, category);
            return imageResult;
        } catch (error) {
            console.error('❌ Astrology image generation error:', error);
            return null;
        }
    }

    // CHANGED: Main article generation - always Hindi
    async generateCompleteArticle(category) {
        try {
            // CHANGED: Always use Hindi (removed language determination)
            const language = 'hindi';
            
            console.log(`🌟 Generating ${category} astrology article in Hindi...`);

            // Generate dynamic topic in Hindi
            const topic = await this.topicGenerator.generateTopic(category, language);
            console.log(`📝 Topic (Hindi): ${topic}`);

            const cleanTopic = this.cleanMarkdownFromTitle(topic);
            const imageResult = await this.generateThemedImage(cleanTopic, category);
            const contentResult = await this.generateAstrologyContent(cleanTopic, category, language);

            const article = new Article({
                title: cleanTopic,
                slug: this.generateSlug(cleanTopic),
                content: contentResult.content,
                category: category,
                niche: this.config.niche,
                siteId: this.siteId,
                author: this.config.author,
                featuredImage: imageResult ? imageResult.featuredImage : null,
                originalImageUrl: imageResult ? imageResult.originalImageUrl : null,
                imageKey: imageResult ? imageResult.imageKey : null,
                imageUploaded: imageResult ? imageResult.imageUploaded : false,
                seoTitle: cleanTopic.substring(0, 60),
                metaDescription: this.generateMetaDescription(contentResult.content),
                tags: this.generateAstrologyTags(cleanTopic, contentResult.content, category, language),
                readingTime: this.calculateReadingTime(contentResult.content),
                wordCount: this.countWords(contentResult.content),
                publishedAt: new Date(),
                aiModel: category.includes('daily') ? 'perplexity-sonar' : 'gemini-2.5-flash',
                contentStyle: 'practical-astrology',
                
                // CHANGED: Always Hindi language fields
                language: 'hindi', // Always Hindi
                zodiacSign: contentResult.zodiacSign,
                planetaryInfluence: contentResult.planet
            });

            const savedArticle = await article.save();
            console.log(`✅ Hindi astrology article generated: ${savedArticle._id}`);
            
            return savedArticle;

        } catch (error) {
            console.error('❌ Hindi astrology article generation error:', error);
            throw error;
        }
    }

    // CHANGED: Helper methods - Hindi tags by default
    generateAstrologyTags(title, content, category, language = 'hindi') {
        // CHANGED: Always Hindi tags
        const baseTags = ['ज्योतिष', 'राशिफल', 'वैदिक ज्योतिष', 'भविष्यवाणी', 'हिंदी ज्योतिष'];
            
        return [...baseTags, category, language];
    }

    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .substring(0, 60)
            .trim();
    }

    generateMetaDescription(content) {
        const textContent = content.replace(/<[^>]*>/g, '');
        return textContent.substring(0, 155) + '...';
    }

    calculateReadingTime(content) {
        const wordsPerMinute = 200;
        const wordCount = this.countWords(content);
        return Math.ceil(wordCount / wordsPerMinute);
    }

    countWords(content) {
        const textContent = content.replace(/<[^>]*>/g, '');
        return textContent.split(/\s+/).filter(word => word.length > 0).length;
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
                console.log(`✅ Hindi content generated successfully with ${modelName}`);
                return result.response.text();
            } catch (error) {
                console.log(`⚠️ ${modelName} failed: ${error.message}`);
                if (modelName === models[models.length - 1]) {
                    throw error;
                }
                continue;
            }
        }
    }

    // Assess content quality
    assessContentQuality(content) {
        const wordCount = this.countWords(content);
        const hasHeadings = content.includes('<h2>') || content.includes('<h3>');
        const hasAstrologyTerms = /\b(राशि|ज्योतिष|astrology|zodiac|planet|horoscope|cosmic|vedic|ग्रह|नक्षत्र|भविष्य)\b/i.test(content);
        const hasProperStructure = content.includes('<p>') && content.length > 500;
        const hasCulturalTerms = /\b(रामायण|महाभारत|हनुमान|संस्कृत|वैदिक|प्राचीन|ramayana|mahabharata|hanuman|sanskrit|vedic|ancient)\b/i.test(content);
        
        let qualityScore = 0;
        if (wordCount >= 1200) qualityScore += 25;
        if (wordCount >= 800) qualityScore += 15;
        if (hasHeadings) qualityScore += 25;
        if (hasAstrologyTerms) qualityScore += 20;
        if (hasProperStructure) qualityScore += 10;
        if (hasCulturalTerms) qualityScore += 15;
        
        return {
            wordCount: wordCount,
            meetsMinimum: wordCount >= 1200,
            hasStructure: hasHeadings,
            hasAstrologyContent: hasAstrologyTerms,
            hasCulturalElements: hasCulturalTerms,
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
}

module.exports = AstrologyContentGenerator;

