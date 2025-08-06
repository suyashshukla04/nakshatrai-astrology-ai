'use client';
import { useState, useEffect } from 'react';
import { getArticles } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';
import CategoryFilter from '@/components/CategoryFilter';
import LanguageToggle from '@/components/LanguageToggle';
import SearchBar from '@/components/SearchBar';
import Pagination from '@/components/Pagination';

export default function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch articles function
  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: currentPage,
        limit: 12,
        siteId: 'astroai'
      };

      if (selectedCategory && selectedCategory !== 'all') {
        params.category = selectedCategory;
      }

      if (selectedLanguage && selectedLanguage !== 'all') {
        params.language = selectedLanguage;
      }

      if (searchQuery && searchQuery.trim()) {
        params.search = searchQuery.trim();
      }
      
      const response = await getArticles(params);
      
      const articlesData = response?.data?.articles || [];
      const totalPagesData = response?.data?.pagination?.totalPages || 1;

      setArticles(articlesData);
      setTotalPages(totalPagesData);
      
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('ज्योतिष लेख लोड करने में असफल। कृपया अपना कनेक्शन जांचें और फिर कोशिश करें।');
      setArticles([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [currentPage, selectedCategory, selectedLanguage, searchQuery]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-light-text dark:text-dark-text mb-4">
              🔮 सभी ज्योतिष लेख
            </h1>
            <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary">
              कॉस्मिक ज्ञान लोड हो रहा है...
            </p>
          </div>
          
          {/* Loading skeleton */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="h-12 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl animate-pulse flex-1"></div>
            <div className="h-12 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-xl animate-pulse w-full lg:w-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-2xl mb-4"></div>
                <div className="h-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded mb-2"></div>
                <div className="h-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-light-bg-secondary dark:bg-dark-bg-secondary rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">
            🔮 सभी ज्योतिष लेख
          </h1>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary">
            AI-संचालित कॉस्मिक अंतर्दृष्टि और व्यक्तिगत मार्गदर्शन के साथ प्राचीन ज्ञान की खोज करें
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-2xl p-6 mb-8 border border-light-border dark:border-dark-border">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="ज्योतिष लेख, राशि चिह्न, भविष्यवाणियां खोजें..."
            />
            <LanguageToggle 
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>
          
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            language="hindi"
          />
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-8 mb-8">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 max-w-lg mx-auto">
              <div className="text-4xl mb-4">🚨</div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
                ज्योतिष लेख लोड नहीं हो सके
              </h3>
              <p className="text-red-600 dark:text-red-300 mb-6">{error}</p>
              <button 
                onClick={fetchArticles}
                className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
              >
                फिर कोशिश करें
              </button>
            </div>
          </div>
        )}

        {/* Articles Content */}
        {!error && (
          <>
            {articles.length > 0 ? (
              <>
                {/* Results Info */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="text-light-text-secondary dark:text-dark-text-secondary">
                    {searchQuery && (
                      <span>"{searchQuery}" के लिए खोज परिणाम • </span>
                    )}
                    <span>{articles.length} कॉस्मिक अंतर्दृष्टि दिखाई जा रही है</span>
                  </div>
                  
                  {/* Active filters */}
                  <div className="flex items-center gap-2">
                    {selectedCategory !== 'all' && (
                      <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-sm">
                        {selectedCategory.replace('-', ' ')}
                      </span>
                    )}
                    {selectedLanguage !== 'all' && (
                      <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full text-sm">
                        {selectedLanguage === 'hindi' ? 'हिंदी' : 'English'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {articles.map((article) => (
                    <ArticleCard 
                      key={article._id || article.id} 
                      article={article} 
                    />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              /* Empty State */
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-6">🔮</div>
                  <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                    कोई कॉस्मिक अंतर्दृष्टि नहीं मिली
                  </h2>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8">
                    {searchQuery || selectedCategory !== 'all' || selectedLanguage !== 'all'
                      ? 'अपने खोज मानदंडों को समायोजित करने या विभिन्न श्रेणियों का पता लगाने का प्रयास करें।' 
                      : 'हमारे AI ज्योतिषी नई कॉस्मिक ज्ञान तैयार कर रहे हैं। कृपया जल्द ही वापस जांचें।'}
                  </p>
                  {(searchQuery || selectedCategory !== 'all' || selectedLanguage !== 'all') && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setSelectedLanguage('all');
                        setCurrentPage(1);
                      }}
                      className="px-8 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
                    >
                      सभी फ़िल्टर साफ़ करें
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
