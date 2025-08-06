// // generators/DynamicTopicGenerator.js - ASTROLOGY VERSION with Interactive Headlines
// const siteConfig = require("../config/siteConfig");
// const Article = require('../models/Article');
// const TopicHistory = require('../models/TopicHistory');
// const mongoose = require('mongoose');

// class AstrologyTopicGenerator {
//     constructor(siteId) {
//         this.siteId = siteId;
//         this.config = siteConfig.getConfig(siteId);
//         this.usedTopics = new Set();
//         this.geminiApiKey = process.env.GEMINI_API_KEY;
//     }

//     // 🎯 ASTROLOGY: Generate interactive headline patterns for astrology
//     getAstrologyPatterns(category) {
//         const patterns = {
//             'daily-horoscope': [
//                 "What Do the Stars Say About Your {DAY} Today? Ancient Wisdom Reveals Surprising Insights",
//                 "Your Daily Cosmic Guide: How {PLANET} Influences Your {ASPECT} This {DAY}",
//                 "Ancient Astrology Meets Modern Life: Today's Planetary Wisdom for {SIGN}",
//                 "Did You Know Your {DAY} Energy Comes from {PLANET}? Here's How to Use It",
//                 "The Vedic Secret to a Perfect {DAY}: What Ancient Texts Say About Today",
//                 "Have You Checked What {PLANET} Has in Store for Your {DAY}?",
//                 "Why Your {SIGN} Energy is Extra Powerful This {DAY}",
//                 "The Ancient Formula for Making Your {DAY} Absolutely Amazing"
//             ],
//             'love-compatibility': [
//                 "Are You and Your Partner Cosmically Compatible? Ancient Wisdom Has Surprising Answers",
//                 "The Love Story Written in Stars: How {SIGN1} and {SIGN2} Create Magic Together",
//                 "What Ramayana Teaches About {SIGN} Love Compatibility",
//                 "Ancient Astrology's Guide to Finding Your Perfect Match",
//                 "The Secret to Lasting Love According to Vedic Astrology",
//                 "Why {SIGN1} and {SIGN2} Are Either Perfect Together or Total Opposites",
//                 "The Cosmic Love Code: What Your Stars Say About Romance",
//                 "Did You Know {PLANET} Influences Your Love Life? Here's How"
//             ],
//             'career-guidance': [
//                 "Your Career Path Written in Stars: What Ancient Wisdom Says About Professional Success",
//                 "Like Arjuna's Career Dilemma: How Astrology Guides Modern Job Decisions", 
//                 "The Cosmic Career Code: Why {PLANET} Holds Your Professional Future",
//                 "Ancient Astrology's Modern Career Advice: When Stars Align with Success",
//                 "What Your Birth Chart Says About Your Dream Job",
//                 "Why {SIGN} People Excel in These Specific Career Fields",
//                 "The Planetary Formula for Professional Success in {SEASON} {YEAR}",
//                 "How {PLANET} Energy Can Transform Your Work Life"
//             ],
//             'health-predictions': [
//                 "Your Body's Cosmic Connection: How Planets Influence Your Health",
//                 "Ancient Ayurveda Meets Astrology: The Secret to Wellness",
//                 "What Your Stars Say About Your Health This {SEASON}",
//                 "The Vedic Guide to Perfect Health Through Planetary Alignment",
//                 "How Ancient Wisdom Predicts Modern Health Challenges",
//                 "Why {SIGN} People Need to Pay Attention to These Health Areas",
//                 "The Planetary Health Code: What {PLANET} Says About Your Wellness",
//                 "Ancient Healing Secrets Written in Your Birth Chart"
//             ],
//             'lucky-suggestions': [
//                 "Today's Cosmic Luck Guide: Numbers, Colors, and Ancient Secrets",
//                 "What Makes Today Lucky According to Ancient Astrology?",
//                 "Your Daily Dose of Cosmic Fortune: Ancient Wisdom for Modern Success",
//                 "The Secret Numbers That Will Change Your {DAY}",
//                 "Ancient Luck Formulas That Actually Work in Modern Life",
//                 "Why Wearing {COLOR} Today Could Change Everything",
//                 "The Planetary Luck Code for {DAY}: Numbers, Colors, and Timing",
//                 "How to Use {PLANET} Energy for Maximum Luck Today"
//             ],
//             'festival-significance': [
//                 "The Hidden Cosmic Power of {FESTIVAL}: What Ancient Texts Reveal",
//                 "Why {FESTIVAL} is More Than Just Celebration: Astrological Significance Explained",
//                 "The Ancient Science Behind {FESTIVAL}: Cosmic Timing That Changes Everything",
//                 "What Happens When You Celebrate {FESTIVAL} at the Right Cosmic Moment?",
//                 "The Spiritual Technology of {FESTIVAL}: Ancient Wisdom for Modern Life",
//                 "Did You Know {FESTIVAL} Was Timed According to Planetary Positions?",
//                 "The Cosmic Secrets Hidden in {FESTIVAL} Celebrations",
//                 "Why Ancient Indians Celebrated {FESTIVAL} at This Exact Time"
//             ],
//             'gemstone-guide': [
//                 "The Ancient Science of Healing Stones: Which Gemstone Matches Your Cosmic Energy?",
//                 "Beyond Pretty Jewelry: How Gemstones Actually Work According to Ancient Texts",
//                 "Your Personal Gemstone Guide: What Ancient Astrology Says About Crystal Power",
//                 "The Real Science Behind Gemstone Healing: Ancient Wisdom Meets Modern Understanding",
//                 "Why Ancient Kings Wore Specific Gems: The Lost Art of Cosmic Jewelry",
//                 "How {GEMSTONE} Can Transform Your Life According to Vedic Astrology",
//                 "The Planetary Connection: Why {PLANET} People Need {GEMSTONE}",
//                 "Ancient Gemstone Secrets That Modern Science is Rediscovering"
//             ],
//             'muhurat-timing': [
//                 "The Ancient Art of Perfect Timing: When Stars Align for Success",
//                 "Why Ancient Indians Never Started Important Work Without Checking This",
//                 "The Cosmic Calendar: How to Time Life Events for Maximum Success",
//                 "Ancient Timing Secrets That Modern Science is Just Beginning to Understand",
//                 "The Mathematical Precision of Ancient Astrology: Perfect Timing for Modern Life",
//                 "What if You Could Time Every Decision for Maximum Success?",
//                 "The Planetary Clock: When to Start, When to Wait, When to Act",
//                 "Why Timing Matters More Than Talent According to Ancient Wisdom"
//             ]
//         };
        
