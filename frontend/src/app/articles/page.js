// C:\Users\suyas\mobile-tech-automation-v2\frontend\src\app\articles\page.js


'use client';
import { useState, useEffect } from 'react';
import { getArticles } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';
import CategoryFilter from '@/components/CategoryFilter';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';
import ClientOnly from '@/components/ClientOnly';

export default function ArticlesPage() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch articles function with better error handling
    const fetchArticles = async () => {
        try {
            setLoading(true);
            setError(null); // Clear previous errors
            
            const params = {
                page: currentPage,
                limit: 12,
            };

            // Only add category if it's not 'all'
            if (selectedCategory && selectedCategory !== 'all') {
                params.category = selectedCategory;
            }

            // Only add search if it exists
            if (searchQuery && searchQuery.trim()) {
                params.search = searchQuery.trim();
            }
            
            const response = await getArticles(params);
            
            // More flexible data structure handling
            const articlesData = response?.data?.articles || [];
            const totalPagesData = 
                response?.data?.pagination?.totalPages || 
                response?.data?.totalPages || 
                Math.ceil((response?.data?.total || 0) / 12) ||
                1;

            setArticles(articlesData);
            setTotalPages(totalPagesData);
            
            // Debug logging
            console.log('Articles loaded:', articlesData.length);
            console.log('Total pages:', totalPagesData);
            
        } catch (error) {
            console.error('Error fetching articles:', error);
            setError('Failed to load articles. Please check your internet connection and try again.');
            setArticles([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    // Fetch articles when dependencies change
    useEffect(() => {
        fetchArticles();
    }, [currentPage, selectedCategory, searchQuery]);

    // Handle category change
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset to first page
    };

    // Handle search
    const handleSearch = (query) => {
        setSearchQuery(query);
        setCurrentPage(1); // Reset to first page
    };

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Loading state
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-light-text dark:text-dark-text mb-4">All Articles</h1>
                    <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary">Loading articles...</p>
                </div>
                
                {/* Loading skeleton */}
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                    <div className="h-12 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg animate-pulse flex-1"></div>
                    <div className="h-12 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg animate-pulse w-full lg:w-auto"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-48 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg mb-4"></div>
                            <div className="h-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded mb-2"></div>
                            <div className="h-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-light-text dark:text-dark-text mb-4">All Articles</h1>
                <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary">
                    Discover our latest AI-powered mobile technology insights and analysis
                </p>
            </div>

            {/* Search and Filter Section */}
            <ClientOnly fallback={<div className="h-12 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-lg animate-pulse mb-6"></div>}>
                <div className="flex flex-col lg:flex-row gap-4 mb-8">
                    <SearchBar 
                        onSearch={handleSearch} 
                        placeholder="Search articles..."
                    />
                    <CategoryFilter 
                        selectedCategory={selectedCategory}
                        onCategoryChange={handleCategoryChange}
                    />
                </div>
            </ClientOnly>

            {/* Error State */}
            {error && (
                <div className="text-center py-8 mb-8">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-lg mx-auto">
                        <svg className="w-12 h-12 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Unable to Load Articles</h3>
                        <p className="text-red-600 dark:text-red-300 mb-4">{error}</p>
                        <button 
                            onClick={fetchArticles}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            )}

            {/* Articles Content */}
            {!error && (
                <>
                    {articles.length > 0 ? (
                        <>
                            {/* Results count */}
                            <div className="mb-6 text-light-text-secondary dark:text-dark-text-secondary">
                                {searchQuery && (
                                    <p>Search results for "{searchQuery}" • </p>
                                )}
                                <p>Showing {articles.length} articles</p>
                            </div>

                            {/* Articles Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {articles.map((article) => (
                                    <ArticleCard 
                                        key={article._id || article.id || Math.random()} 
                                        article={article} 
                                    />
                                ))}
                            </div>
                            
                            {/* Pagination */}
                            {totalPages > 1 && (
                                <ClientOnly>
                                    <div className="flex justify-center">
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                </ClientOnly>
                            )}
                        </>
                    ) : (
                        /* Empty State */
                        <div className="text-center py-16">
                            <div className="max-w-md mx-auto">
                                <svg className="w-16 h-16 mx-auto text-light-text-muted dark:text-dark-text-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">No Articles Found</h2>
                                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                                    {searchQuery || selectedCategory !== 'all' 
                                        ? 'Try adjusting your search or filter criteria.' 
                                        : 'No articles are currently available. Please check back later.'}
                                </p>
                                {(searchQuery || selectedCategory !== 'all') && (
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedCategory('all');
                                            setCurrentPage(1);
                                        }}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
