'use client';
import { useTheme } from '@/contexts/ThemeContext';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function ThemeSwitcher() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-10 h-10 rounded-lg bg-gray-100 animate-pulse"></div>
    );
  }

  try {
    const { theme, toggleTheme, isDark, mounted } = useTheme();

    if (!mounted) {
      return (
        <div className="w-10 h-10 rounded-lg bg-gray-100 animate-pulse"></div>
      );
    }

    return (
      <button
        onClick={toggleTheme}
        className="relative inline-flex items-center justify-center w-10 h-10 rounded-lg 
                   bg-light-bg-secondary dark:bg-dark-bg-secondary 
                   border border-light-border dark:border-dark-border
                   hover:bg-light-bg-tertiary dark:hover:bg-dark-bg-tertiary
                   transition-all duration-200 ease-in-out
                   focus:outline-none focus:ring-2 focus:ring-cosmic-500 focus:ring-offset-2
                   focus:ring-offset-light-bg dark:focus:ring-offset-dark-bg
                   group"
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      >
        <div className="relative w-5 h-5">
          <SunIcon 
            className={`absolute inset-0 w-5 h-5 text-amber-500 transition-all duration-300 ${
              isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
            }`}
          />
          <MoonIcon 
            className={`absolute inset-0 w-5 h-5 text-indigo-400 transition-all duration-300 ${
              isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
            }`}
          />
        </div>
        
        {/* Cosmic glow effect */}
        <div className={`absolute inset-0 rounded-lg transition-all duration-300 ${
          isDark 
            ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100' 
            : 'bg-gradient-to-r from-amber-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100'
        }`}></div>
      </button>
    );
  } catch (error) {
    console.warn('ThemeSwitcher: Theme context not available:', error);
    return (
      <div className="w-10 h-10 rounded-lg bg-gray-200 border border-gray-300 flex items-center justify-center">
        <SunIcon className="w-5 h-5 text-gray-500" />
      </div>
    );
  }
}
