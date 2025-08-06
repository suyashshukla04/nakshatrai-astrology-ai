'use client';
import Link from 'next/link';
import { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { getAstrologyCategories } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const categories = getAstrologyCategories();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'All Articles', href: '/articles' },
    { name: 'Daily Horoscope', href: '/articles/category/daily-horoscope' },
    { name: 'Love & Compatibility', href: '/articles/category/love-compatibility' },
    { name: 'Career Guidance', href: '/articles/category/career-guidance' },
    { name: 'Gemstones', href: '/articles/category/gemstone-guide' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-light-bg dark:bg-dark-bg shadow-lg border-b border-light-border dark:border-dark-border sticky top-0 z-50 transition-colors duration-300 backdrop-blur-md bg-opacity-95 dark:bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - FIXED SIZE */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-cosmic-500 to-mystical-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200 relative flex-shrink-0">
              <span className="text-white font-bold text-sm">✨</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cosmic-400 to-mystical-400 opacity-0 group-hover:opacity-50 transition-opacity duration-200"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-light-text dark:text-dark-text group-hover:text-cosmic-500 transition-colors leading-tight">
                Astrology AI
              </span>
              <span className="text-xs text-light-text-muted dark:text-dark-text-muted -mt-0.5 leading-none">
                Ancient Wisdom • Modern AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-light-text-secondary dark:text-dark-text-secondary 
                          hover:text-cosmic-500 dark:hover:text-cosmic-400 
                          transition-colors duration-200 font-medium
                          relative group py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cosmic-400 to-mystical-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <ThemeSwitcher />
            
            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg text-light-text-secondary dark:text-dark-text-secondary
                        hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary
                        transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-5 h-5" />
              ) : (
                <Bars3Icon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-light-border dark:border-dark-border">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 rounded-lg text-light-text-secondary dark:text-dark-text-secondary 
                            hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary
                            hover:text-cosmic-500 dark:hover:text-cosmic-400
                            transition-colors duration-200 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
