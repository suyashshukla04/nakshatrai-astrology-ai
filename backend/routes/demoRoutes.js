// backend/routes/demoRoutes.js - VEDIC PRACTICAL WISDOM APPROACH
const express = require('express');
const router = express.Router();

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || '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';

router.post('/generate-demo-content', async (req, res) => {
    try {
        const { 
            name, 
            zodiacSign, 
            gender, 
            language = 'hindi',
            predictionType = 'daily_rashifal',
            type = 'vedic_prediction'
        } = req.body;
        
        if (!name || !zodiacSign) {
            return res.status(400).json({
                success: false,
                message: language === 'hindi' ? 'नाम और राशि आवश्यक हैं' : 'Name and zodiac sign are required'
            });
        }

        // 🎯 DYNAMIC DATE GENERATION (Indian Time)
        const getCurrentIndianDate = () => {
            const now = new Date();
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                weekday: 'long',
                timeZone: 'Asia/Kolkata'
            };
            return {
                hindi: now.toLocaleDateString('hi-IN', options),
                english: now.toLocaleDateString('en-IN', options),
                weekday: now.toLocaleDateString('hi-IN', { weekday: 'long', timeZone: 'Asia/Kolkata' }),
                time: now.toLocaleTimeString('hi-IN', { timeZone: 'Asia/Kolkata', hour12: true })
            };
        };

        const today = getCurrentIndianDate();
        console.log("Today (Indian Time):", today);

        // 🔮 VEDIC ZODIAC INFORMATION WITH PRACTICAL WISDOM
        const getVedicRashiInfo = (zodiacSign) => {
    const vedicRashis = {
        'mesha': { 
            name: 'मेष', english: 'Aries', lord: 'मंगल', element: 'अग्नि', 
            nature: 'चर', luckyColor: 'लाल', mantra: 'ॐ मंगलाय नमः',
            bodyPart: 'सिर', gemstone: 'मूंगा', metal: 'तांबा',
            personality: 'साहसी, नेतृत्व गुण, जल्दबाज़', 
            strengths: 'निर्णायक, ऊर्जावान, स्वतंत्र',
            challenges: 'गुस्सैल, अधीर, आवेशशील',
            lifeLesson: 'धैर्य और संयम सीखना',
            direction: 'पूर्व',
            luckyDay: 'मंगलवार',
            luckyNumbers: [1, 8, 17, 26],
            deity: 'भगवान हनुमान',
            symbol: '♈'
        },
        'vrishabha': { 
            name: 'वृषभ', english: 'Taurus', lord: 'शुक्र', element: 'पृथ्वी', 
            nature: 'स्थिर', luckyColor: 'सफेद', mantra: 'ॐ शुक्राय नमः',
            bodyPart: 'गला', gemstone: 'हीरा', metal: 'चांदी',
            personality: 'स्थिर, व्यावहारिक, सुंदरता प्रेमी', 
            strengths: 'दृढ़, विश्वसनीय, कलात्मक',
            challenges: 'जिद्दी, आलसी, भौतिकवादी',
            lifeLesson: 'लचीलापन और अनुकूलन',
            direction: 'दक्षिण-पूर्व',
            luckyDay: 'शुक्रवार',
            luckyNumbers: [6, 15, 24, 33],
            deity: 'माता लक्ष्मी',
            symbol: '♉'
        },
        'mithuna': { 
            name: 'मिथुन', english: 'Gemini', lord: 'बुध', element: 'वायु', 
            nature: 'द्विस्वभाव', luckyColor: 'हरा', mantra: 'ॐ बुधाय नमः',
            bodyPart: 'कंधे', gemstone: 'पन्ना', metal: 'पीतल',
            personality: 'बुद्धिमान, संवादप्रिय, बहुमुखी', 
            strengths: 'तेज़ दिमाग, अनुकूलनशील, मिलनसार',
            challenges: 'अस्थिर, भ्रमित, सतही',
            lifeLesson: 'गहराई और एकाग्रता विकसित करना',
            direction: 'उत्तर',
            luckyDay: 'बुधवार',
            luckyNumbers: [5, 14, 23, 32],
            deity: 'भगवान विष्णु',
            symbol: '♊'
        },
        'karka': { 
            name: 'कर्क', english: 'Cancer', lord: 'चंद्र', element: 'जल', 
            nature: 'चर', luckyColor: 'सफेद', mantra: 'ॐ चंद्राय नमः',
            bodyPart: 'छाती', gemstone: 'मोती', metal: 'चांदी',
            personality: 'भावुक, परिवारप्रेमी, संवेदनशील', 
            strengths: 'दयालु, सहानुभूतिशील, सुरक्षाप्रिय',
            challenges: 'अतिसंवेदनशील, मूडी, चिंताग्रस्त',
            lifeLesson: 'भावनात्मक संतुलन और आत्मविश्वास',
            direction: 'उत्तर-पश्चिम',
            luckyDay: 'सोमवार',
            luckyNumbers: [2, 7, 11, 16, 20, 29],
            deity: 'भगवान शिव',
            symbol: '♋'
        },
        'simha': { 
            name: 'सिंह', english: 'Leo', lord: 'सूर्य', element: 'अग्नि', 
            nature: 'स्थिर', luckyColor: 'सुनहरा', mantra: 'ॐ सूर्याय नमः',
            bodyPart: 'हृदय', gemstone: 'माणिक', metal: 'सोना',
            personality: 'गर्वीला, नेता, आत्मविश्वासी', 
            strengths: 'उदार, रचनात्मक, प्रेरणादायक',
            challenges: 'अहंकारी, हठी, ध्यान चाहने वाला',
            lifeLesson: 'विनम्रता और सेवा भावना',
            direction: 'पूर्व',
            luckyDay: 'रविवार',
            luckyNumbers: [1, 3, 10, 19, 28],
            deity: 'भगवान सूर्य',
            symbol: '♌'
        },
        'kanya': { 
            name: 'कन्या', english: 'Virgo', lord: 'बुध', element: 'पृथ्वी', 
            nature: 'द्विस्वभाव', luckyColor: 'नीला', mantra: 'ॐ बुधाय नमः',
            bodyPart: 'पेट', gemstone: 'पन्ना', metal: 'पीतल',
            personality: 'विश्लेषक, व्यवस्थित, सेवाभावी', 
            strengths: 'सटीक, मेहनती, स्वास्थ्य सचेत',
            challenges: 'आलोचक, चिंताग्रस्त, पूर्णतावादी',
            lifeLesson: 'स्वीकार करना और प्रवाह में रहना',
            direction: 'उत्तर',
            luckyDay: 'बुधवार',
            luckyNumbers: [5, 14, 23, 32],
            deity: 'भगवान गणेश',
            symbol: '♍'
        },
        'tula': { 
            name: 'तुला', english: 'Libra', lord: 'शुक्र', element: 'वायु', 
            nature: 'चर', luckyColor: 'गुलाबी', mantra: 'ॐ शुक्राय नमः',
            bodyPart: 'कमर', gemstone: 'हीरा', metal: 'चांदी',
            personality: 'न्यायप्रिय, संतुलनकारी, कूटनीतिक', 
            strengths: 'न्यायप्रिय, कलाप्रेमी, मिलनसार',
            challenges: 'अनिर्णायक, आलसी, दूसरों पर निर्भर',
            lifeLesson: 'स्वयं के निर्णय लेना सीखना',
            direction: 'पश्चिम',
            luckyDay: 'शुक्रवार',
            luckyNumbers: [6, 15, 24, 33],
            deity: 'माता दुर्गा',
            symbol: '♎'
        },
        'vrishchika': { 
            name: 'वृश्चिक', english: 'Scorpio', lord: 'मंगल', element: 'जल', 
            nature: 'स्थिर', luckyColor: 'मैरून', mantra: 'ॐ मंगलाय नमः',
            bodyPart: 'गुप्तांग', gemstone: 'मूंगा', metal: 'तांबा',
            personality: 'रहस्यमय, तीव्र, परिवर्तनकारी', 
            strengths: 'दृढ़ संकल्पित, जासूसी कुशल, वफादार',
            challenges: 'संदेहशील, बदला लेने वाला, गुप्त',
            lifeLesson: 'क्षमा और विश्वास करना सीखना',
            direction: 'दक्षिण',
            luckyDay: 'मंगलवार',
            luckyNumbers: [1, 8, 17, 26],
            deity: 'भगवान भैरव',
            symbol: '♏'
        },
        'dhanu': { 
            name: 'धनु', english: 'Sagittarius', lord: 'बृहस्पति', element: 'अग्नि', 
            nature: 'द्विस्वभाव', luckyColor: 'पीला', mantra: 'ॐ बृहस्पतये नमः',
            bodyPart: 'जांघें', gemstone: 'पुखराज', metal: 'सोना',
            personality: 'दार्शनिक, यात्रा प्रेमी, स्वतंत्रताप्रिय', 
            strengths: 'आशावादी, ज्ञानी, साहसी',
            challenges: 'अधीर, अतिआत्मविश्वासी, फक्कड़',
            lifeLesson: 'धैर्य और जिम्मेदारी सीखना',
            direction: 'उत्तर-पूर्व',
            luckyDay: 'गुरुवार',
            luckyNumbers: [3, 9, 12, 21, 30],
            deity: 'भगवान दक्षिणामूर्ति',
            symbol: '♐'
        },
        'makara': { 
            name: 'मकर', english: 'Capricorn', lord: 'शनि', element: 'पृथ्वी', 
            nature: 'चर', luckyColor: 'काला', mantra: 'ॐ शनैश्चराय नमः',
            bodyPart: 'घुटने', gemstone: 'नीलम', metal: 'लोहा',
            personality: 'अनुशासित, महत्वाकांक्षी, व्यावहारिक', 
            strengths: 'मेहनती, जिम्मेदार, दृढ़प्रतिज्ञ',
            challenges: 'कठोर, निराशावादी, अकेलापन पसंद',
            lifeLesson: 'लचीलापन और खुशी खोजना',
            direction: 'दक्षिण-पश्चिम',
            luckyDay: 'शनिवार',
            luckyNumbers: [8, 17, 26, 35],
            deity: 'भगवान शनि',
            symbol: '♑'
        },
        'kumbha': { 
            name: 'कुम्भ', english: 'Aquarius', lord: 'शनि', element: 'वायु', 
            nature: 'स्थिर', luckyColor: 'आसमानी', mantra: 'ॐ शनैश्चराय नमः',
            bodyPart: 'पिंडलियां', gemstone: 'नीलम', metal: 'लोहा',
            personality: 'नवाचारी, मानवतावादी, स्वतंत्र विचारक', 
            strengths: 'प्रगतिशील, दोस्त बनाने में माहिर, अनोखे विचार',
            challenges: 'विद्रोही, भावनारहित, अप्रत्याशित',
            lifeLesson: 'भावनात्मक जुड़ाव और प्रतिबद्धता',
            direction: 'पश्चिम',
            luckyDay: 'शनिवार',
            luckyNumbers: [4, 8, 13, 22, 31],
            deity: 'भगवान शिव',
            symbol: '♒'
        },
        'meena': { 
            name: 'मीन', english: 'Pisces', lord: 'बृहस्पति', element: 'जल', 
            nature: 'द्विस्वभाव', luckyColor: 'पीला', mantra: 'ॐ बृहस्पतये नमः',
            bodyPart: 'पैर', gemstone: 'पुखराज', metal: 'सोना',
            personality: 'कल्पनाशील, करुणाशील, आध्यात्मिक', 
            strengths: 'सहानुभूतिशील, कलात्मक, अंतर्ज्ञानी',
            challenges: 'भ्रमित, अतिसंवेदनशील, पलायनवादी',
            lifeLesson: 'वास्तविकता से जुड़ना और सीमाएं बनाना',
            direction: 'उत्तर',
            luckyDay: 'गुरुवार',
            luckyNumbers: [3, 9, 12, 21, 30],
            deity: 'भगवान विष्णु',
            symbol: '♓'
        }
    };
    
    return vedicRashis[zodiacSign] || vedicRashis['mesha'];
};


        const rashiInfo = getVedicRashiInfo(zodiacSign);

        // 🌟 VEDIC PRACTICAL WISDOM PROMPT (Like ContentGenerator Style)
        const getVedicPracticalPrompt = (name, rashiInfo, gender, language, today) => {
            const basePrompt = `
🕉️ आज का दिनांक: ${today.hindi}
📅 English Date: ${today.english}  
⏰ वर्तमान समय: ${today.time}

व्यक्ति: ${name} (${gender === 'male' ? 'पुरुष' : 'महिला'})
राशि: ${rashiInfo.name} (${rashiInfo.english})
राशि स्वामी: ${rashiInfo.lord}
तत्व: ${rashiInfo.element}
स्वभाव: ${rashiInfo.nature}
शरीर भाग: ${rashiInfo.bodyPart}
रत्न: ${rashiInfo.gemstone}
मंत्र: ${rashiInfo.mantra}

UNIQUE APPROACH - PRACTICAL VEDIC WISDOM:
Like Hanuman bringing the Sanjeevani mountain (representing abundant healing solutions, not literal mountain), explain astrological guidance through practical applications that modern people can actually use in their daily life.

You are a wise Vedic astrologer combining ancient Sanskrit wisdom with practical modern life guidance. 

SEARCH REQUIREMENT: 
Search for current planetary transits happening TODAY (${today.english}) that specifically affect ${rashiInfo.name} राशि. Find real astronomical data about planet positions, lunar phase, and astrological transits occurring today.

CURRENT COSMIC CONTEXT:
- Today's Date: ${today.english}
- Rashi: ${rashiInfo.name} (ruled by ${rashiInfo.lord})
- Element: ${rashiInfo.element}
- Person: ${name} (${gender})
- Personality Traits: ${rashiInfo.personality}
- Core Strengths: ${rashiInfo.strengths}
- Life Challenges: ${rashiInfo.challenges}
- Life Lesson: ${rashiInfo.lifeLesson}

WRITING STYLE - PRACTICAL VEDIC APPROACH:
- Use stories from Ramayana/Mahabharata to illustrate points
- Explain WHY astrological influences work psychologically
- Provide actionable, specific advice for TODAY
- Avoid superstitious language, focus on practical wisdom
- Address ${name} directly throughout
- Connect ancient wisdom to modern situations

CONTENT STRUCTURE for ${name} जी (800-1000 words in ${language === 'hindi' ? 'Hindi' : 'English'}):

## 🌅 ${name} जी, आज का विशेष कॉस्मिक संदेश (150 words)
- Current planetary positions affecting ${rashiInfo.name} राशि TODAY
- What this means for ${name} personally
- Ancient wisdom connection (like Krishna's guidance in Gita)

## 💫 आज की व्यक्तिगत ऊर्जा गाइड (200 words)  
- How ${name}'s ${rashiInfo.element} element is activated today
- Practical advice for managing energy levels
- Connection to ${rashiInfo.lord} planet's influence
- Real-world applications (work, relationships, health)

## 🏠 जीवन के विभिन्न क्षेत्रों में आज की सलाह (300 words)
- Career/Work: Specific guidance for ${name}'s profession
- Relationships: How to handle interactions today
- Health: Based on ${rashiInfo.bodyPart} body part connection
- Finances: Practical money decisions for today

## 📚 प्राचीन कहानी से आधुनिक सीख (200 words)
- Relevant story from epics that applies to ${name}'s situation
- How ancient characters dealt with similar challenges
- Modern psychological interpretation
- Practical implementation in today's context

## 🎯 ${name} जी के लिए आज के व्यावहारिक उपाय (150 words)
- Specific mantra: ${rashiInfo.mantra} (with practical benefits)
- Lucky color: ${rashiInfo.luckyColor} (how to use it)
- Best timing for important activities today
- Simple actions that align with cosmic energy

TONE: Wise but accessible, like a knowledgeable friend who understands both ancient wisdom and modern life
LANGUAGE: ${language === 'hindi' ? 'Clear Hindi with Sanskrit terms explained' : 'Professional English with Sanskrit terms'}
FOCUS: Practical wisdom that ${name} can actually use TODAY

Search for real planetary data for TODAY and create ${name} जी's personalized practical Vedic guidance:`;

            return basePrompt;
        };

        const prompt = getVedicPracticalPrompt(name, rashiInfo, gender, language, today);

        // Make request to Perplexity API for real-time cosmic data
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'sonar', // Uses web search for current planetary positions
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 1500,
                temperature: 0.8,
                top_p: 0.9,
                stream: false
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Perplexity API Response:', response.status, errorText);
            throw new Error(`Perplexity API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        let content = data.choices[0].message.content;
        
        // Enhanced formatting for Vedic content
        const formattedContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-orange-800 font-bold">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em class="text-orange-700">$1</em>')
            .replace(/#{3}\s*(.*?)$/gm, '<h3 class="text-xl font-bold text-orange-800 mt-6 mb-3 flex items-center"><span class="mr-2">🌟</span>$1</h3>')
            .replace(/#{2}\s*(.*?)$/gm, '<h2 class="text-2xl font-bold text-orange-800 mt-8 mb-4 flex items-center"><span class="mr-2">✨</span>$1</h2>')
            .replace(/#{1}\s*(.*?)$/gm, '<h1 class="text-3xl font-bold text-orange-800 mt-10 mb-6 flex items-center"><span class="mr-2">🕉️</span>$1</h1>')
            .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-gray-800">')
            .replace(/^(.*)$/gm, '<p class="mb-4 leading-relaxed text-gray-800">$1</p>')
            .replace(/<p class="mb-4 leading-relaxed text-gray-800"><\/p>/g, '')
            .replace(/<p class="mb-4 leading-relaxed text-gray-800"><h/g, '<h')
            .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
            // Add special formatting for mantras
            .replace(/(ॐ [^।]+।?)/g, '<span class="sanskrit-text text-orange-900 font-bold bg-yellow-100 px-2 py-1 rounded">$1</span>');

        res.json({
            success: true,
            content: formattedContent,
            metadata: {
                personName: name,
                zodiacSign: rashiInfo.name,
                zodiacLord: rashiInfo.lord,
                element: rashiInfo.element,
                language: language,
                todaysDate: today.hindi,
                englishDate: today.english,
                currentTime: today.time,
                weekday: today.weekday,
                predictionType: 'Practical Vedic Wisdom',
                contentStrategy: 'Ancient wisdom meets modern practical guidance',
                generatedAt: new Date().toISOString(),
                source: 'Vedic AI with Real-Time Planetary Data + Practical Psychology',
                searchType: 'Real-time cosmic events with practical applications',
                rashiTraits: {
                    personality: rashiInfo.personality,
                    strengths: rashiInfo.strengths,
                    challenges: rashiInfo.challenges,
                    lifeLesson: rashiInfo.lifeLesson
                }
            }
        });

    } catch (error) {
        console.error('Vedic practical wisdom generation error:', error);
        res.status(500).json({
            success: false,
            message: language === 'hindi' 
                ? 'आज की व्यावहारिक सलाह बनाने में समस्या हुई। कृपया फिर से कोशिश करें।'
                : 'Failed to generate practical Vedic guidance. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;
