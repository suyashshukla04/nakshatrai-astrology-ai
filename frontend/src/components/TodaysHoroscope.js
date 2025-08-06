'use client';
import { useState, useEffect } from 'react';
import { getTodaysHoroscope } from '@/lib/api';
import { getVedicZodiacSigns } from '@/lib/utils';
import Link from 'next/link';

export default function TodaysHoroscope({ language = 'hindi' }) {
  const [horoscopes, setHoroscopes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const zodiacSigns = getVedicZodiacSigns();

  useEffect(() => {
    fetchTodaysHoroscope();
  }, [language]);

  const fetchTodaysHoroscope = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTodaysHoroscope('astroai', language);
      setHoroscopes(response.data || []);
    } catch (err) {
      console.error('Error fetching today\'s horoscope:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="cosmic-bg rounded-2xl p-8 border border-orange-400">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">🌟 आज का दैनिक राशिफल</h2>
          <p className="text-orange-100">आपका कॉस्मिक मार्गदर्शन लोड हो रहा है...</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white/10 rounded-xl p-4 animate-pulse">
              <div className="w-6 h-6 bg-white/20 rounded-full mx-auto mb-3"></div>
              <div className="h-3 bg-white/20 rounded mb-2"></div>
              <div className="h-2 bg-white/15 rounded w-3/4 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
        <div className="text-red-600 dark:text-red-400 text-lg font-medium mb-2">
          आज का राशिफल लोड नहीं हो सका
        </div>
        <p className="text-red-500 dark:text-red-300 text-sm">{error}</p>
        <button
          onClick={fetchTodaysHoroscope}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          फिर कोशिश करें
        </button>
      </div>
    );
  }

  return (
    <div className="cosmic-bg rounded-2xl p-8 border border-orange-400 relative overflow-hidden">
      {/* Starry background effect - REDUCED */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      <div className="text-center mb-8 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          🌟 आज का दैनिक राशिफल
        </h2>
        <p className="text-orange-100 text-sm md:text-base">
          {new Date().toLocaleDateString('hi-IN', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>
      
      {horoscopes.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative z-10">
          {horoscopes.map((horoscope) => {
            const zodiacInfo = zodiacSigns.find(z => 
              z.id.toLowerCase() === horoscope.zodiacSign?.toLowerCase() ||
              z.english.toLowerCase().includes(horoscope.zodiacSign?.toLowerCase())
            );
            
            return (
              <Link
                key={horoscope._id || horoscope.zodiacSign}
                href={`/articles/${horoscope.slug}`}
                className="group bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                    {zodiacInfo?.symbol || '⭐'}
                  </div>
                  <h3 className="text-white font-semibold mb-2 text-sm">
                    {language === 'hindi' && zodiacInfo?.name 
                      ? zodiacInfo.name 
                      : zodiacInfo?.english || horoscope.zodiacSign}
                  </h3>
                  <p className="text-orange-100 text-xs leading-relaxed line-clamp-3">
                    {horoscope.metaDescription || 'आज का कॉस्मिक मार्गदर्शन जानें...'}
                  </p>
                  <div className="mt-2 text-xs text-orange-200 flex items-center justify-center">
                    <span>और पढ़ें</span>
                    <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-white/80 relative z-10">
          <div className="text-4xl mb-4">🔮</div>
          <h3 className="text-xl font-semibold mb-2">आज कोई राशिफल उपलब्ध नहीं</h3>
          <p className="text-orange-200 text-sm">
            आज का कॉस्मिक मार्गदर्शन हमारे AI ज्योतिषी तैयार कर रहे हैं।
          </p>
          <Link
            href="/articles/category/daily-rashifal"
            className="inline-block mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors text-sm"
          >
            सभी राशिफल देखें
          </Link>
        </div>
      )}
    </div>
  );
}
