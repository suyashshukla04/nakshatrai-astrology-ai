'use client';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate, getCategoryColor, truncateText } from '@/lib/utils';
import { useState } from 'react';

export default function ArticleCard({ article }) {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageError = () => {
        console.log('Image failed to load:', article.featuredImage);
        setImageError(true);
        setImageLoading(false);
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

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
    const categoryDisplay = category.charAt(0).toUpperCase() + category.slice(1);

    return (
        <article className="bg-light-bg dark:bg-dark-bg-secondary rounded-xl shadow-sm border border-light-border dark:border-dark-border overflow-hidden hover:shadow-md dark:hover:shadow-xl transition-all duration-300 group">
            <Link href={`/articles/${article.slug || '#'}`}>
                <div className="relative h-48 w-full overflow-hidden bg-light-bg-secondary dark:bg-dark-bg-tertiary">
                    {!imageError && article.featuredImage ? (
                        <>
                            {imageLoading && (
                                <div className="absolute inset-0 bg-light-bg-tertiary dark:bg-dark-bg animate-pulse flex items-center justify-center">
                                    <svg className="w-8 h-8 text-light-text-muted dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                            <Image
                                src={article.featuredImage}
                                alt={cleanTitle}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={handleImageError}
                                onLoad={handleImageLoad}
                                unoptimized={article.featuredImage?.includes('oaidalleapiprodscus')}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </>
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                            <svg className="w-12 h-12 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                    <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(category)}`}>
                            {categoryDisplay}
                        </span>
                    </div>
                </div>
            </Link>
            
            <div className="p-6">
                <Link href={`/articles/${article.slug || '#'}`}>
                    <h2 className="text-xl font-bold text-light-text dark:text-white mb-3 hover:text-brand-primary dark:hover:text-brand-primary transition-colors line-clamp-2 group-hover:text-brand-primary">
                        {cleanTitle}
                    </h2>
                </Link>
                
                <p className="text-light-text-secondary dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                    {truncateText(article.metaDescription || article.excerpt || '', 120)}
                </p>
                
                <div className="flex items-center justify-between text-sm text-light-text-muted dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {article.publishedAt ? formatDate(article.publishedAt) : 'No date'}
                        </span>
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            {article.readingTime || 5} min read
                        </span>
                    </div>
                    <span className="font-medium text-brand-primary">{article.author || 'MobileTechAI'}</span>
                </div>
                
                {article.tags && article.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {article.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-light-bg-secondary dark:bg-dark-bg-tertiary text-light-text-secondary dark:text-gray-300 text-xs rounded-md border border-light-border-light dark:border-dark-border-light"
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
