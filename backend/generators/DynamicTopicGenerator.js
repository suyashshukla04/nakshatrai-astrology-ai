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
//     async generateTopic(category, language = 'hindi') {
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


// generators/DynamicTopicGenerator.js - 100% HINDI ASTROLOGY VERSION with Interactive Headlines
const siteConfig = require("../config/siteConfig");
const Article = require('../models/Article');
const TopicHistory = require('../models/TopicHistory');
const mongoose = require('mongoose');

class AstrologyTopicGenerator {
    constructor(siteId) {
        this.siteId = siteId;
        this.config = siteConfig.getConfig(siteId);
        this.usedTopics = new Set();
        this.geminiApiKey = process.env.GEMINI_API_KEY;
    }

    // 🎯 HINDI ASTROLOGY: Generate interactive headline patterns for Hindi audience
    getAstrologyPatterns(category) {
        const patterns = {
            'daily-horoscope': [
                "आज आपकी राशि के लिए तारे क्या कह रहे हैं? प्राचीन ज्ञान से मिली आश्चर्यजनक जानकारी",
                "आपका दैनिक कॉस्मिक गाइड: कैसे {PLANET} आज आपके {ASPECT} को प्रभावित कर रहा है",
                "प्राचीन ज्योतिष का आधुनिक जीवन से मेल: आज की ग्रहों की सलाह {SIGN} के लिए",
                "क्या आप जानते हैं आपकी {DAY} की ऊर्जा {PLANET} से आती है? इसे कैसे उपयोग करें",
                "सफल {DAY} के लिए वैदिक रहस्य: प्राचीन ग्रंथ आज के बारे में क्या कहते हैं",
                "क्या आपने चेक किया है {PLANET} आपकी {DAY} के लिए क्या लेकर आया है?",
                "आज {SIGN} की ऊर्जा क्यों है अतिरिक्त शक्तिशाली",
                "अपनी {DAY} को बिल्कुल शानदार बनाने का प्राचीन फॉर्मूला"
            ],
            'love-compatibility': [
                "क्या आप और आपका पार्टनर कॉस्मिक रूप से संगत हैं? प्राचीन ज्ञान के पास हैं चौंकाने वाले जवाब",
                "तारों में लिखी प्रेम कहानी: कैसे {SIGN1} और {SIGN2} मिलकर बनाते हैं जादू",
                "रामायण से सीखें {SIGN} प्रेम संगति के बारे में",
                "परफेक्ट जीवनसाथी खोजने के लिए प्राचीन ज्योतिष गाइड",
                "वैदिक ज्योतिष के अनुसार स्थायी प्रेम का रहस्य",
                "{SIGN1} और {SIGN2} या तो बिल्कुल परफेक्ट हैं या बिल्कुल विपरीत - जानिए क्यों",
                "कॉस्मिक प्रेम कोड: आपके तारे रोमांस के बारे में क्या कहते हैं",
                "क्या आप जानते थे {PLANET} आपकी प्रेम जिंदगी को प्रभावित करता है? जानें कैसे"
            ],
            'career-guidance': [
                "तारों में लिखा आपका करियर पथ: व्यावसायिक सफलता के बारे में प्राचीन ज्ञान क्या कहता है",
                "अर्जुन की करियर दुविधा की तरह: ज्योतिष कैसे करता है आधुनिक नौकरी के फैसलों में मार्गदर्शन",
                "कॉस्मिक करियर कोड: {PLANET} के पास क्यों है आपका व्यावसायिक भविष्य",
                "प्राचीन ज्योतिष की आधुनिक करियर सलाह: जब तारे मिलते हैं सफलता से",
                "आपका जन्म चार्ट क्या कहता है आपकी ड्रीम जॉब के बारे में",
                "{SIGN} वाले लोग इन खास करियर फील्ड में क्यों करते हैं बेहतर",
                "{SEASON} {YEAR} में व्यावसायिक सफलता का ग्रहीय फॉर्मूला",
                "{PLANET} की ऊर्जा कैसे बदल सकती है आपकी वर्क लाइफ"
            ],
            'health-predictions': [
                "आपके शरीर का कॉस्मिक कनेक्शन: ग्रह कैसे प्रभावित करते हैं आपकी सेहत",
                "प्राचीन आयुर्वेद और ज्योतिष का मेल: स्वस्थता का रहस्य",
                "इस {SEASON} आपके तारे क्या कहते हैं आपकी सेहत के बारे में",
                "ग्रहों के माध्यम से पूर्ण स्वास्थ्य के लिए वैदिक गाइड",
                "प्राचीन ज्ञान कैसे बताता है आधुनिक स्वास्थ्य चुनौतियां",
                "{SIGN} वाले लोगों को इन स्वास्थ्य क्षेत्रों पर क्यों देना चाहिए ध्यान",
                "प्लैनेटरी हेल्थ कोड: {PLANET} आपकी तंदुरस्ती के बारे में क्या कहता है",
                "आपके जन्म चार्ट में छुपे प्राचीन हीलिंग रहस्य"
            ],
            'lucky-suggestions': [
                "आज का कॉस्मिक लक गाइड: नंबर्स, रंग, और प्राचीन रहस्य",
                "प्राचीन ज्योतिष के अनुसार आज क्या बनाता है भाग्यशाली?",
                "आधुनिक सफलता के लिए आपका दैनिक कॉस्मिक फॉर्च्यून",
                "वे गुप्त नंबर्स जो बदल देंगे आपका {DAY}",
                "प्राचीन लक फॉर्मूला जो वास्तव में काम करते हैं आधुनिक जीवन में",
                "आज {COLOR} रंग पहनना क्यों बदल सकता है सब कुछ",
                "{DAY} के लिए प्लैनेटरी लक कोड: नंबर्स, रंग, और टाइमिंग",
                "आज अधिकतम भाग्य के लिए {PLANET} की ऊर्जा का उपयोग कैसे करें"
            ],
            'festival-significance': [
                "{FESTIVAL} की छुपी कॉस्मिक शक्ति: प्राचीन ग्रंथ क्या बताते हैं",
                "{FESTIVAL} सिर्फ उत्सव से कहीं अधिक क्यों है: ज्योतिषीय महत्व समझाया गया",
                "{FESTIVAL} के पीछे का प्राचीन विज्ञान: कॉस्मिक टाइमिंग जो बदल देती है सब कुछ",
                "सही कॉस्मिक समय पर {FESTIVAL} मनाने से क्या होता है?",
                "{FESTIVAL} की स्पिरिचुअल टेक्नोलॉजी: आधुनिक जीवन के लिए प्राचीन ज्ञान",
                "क्या आप जानते थे {FESTIVAL} ग्रहों की स्थिति के अनुसार तय किया गया था?",
                "{FESTIVAL} उत्सव में छुपे कॉस्मिक रहस्य",
                "प्राचीन भारतीयों ने इसी खास समय पर {FESTIVAL} क्यों मनाया"
            ],
            'gemstone-guide': [
                "हीलिंग स्टोन्स का प्राचीन विज्ञान: कौन सा रत्न मैच करता है आपकी कॉस्मिक एनर्जी से?",
                "खूबसूरत ज्वेलरी से भी आगे: प्राचीन ग्रंथों के अनुसार रत्न वास्तव में कैसे काम करते हैं",
                "आपका व्यक्तिगत रत्न गाइड: प्राचीन ज्योतिष क्रिस्टल पावर के बारे में क्या कहता है",
                "रत्न हीलिंग के पीछे का असली विज्ञान: प्राचीन ज्ञान और आधुनिक समझ का मेल",
                "प्राचीन राजा खास रत्न क्यों पहनते थे: कॉस्मिक ज्वेलरी की खोई कला",
                "वैदिक ज्योतिष के अनुसार {GEMSTONE} कैसे बदल सकता है आपकी जिंदगी",
                "प्लैनेटरी कनेक्शन: {PLANET} वाले लोगों को {GEMSTONE} की क्यों है जरूरत",
                "प्राचीन रत्न रहस्य जिन्हें आधुनिक विज्ञान फिर से खोज रहा है"
            ],
            'muhurat-timing': [
                "परफेक्ट टाइमिंग की प्राचीन कला: कब मिलते हैं तारे सफलता के लिए",
                "प्राचीन भारतीयों ने महत्वपूर्ण काम इसे चेक किए बिना क्यों नहीं शुरू किए",
                "कॉस्मिक कैलेंडर: अधिकतम सफलता के लिए जीवन की घटनाओं का समय कैसे तय करें",
                "प्राचीन टाइमिंग के रहस्य जिन्हें आधुनिक विज्ञान अभी समझना शुरू कर रहा है",
                "प्राचीन ज्योतिष की गणितीय सटीकता: आधुनिक जीवन के लिए परफेक्ट टाइमिंग",
                "क्या होगा अगर आप हर फैसले का समय अधिकतम सफलता के लिए तय कर सकें?",
                "प्लैनेटरी क्लॉक: कब शुरू करें, कब इंतजार करें, कब एक्शन लें",
                "प्राचीन ज्ञान के अनुसार टैलेंट से ज्यादा टाइमिंग क्यों है महत्वपूर्ण"
            ]
        };
        
        return patterns[category] || patterns['daily-horoscope'];
    }

