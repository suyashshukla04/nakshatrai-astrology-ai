'use client';
import { getAstrologyCategories, getCategoryColor } from '@/lib/utils';

export default function CategoryFilter({ selectedCategory, onCategoryChange, language = 'hindi' }) {
  const categories = [
    { id: 'all', name: 'सभी श्रेणियां', english: 'All Categories', icon: '🌟' },
    ...getAstrologyCategories()
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange && onCategoryChange(category.id)}
          className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border transform hover:scale-105 ${
            selectedCategory === category.id
              ? category.id === 'all' 
                ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-500/25' 
                : getCategoryColor(category.id).replace('bg-', 'bg-').replace('text-', 'text-').replace('border-', 'border-') + ' shadow-lg'
              : 'bg-light-bg dark:bg-dark-bg-secondary text-light-text-secondary dark:text-dark-text-secondary border-light-border dark:border-dark-border hover:border-orange-300 dark:hover:border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20'
          }`}
        >
          <span className="mr-2 text-lg">{category.icon}</span>
          <span className="hidden sm:inline">
            {language === 'hindi' && category.name ? category.name : category.english || category.name}
          </span>
          <span className="sm:hidden">
            {(category.name || category.english || '').split(' ')[0]}
          </span>
        </button>
      ))}
    </div>
  );
}
