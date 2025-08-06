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


// generators/VedicContentGenerator.js - HINDI-FIRST COMPLETE ASTROLOGY PLATFORM
const VedicTopicGenerator = require('./VedicTopicGenerator');
const siteConfig = require('../config/siteConfig');
const Article = require('../models/Article');
const SpacesService = require('../services/spacesService');

class VedicContentGenerator {
    constructor(siteId) {
        this.siteId = siteId;
        this.config = siteConfig.getConfig(siteId);
        this.topicGenerator = new VedicTopicGenerator(siteId);
        this.spacesService = new SpacesService();
        
        // Initialize Gemini for content generation
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // Initialize Perplexity for real-time content
        this.perplexityApiKey = process.env.PERPLEXITY_API_KEY;
    }

    // Content language - Hindi first
    determineContentLanguage() {
        const languages = this.config.languages;
        const ratio = languages.contentRatio;
        
        // 80% Hindi, 20% English for Hindi-first approach
        const random = Math.random() * 100;
        return random < 80 ? 'hindi' : 'english';
    }

    // Get localized zodiac sign in Hindi
    getLocalizedRashi(language = 'hindi') {
        const rashis = this.config.dynamicSeeds.zodiacSigns;
        const randomRashi = rashis[Math.floor(Math.random() * rashis.length)];
        return language === 'hindi' ? randomRashi.hindi : randomRashi.english;
    }

    // Get localized planet in Hindi
    getLocalizedGraha(language = 'hindi') {
        const grahas = this.config.dynamicSeeds.planetaryBodies;
        const randomGraha = grahas[Math.floor(Math.random() * grahas.length)];
        return language === 'hindi' ? randomGraha.hindi : randomGraha.english;
    }

