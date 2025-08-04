

// 'use client';
// import { useState } from 'react';
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// export default function InteractiveAIDemo() {
//     const fullUrl = `${API_BASE_URL}/generate-demo-content`;
//     const [formData, setFormData] = useState({
//         niche: '',
//         category: 'current', // 🔧 CHANGED: Set default to 'current' instead of empty
//         contentType: 'article'
//     });
//     const [loading, setLoading] = useState(false);
//     const [result, setResult] = useState('');
//     const [error, setError] = useState('');

//     const handleInputChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//         if (error) setError('');
//     };

//     const handleGenerateDemo = async (e) => {
//         e.preventDefault();
        
//         if (!formData.niche.trim()) {
//             setError('Please enter your business niche');
//             return;
//         }

//         setLoading(true);
//         setError('');
//         setResult('');

//         try {
//             const response = await fetch(fullUrl, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData)
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to generate demo content');
//             }

//             const data = await response.json();
//             setResult(data.content);
//         } catch (err) {
//             setError(err.message || 'Failed to generate content. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="mt-8 p-6 bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-600 rounded-xl">
//             <div className="text-center mb-6">
//                 <h3 className="text-2xl font-bold text-gray-100 mb-3">
//                     🤖 See AI Generate Content for YOUR Niche
//                 </h3>
//                 <p className="text-gray-300 mb-4">
//                     Enter your business niche and watch our AI create professional content instantly - 
//                     just like we do for TechMobileInsights!
//                 </p>
                
//                 {/* NO SIGNUP REQUIRED Badge */}
//                 <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
//                     <div className="flex items-center bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
//                         <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                         </svg>
//                         ✨ NO Signup Required
//                     </div>
//                     <div className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
//                         <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                         </svg>
//                         🚀 Instant Results
//                     </div>
//                     <div className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
//                         <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                             <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
//                         </svg>
//                         💯 Completely FREE
//                     </div>
//                 </div>
//             </div>

//             <form onSubmit={handleGenerateDemo} className="space-y-4">
//                 <div className="grid md:grid-cols-2 gap-4">
//                     <div>
//                         <label htmlFor="niche" className="block text-sm font-medium text-gray-200 mb-2">
//                             Your Business Niche *
//                         </label>
//                         <input
//                             type="text"
//                             id="niche"
//                             name="niche"
//                             value={formData.niche}
//                             onChange={handleInputChange}
//                             placeholder="e.g., fitness, real estate, fintech, restaurants"
//                             className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                             required
//                         />
//                         <p className="text-xs text-gray-400 mt-1">No email or personal info needed!</p>
//                     </div>
                    
//                     <div>
//                         <label htmlFor="category" className="block text-sm font-medium text-gray-200 mb-2">
//                             Category
//                         </label>
//                         <select
//                             id="category"
//                             name="category"
//                             value={formData.category}
//                             onChange={handleInputChange}
//                             className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         >
//                             <option value="current">Industry Analysis</option>
//                             <option value="today">Daily News & Updates</option>
//                             <option value="historical">Background & History</option>
//                             <option value="trendy">Future Trends</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div>
//                     <label htmlFor="contentType" className="block text-sm font-medium text-gray-200 mb-2">
//                         Content Type
//                     </label>
//                     <select
//                         id="contentType"
//                         name="contentType"
//                         value={formData.contentType}
//                         onChange={handleInputChange}
//                         className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                         <option value="summary">Quick Summary (150-200 words)</option>
//                         <option value="article">Blog Article (300-400 words)</option>
//                         <option value="social">Social Media Post</option>
//                     </select>
//                 </div>

//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
//                 >
//                     {loading ? (
//                         <span className="flex items-center justify-center">
//                             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Generating Content with AI...
//                         </span>
//                     ) : (
//                         '✨ Generate Sample Content for My Niche - NO SIGNUP!'
//                     )}
//                 </button>

//                 {/* Additional Trust Messaging */}
//                 <div className="text-center text-xs text-gray-400 mt-2">
//                     <p>🔒 Privacy Protected • 🚫 No Registration • ⚡ Instant Demo • 🆓 Completely Free</p>
//                 </div>
//             </form>

//             {error && (
//                 <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg">
//                     <p className="text-red-200 text-sm">{error}</p>
//                 </div>
//             )}

//             {result && (
//                 <div className="mt-6 p-6 bg-gray-700 border border-gray-600 rounded-lg">
//                     <div className="mb-4">
//                         <h4 className="text-lg font-semibold text-green-400">
//                             ✅ AI-Generated Content for "{formData.niche}"
//                         </h4>
//                     </div>
//                     <div className="prose prose-invert max-w-none">
//                         <div 
//                             className="text-gray-200 leading-relaxed whitespace-pre-line text-sm"
//                             dangerouslySetInnerHTML={{ __html: result }}
//                         />
//                     </div>
//                     <div className="mt-4 pt-4 border-t border-gray-600">
//                         <p className="text-sm text-gray-400">
//                             💡 <strong>Impressed?</strong> This is the same AI system that powers our automated content generation. 
//                             Imagine getting this quality content automatically, every day, for your business.
//                         </p>
                        
//                         {/* Call to Action after demo */}
//                         <div className="mt-4 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
//                             <p className="text-blue-200 text-sm font-semibold text-center">
//                                 🚀 Ready to automate YOUR content? Contact us for a custom solution!
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }


'use client';
import { useState } from 'react';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function InteractiveAIDemo() {
    const fullUrl = `${API_BASE_URL}/generate-demo-content`;
    const [formData, setFormData] = useState({
        niche: '',
        category: 'current',
        contentType: 'article',
        language: 'english' // 🌍 NEW: Default to English
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (error) setError('');
    };

    const handleGenerateDemo = async (e) => {
        e.preventDefault();
        
        if (!formData.niche.trim()) {
            setError('Please enter your business niche');
            return;
        }

        setLoading(true);
        setError('');
        setResult('');

        try {
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to generate demo content');
            }

            const data = await response.json();
            setResult(data.content);
        } catch (err) {
            setError(err.message || 'Failed to generate content. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 p-6 bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-600 rounded-xl">
            <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-100 mb-3">
                    🌍 AI Content Generation - Global Multi-Language Demo
                </h3>
                <p className="text-gray-300 mb-4">
                    Enter your business niche and select your language to see our AI create professional content 
                    in your preferred language - powered by live web data!
                </p>
                
                {/* NO SIGNUP REQUIRED Badge + Global Support */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                    <div className="flex items-center bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        ✨ NO Signup Required
                    </div>
                    <div className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 6a1 1 0 011-1h.01a1 1 0 010 2H4a1 1 0 01-1-1zM4 8a1 1 0 000 2h.01a1 1 0 000-2H4zM7 6a1 1 0 000 2h7a1 1 0 000-2H7zM7 10a1 1 0 000 2h3a1 1 0 000-2H7z" clipRule="evenodd" />
                        </svg>
                        🌍 Multi-Language Support
                    </div>
                    <div className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        💯 Completely FREE
                    </div>
                </div>
            </div>

            <form onSubmit={handleGenerateDemo} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="niche" className="block text-sm font-medium text-gray-200 mb-2">
                            Your Business Niche *
                        </label>
                        <input
                            type="text"
                            id="niche"
                            name="niche"
                            value={formData.niche}
                            onChange={handleInputChange}
                            placeholder="e.g., fitness, real estate, fintech, restaurants"
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                        <p className="text-xs text-gray-400 mt-1">No email or personal info needed!</p>
                    </div>
                    
                    <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-200 mb-2">
                            🌍 Content Language
                        </label>
                        <select
                            id="language"
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="english">🇺🇸 English</option>
                            <option value="arabic">🇪🇬 العربية (Arabic)</option>
                            <option value="spanish">🇪🇸 Español (Spanish)</option>
                            <option value="french">🇫🇷 Français (French)</option>
                            <option value="german">🇩🇪 Deutsch (German)</option>
                            <option value="portuguese">🇧🇷 Português (Portuguese)</option>
                            <option value="hindi">🇮🇳 हिंदी (Hindi)</option>
                            <option value="chinese">🇨🇳 中文 (Chinese)</option>
                            <option value="japanese">🇯🇵 日本語 (Japanese)</option>
                            <option value="italian">🇮🇹 Italiano (Italian)</option>
                        </select>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-200 mb-2">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="current">Industry Analysis</option>
                            <option value="today">Daily News & Updates</option>
                            <option value="historical">Background & History</option>
                            <option value="trendy">Future Trends</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="contentType" className="block text-sm font-medium text-gray-200 mb-2">
                            Content Type
                        </label>
                        <select
                            id="contentType"
                            name="contentType"
                            value={formData.contentType}
                            onChange={handleInputChange}
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="summary">Quick Summary (150-200 words)</option>
                            <option value="article">Blog Article (300-400 words)</option>
                            <option value="social">Social Media Post</option>
                        </select>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating Content with AI...
                        </span>
                    ) : (
                        '✨ Generate Multi-Language Content - NO SIGNUP!'
                    )}
                </button>

                {/* Additional Trust Messaging */}
                <div className="text-center text-xs text-gray-400 mt-2">
                    <p>🔒 Privacy Protected • 🚫 No Registration • 🌍 10 Languages • ⚡ Instant Demo • 🆓 Completely Free</p>
                </div>
            </form>

            {error && (
                <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg">
                    <p className="text-red-200 text-sm">{error}</p>
                </div>
            )}

            {result && (
                <div className="mt-6 p-6 bg-gray-700 border border-gray-600 rounded-lg">
                    <div className="mb-4">
                        <h4 className="text-lg font-semibold text-green-400">
                            ✅ AI-Generated Content for "{formData.niche}" in {formData.language.charAt(0).toUpperCase() + formData.language.slice(1)}
                        </h4>
                    </div>
                    <div className="prose prose-invert max-w-none">
                        <div 
                            className="text-gray-200 leading-relaxed whitespace-pre-line text-sm"
                            dangerouslySetInnerHTML={{ __html: result }}
                        />
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-600">
                        <p className="text-sm text-gray-400">
                            💡 <strong>Impressed?</strong> This is the same AI system that powers our automated content generation in multiple languages. 
                            Imagine getting this quality content automatically, every day, for your global business.
                        </p>
                        
                        {/* Call to Action after demo */}
                        <div className="mt-4 p-4 bg-blue-900/30 border border-blue-700 rounded-lg">
                            <p className="text-blue-200 text-sm font-semibold text-center">
                                🚀 Ready to automate YOUR content in multiple languages? Contact us for a custom global solution!
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
