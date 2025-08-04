'use client';
import Link from 'next/link';
import { useState } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Articles', href: '/articles' },
    { name: 'Today', href: '/articles/category/today' },
    { name: 'Current', href: '/articles/category/current' },
    { name: 'Historical', href: '/articles/category/historical' },
    { name: 'Trendy', href: '/articles/category/trendy' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-light-bg dark:bg-dark-bg shadow-sm border-b border-light-border dark:border-dark-border sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-bold text-light-text dark:text-dark-text">Tech Mobile Insights</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-light-text-secondary dark:text-dark-text-secondary 
                          hover:text-brand-primary dark:hover:text-brand-primary 
                          transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            
            <button
              className="md:hidden p-2 rounded-lg text-light-text-secondary dark:text-dark-text-secondary
                        hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary
                        transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-light-border dark:border-dark-border">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 rounded-lg text-light-text-secondary dark:text-dark-text-secondary 
                            hover:bg-light-bg-secondary dark:hover:bg-dark-bg-secondary
                            hover:text-brand-primary dark:hover:text-brand-primary
                            transition-colors duration-200"
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