//         return patterns[category] || patterns['daily-horoscope'];
//     }

//     // 🎯 ASTROLOGY: Apply astrology patterns to topics
//     makeTopicAstrological(baseTopic, category) {
//         const patterns = this.getAstrologyPatterns(category);
//         const dynamicSeeds = this.generateDynamicSeeds();
//         const { timeContext, astrologyContext } = dynamicSeeds;
        
//         const pattern = patterns[Math.floor(Math.random() * patterns.length)];
        
//         let astrologyTopic = pattern
//             .replace(/{DAY}/g, timeContext.dayOfWeek)
//             .replace(/{PLANET}/g, astrologyContext.randomPlanet)
//             .replace(/{ASPECT}/g, astrologyContext.randomAspect)
//             .replace(/{SIGN}/g, astrologyContext.randomSign)
//             .replace(/{SIGN1}/g, astrologyContext.randomSign)
//             .replace(/{SIGN2}/g, this.getRandomElement(this.config.dynamicSeeds.zodiacSigns).english)
//             .replace(/{SEASON}/g, timeContext.season)
//             .replace(/{YEAR}/g, timeContext.currentYear)
//             .replace(/{FESTIVAL}/g, astrologyContext.randomFestival)
//             .replace(/{GEMSTONE}/g, astrologyContext.randomGemstone)
//             .replace(/{COLOR}/g, this.getRandomColor());
        
//         // If pattern doesn't fit, use the base topic with astrology prefix
//         if (astrologyTopic.includes('{') || astrologyTopic.includes('}')) {
//             const astrologyPrefixes = [
//                 "Ancient Astrology Reveals",
//                 "What the Stars Say About",
//                 "The Cosmic Truth Behind",
//                 "Vedic Wisdom Explains",
//                 "The Astrological Secret of"
//             ];
//             const prefix = this.getRandomElement(astrologyPrefixes);
//             astrologyTopic = `${prefix} ${baseTopic}`;
//         }
        
//         return astrologyTopic;
//     }