    // 🎯 HINDI ASTROLOGY: Apply Hindi astrology patterns to topics
    makeTopicAstrological(baseTopic, category) {
        const patterns = this.getAstrologyPatterns(category);
        const dynamicSeeds = this.generateDynamicSeeds();
        const { timeContext, astrologyContext } = dynamicSeeds;
        
        const pattern = patterns[Math.floor(Math.random() * patterns.length)];
        
        let astrologyTopic = pattern
            .replace(/{DAY}/g, timeContext.dayOfWeekHindi)
            .replace(/{PLANET}/g, astrologyContext.randomPlanetHindi)
            .replace(/{ASPECT}/g, astrologyContext.randomAspectHindi)
            .replace(/{SIGN}/g, astrologyContext.randomSignHindi)
            .replace(/{SIGN1}/g, astrologyContext.randomSignHindi)
            .replace(/{SIGN2}/g, this.getRandomElement(this.config.dynamicSeeds.zodiacSigns).hindi)
            .replace(/{SEASON}/g, timeContext.seasonHindi)
            .replace(/{YEAR}/g, timeContext.currentYear)
            .replace(/{FESTIVAL}/g, astrologyContext.randomFestivalHindi)
            .replace(/{GEMSTONE}/g, astrologyContext.randomGemstoneHindi)
            .replace(/{COLOR}/g, this.getRandomColorHindi());
        
        // If pattern doesn't fit, use Hindi astrology prefix
        if (astrologyTopic.includes('{') || astrologyTopic.includes('}')) {
            const hindiAstrologyPrefixes = [
                "प्राचीन ज्योतिष बताता है",
                "तारे क्या कहते हैं",
                "कॉस्मिक सच्चाई",
                "वैदिक ज्ञान समझाता है",
                "ज्योतिषीय रहस्य"
            ];
            const prefix = this.getRandomElement(hindiAstrologyPrefixes);
            astrologyTopic = `${prefix} ${baseTopic}`;
        }
        
        return astrologyTopic;
    }

