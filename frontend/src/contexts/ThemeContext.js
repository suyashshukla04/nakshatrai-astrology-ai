// //C:\Users\suyas\mobile-tech-automation-v2\frontend\src\contexts\ThemeContext.js

// 'use client';
// import React, { createContext, useContext, useEffect, useState } from 'react';

// const ThemeContext = createContext(undefined);

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error('useTheme must be used within a ThemeProvider. Make sure your component is wrapped with <ThemeProvider>.');
//   }
//   return context;
// };

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('light');
//   const [mounted, setMounted] = useState(false);

//   // Load theme from localStorage on mount
//   useEffect(() => {
//     try {
//       const savedTheme = localStorage.getItem('mobiletechAI-theme');
//       const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
//       const initialTheme = savedTheme || systemTheme;
      
//       setTheme(initialTheme);
//     } catch (error) {
//       console.warn('Failed to load theme from localStorage:', error);
//       setTheme('light'); // Fallback to light theme
//     }
//     setMounted(true);
//   }, []);

//   // Apply theme to document
//   useEffect(() => {
//     if (mounted) {
//       try {
//         const root = document.documentElement;
//         root.classList.remove('light', 'dark');
//         root.classList.add(theme);
//         localStorage.setItem('mobiletechAI-theme', theme);
//       } catch (error) {
//         console.warn('Failed to apply theme:', error);
//       }
//     }
//   }, [theme, mounted]);

//   const toggleTheme = () => {
//     setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
//   };

//   const setLightTheme = () => setTheme('light');
//   const setDarkTheme = () => setTheme('dark');

//   // Prevent hydration mismatch by showing loading state
//   if (!mounted) {
//     return (
//       <div className="min-h-screen bg-white">
//         <div className="animate-pulse">
//           {children}
//         </div>
//       </div>
//     );
//   }

//   const value = {
//     theme,
//     toggleTheme,
//     setLightTheme,
//     setDarkTheme,
//     isDark: theme === 'dark',
//     isLight: theme === 'light',
//     mounted
//   };

//   return (
//     <ThemeContext.Provider value={value}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider. Make sure your component is wrapped with <ThemeProvider>.');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // 🔧 CHANGED: Default to 'dark' instead of 'light'
  const [theme, setTheme] = useState('dark');
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('mobiletechAI-theme');
      
      if (savedTheme) {
        // User has a saved preference - use it
        setTheme(savedTheme);
      } else {
        // 🔧 CHANGED: No saved preference = default to dark mode
        setTheme('dark');
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
      // 🔧 CHANGED: Fallback to dark theme instead of light
      setTheme('dark');
    }
    setMounted(true);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (mounted) {
      try {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('mobiletechAI-theme', theme);
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

  // 🔧 CHANGED: Show dark loading state instead of white
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100">
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