//     // Helper method to get random colors for luck suggestions
//     getRandomColor() {
//         const colors = ['red', 'blue', 'yellow', 'green', 'white', 'orange', 'purple', 'golden'];
//         return this.getRandomElement(colors);
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
//             astrologyContext: {
//                 randomPlanet: this.getRandomElement(seeds.planetaryBodies).english,
//                 randomAspect: this.getRandomElement(seeds.lifeAspects).english,
//                 randomSign: this.getRandomElement(seeds.zodiacSigns).english,
//                 randomGemstone: this.getRandomElement(seeds.gemstones).english,
//                 randomFestival: this.getRandomElement(seeds.festivals).english,
//                 randomText: this.getRandomElement(seeds.ancientTexts).english
//             }
//         };
//     }

//     // 🔥 ASTROLOGY: Generate topic with astrology-specific prompts
//     async generateTopic(category, language = 'english') {
//         const dynamicSeeds = this.generateDynamicSeeds();
//         const { timeContext, astrologyContext } = dynamicSeeds;
//         const uniqueConstraint = await this.getUniqueConstraint(category);
        
//         const astrologyPrompts = {
//             'daily-horoscope': `Generate an engaging daily horoscope topic that combines ancient Vedic wisdom with practical modern life guidance.

//             CONTEXT:
//             - Current: ${timeContext.dayOfWeek}, ${timeContext.currentDate}
//             - Planetary focus: ${astrologyContext.randomPlanet}
//             - Life aspect: ${astrologyContext.randomAspect}
//             - Practical approach: Like Hanuman's wisdom - ancient stories with real applications
            
//             UNIQUENESS: ${uniqueConstraint}
            
//             Create a topic that makes people curious about how ancient astrology applies to their daily life.
//             Focus on practical wisdom and relatable scenarios.
            
//             Return only a unique, engaging topic title.`,

//             'love-compatibility': `Generate a love compatibility topic using ancient astrology wisdom with practical relationship advice.

//             CONTEXT:
//             - Featured signs: ${astrologyContext.randomSign}
//             - Relationship focus: ${astrologyContext.randomAspect}
//             - Ancient wisdom: Reference epic love stories like Rama-Sita, Krishna-Radha
            
//             UNIQUENESS: ${uniqueConstraint}
            
//             Make it relatable to modern relationships while honoring ancient wisdom.
            
//             Return only a unique topic title.`,

//             'career-guidance': `Generate a career astrology topic that helps people make practical job decisions using ancient wisdom.

//             CONTEXT:
//             - Career aspect: ${astrologyContext.randomAspect}
//             - Planetary influence: ${astrologyContext.randomPlanet}
//             - Time period: ${timeContext.currentMonth} ${timeContext.currentYear}
            
//             UNIQUENESS: ${uniqueConstraint}
            
//             Focus on actionable career advice backed by astrological insights.
            
//             Return only a unique topic title.`,

//             'health-predictions': `Generate a health astrology topic combining Ayurveda with astrological wisdom.

//             CONTEXT:
//             - Health focus: ${astrologyContext.randomAspect}
//             - Planetary influence: ${astrologyContext.randomPlanet}
//             - Season: ${timeContext.season}
            
//             UNIQUENESS: ${uniqueConstraint}
            
//             Return only a unique health astrology topic title.`,

//             'lucky-suggestions': `Generate a daily luck topic with practical applications of ancient astrological timing.

//             CONTEXT:
//             - Today: ${timeContext.dayOfWeek}
//             - Planetary energy: ${astrologyContext.randomPlanet}
//             - Focus area: ${astrologyContext.randomAspect}
            
//             UNIQUENESS: ${uniqueConstraint}
            
//             Return only a unique daily luck topic title.`,

//             'festival-significance': `Generate a festival astrology topic explaining cosmic significance of ${astrologyContext.randomFestival}.

//             CONTEXT:
//             - Festival: ${astrologyContext.randomFestival}
//             - Current time: ${timeContext.currentMonth} ${timeContext.currentYear}
//             - Ancient reference: ${astrologyContext.randomText}
            
//             UNIQUENESS: ${uniqueConstraint}
            
//             Return only a unique festival astrology topic title.`,

//             'gemstone-guide': `Generate a gemstone topic explaining the ancient science behind ${astrologyContext.randomGemstone} healing.

//             CONTEXT:
//             - Gemstone: ${astrologyContext.randomGemstone}
//             - Planetary connection: ${astrologyContext.randomPlanet}
//             - Life benefit: ${astrologyContext.randomAspect}
            
//             UNIQUENESS: ${uniqueConstraint}
            
//             Return only a unique gemstone astrology topic title.`,

