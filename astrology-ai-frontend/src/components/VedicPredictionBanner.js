'use client';
import { useState, useEffect } from 'react';

export default function VedicPredictionBanner() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Get current date in Hindi
    const today = new Date().toLocaleDateString('hi-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Kolkata'
    });
    setCurrentDate(today);
  }, []);

  const scrollToPredictionForm = () => {
    document.getElementById('prediction-form')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="relative bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900 py-20 overflow-hidden">
      {/* Cosmic stars animation */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Vedic symbols */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-6xl text-yellow-400">🕉️</div>
        <div className="absolute bottom-10 right-10 text-4xl text-orange-400">🔱</div>
        <div className="absolute top-1/2 left-1/4 text-5xl text-red-400">🪷</div>
        <div className="absolute top-1/4 right-1/4 text-4xl text-yellow-400">☀️</div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Hindi heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">आज की आपकी</span>
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              वैदिक राशिफल
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            आज के ग्रह गोचर और आपकी राशि के आधार पर 
            <span className="text-yellow-300 font-semibold"> सटीक व्यक्तिगत भविष्यवाणी</span> पाएं
          </p>
          
          {/* Today's date in Hindi */}
          {currentDate && (
            <div className="mb-8 text-lg text-yellow-200">
              <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                📅 आज: {currentDate}
              </span>
            </div>
          )}
          
          {/* CTA Button */}
          <div className="mb-12">
            <button
              onClick={scrollToPredictionForm}
              className="group px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 font-semibold text-lg border border-white/30 hover:border-white/50 transform hover:scale-105"
            >
              <span className="mr-2">🔮</span>
              अपना आज का राशिफल देखें
              <svg className="w-5 h-5 inline-block ml-2 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl mb-2">🕉️</div>
              <div className="text-white font-medium text-sm">वैदिक ज्ञान</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🌟</div>
              <div className="text-white font-medium text-sm">आज का विशेष</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🎯</div>
              <div className="text-white font-medium text-sm">व्यक्तिगत</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📿</div>
              <div className="text-white font-medium text-sm">मंत्र उपाय</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
