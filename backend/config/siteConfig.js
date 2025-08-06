// config/siteConfig.js - Multi-Language Astrology Configuration (Hindi + English)
class SiteConfigManager {
    constructor() {
        this.configs = new Map();
        this.loadConfigurations();
    }

    loadConfigurations() {
        // Multi-language astrology site configuration
        const sites = [
            {
                id: 'astroai',
                domain: 'astrologyai.com',
                niche: 'astrology predictions',
                author: 'AstroAI-Master',
                brandName: 'AI Astrology Insights',
                description: 'AI-powered astrology predictions combining ancient wisdom with modern insights',
                
                // Multi-language support configuration
                languages: {
                    primary: 'english',
                    secondary: 'hindi',
                    supported: ['english', 'hindi'],
                    contentGeneration: {
                        english: {
                            model: 'gemini-2.5-flash',
                            dailyAI: 'perplexity',
                            analyticalAI: 'gemini'
                        },
                        hindi: {
                            model: 'gemini-2.5-flash',
                            dailyAI: 'perplexity', 
                            analyticalAI: 'gemini'
                        }
                    },
                    contentRatio: {
                        english: 60,  // 60% English content
                        hindi: 40     // 40% Hindi content
                    }
                },
                
                // Categories with multi-language names
                categories: [
                    {
                        id: 'daily-horoscope',
                        names: {
                            english: 'Daily Horoscope',
                            hindi: 'दैनिक राशिफल'
                        }
                    },
                    {
                        id: 'love-compatibility', 
                        names: {
                            english: 'Love Compatibility',
                            hindi: 'प्रेम मेल'
                        }
                    },
                    {
                        id: 'career-guidance',
                        names: {
                            english: 'Career Guidance', 
                            hindi: 'करियर मार्गदर्शन'
                        }
                    },
                    {
                        id: 'health-predictions',
                        names: {
                            english: 'Health Predictions',
                            hindi: 'स्वास्थ्य भविष्यवाणी'
                        }
                    },
                    {
                        id: 'lucky-suggestions',
                        names: {
                            english: 'Lucky Suggestions',
                            hindi: 'भाग्यशाली सुझाव'
                        }
                    },
                    {
                        id: 'festival-significance',
                        names: {
                            english: 'Festival Significance',
                            hindi: 'त्योहार महत्व'
                        }
                    },
                    {
                        id: 'gemstone-guide',
                        names: {
                            english: 'Gemstone Guide',
                            hindi: 'रत्न गाइड'
                        }
                    },
                    {
                        id: 'muhurat-timing',
                        names: {
                            english: 'Auspicious Timing',
                            hindi: 'मुहूर्त समय'
                        }
                    }
                ],
                
                // Content scheduling
                schedule: {
                    'daily-horoscope': '0 6 * * *',      // 6 AM daily
                    'love-compatibility': '0 9 * * 1',   // Monday 9 AM
                    'career-guidance': '0 9 * * 3',      // Wednesday 9 AM
                    'health-predictions': '0 9 * * 5',   // Friday 9 AM
                    'lucky-suggestions': '0 8 * * *',    // 8 AM daily
                    'festival-significance': '0 7 * * 0',// Sunday 7 AM
                    'gemstone-guide': '0 10 * * 2',      // Tuesday 10 AM
                    'muhurat-timing': '0 7 * * *'        // 7 AM daily
                },
                
                // AI settings
                aiSettings: {
                    model: 'gemini-2.5-flash',
                    maxTokens: 4096,
                    temperature: 0.7
                },
                
                // Content strategy
                contentStrategy: {
                    practicalWisdom: true,
                    mythologyReferences: true,
                    actionableAdvice: true,
                    affiliateIntegration: true,
                    multiLanguageRotation: true  // Rotate between languages
                },
                
                // Multi-language dynamic seeds
                dynamicSeeds: {
                    zodiacSigns: [
                        {
                            english: 'aries',
                            hindi: 'मेष',
                            sanskrit: 'मेष राशि'
                        },
                        {
                            english: 'taurus',
                            hindi: 'वृषभ',
                            sanskrit: 'वृषभ राशि'
                        },
                        {
                            english: 'gemini',
                            hindi: 'मिथुन',
                            sanskrit: 'मिथुन राशि'
                        },
                        {
                            english: 'cancer',
                            hindi: 'कर्क',
                            sanskrit: 'कर्क राशि'
                        },
                        {
                            english: 'leo',
                            hindi: 'सिंह',
                            sanskrit: 'सिंह राशि'
                        },
                        {
                            english: 'virgo',
                            hindi: 'कन्या',
                            sanskrit: 'कन्या राशि'
                        },
                        {
                            english: 'libra',
                            hindi: 'तुला',
                            sanskrit: 'तुला राशि'
                        },
                        {
                            english: 'scorpio',
                            hindi: 'वृश्चिक',
                            sanskrit: 'वृश्चिक राशि'
                        },
                        {
                            english: 'sagittarius',
                            hindi: 'धनु',
                            sanskrit: 'धनु राशि'
                        },
                        {
                            english: 'capricorn',
                            hindi: 'मकर',
                            sanskrit: 'मकर राशि'
                        },
                        {
                            english: 'aquarius',
                            hindi: 'कुम्भ',
                            sanskrit: 'कुम्भ राशि'
                        },
                        {
                            english: 'pisces',
                            hindi: 'मीन',
                            sanskrit: 'मीन राशि'
                        }
                    ],
                    
                    planetaryBodies: [
                        {
                            english: 'sun',
                            hindi: 'सूर्य',
                            sanskrit: 'सूर्य देव'
                        },
                        {
                            english: 'moon',
                            hindi: 'चंद्र',
                            sanskrit: 'चंद्र देव'
                        },
                        {
                            english: 'mars',
                            hindi: 'मंगल',
                            sanskrit: 'मंगल देव'
                        },
                        {
                            english: 'mercury',
                            hindi: 'बुध',
                            sanskrit: 'बुध देव'
                        },
                        {
                            english: 'jupiter',
                            hindi: 'बृहस्पति',
                            sanskrit: 'गुरु देव'
                        },
                        {
                            english: 'venus',
                            hindi: 'शुक्र',
                            sanskrit: 'शुक्र देव'
                        },
                        {
                            english: 'saturn',
                            hindi: 'शनि',
                            sanskrit: 'शनि देव'
                        },
                        {
                            english: 'rahu',
                            hindi: 'राहु',
                            sanskrit: 'राहु काल'
                        },
                        {
                            english: 'ketu',
                            hindi: 'केतु',
                            sanskrit: 'केतु काल'
                        }
                    ],
                    
                    lifeAspects: [
                        {
                            english: 'career success',
                            hindi: 'करियर सफलता'
                        },
                        {
                            english: 'love relationships',
                            hindi: 'प्रेम संबंध'
                        },
                        {
                            english: 'family harmony',
                            hindi: 'पारिवारिक सामंजस्य'
                        },
                        {
                            english: 'health wellness',
                            hindi: 'स्वास्थ्य कल्याण'
                        },
                        {
                            english: 'financial prosperity',
                            hindi: 'वित्तीय समृद्धि'
                        },
                        {
                            english: 'spiritual growth',
                            hindi: 'आध्यात्मिक विकास'
                        },
                        {
                            english: 'education',
                            hindi: 'शिक्षा'
                        },
                        {
                            english: 'marriage',
                            hindi: 'विवाह'
                        }
                    ],
                    
                    gemstones: [
                        {
                            english: 'ruby',
                            hindi: 'माणिक',
                            planet: 'sun'
                        },
                        {
                            english: 'pearl',
                            hindi: 'मोती',
                            planet: 'moon'
                        },
                        {
                            english: 'coral',
                            hindi: 'मूंगा',
                            planet: 'mars'
                        },
                        {
                            english: 'emerald',
                            hindi: 'पन्ना',
                            planet: 'mercury'
                        },
                        {
                            english: 'yellow sapphire',
                            hindi: 'पुखराज',
                            planet: 'jupiter'
                        },
                        {
                            english: 'diamond',
                            hindi: 'हीरा',
                            planet: 'venus'
                        },
                        {
                            english: 'blue sapphire',
                            hindi: 'नीलम',
                            planet: 'saturn'
                        },
                        {
                            english: 'hessonite',
                            hindi: 'गोमेद',
                            planet: 'rahu'
                        },
                        {
                            english: 'cats eye',
                            hindi: 'लहसुनिया',
                            planet: 'ketu'
                        }
                    ],
                    
                    festivals: [
                        {
                            english: 'diwali',
                            hindi: 'दीवाली',
                            significance: 'prosperity and light'
                        },
                        {
                            english: 'holi',
                            hindi: 'होली',
                            significance: 'joy and colors'
                        },
                        {
                            english: 'navratri',
                            hindi: 'नवरात्रि',
                            significance: 'divine feminine power'
                        },
                        {
                            english: 'karva chauth',
                            hindi: 'करवा चौथ',
                            significance: 'marital harmony'
                        }
                    ],
                    
                    ancientTexts: [
                        {
                            english: 'ramayana',
                            hindi: 'रामायण'
                        },
                        {
                            english: 'mahabharata',
                            hindi: 'महाभारत'
                        },
                        {
                            english: 'bhagavad gita',
                            hindi: 'भगवद गीता'
                        },
                        {
                            english: 'vedas',
                            hindi: 'वेद'
                        }
                    ]
                },
                
                // UI configuration for multi-language
                uiConfig: {
                    primaryColor: '#4F46E5',
                    secondaryColor: '#7C3AED', 
                    accentColor: '#F59E0B',
                    backgroundColor: '#1F2937',
                    fonts: {
                        english: 'Inter',
                        hindi: 'Noto Sans Devanagari'
                    },
                    languageToggle: true,  // Show language switch button
                    defaultLanguage: 'english'
                },
                
                // Monetization
                monetization: {
                    affiliatePrograms: [
                        'amazon-books-english',
                        'amazon-books-hindi', 
                        'gemstone-stores-india',
                        'spiritual-products-hindi'
                    ],
                    subscriptionTiers: {
                        free: {
                            english: 'Basic daily horoscope',
                            hindi: 'मूल दैनिक राशिफल'
                        },
                        premium: {
                            english: 'Detailed predictions + compatibility',
                            hindi: 'विस्तृत भविष्यवाणी + मेल'
                        }
                    }
                }
            }
        ];

        // Register configuration
        sites.forEach(config => {
            this.configs.set(config.id, config);
        });
    }

    getConfig(siteId) {
        const config = this.configs.get(siteId);
        if (!config) {
            throw new Error(`Configuration for site ${siteId} not found`);
        }
        return config;
    }

    // Helper method to get content in specific language
    getLocalizedContent(siteId, contentType, language = 'english') {
        const config = this.getConfig(siteId);
        return config.dynamicSeeds[contentType].map(item => ({
            ...item,
            localized: item[language] || item.english
        }));
    }

    getAllConfigs() {
        return Array.from(this.configs.values());
    }
}

// Create and export singleton instance
const siteConfigManager = new SiteConfigManager();
module.exports = siteConfigManager;