//             'muhurat-timing': `Generate a timing topic about auspicious moments for important life decisions.

//             CONTEXT:
//             - Current period: ${timeContext.currentMonth} ${timeContext.currentYear}
//             - Planetary influence: ${astrologyContext.randomPlanet}
//             - Life area: ${astrologyContext.randomAspect}
            
//             UNIQUENESS: ${uniqueConstraint}
            
//             Return only a unique muhurat timing topic title.`
//         };

//         try {
//             const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.config.aiSettings.model}:generateContent?key=${this.geminiApiKey}`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     contents: [{
//                         parts: [{ text: astrologyPrompts[category] }]
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
//             let baseTopic = data.candidates[0].content.parts[0].text.trim();
            
//             // Apply astrology pattern to make it more engaging
//             let astrologyTopic = this.makeTopicAstrological(baseTopic, category);
            
//             if (this.usedTopics.has(astrologyTopic)) {
//                 return this.generateTopic(category, language);
//             }
            
//             this.usedTopics.add(astrologyTopic);
//             await this.storeTopicInDB(astrologyTopic, category, dynamicSeeds);
            
//             return astrologyTopic;
//         } catch (error) {
//             console.error('Astrology topic generation error:', error);
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
//             return "Focus on creating fresh astrology content with practical applications.";
//         }
        
//         return `MUST be completely different from these recent topics: ${recentTitles.join(', ')}. Create something entirely new and engaging.`;
//     }

//     async storeTopicInDB(topic, category, seeds) {
//         await new TopicHistory({
//             topic,
//             category,
//             siteId: this.siteId,
//             seeds,
//             isAstrology: true
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
//             'daily-horoscope': `Today's Cosmic Guidance: What Ancient Astrology Says About Your ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}`,
//             'love-compatibility': `The Ancient Science of Love: What Your Stars Say About Perfect Partnership`,
//             'career-guidance': `Your Professional Path According to Ancient Astrological Wisdom`,
//             'health-predictions': `The Cosmic Connection to Wellness: Ancient Health Astrology for Modern Life`,
//             'lucky-suggestions': `Today's Ancient Luck Formula: Numbers, Colors, and Cosmic Timing`,
//             'festival-significance': `The Hidden Cosmic Power of Ancient Festival Celebrations`,
//             'gemstone-guide': `The Lost Science of Healing Stones: Ancient Gemstone Wisdom`,
//             'muhurat-timing': `The Ancient Art of Perfect Timing: When Stars Align for Success`
//         };
//         return fallbacks[category] || fallbacks['daily-horoscope'];
//     }
// }

// module.exports = AstrologyTopicGenerator;


// generators/VedicTopicGenerator.js - HINDI-FIRST ASTROLOGY VERSION
const siteConfig = require("../config/siteConfig");
const Article = require('../models/Article');
const TopicHistory = require('../models/TopicHistory');

class VedicTopicGenerator {
    constructor(siteId) {
        this.siteId = siteId;
        this.config = siteConfig.getConfig(siteId);
        this.usedTopics = new Set();
        this.geminiApiKey = process.env.GEMINI_API_KEY;
    }

