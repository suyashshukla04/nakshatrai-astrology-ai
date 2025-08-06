'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Default to dark for cosmic feel
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('astrology-ai-theme');
      if (savedTheme) {
        setTheme(savedTheme);
      } else {
        // Default to dark theme for mystical astrology feel
        setTheme('dark');
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
      setTheme('dark');
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('astrology-ai-theme', theme);
      } catch (error) {
        console.warn('Failed to apply theme:', error);
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const setLightTheme = () => setTheme('light');
  const setDarkTheme = () => setTheme('dark');

  if (!mounted) {
    return (
      <div className="min-h-screen bg-dark-bg text-gray-100">
        <div className="animate-pulse">
          {children}
        </div>
      </div>
    );
  }

  const value = {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    mounted
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
