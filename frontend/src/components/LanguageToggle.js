'use client';
import { getLanguageFlag } from '@/lib/utils';

export default function LanguageToggle({ selectedLanguage, onLanguageChange, className = '' }) {
  const languages = [
    { id: 'all', name: 'सभी भाषाएं', nameEng: 'All Languages', flag: '🌍' },
    { id: 'hindi', name: 'हिंदी', nameEng: 'Hindi', flag: '🇮🇳' },
    { id: 'english', name: 'English', nameEng: 'English', flag: '🇺🇸' }
  ];

  return (
    <div className={`flex gap-2 ${className}`}>
      {languages.map((language) => (
        <button
          key={language.id}
          onClick={() => onLanguageChange && onLanguageChange(language.id)}
          className={`language-toggle ${
            selectedLanguage === language.id ? 'active' : ''
          }`}
          title={`${language.name} में फ़िल्टर करें`}
        >
          <span className="mr-1">{language.flag}</span>
          <span className="hidden sm:inline">{language.name}</span>
          <span className="sm:hidden">
            {language.id === 'all' ? 'सभी' : language.name.split(' ')[0]}
          </span>
        </button>
      ))}
    </div>
  );
}