    // 🔮 HINDI VEDIC: Generate authentic Hindi astrology patterns
    getVedicHindiPatterns(category) {
        const patterns = {
            'daily-rashifal': [
                "आज के दिन {PLANET} का प्रभाव आपकी {RASHI} राशि पर कैसा रहेगा?",
                "आज का राशिफल: {WEEKDAY} को {PLANET} ग्रह आपके जीवन में क्या लेकर आएगा?",
                "क्या आपको पता है कि आज {PLANET} का प्रभाव आपकी {ASPECT} को कैसे प्रभावित करेगा?",
                "आज का वैदिक राशिफल: {RASHI} राशि वालों के लिए खुशखबरी या चुनौती?",
                "आज के ग्रह गोचर से जानें कि आपका दिन कैसा रहेगा",
                "आज का दिन आपकी {RASHI} राशि के लिए क्यों विशेष है?",
                "वैदिक ज्योतिष के अनुसार आज आपको क्या करना चाहिए और क्या नहीं?"
            ],
            'prem-vivah': [
                "क्या आप और आपका साथी कॉस्मिक रूप से एक-दूसरे के लिए बने हैं?",
                "{RASHI1} और {RASHI2} का प्रेम संयोग: स्वर्ग में बना या धरती पर?",
                "वैदिक ज्योतिष के अनुसार आपका आदर्श जीवनसाथी कौन सा है?",
                "रामायण से सीखें: आपकी राशि के अनुसार प्रेम और विवाह का मार्ग",
                "क्या आपकी कुंडली में प्रेम विवाह के योग हैं? जानें वैदिक उपाय",
                "आपकी {RASHI} राशि के लिए कौन सा पार्टनर सबसे उत्तम होगा?",
                "प्राचीन ग्रंथों के अनुसार सच्चे प्रेम की पहचान कैसे करें?"
            ],
            'career-vyavasaya': [
                "आपकी {RASHI} राशि के अनुसार कौन सा व्यवसाय आपको सफलता दिलाएगा?",
                "अर्जुन की तरह करियर की दुविधा? ज्योतिष से पाएं स्पष्ट दिशा",
                "{PLANET} ग्रह का प्रभाव आपके करियर पर कैसा रहेगा इस {SEASON} में?",
                "वैदिक ज्योतिष से जानें कि आपका आदर्श व्यवसाय क्या है",
                "आपके जन्म नक्षत्र के अनुसार व्यावसायिक सफलता के गुप्त सूत्र",
                "क्या आपकी कुंडली में राजयोग है? करियर की संभावनाएं जानें",
                "प्राचीन ज्ञान से आधुनिक करियर गाइडेंस: आपके लिए क्या सही है?"
            ],
            'swasthya-jyotish': [
                "आपकी {RASHI} राशि के अनुसार स्वास्थ्य की देखभाल कैसे करें?",
                "आयुर्वेद और ज्योतिष: आपके शरीर का कॉस्मिक कनेक्शन समझें",
                "इस {SEASON} में आपकी राशि के लिए कौन से स्वास्थ्य सावधानियां जरूरी हैं?",
                "ग्रहों का प्रभाव आपके स्वास्थ्य पर: वैदिक उपचार के तरीके",
                "आपकी राशि के अनुसार कौन सा आहार सबसे उत्तम है?",
                "प्राचीन आयुर्वेदिक ज्ञान से जानें अपने शरीर की जरूरतें",
                "ग्रह नक्षत्रों के अनुसार योग और प्राणायाम का सही समय"
            ],
            'shubh-muhurat': [
                "महत्वपूर्ण कार्यों के लिए आज का सबसे शुभ मुहूर्त कौन सा है?",
                "वैदिक पंचांग के अनुसार इस सप्ताह के शुभ और अशुभ समय",
                "नया काम शुरू करने के लिए {PLANET} ग्रह का समय कब उत्तम है?",
                "प्राचीन ज्योतिष के अनुसार परफेक्ट टाइमिंग का विज्ञान",
                "आज कौन से काम करें और कौन से काम टालें? शुभ मुहूर्त गाइड",
                "राहु काल और यम गंड से कैसे बचें? आज का समय चक्र",
                "वैदिक पंचांग के अनुसार आज का दिन कैसा रहेगा आपके लिए?"
            ],
            'ratna-vidya': [
                "आपकी {RASHI} राशि के लिए कौन सा रत्न सबसे शक्तिशाली है?",
                "गहनों से कहीं ज्यादा: रत्नों की वास्तविक शक्ति का वैदिक विज्ञान",
                "{GEMSTONE} रत्न कैसे बदल सकता है आपकी किस्मत? प्राचीन रहस्य जानें",
                "राजा-महाराजा क्यों पहनते थे विशेष रत्न? वैदिक रत्न विज्ञान",
                "आपके जन्म ग्रह के अनुसार सही रत्न का चुनाव कैसे करें?",
                "नकली और असली रत्न की पहचान: प्राचीन परीक्षण विधियां",
                "रत्न धारण करने का सही तरीका और मंत्र जो शक्ति बढ़ाते हैं"
            ],
            'tyohar-mahatva': [
                "{FESTIVAL} त्योहार का छुपा हुआ कॉस्मिक पावर क्या है?",
                "क्यों मनाते हैं {FESTIVAL}? प्राचीन ग्रंथों में छुपे वैज्ञानिक रहस्य",
                "{FESTIVAL} के दिन ग्रह नक्षत्रों की विशेष स्थिति और उसका प्रभाव",
                "हिंदू त्योहारों का खगोलीय आधार: {FESTIVAL} की सच्चाई",
                "प्राचीन भारतीय {FESTIVAL} क्यों मनाते थे इसी दिन? कॉस्मिक कारण",
                "{FESTIVAL} पर कौन से उपाय करें जो पूरे साल लाभ दें?",
                "वैदिक पंचांग के अनुसार {FESTIVAL} का महत्व और शुभ कार्य"
            ],
            'graha-gochar': [
                "इस महीने {PLANET} ग्रह का गोचर आपकी जिंदगी को कैसे बदलेगा?",
                "ग्रहों की चाल और आप पर उसका प्रभाव: आज का गोचर फल",
                "{PLANET} ग्रह के {RASHI} राशि में प्रवेश का आप पर क्या असर?",
                "वर्तमान ग्रह स्थिति के अनुसार आपको क्या सावधानी बरतनी चाहिए?",
                "शनि, गुरु, राहु-केतु के गोचर का आपकी राशि पर प्रभाव",
                "ग्रह गोचर के अनुसार शुभ और अशुभ समय की पहचान कैसे करें?",
                "वैदिक ज्योतिष के अनुसार ग्रह गोचर और उसके उपाय"
            ]
        };
        
        return patterns[category] || patterns['daily-rashifal'];
    }

