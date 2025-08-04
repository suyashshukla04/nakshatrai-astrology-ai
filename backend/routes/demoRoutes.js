


// // backend/routes/demoRoutes.js - Dynamic Category-Based Content Strategy
// const express = require('express');
// const router = express.Router();

// // Initialize Perplexity API
// const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || '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';

// router.post('/generate-demo-content', async (req, res) => {
//     try {
//         const { niche, category, contentType } = req.body;
        
//         if (!niche) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'Niche is required'
//             });
//         }

//         // 🎯 DYNAMIC DATE GENERATION
//         const getCurrentDate = () => {
//             const now = new Date();
//             const options = { 
//                 year: 'numeric', 
//                 month: 'long', 
//                 day: 'numeric',
//                 timeZone: 'UTC'
//             };
//             return now.toLocaleDateString('en-US', options);
//         };

//         const today = getCurrentDate();

//         // 🔥 DYNAMIC CATEGORY-BASED CONTENT STRATEGY
//         const getCategoryPrompt = (niche, category, contentType, today) => {
//             const categoryStrategies = {
//                 'today': {
//                     // DAILY = Most emerging/breaking news for TODAY
//                     focus: 'breaking news and emerging developments happening TODAY',
//                     style: 'urgent, newsworthy, current events',
//                     examples: {
//                         'cricket': `breaking match results, player controversies, team announcements, live tournament developments`,
//                         'fitness': `latest workout trends, celebrity fitness news, new research findings, viral fitness challenges`,
//                         'real estate': `market moves today, interest rate changes, major property deals, regulatory announcements`,
//                         'fintech': `crypto movements, regulatory news, funding announcements, market disruptions`,
//                         'restaurants': `new openings, chef changes, food trends, health inspections, viral food stories`
//                     }
//                 },
//                 'historical': {
//                     // HISTORICAL = Spicy controversial/interesting past events
//                     focus: 'controversial, interesting, or pivotal historical events and stories',
//                     style: 'intriguing, story-driven, revealing untold aspects',
//                     examples: {
//                         'cricket': `match-fixing scandals, legendary rivalries, controversial decisions, career-ending moments`,
//                         'fitness': `fitness industry scandals, banned substances history, celebrity transformation controversies`,
//                         'real estate': `housing bubble stories, property empire collapses, architectural disasters, zoning controversies`,
//                         'fintech': `major financial hacks, startup failures, regulatory battles, founder feuds`,
//                         'restaurants': `restaurant empire collapses, health scandal histories, chef feuds, food poisoning outbreaks`
//                     }
//                 },
//                 'trendy': {
//                     // TRENDY = Upcoming events with high value/anticipation
//                     focus: 'highly anticipated upcoming events, launches, and developments',
//                     style: 'anticipatory, high-value, forward-looking',
//                     examples: {
//                         'cricket': `upcoming major tournaments, player transfers, venue announcements, technology introductions`,
//                         'fitness': `upcoming fitness tech launches, new gym chains, celebrity workout programs, health app releases`,
//                         'real estate': `upcoming developments, new technology implementations, market predictions, regulatory changes`,
//                         'fintech': `upcoming IPOs, new payment technologies, regulatory framework changes, major partnerships`,
//                         'restaurants': `new concept restaurants, celebrity chef ventures, food technology innovations, franchise expansions`
//                     }
//                 },
//                 'current': {
//                     // INDUSTRY ANALYSIS = Business-focused market analysis
//                     focus: 'business market analysis, revenue opportunities, and commercial insights',
//                     style: 'professional, data-driven, business-focused',
//                     examples: {
//                         'cricket': `market valuation, sponsorship deals, broadcast rights, merchandise sales, league economics`,
//                         'fitness': `market size, consumer spending, franchise opportunities, equipment sales, subscription models`,
//                         'real estate': `market trends, investment opportunities, pricing analysis, development costs, ROI metrics`,
//                         'fintech': `market penetration, user adoption, revenue models, competitive analysis, investment flows`,
//                         'restaurants': `industry margins, franchise models, delivery economics, consumer spending, market consolidation`
//                     }
//                 }
//             };

