'use client';
import { getCategoryColor } from '@/lib/utils';

export default function CategoryFilter({ selectedCategory, onCategoryChange }) {
    const categories = [
        { value: 'all', label: 'All Articles' },
        { value: 'today', label: 'Today' },
        { value: 'current', label: 'Current' },
        { value: 'historical', label: 'Historical' },
        { value: 'trendy', label: 'Trendy' }
    ];

    return (
        <div className="flex flex-wrap gap-2" suppressHydrationWarning>
            {categories.map((category) => (
                <button
                    key={category.value}
                    onClick={() => onCategoryChange(category.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                        selectedCategory === category.value
                            ? category.value === 'all' 
                                ? 'bg-blue-600 text-white border-blue-600' 
                                : getCategoryColor(category.value)
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                    suppressHydrationWarning
                >
                    {category.label}
                </button>
            ))}
        </div>
    );
}