    // CHANGED: Hindi colors for luck suggestions
    getRandomColorHindi() {
        const colorsHindi = ['लाल', 'नीला', 'पीला', 'हरा', 'सफेद', 'नारंगी', 'बैंगनी', 'सुनहरा'];
        return this.getRandomElement(colorsHindi);
    }

    // CHANGED: Generate dynamic seeds with Hindi context
    generateDynamicSeeds() {
        const now = new Date();
        const seeds = this.config.dynamicSeeds;
        
        return {
            timeContext: {
                dayOfWeek: now.toLocaleDateString('en-US', { weekday: 'long' }),
                dayOfWeekHindi: this.getDayOfWeekHindi(now.getDay()),
                weekOfYear: Math.ceil((now - new Date(now.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000)),
                quarter: Math.ceil((now.getMonth() + 1) / 3),
                season: this.getSeason(now.getMonth()),
                seasonHindi: this.getSeasonHindi(now.getMonth()),
                timeOfDay: this.getTimeOfDay(now.getHours()),
                currentMonth: now.toLocaleString('default', { month: 'long' }),
                currentMonthHindi: this.getMonthHindi(now.getMonth()),
                currentYear: now.getFullYear(),
                currentDate: now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            },
            astrologyContext: {
                randomPlanet: this.getRandomElement(seeds.planetaryBodies).english,
                randomPlanetHindi: this.getRandomElement(seeds.planetaryBodies).hindi,
                randomAspect: this.getRandomElement(seeds.lifeAspects).english,
                randomAspectHindi: this.getRandomElement(seeds.lifeAspects).hindi,
                randomSign: this.getRandomElement(seeds.zodiacSigns).english,
                randomSignHindi: this.getRandomElement(seeds.zodiacSigns).hindi,
                randomGemstone: this.getRandomElement(seeds.gemstones).english,
                randomGemstoneHindi: this.getRandomElement(seeds.gemstones).hindi,
                randomFestival: this.getRandomElement(seeds.festivals).english,
                randomFestivalHindi: this.getRandomElement(seeds.festivals).hindi,
                randomText: this.getRandomElement(seeds.ancientTexts).english,
                randomTextHindi: this.getRandomElement(seeds.ancientTexts).hindi
            }
        };
    }

    // ADDED: Hindi day names
    getDayOfWeekHindi(dayIndex) {
        const daysHindi = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
        return daysHindi[dayIndex];
    }

    // ADDED: Hindi season names
    getSeasonHindi(month) {
        const seasonsHindi = ['सर्दी', 'सर्दी', 'बसंत', 'बसंत', 'बसंत', 'गर्मी', 
                            'गर्मी', 'गर्मी', 'शरद', 'शरद', 'शरद', 'सर्दी'];
        return seasonsHindi[month];
    }

    // ADDED: Hindi month names
    getMonthHindi(month) {
        const monthsHindi = ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून',
                           'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
        return monthsHindi[month];
    }

    // 🔥 HINDI ASTROLOGY: Generate topic with Hindi-specific prompts
    async generateTopic(category, language = 'hindi') {
        const dynamicSeeds = this.generateDynamicSeeds();
        const { timeContext, astrologyContext } = dynamicSeeds;
        const uniqueConstraint = await this.getUniqueConstraint(category);
        
        const hindiAstrologyPrompts = {
            'daily-horoscope': `एक आकर्षक दैनिक राशिफल विषय बनाएं जो प्राचीन वैदिक ज्ञान को आधुनिक जीवन के व्यावहारिक मार्गदर्शन के साथ जोड़ता है।

संदर्भ:
- वर्तमान: ${timeContext.dayOfWeekHindi}, ${timeContext.currentDate}
- ग्रह फोकस: ${astrologyContext.randomPlanetHindi}
- जीवन क्षेत्र: ${astrologyContext.randomAspectHindi}
- व्यावहारिक दृष्टिकोण: हनुमानजी के ज्ञान की तरह - प्राचीन कहानियों से वास्तविक उपयोग

विशिष्टता: ${uniqueConstraint}

एक ऐसा विषय बनाएं जो लोगों को जिज्ञासु बनाए कि प्राचीन ज्योतिष उनकी दैनिक जिंदगी में कैसे लागू होता है।
व्यावहारिक ज्ञान और संबंधित परिस्थितियों पर ध्यान दें।

केवल एक अनूठा, आकर्षक विषय शीर्षक वापस करें।`,

            'love-compatibility': `प्राचीन ज्योतिष ज्ञान का उपयोग करके एक प्रेम संगति विषय बनाएं जिसमें व्यावहारिक रिश्ते की सलाह हो।

संदर्भ:
- फीचर्ड राशियां: ${astrologyContext.randomSignHindi}
- रिश्ते का फोकस: ${astrologyContext.randomAspectHindi}
- प्राचीन ज्ञान: राम-सीता, कृष्ण-राधा जैसी महान प्रेम कहानियों का संदर्भ

विशिष्टता: ${uniqueConstraint}

इसे आधुनिक रिश्तों के लिए संबंधित बनाएं और प्राचीन ज्ञान का सम्मान करें।

केवल एक अनूठा विषय शीर्षक वापस करें।`,

            'career-guidance': `एक करियर ज्योतिष विषय बनाएं जो लोगों की व्यावहारिक नौकरी के फैसलों में प्राचीन ज्ञान से मदद करे।

संदर्भ:
- करियर पहलू: ${astrologyContext.randomAspectHindi}
- ग्रह प्रभाव: ${astrologyContext.randomPlanetHindi}
- समय अवधि: ${timeContext.currentMonthHindi} ${timeContext.currentYear}

विशिष्टता: ${uniqueConstraint}

ज्योतिषीय अंतर्दृष्टि द्वारा समर्थित कार्यात्मक करियर सलाह पर ध्यान दें।

केवल एक अनूठा विषय शीर्षक वापस करें।`,

            'health-predictions': `आयुर्वेद के साथ ज्योतिषीय ज्ञान को जोड़कर एक स्वास्थ्य ज्योतिष विषय बनाएं।

संदर्भ:
- स्वास्थ्य फोकस: ${astrologyContext.randomAspectHindi}
- ग्रह प्रभाव: ${astrologyContext.randomPlanetHindi}
- मौसम: ${timeContext.seasonHindi}

विशिष्टता: ${uniqueConstraint}

केवल एक अनूठा स्वास्थ्य ज्योतिष विषय शीर्षक वापस करें।`,

            'lucky-suggestions': `प्राचीन ज्योतिषीय समय के व्यावहारिक अनुप्रयोगों के साथ एक दैनिक भाग्य विषय बनाएं।

संदर्भ:
- आज: ${timeContext.dayOfWeekHindi}
- ग्रह ऊर्जा: ${astrologyContext.randomPlanetHindi}
- फोकस क्षेत्र: ${astrologyContext.randomAspectHindi}

विशिष्टता: ${uniqueConstraint}

केवल एक अनूठा दैनिक भाग्य विषय शीर्षक वापस करें।`,

            'festival-significance': `${astrologyContext.randomFestivalHindi} के कॉस्मिक महत्व को समझाने वाला एक त्योहार ज्योतिष विषय बनाएं।

संदर्भ:
- त्योहार: ${astrologyContext.randomFestivalHindi}
- वर्तमान समय: ${timeContext.currentMonthHindi} ${timeContext.currentYear}
- प्राचीन संदर्भ: ${astrologyContext.randomTextHindi}

विशिष्टता: ${uniqueConstraint}

केवल एक अनूठा त्योहार ज्योतिष विषय शीर्षक वापस करें।`,

            'gemstone-guide': `${astrologyContext.randomGemstoneHindi} हीलिंग के पीछे के प्राचीन विज्ञान को समझाने वाला एक रत्न विषय बनाएं।

संदर्भ:
- रत्न: ${astrologyContext.randomGemstoneHindi}
- ग्रह कनेक्शन: ${astrologyContext.randomPlanetHindi}
- जीवन लाभ: ${astrologyContext.randomAspectHindi}

विशिष्टता: ${uniqueConstraint}

केवल एक अनूठा रत्न ज्योतिष विषय शीर्षक वापस करें।`,

            'muhurat-timing': `जीवन के महत्वपूर्ण फैसलों के लिए शुभ क्षणों के बारे में एक समय विषय बनाएं।

संदर्भ:
- वर्तमान अवधि: ${timeContext.currentMonthHindi} ${timeContext.currentYear}
- ग्रह प्रभाव: ${astrologyContext.randomPlanetHindi}
- जीवन क्षेत्र: ${astrologyContext.randomAspectHindi}

विशिष्टता: ${uniqueConstraint}

केवल एक अनूठा मुहूर्त समय विषय शीर्षक वापस करें।`
        };

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${this.config.aiSettings.model}:generateContent?key=${this.geminiApiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: hindiAstrologyPrompts[category] }]
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
            
            // Apply Hindi astrology pattern to make it more engaging
            let astrologyTopic = this.makeTopicAstrological(baseTopic, category);
            
            if (this.usedTopics.has(astrologyTopic)) {
                return this.generateTopic(category, language);
            }
            
            this.usedTopics.add(astrologyTopic);
            await this.storeTopicInDB(astrologyTopic, category, dynamicSeeds);
            
            return astrologyTopic;
        } catch (error) {
            console.error('Hindi astrology topic generation error:', error);
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
            return "व्यावहारिक अनुप्रयोगों के साथ ताजा ज्योतिष सामग्री बनाने पर ध्यान दें।";
        }
        