    // Clean Hindi content formatting
    cleanAndFormatHindiContent(content) {
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-orange-800">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="italic text-orange-700">$1</em>')
            .replace(/#{3}\s*(.*?)$/gm, '<h3 class="text-xl font-bold text-orange-800 mt-6 mb-3 flex items-center"><span class="mr-2">🌟</span>$1</h3>')
            .replace(/#{2}\s*(.*?)$/gm, '<h2 class="text-2xl font-bold text-orange-800 mt-8 mb-4 flex items-center"><span class="mr-2">✨</span>$1</h2>')
            .replace(/#{1}\s*(.*?)$/gm, '<h1 class="text-3xl font-bold text-orange-800 mt-10 mb-6 flex items-center"><span class="mr-2">🕉️</span>$1</h1>')
            .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-gray-800 hindi-text">')
            .replace(/^(.*)$/gm, '<p class="mb-4 leading-relaxed text-gray-800 hindi-text">$1</p>')
            .replace(/<p class="mb-4 leading-relaxed text-gray-800 hindi-text"><\/p>/g, '')
            .replace(/<p class="mb-4 leading-relaxed text-gray-800 hindi-text"><h/g, '<h')
            .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
            // Add special formatting for mantras and Sanskrit text
            .replace(/(ॐ [^।]+।?)/g, '<span class="sanskrit-text text-orange-900 font-bold bg-yellow-100 px-2 py-1 rounded border border-orange-300">$1</span>')
            .replace(/\s+/g, ' ')
            .replace(/<p class="mb-4 leading-relaxed text-gray-800 hindi-text">\s+/g, '<p class="mb-4 leading-relaxed text-gray-800 hindi-text">')
            .replace(/\s+<\/p>/g, '</p>');
    }

    // Generate Vedic content with Hindi focus
    async generateVedicContent(topic, category, language) {
        const cleanTopic = this.cleanMarkdownFromTitle(topic);
        
        // Use Perplexity for real-time categories
        const usePerplexity = ['daily-rashifal', 'shubh-muhurat', 'graha-gochar'].includes(category);
        
        // Get localized astrology data
        const rashi = this.getLocalizedRashi(language);
        const graha = this.getLocalizedGraha(language);
        
        // Language-specific prompts - Hindi first
        const prompt = language === 'hindi' 
            ? this.getVedicHindiPrompt(cleanTopic, category, rashi, graha)
            : this.getVedicEnglishPrompt(cleanTopic, category, rashi, graha);

        try {
            let content;
            
            if (usePerplexity && this.perplexityApiKey) {
                content = await this.generateWithPerplexity(prompt);
            } else {
                content = await this.generateWithGemini(prompt);
            }
            
            content = language === 'hindi' 
                ? this.cleanAndFormatHindiContent(content)
                : this.cleanAndFormatContent(content);
            
            return {
                content,
                language,
                rashi,
                graha
            };
        } catch (error) {
            console.error('Vedic content generation error:', error);
            throw error;
        }
    }

    // Vedic Hindi content prompt
    getVedicHindiPrompt(topic, category, rashi, graha) {
        return `आप एक ज्ञानी वैदिक ज्योतिषी हैं जो प्राचीन संस्कृत ग्रंथों के गहन अध्ययन के साथ आधुनिक जीवन में व्यावहारिक मार्गदर्शन प्रदान करते हैं। इस विषय पर लिखें: "${topic}"

विशेष दृष्टिकोण - व्यावहारिक वैदिक ज्ञान:
जैसे हनुमान जी संजीवनी पर्वत लेकर आए (जो वास्तव में असंख्य औषधीय जड़ी-बूटियों का प्रतीक था), वैसे ही ज्योतिषीय अवधारणाओं को व्यावहारिक जीवन समाधानों के माध्यम से समझाएं।

वर्तमान कॉस्मिक संदर्भ:
- मुख्य राशि: ${rashi}
- ग्रह प्रभाव: ${graha}
- श्रेणी: ${category}
- आज की तारीख: ${new Date().toLocaleDateString('hi-IN')}

लेखन शैली:
- रामायण/महाभारत की प्रेरणादायक कहानियों का उपयोग करें
- ज्योतिषीय प्रभावों का वैज्ञानिक और मनोवैज्ञानिक कारण बताएं
- व्यावहारिक, तुरंत लागू होने योग्य सलाह दें
- अंधविश्वास से दूर रहें, तर्कसंगत समझाएं
- सशक्तिकरण और आत्मविश्वास पर ध्यान दें
- प्राचीन श्लोकों और मंत्रों का सही संदर्भ के साथ उपयोग करें

सामग्री संरचना (1200+ शब्द):
## प्राचीन वैदिक ज्ञान से आधुनिक जीवन समाधान (200 शब्द)
## ज्योतिषीय विश्लेषण और वैज्ञानिक दृष्टिकोण (400 शब्द)  
## व्यावहारिक अनुप्रयोग और तुरंत करने योग्य कार्य (400 शब्द)
## महान ग्रंथों से प्रेरणा और आधुनिक चुनौतियों का समाधान (200 शब्द)

स्वर: ज्ञानी परंतु मित्रवत, एक अनुभवी पंडित जी की तरह
भाषा: शुद्ध हिंदी संस्कृत शब्दावली के साथ, जटिल शब्दों का सरल अर्थ भी दें
फोकस: व्यावहारिक ज्ञान जो पाठक आज ही अपने जीवन में उपयोग कर सकें

महत्वपूर्ण निर्देश:
- हर सलाह के साथ "क्यों" का उत्तर दें
- प्राचीन उदाहरणों को आधुनिक संदर्भ में समझाएं
- मंत्रों का अर्थ और उच्चारण विधि भी बताएं
- शुभ समय, रंग, दिशा आदि की वैज्ञानिक व्याख्या करें

अब पूरा वैदिक ज्योतिष लेख हिंदी में लिखें:`;
    }

    // English Vedic content prompt
    getVedicEnglishPrompt(topic, category, rashi, graha) {
        return `You are a wise Vedic astrologer combining ancient Sanskrit wisdom with practical modern life guidance. Write about: "${topic}"

UNIQUE APPROACH - PRACTICAL VEDIC WISDOM:
Like Hanuman bringing the Sanjeevani mountain (representing abundant healing herbs, not literal mountain), explain Vedic astrological concepts through practical applications that people can use today.

CURRENT COSMIC CONTEXT:
- Featured Rashi: ${rashi}
- Graha Influence: ${graha}
- Category: ${category}
- Today's Date: ${new Date().toLocaleDateString('en-IN')}

WRITING STYLE:
- Use stories from Ramayana/Mahabharata to illustrate points
- Explain WHY Vedic influences work psychologically and scientifically
- Provide actionable, specific advice
- Avoid superstitious language, focus on logical understanding
- Emphasize empowerment and wisdom
- Include authentic Sanskrit terms with proper explanations

CONTENT STRUCTURE (1200+ words):
## Ancient Vedic Wisdom Meets Modern Life (200 words)
## Astrological Analysis and Scientific Perspective (400 words)  
## Practical Applications and Immediate Actions (400 words)
## Epic Stories for Modern Challenges (200 words)

TONE: Wise but accessible, like a knowledgeable Pandit ji
LANGUAGE: Clear English with Sanskrit terms properly explained
FOCUS: Practical wisdom and real-world applications

Important Guidelines:
- Explain the "why" behind every advice
- Connect ancient examples to modern contexts
- Include mantra meanings and pronunciation
- Give scientific explanations for timing, colors, directions

Write the complete Vedic astrology article now:`;
    }

    // Generate with Perplexity for real-time data
    async generateWithPerplexity(prompt) {
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.perplexityApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'sonar',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 1200,
                temperature: 0.7,
                top_p: 0.8,
                stream: false
            })
        });