//             const strategy = categoryStrategies[category] || categoryStrategies['current'];
//             const exampleContext = strategy.examples[niche.toLowerCase()] || `relevant ${niche} industry developments`;

//             return {
//                 focus: strategy.focus,
//                 style: strategy.style,
//                 context: exampleContext
//             };
//         };

//         // 🎯 BUILD DYNAMIC PROMPT BASED ON CATEGORY STRATEGY
//         const categoryInfo = getCategoryPrompt(niche, category, contentType, today);
        
//         let prompt = '';
        
//         if (contentType === 'article') {
//             prompt = `Write an AI analysis focusing on ${categoryInfo.focus} in the ${niche} industry.

// CATEGORY STRATEGY - ${category.toUpperCase()}:
// Focus: ${categoryInfo.focus}
// Style: ${categoryInfo.style}
// Context: ${categoryInfo.context}

// CONTENT REQUIREMENTS:
// - 300-400 words
// - ${categoryInfo.style} tone
// - ${category === 'today' ? `Current date context: ${today}` : ''}
// - ${category === 'historical' ? 'Focus on intriguing past events with lasting impact' : ''}
// - ${category === 'trendy' ? 'Highlight upcoming developments and future opportunities' : ''}
// - ${category === 'current' ? 'Include business metrics, market data, and commercial insights' : ''}
// - Structure with clear, engaging headlines
// - Use HTML formatting: <h3>, <strong>, <p>
// - Make it feel like premium ${category === 'current' ? 'business intelligence' : 'insider information'}

// Generate compelling content now:`;

//         } else if (contentType === 'summary') {
//             prompt = `Write a concise summary focusing on ${categoryInfo.focus} in the ${niche} industry.
            
// CATEGORY STRATEGY - ${category.toUpperCase()}:
// - Focus: ${categoryInfo.focus}
// - Style: ${categoryInfo.style}
// - Context: ${categoryInfo.context}

// REQUIREMENTS:
// - 150-200 words
// - ${categoryInfo.style} tone
// - ${category === 'today' ? `Include today's date: ${today}` : ''}
// - HTML formatting only
// - ${category === 'current' ? 'Business-focused insights' : 'Engaging storytelling approach'}

// Generate summary now:`;

//         } else if (contentType === 'social') {
//             prompt = `Write 3 social media posts focusing on ${categoryInfo.focus} in the ${niche} industry.
            
// CATEGORY STRATEGY - ${category.toUpperCase()}:
// - Focus: ${categoryInfo.focus}
// - Style: ${categoryInfo.style}
// - Context: ${categoryInfo.context}

// REQUIREMENTS:
// - Each post 50-100 words
// - ${categoryInfo.style} tone
// - Include relevant hashtags
// - ${category === 'today' ? 'Reference current developments' : ''}
// - ${category === 'historical' ? 'Reference intriguing past events' : ''}
// - ${category === 'trendy' ? 'Build anticipation for upcoming events' : ''}
// - Separate each post clearly

// Generate social posts now:`;
//         }

//         // Make request to Perplexity API
//         const response = await fetch('https://api.perplexity.ai/chat/completions', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 model: 'sonar',
//                 messages: [
//                     {
//                         role: 'user',
//                         content: prompt
//                     }
//                 ],
//                 max_tokens: 1000,
//                 temperature: 0.7,
//                 top_p: 0.8,
//                 stream: false
//             })
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error('Perplexity API Response:', response.status, errorText);
//             throw new Error(`Perplexity API error: ${response.status} ${response.statusText}`);
//         }

//         const data = await response.json();
//         const content = data.choices[0].message.content;
        