    // 🌟 HINDI: Apply Vedic patterns with Hindi context
    makeTopicVedicHindi(baseTopic, category) {
        const patterns = this.getVedicHindiPatterns(category);
        const dynamicSeeds = this.generateVedicHindiSeeds();
        const { samayContext, jyotishContext } = dynamicSeeds;
        
        const pattern = patterns[Math.floor(Math.random() * patterns.length)];
        
        let vedicTopic = pattern
            .replace(/{WEEKDAY}/g, samayContext.weekdayHindi)
            .replace(/{PLANET}/g, jyotishContext.randomPlanetHindi)
            .replace(/{ASPECT}/g, jyotishContext.randomAspectHindi) 
            .replace(/{RASHI}/g, jyotishContext.randomRashiHindi)
            .replace(/{RASHI1}/g, jyotishContext.randomRashiHindi)
            .replace(/{RASHI2}/g, this.getRandomElement(this.config.dynamicSeeds.zodiacSigns).hindi)
            .replace(/{SEASON}/g, samayContext.seasonHindi)
            .replace(/{YEAR}/g, samayContext.currentYear)
            .replace(/{FESTIVAL}/g, jyotishContext.randomFestivalHindi)
            .replace(/{GEMSTONE}/g, jyotishContext.randomGemstoneHindi)
            .replace(/{COLOR}/g, this.getRandomHindiColor());
        
        // If pattern doesn't fit, use the base topic with Hindi Vedic prefix
        if (vedicTopic.includes('{') || vedicTopic.includes('}')) {
            const vedicPrefixes = [
                "प्राचीन वैदिक ज्ञान बताता है",
                "ऋषि-मुनियों के अनुसार",
                "शास्त्रों में छुपा रहस्य",
                "वैदिक ज्योतिष से जानें",
                "प्राचीन ग्रंथों का सत्य"
            ];
            const prefix = this.getRandomElement(vedicPrefixes);
            vedicTopic = `${prefix}: ${baseTopic}`;
        }
        
        return vedicTopic;
    }

    // Helper method for Hindi colors
    getRandomHindiColor() {
        const hindiColors = ['लाल', 'नीला', 'पीला', 'हरा', 'सफेद', 'नारंगी', 'बैंगनी', 'सुनहरा'];
        return this.getRandomElement(hindiColors);
    }

    generateVedicHindiSeeds() {
        const now = new Date();
        const seeds = this.config.dynamicSeeds;
        
        // Hindi weekdays
        const hindiWeekdays = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
        const hindiSeasons = ['शीत ऋतु', 'वसंत ऋतु', 'ग्रीष्म ऋतु', 'वर्षा ऋतु', 'शरद ऋतु'];
        
        return {
            samayContext: {
                weekdayHindi: hindiWeekdays[now.getDay()],
                seasonHindi: hindiSeasons[Math.floor(Math.random() * hindiSeasons.length)],
                currentYear: now.getFullYear(),
                currentMonth: this.getHindiMonth(now.getMonth()),
                currentDate: now.toLocaleDateString('hi-IN')
            },
            jyotishContext: {
                randomPlanetHindi: this.getRandomElement(seeds.planetaryBodies).hindi,
                randomAspectHindi: this.getRandomElement(seeds.lifeAspects).hindi,
                randomRashiHindi: this.getRandomElement(seeds.zodiacSigns).hindi,
                randomGemstoneHindi: this.getRandomElement(seeds.gemstones).hindi,
                randomFestivalHindi: this.getRandomElement(seeds.festivals).hindi,
                randomTextHindi: this.getRandomElement(seeds.ancientTexts).hindi
            }
        };
    }

