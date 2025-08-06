'use client';
import { useState } from 'react';
import { generateDemoContent } from '@/lib/api';
import { getVedicZodiacSigns } from '@/lib/utils';

export default function VedicAstrologyDemo() {
  const [formData, setFormData] = useState({
    name: '',
    zodiacSign: '',
    gender: '',
    language: 'hindi'
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const vedicZodiacSigns = getVedicZodiacSigns();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleGenerateVedicPrediction = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setError('कृपया अपना नाम लिखें');
      return;
    }
    if (!formData.zodiacSign) {
      setError('कृपया अपनी राशि चुनें');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await generateDemoContent({
        ...formData,
        type: 'vedic_prediction'
      });
      setResult(response.content);
    } catch (err) {
      setError(err.message || 'भविष्यवाणी बनाने में समस्या हुई। कृपया फिर से कोशिश करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-orange-800 to-red-800 border-2 border-orange-600 rounded-2xl relative overflow-hidden">
      {/* OM symbol and spiritual background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl text-yellow-400">🕉️</div>
        <div className="absolute bottom-10 right-10 text-4xl text-orange-400">🔱</div>
        <div className="absolute top-1/2 left-1/2 text-5xl text-red-400 transform -translate-x-1/2 -translate-y-1/2">🪷</div>
      </div>

      <div className="text-center mb-8 relative z-10">
        <h3 className="text-3xl font-bold text-yellow-100 mb-4">
          🔮 आज का व्यक्तिगत वैदिक राशिफल
        </h3>
        <p className="text-orange-100 mb-6 text-lg leading-relaxed">
          प्राचीन हिंदू ग्रंथों और वैदिक ज्योतिष के आधार पर आज की आपकी व्यक्तिगत भविष्यवाणी प्राप्त करें। 
          हमारा AI आज के ग्रह गोचर के साथ आपकी राशि का विश्लेषण करके सटीक मार्गदर्शन प्रदान करता है।
        </p>
      </div>

      <form onSubmit={handleGenerateVedicPrediction} className="space-y-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-yellow-200 mb-3">
              आपका नाम *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="जैसे: राम कुमार"
              className="w-full p-4 bg-yellow-100 border border-orange-400 rounded-xl text-red-900 placeholder-red-600 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>
          
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-yellow-200 mb-3">
              लिंग
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full p-4 bg-yellow-100 border border-orange-400 rounded-xl text-red-900 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">चुनें</option>
              <option value="male">पुरुष</option>
              <option value="female">महिला</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-yellow-200 mb-3">
            आपकी राशि चुनें *
          </label>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {vedicZodiacSigns.map((sign) => (
              <label
                key={sign.id}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  formData.zodiacSign === sign.id
                    ? 'border-yellow-400 bg-yellow-500/20 shadow-lg shadow-yellow-500/25'
                    : 'border-orange-400/40 bg-orange-500/10 hover:border-yellow-300 hover:bg-yellow-500/10'
                }`}
              >
                <input
                  type="radio"
                  name="zodiacSign"
                  value={sign.id}
                  checked={formData.zodiacSign === sign.id}
                  onChange={handleInputChange}
                  className="sr-only"
                  required
                />
                <div className="text-center">
                  <div className="text-2xl mb-2">{sign.symbol}</div>
                  <div className="text-yellow-100 font-bold text-sm mb-1">{sign.name}</div>
                  <div className="text-orange-200 text-xs">{sign.dates}</div>
                  <div className="text-yellow-300 text-xs mt-1">स्वामी: {sign.lord}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              पंडित जी आपका आज का राशिफल तैयार कर रहे हैं...
            </span>
          ) : (
            '🔮 आज का मेरा व्यक्तिगत राशिफल बनाएं'
          )}
        </button>

        <div className="text-center text-xs text-orange-200">
          <p>🔒 गोपनीयता सुरक्षित • 🚫 कोई डेटा संग्रहीत नहीं • 🎯 100% व्यक्तिगत • 🆓 पूर्णतः निःशुल्क</p>
        </div>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-900/50 border border-red-700/50 rounded-xl relative z-10">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-8 p-6 bg-yellow-100 border-2 border-orange-400 rounded-xl relative z-10">
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-red-800 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ✅ {formData.name} जी का आज का वैदिक राशिफल तैयार है
            </h4>
            <p className="text-red-600 text-sm mt-1">
              {vedicZodiacSigns.find(z => z.id === formData.zodiacSign)?.name} राशि 
              {vedicZodiacSigns.find(z => z.id === formData.zodiacSign)?.symbol} • 
              आज का दिनांक: {new Date().toLocaleDateString('hi-IN')}
            </p>
          </div>
          <div className="prose prose-red max-w-none">
            <div 
              className="text-red-900 leading-relaxed whitespace-pre-line font-medium"
              dangerouslySetInnerHTML={{ __html: result }}
            />
          </div>
          <div className="mt-6 pt-6 border-t-2 border-orange-400">
            <p className="text-sm text-red-700 mb-4">
              💡 <strong>क्या आपको अपना राशिफल पसंद आया?</strong> यही AI तकनीक हमारे पूरे वैदिक ज्योतिष प्लेटफॉर्म को चलाती है। 
              रोज़ाना व्यक्तिगत राशिफल, कुंडली मिलान, और जीवन मार्गदर्शन पाएं।
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-yellow-600/20 border border-yellow-500/50 rounded-xl">
                <p className="text-yellow-800 text-sm font-bold text-center">
                  🌟 रोज़ाना व्यक्तिगत राशिफल चाहिए? हमारी प्रीमियम सेवा लें!
                </p>
              </div>
              <div className="p-4 bg-orange-600/20 border border-orange-500/50 rounded-xl">
                <p className="text-orange-800 text-sm font-bold text-center">
                  🚀 अपने व्यवसाय के लिए चाहिए? हमारा वैदिक ज्योतिष API लें!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
