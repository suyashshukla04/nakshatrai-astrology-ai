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
            'daily-horoscope': [
                "आज के दिन {PLANET} का प्रभाव आपकी {RASHI} राशि पर कैसा रहेगा?",
                "आज का राशिफल: {WEEKDAY} को {PLANET} ग्रह आपके जीवन में क्या लेकर आएगा?",
                "वैदिक ज्योतिष के अनुसार आज आपको क्या करना चाहिए और क्या नहीं?"
            ],
            'love-compatibility': [
                "क्या आप और आपका साथी कॉस्मिक रूप से एक-दूसरे के लिए बने हैं?",
                "{RASHI1} और {RASHI2} का प्रेम संयोग: स्वर्ग में बना या धरती पर?",
                "वैदिक ज्योतिष के अनुसार आपका आदर्श जीवनसाथी कौन सा है?"
            ],
            'career-guidance': [
                "आपकी {RASHI} राशि के अनुसार कौन सा व्यवसाय आपको सफलता दिलाएगा?",
                "अर्जुन की तरह करियर की दुविधा? ज्योतिष से पाएं स्पष्ट दिशा",
                "{PLANET} ग्रह का प्रभाव आपके करियर पर कैसा रहेगा इस {SEASON} में?"
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
            .replace(/{RASHI2}/g, this.getRandomElement(['मेष', 'वृषभ', 'मिथुन', 'कर्क']))
            .replace(/{SEASON}/g, samayContext.seasonHindi);
        
        return vedicTopic;
    }

    generateVedicHindiSeeds() {
        const now = new Date();
        
        // Hindi weekdays
        const hindiWeekdays = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
        const hindiSeasons = ['शीत ऋतु', 'वसंत ऋतु', 'ग्रीष्म ऋतु', 'वर्षा ऋतु'];
        
        return {
            samayContext: {
                weekdayHindi: hindiWeekdays[now.getDay()],
                seasonHindi: hindiSeasons[Math.floor(Math.random() * hindiSeasons.length)],
                currentYear: now.getFullYear()
            },
            jyotishContext: {
                randomPlanetHindi: this.getRandomElement(['सूर्य', 'चंद्र', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि']),
                randomAspectHindi: this.getRandomElement(['करियर', 'प्रेम', 'स्वास्थ्य', 'धन']),
                randomRashiHindi: this.getRandomElement(['मेष', 'वृषभ', 'मिथुन', 'कर्क', 'सिंह', 'कन्या'])
            }
        };
    }

    // 🔥 VEDIC HINDI: Generate topic
    async generateTopic(category, language = 'hindi') {
        try {
            const fallbackTopic = this.getFallbackTopic(category);
            const vedicTopic = this.makeTopicVedicHindi(fallbackTopic, category);
            
            if (this.usedTopics.has(vedicTopic)) {
                return this.generateTopic(category, language);
            }
            
            this.usedTopics.add(vedicTopic);
            
            return vedicTopic;
        } catch (error) {
            console.error('Vedic Hindi topic generation error:', error);
            return this.getFallbackTopic(category);
        }
    }

    getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    getFallbackTopic(category) {
        const fallbacks = {
            'daily-rashifal': `आज का वैदिक राशिफल: प्राचीन ज्ञान से आधुनिक मार्गदर्शन`,
            'daily-horoscope': `आज का वैदिक राशिफल: प्राचीन ज्ञान से आधुनिक मार्गदर्शन`,
            'love-compatibility': `वैदिक ज्योतिष के अनुसार आदर्श जीवनसाथी की खोज`,
            'career-guidance': `प्राचीन ज्ञान से आधुनिक करियर गाइडेंस`,
            'health-predictions': `आयुर्वेद और ज्योतिष: स्वास्थ्य का कॉस्मिक कनेक्शन`,
            'lucky-suggestions': `आज के शुभ मुहूर्त: प्राचीन समय विज्ञान`,
            'gemstone-guide': `वैदिक रत्न विज्ञान: प्राचीन उपचार की शक्ति`,
            'festival-significance': `हिंदू त्योहारों का छुपा कॉस्मिक पावर`,
            'muhurat-timing': `ग्रह गोचर और जीवन पर उनका प्रभाव`
        };
        return fallbacks[category] || fallbacks['daily-rashifal'];
    }
}

module.exports = VedicTopicGenerator;
