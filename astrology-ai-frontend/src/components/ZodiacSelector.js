'use client';
import { getVedicZodiacSigns } from '@/lib/utils';
import { useState } from 'react';

export default function VedicZodiacSelector({ selectedSign, onSignChange, language = 'hindi' }) {
  const zodiacSigns = getVedicZodiacSigns();
  const [hoveredSign, setHoveredSign] = useState(null);

  return (
    <div className="cosmic-bg rounded-2xl p-6 border border-orange-400">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          ✨ अपनी राशि चुनें
        </h3>
        <p className="text-orange-100">
          व्यक्तिगत कॉस्मिक मार्गदर्शन प्राप्त करें
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {zodiacSigns.map((sign) => (
          <button
            key={sign.id}
            onClick={() => onSignChange(sign.id)}
            onMouseEnter={() => setHoveredSign(sign.id)}
            onMouseLeave={() => setHoveredSign(null)}
            className={`relative p-4 rounded-xl border-2 transition-all duration-300 group ${
              selectedSign === sign.id
                ? 'border-yellow-400 bg-yellow-500/20 shadow-lg shadow-yellow-500/25'
                : 'border-white/20 bg-white/10 hover:border-yellow-300 hover:bg-yellow-500/10'
            }`}
            title={`${sign.name} (${sign.dates})`}
          >
            {/* Zodiac symbol */}
            <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-200">
              {sign.symbol}
            </div>
            
            {/* Sign name */}
            <div className="text-white font-medium text-sm mb-1">
              {language === 'hindi' ? sign.name : sign.english}
            </div>
            
            {/* Element */}
            <div className="text-orange-200 text-xs">
              {language === 'hindi' ? sign.element : sign.elementEng}
            </div>
            
            {/* Dates (on hover) */}
            {hoveredSign === sign.id && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-10">
                {sign.dates}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            )}
            
            {/* Selection indicator */}
            {selectedSign === sign.id && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-400/20 pointer-events-none"></div>
            )}
          </button>
        ))}
      </div>
      
      {selectedSign && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-white">
            <span className="text-lg mr-2">
              {zodiacSigns.find(s => s.id === selectedSign)?.symbol}
            </span>
            <span className="font-medium">
              चुनी गई राशि: {language === 'hindi' 
                ? zodiacSigns.find(s => s.id === selectedSign)?.name 
                : zodiacSigns.find(s => s.id === selectedSign)?.english
              }
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