    // 🔥 VEDIC HINDI: Generate topic with Hindi-first prompts
    async generateTopic(category, language = 'hindi') {
        const dynamicSeeds = this.generateVedicHindiSeeds();
        const { samayContext, jyotishContext } = dynamicSeeds;
        const uniqueConstraint = await this.getUniqueConstraint(category);
        
        const vedicHindiPrompts = {
            'daily-rashifal': `एक आकर्षक दैनिक राशिफल विषय बनाएं जो प्राचीन वैदिक ज्ञान को आधुनिक जीवन के व्यावहारिक मार्गदर्शन के साथ जोड़े।

            संदर्भ:
            - आज: ${samayContext.weekdayHindi}, ${samayContext.currentDate}
            - ग्रह केंद्र: ${jyotishContext.randomPlanetHindi}
            - जीवन पहलू: ${jyotishContext.randomAspectHindi}
            - व्यावहारिक दृष्टिकोण: हनुमान की बुद्धिमत्ता की तरह - प्राचीन कहानियां, वास्तविक अनुप्रयोग के साथ
            
            विशिष्टता: ${uniqueConstraint}
            
            एक ऐसा विषय बनाएं जो लोगों को उत्सुक बनाए कि प्राचीन ज्योतिष उनके दैनिक जीवन में कैसे लागू होता है।
            व्यावहारिक ज्ञान और संबंधित परिस्थितियों पर ध्यान दें।
            
            केवल एक अनूठा, आकर्षक विषय शीर्षक लौटाएं।`,

            'prem-vivah': `प्राचीन ज्योतिष ज्ञान के साथ व्यावहारिक रिश्ते की सलाह का उपयोग करके प्रेम संगति विषय बनाएं।

            संदर्भ:
            - विशेषित राशियां: ${jyotishContext.randomRashiHindi}
            - रिश्ते का केंद्र: ${jyotishContext.randomAspectHindi}
            - प्राचीन ज्ञान: राम-सीता, कृष्ण-राधा जैसी प्रेम कहानियों का संदर्भ
            
            विशिष्टता: ${uniqueConstraint}
            
            आधुनिक रिश्तों से संबंधित बनाएं जबकि प्राचीन ज्ञान का सम्मान करें।
            
            केवल एक अनूठा विषय शीर्षक लौटाएं।`,

            'career-vyavasaya': `प्राचीन ज्ञान का उपयोग करके व्यावहारिक नौकरी निर्णयों में मदद करने वाला करियर ज्योतिष विषय बनाएं।

            संदर्भ:
            - करियर पहलू: ${jyotishContext.randomAspectHindi}
            - ग्रह प्रभाव: ${jyotishContext.randomPlanetHindi}
            - समय अवधि: ${samayContext.currentMonth} ${samayContext.currentYear}
            
            विशिष्टता: ${uniqueConstraint}
            
            ज्योतिषीय अंतर्दृष्टि द्वारा समर्थित कार्यसाधक करियर सलाह पर ध्यान दें।
            
            केवल एक अनूठा विषय शीर्षक लौटाएं।`,

            'swasthya-jyotish': `आयुर्वेद को ज्योतिषीय ज्ञान के साथ मिलाकर स्वास्थ्य ज्योतिष विषय बनाएं।

            संदर्भ:
            - स्वास्थ्य केंद्र: ${jyotishContext.randomAspectHindi}
            - ग्रह प्रभाव: ${jyotishContext.randomPlanetHindi}
            - ऋतु: ${samayContext.seasonHindi}
            
            विशिष्टता: ${uniqueConstraint}
            
            केवल एक अनूठा स्वास्थ्य ज्योतिष विषय शीर्षक लौटाएं।`,

            'shubh-muhurat': `प्राचीन ज्योतिषीय समय निर्धारण के व्यावहारिक अनुप्रयोगों के साथ दैनिक भाग्य विषय बनाएं।

            संदर्भ:
            - आज: ${samayContext.weekdayHindi}
            - ग्रह ऊर्जा: ${jyotishContext.randomPlanetHindi}
            - केंद्र क्षेत्र: ${jyotishContext.randomAspectHindi}
            
            विशिष्टता: ${uniqueConstraint}
            
            केवल एक अनूठा दैनिक भाग्य विषय शीर्षक लौटाएं।`,

            'ratna-vidya': `${jyotishContext.randomGemstoneHindi} उपचार के पीछे के प्राचीन विज्ञान को समझाने वाला रत्न विषय बनाएं।

            संदर्भ:
            - रत्न: ${jyotishContext.randomGemstoneHindi}
            - ग्रह कनेक्शन: ${jyotishContext.randomPlanetHindi}
            - जीवन लाभ: ${jyotishContext.randomAspectHindi}
            
            विशिष्टता: ${uniqueConstraint}
            
            केवल एक अनूठा रत्न ज्योतिष विषय शीर्षक लौटाएं।`,

            'tyohar-mahatva': `${jyotishContext.randomFestivalHindi} के कॉस्मिक महत्व को समझाने वाला त्योहार विषय बनाएं।

            संदर्भ:
            - त्योहार: ${jyotishContext.randomFestivalHindi}
            - वर्तमान समय: ${samayContext.currentMonth} ${samayContext.currentYear}
            - प्राचीन संदर्भ: ${jyotishContext.randomTextHindi}
            
            विशिष्टता: ${uniqueConstraint}
            
            केवल एक अनूठा त्योहार ज्योतिष विषय शीर्षक लौटाएं।`,

            'graha-gochar': `महत्वपूर्ण जीवन निर्णयों के लिए शुभ क्षणों के बारे में समय विषय बनाएं।

            संदर्भ:
            - वर्तमान अवधि: ${samayContext.currentMonth} ${samayContext.currentYear}
            - ग्रह प्रभाव: ${jyotishContext.randomPlanetHindi}
            - जीवन क्षेत्र: ${jyotishContext.randomAspectHindi}
            
            विशिष्टता: ${uniqueConstraint}
            
            केवल एक अनूठा मुहूर्त समय विषय शीर्षक लौटाएं।`
        };

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.config.aiSettings.model}:generateContent?key=${this.geminiApiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: vedicHindiPrompts[category] }]
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
            
            // Apply Vedic Hindi pattern to make it more engaging
            let vedicTopic = this.makeTopicVedicHindi(baseTopic, category);
            
            if (this.usedTopics.has(vedicTopic)) {
                return this.generateTopic(category, language);
            }
            
            this.usedTopics.add(vedicTopic);
            await this.storeTopicInDB(vedicTopic, category, dynamicSeeds);
            
            return vedicTopic;
        } catch (error) {
            console.error('Vedic Hindi topic generation error:', error);
            return this.getFallbackTopic(category);
        }
    }

    getHindiMonth(monthIndex) {
        const hindiMonths = [
            'जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
            'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'
        ];
        return hindiMonths[monthIndex];
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
            return "नए वैदिक ज्योतिष विषय पर व्यावहारिक अनुप्रयोगों के साथ ध्यान दें।";
        }
        
        return `इन हाल के विषयों से बिल्कुल अलग होना चाहिए: ${recentTitles.join(', ')}। कुछ बिल्कुल नया और आकर्षक बनाएं।`;
    }

    async storeTopicInDB(topic, category, seeds) {
        await new TopicHistory({
            topic,
            category,
            siteId: this.siteId,
            seeds,
            isVedicHindi: true
        }).save();
    }

    getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    getFallbackTopic(category) {
        const fallbacks = {
            'daily-rashifal': `आज का वैदिक राशिफल: प्राचीन ज्ञान से आधुनिक मार्गदर्शन`,
            'prem-vivah': `वैदिक ज्योतिष के अनुसार आदर्श जीवनसाथी की खोज`,
            'career-vyavasaya': `प्राचीन ज्ञान से आधुनिक करियर गाइडेंस`,
            'swasthya-jyotish': `आयुर्वेद और ज्योतिष: स्वास्थ्य का कॉस्मिक कनेक्शन`,
            'shubh-muhurat': `आज के शुभ मुहूर्त: प्राचीन समय विज्ञान`,
            'ratna-vidya': `वैदिक रत्न विज्ञान: प्राचीन उपचार की शक्ति`,
            'tyohar-mahatva': `हिंदू त्योहारों का छुपा कॉस्मिक पावर`,
            'graha-gochar': `ग्रह गोचर और जीवन पर उनका प्रभाव`
        };
        return fallbacks[category] || fallbacks['daily-rashifal'];
    }
}

module.exports = VedicTopicGenerator;
