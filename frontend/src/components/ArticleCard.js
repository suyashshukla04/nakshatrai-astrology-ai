'use client';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate, getCategoryColor, truncateText, getLanguageFlag } from '@/lib/utils';
import { useState } from 'react';

export default function ArticleCard({ article }) {
  const [imageError, setImageError] = useState(false);

  if (!article) {
    return null;
  }

  const cleanTitle = (article.title || 'Untitled Article')
    .replace(/\*\*/g, '')
    .replace(/##/g, '')
    .replace(/\*/g, '')
    .replace(/\n/g, ' ')
    .trim();

  const category = article.category || 'uncategorized';
  const categoryDisplay = category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ');

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <Link href={`/articles/${article.slug || '#'}`}>
        <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
          {!imageError && article.featuredImage ? (
            <Image
              src={article.featuredImage}
              alt={cleanTitle}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageError(true)}
              unoptimized={article.featuredImage?.includes('oaidalleapiprodscus')}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl mb-2">🔮</div>
                <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">Astrology Insight</div>
              </div>
            </div>
          )}
          
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getCategoryColor(category)}`}>
              {categoryDisplay}
            </span>
          </div>
          
          {article.language && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/90 dark:bg-black/90 text-gray-700 dark:text-gray-300 backdrop-blur-sm border border-white/20 dark:border-gray-600/20">
                {getLanguageFlag(article.language)} {article.language === 'hindi' ? 'हिंदी' : 'English'}
              </span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-6">
        <Link href={`/articles/${article.slug || '#'}`}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2 group-hover:text-blue-600">
            {cleanTitle}
          </h2>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
          {truncateText(article.metaDescription || article.excerpt || 'Discover ancient wisdom through modern AI insights...', 120)}
        </p>
        
        {/* Astrology metadata */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.zodiacSign && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-700">
              <span className="mr-1">♈</span>
              {article.zodiacSign}
            </span>
          )}
          {article.planetaryInfluence && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-700">
              <span className="mr-1">🪐</span>
              {article.planetaryInfluence}
            </span>
          )}
        </div>
        
        {/* Article metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {article.publishedAt ? formatDate(article.publishedAt) : 'Recent'}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {article.readingTime || 5} min read
            </span>
          </div>
          <span className="font-medium text-blue-600 dark:text-blue-400">{article.author || 'AstroAI'}</span>
        </div>
        
        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md border border-gray-200 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