//         // Clean and format content
//         const formattedContent = content
//             .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
//             .replace(/\*(.*?)\*/g, '<em>$1</em>')
//             .replace(/#{3}\s*(.*?)$/gm, '<h3>$1</h3>')
//             .replace(/#{2}\s*(.*?)$/gm, '<h3>$1</h3>')
//             .replace(/\n\n/g, '</p><p>')
//             .replace(/^(.*)$/gm, '<p>$1</p>')
//             .replace(/<p><\/p>/g, '')
//             .replace(/<p><h/g, '<h')
//             .replace(/<\/h([1-6])><\/p>/g, '</h$1>');

//         res.json({
//             success: true,
//             content: formattedContent,
//             niche: niche,
//             category: category || 'current',
//             contentStrategy: categoryInfo.focus,
//             generatedAt: new Date().toISOString(),
//             source: 'Perplexity AI',
//             contentDate: today
//         });

//     } catch (error) {
//         console.error('Demo content generation error:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to generate demo content. Please try again.',
//             error: process.env.NODE_ENV === 'development' ? error.message : undefined
//         });
//     }
// });

// module.exports = router;


// backend/routes/demoRoutes.js - REAL Current Events Approach
const express = require('express');
const router = express.Router();

const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY || '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';

router.post('/generate-demo-content', async (req, res) => {
    try {
        const { niche, category, contentType, language = 'english' } = req.body;
        
        if (!niche) {
            return res.status(400).json({
                success: false,
                message: 'Niche is required'
            });
        }

        // 🎯 DYNAMIC DATE GENERATION
        const getCurrentDate = () => {
            const now = new Date();
            const options = { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                timeZone: 'UTC'
            };
            return now.toLocaleDateString('en-US', options);
        };

        const today = getCurrentDate();
        console.log("today",today)
        // 🌍 LANGUAGE SUPPORT
        const getLanguagePrompt = (language) => {
            const languagePrompts = {
                'english': 'Write in professional English',
                'arabic': 'Write in professional Arabic (العربية)',
                'spanish': 'Write in professional Spanish (Español)',
                'french': 'Write in professional French (Français)',
                'german': 'Write in professional German (Deutsch)',
                'portuguese': 'Write in professional Portuguese (Português)',
                'hindi': 'Write in professional Hindi (हिंदी)',
                'chinese': 'Write in professional Simplified Chinese (中文)',
                'japanese': 'Write in professional Japanese (日本語)',
                'italian': 'Write in professional Italian (Italiano)'
            };
            return languagePrompts[language] || languagePrompts['english'];
        };

        // 🔥 ENHANCED REAL-TIME STRATEGY FOR "TODAY" CATEGORY
        const getCategoryPrompt = (niche, category, today) => {
            if (category === 'today') {
                return {
                    focus: `the most trending, viral, and socially engaging ${niche} topics that are actually happening today`,
                    style: 'breaking news, viral content, social media trending',
                    searchInstruction: `Search for what is actually trending TODAY (${today}) in ${niche}. Find real current events, viral stories, social media buzz, breaking news, or trending developments that happened in the last 24 hours.`
                };
            }
            
            // Other categories remain the same
            const strategies = {
                'historical': {
                    focus: 'significant historical events and controversial stories',
                    style: 'historical analysis, controversial past events',
                    searchInstruction: `Find interesting historical ${niche} events and controversies`
                },
                'trendy': {
                    focus: 'upcoming events and future predictions',
                    style: 'forward-looking, anticipatory content',
                    searchInstruction: `Find upcoming ${niche} events and future trends`
                },
                'current': {
                    focus: 'business market analysis and industry insights',
                    style: 'professional business analysis',
                    searchInstruction: `Analyze current ${niche} market trends and business opportunities`
                }
            };
            
            return strategies[category] || strategies['current'];
        };

        // 🎯 BUILD REAL-TIME SEARCH PROMPT
        const categoryInfo = getCategoryPrompt(niche, category, today);
        const languageInstruction = getLanguagePrompt(language);
        
        let prompt = '';
        
        if (contentType === 'article') {
            if (category === 'today') {
                // SPECIAL PROMPT FOR REAL-TIME TODAY CONTENT
                prompt = `${languageInstruction} - I need you to search the web and find what is ACTUALLY trending TODAY (${today}) in the ${niche} industry.

SEARCH REQUIREMENT: ${categoryInfo.searchInstruction}

Look for:
- Breaking news from TODAY (${today})
- Viral social media trends in ${niche} 
- Current events happening right now
- Trending hashtags and discussions
- Real developments from the last 24 hours

CONTENT REQUIREMENTS:
- 300-400 words
- Focus ONLY on verified current events from TODAY
- Include specific details about what's actually happening
- Mention real people, companies, or events if found
- Use ${categoryInfo.style} tone
- Written entirely in ${language}
- Structure with HTML formatting: <h3>, <strong>, <p>
- If no specific today events found, focus on the most recent verified developments

Search the web NOW and generate content about what's actually happening today:`;
            } else {
                // REGULAR PROMPT FOR OTHER CATEGORIES
                prompt = `${languageInstruction} - ${categoryInfo.searchInstruction}

CONTENT REQUIREMENTS:
- 300-400 words
- ${categoryInfo.style} tone
- Written entirely in ${language}
- Structure with HTML formatting: <h3>, <strong>, <p>
- Focus on verified information

Generate content now:`;
            }
        } else if (contentType === 'summary') {
            if (category === 'today') {
                prompt = `${languageInstruction} - Search for what's ACTUALLY trending TODAY (${today}) in ${niche} and write a concise summary.

SEARCH FOR REAL TODAY EVENTS: ${categoryInfo.searchInstruction}

REQUIREMENTS:
- 150-200 words
- Focus on verified current events from TODAY
- ${categoryInfo.style} tone
- Written entirely in ${language}
- HTML formatting only

Search and summarize what's actually happening today:`;
            } else {
                prompt = `${languageInstruction} - ${categoryInfo.searchInstruction}

REQUIREMENTS:
- 150-200 words
- ${categoryInfo.style} tone
- Written entirely in ${language}
- HTML formatting only

Generate summary now:`;
            }
        } else if (contentType === 'social') {
            if (category === 'today') {
                prompt = `${languageInstruction} - Search for what's trending TODAY (${today}) in ${niche} and create 3 social media posts about real current events.

SEARCH FOR REAL TODAY TRENDS: ${categoryInfo.searchInstruction}

REQUIREMENTS:
- Each post 50-100 words
- Based on actual trending topics from TODAY
- Include relevant hashtags
- ${categoryInfo.style} tone
- Written entirely in ${language}
- Separate each post clearly

Search for real trends and create posts:`;
            } else {
                prompt = `${languageInstruction} - ${categoryInfo.searchInstruction}

REQUIREMENTS:
- Each post 50-100 words
- ${categoryInfo.style} tone
- Written entirely in ${language}
- Include relevant hashtags
- Separate each post clearly

Generate posts now:`;
            }
        }

        // Make request to Perplexity API
        const response = await fetch('https://api.perplexity.ai/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'sonar', // Uses web search capabilities
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 1000,
                temperature: 0.7,
                top_p: 0.8,
                stream: false
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Perplexity API Response:', response.status, errorText);
            throw new Error(`Perplexity API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        
        // Clean and format content
        const formattedContent = content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/#{3}\s*(.*?)$/gm, '<h3>$1</h3>')
            .replace(/#{2}\s*(.*?)$/gm, '<h3>$1</h3>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(.*)$/gm, '<p>$1</p>')
            .replace(/<p><\/p>/g, '')
            .replace(/<p><h/g, '<h')
            .replace(/<\/h([1-6])><\/p>/g, '</h$1>');

        res.json({
            success: true,
            content: formattedContent,
            niche: niche,
            category: category,
            language: language,
            contentStrategy: categoryInfo.focus,
            generatedAt: new Date().toISOString(),
            source: 'Perplexity AI with Real-Time Web Search',
            contentDate: today,
            searchType: category === 'today' ? 'Real-time current events' : 'General research'
        });

    } catch (error) {
        console.error('Demo content generation error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate demo content. Please try again.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;