        if (!response.ok) {
            throw new Error(`Perplexity API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    // Generate with Gemini
    async generateWithGemini(prompt) {
        const model = this.genAI.getGenerativeModel({ 
            model: 'gemini-2.5-flash',
            generationConfig: {
                temperature: 0.7,
                topP: 0.8,
                topK: 40,
                maxOutputTokens: 4096,
            }
        });
        
        const result = await model.generateContent(prompt);
        return result.response.text();
    }

    // Main article generation method
    async generateCompleteVedicArticle(category) {
        try {
            // Hindi-first language determination
            const language = this.determineContentLanguage();
            
            console.log(`🕉️ Generating ${category} vedic article in ${language}...`);

            // Generate dynamic topic using VedicTopicGenerator
            const topic = await this.topicGenerator.generateTopic(category, language);
            console.log(`📝 Vedic Topic (${language}): ${topic}`);

            const cleanTopic = this.cleanMarkdownFromTitle(topic);
            const imageResult = await this.generateVedicImage(cleanTopic, category);
            const contentResult = await this.generateVedicContent(cleanTopic, category, language);

            const article = new Article({
                title: cleanTopic,
                slug: this.generateHindiSlug(cleanTopic),
                content: contentResult.content,
                category: category,
                niche: this.config.niche,
                siteId: this.siteId,
                author: language === 'hindi' ? 'पंडित जी AstroAI' : this.config.author,
                featuredImage: imageResult ? imageResult.featuredImage : null,
                originalImageUrl: imageResult ? imageResult.originalImageUrl : null,
                imageKey: imageResult ? imageResult.imageKey : null,
                imageUploaded: imageResult ? imageResult.imageUploaded : false,
                seoTitle: cleanTopic.substring(0, 60),
                metaDescription: this.generateMetaDescription(contentResult.content),
                tags: this.generateVedicTags(cleanTopic, contentResult.content, category, language),
                readingTime: this.calculateReadingTime(contentResult.content),
                wordCount: this.countWords(contentResult.content),
                publishedAt: new Date(),
                aiModel: category.includes('daily') ? 'perplexity-sonar' : 'gemini-2.5-flash',
                contentStyle: 'practical-vedic-wisdom',
                
                // Vedic-specific fields
                language: language,
                zodiacSign: contentResult.rashi,
                planetaryInfluence: contentResult.graha,
                isVedic: true,
                culturalContext: 'hindu-indian'
            });

            const savedArticle = await article.save();
            console.log(`✅ Vedic article generated in ${language}: ${savedArticle._id}`);
            
            return savedArticle;

        } catch (error) {
            console.error('❌ Vedic article generation error:', error);
            throw error;
        }
    }

    // Helper methods
    generateVedicTags(title, content, category, language) {
        const baseTags = language === 'hindi' 
            ? ['वैदिक ज्योतिष', 'राशिफल', 'हिंदू धर्म', 'प्राचीन ज্ान', 'संस्कृत', 'आयुर्वेद']
            : ['vedic astrology', 'hindu scriptures', 'ancient wisdom', 'sanskrit', 'ayurveda', 'indian culture'];
            
        return [...baseTags, category, language];
    }

    generateHindiSlug(title) {
        // Convert Hindi title to URL-friendly slug
        return title
            .toLowerCase()
            .replace(/[^\w\s\u0900-\u097F-]/g, '') // Keep Hindi characters
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .substring(0, 60)
            .trim();
    }

    generateVedicImage(topic, category) {
        try {
            console.log(`🎨 Generating Vedic astrology image for: ${topic}`);
            return this.spacesService.generateAndUploadThemedImage(topic, category, 'vedic-hindu');
        } catch (error) {
            console.error('❌ Vedic image generation error:', error);
            return null;
        }
    }

    // Rest of helper methods remain the same
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
}

module.exports = VedicContentGenerator;