        return `इन हाल के विषयों से बिल्कुल अलग होना चाहिए: ${recentTitles.join(', ')}। कुछ बिल्कुल नया और आकर्षक बनाएं।`;
    }

    async storeTopicInDB(topic, category, seeds) {
        await new TopicHistory({
            topic,
            category,
            siteId: this.siteId,
            seeds,
            isAstrology: true,
            language: 'hindi' // ADDED: Track language
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

    // CHANGED: Hindi fallback topics
    getFallbackTopic(category) {
        const hindiFallbacks = {
            'daily-horoscope': `आज का कॉस्मिक मार्गदर्शन: प्राचीन ज्योतिष आपके ${this.getDayOfWeekHindi(new Date().getDay())} के बारे में क्या कहता है`,
            'love-compatibility': `प्रेम का प्राचीन विज्ञान: आपके तारे परफेक्ट पार्टनरशिप के बारे में क्या कहते हैं`,
            'career-guidance': `प्राचीन ज्योतिषीय ज्ञान के अनुसार आपका व्यावसायिक मार्ग`,
            'health-predictions': `स्वास्थ्य का कॉस्मिक कनेक्शन: आधुनिक जीवन के लिए प्राचीन हेल्थ ज्योतिष`,
            'lucky-suggestions': `आज का प्राचीन भाग्य फॉर्मूला: नंबर्स, रंग, और कॉस्मिक टाइमिंग`,
            'festival-significance': `प्राचीन त्योहार उत्सव की छुपी कॉस्मिक शक्ति`,
            'gemstone-guide': `हीलिंग स्टोन्स का खोया हुआ विज्ञान: प्राचीन रत्न ज्ञान`,
            'muhurat-timing': `परफेक्ट टाइमिंग की प्राचीन कला: जब तारे सफलता के लिए मिलते हैं`
        };
        return hindiFallbacks[category] || hindiFallbacks['daily-horoscope'];
    }
}

module.exports = AstrologyTopicGenerator;
