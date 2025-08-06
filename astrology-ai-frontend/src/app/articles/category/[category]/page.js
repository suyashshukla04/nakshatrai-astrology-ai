'use client';
import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { getArticlesByCategory } from '@/lib/api';
import { getAstrologyCategories } from '@/lib/utils';
import ArticleCard from '@/components/ArticleCard';
import LanguageToggle from '@/components/LanguageToggle';

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const category = params.category;
  const language = searchParams.get('language') || 'all';
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Memoize categories and categoryInfo to prevent recreation on every render
  const categories = useMemo(() => getAstrologyCategories(), []);
  const categoryInfo = useMemo(() => 
    categories.find(cat => cat.id === category), 
    [categories, category]
  );

  // Separate effect for validation
  useEffect(() => {
    if (!categoryInfo) {
      setError('Category not found');
      setLoading(false);
    }
  }, [categoryInfo]);

  // Separate effect for fetching articles
  useEffect(() => {
    if (!categoryInfo) return;

    let isMounted = true; // Prevent state updates if component unmounts

    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`🔮 Fetching articles for category: ${category}, language: ${language}`);
        
        const response = await getArticlesByCategory(
          category, 
          'astroai', 
          20, 
          language === 'all' ? null : language
        );
        
        if (isMounted) {
          setArticles(response.data || []);
        }
      } catch (err) {
        console.error('Error fetching articles:', err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchArticles();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [category, language, categoryInfo]); // Only depend on primitive values

  const handleLanguageChange = (newLang) => {
    const url = new URL(window.location);
    if (newLang === 'all') {
      url.searchParams.delete('language');
    } else {
      url.searchParams.set('language', newLang);
    }
    window.location.href = url.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔮</div>
            <h1 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
              लोड हो रहा है...
            </h1>
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              आपके लिए ज्योतिष लेख तैयार किए जा रहे हैं
            </p>
            
            {/* Loading spinner */}
            <div className="mt-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !categoryInfo) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🚨</div>
            <h1 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
              त्रुटि: लेख लोड नहीं हो सके
            </h1>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
              {error || 'इस श्रेणी के लिए कोई लेख नहीं मिला'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors font-medium"
            >
              पुनः लोड करें
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Category Hero Section */}
        <div className="text-center mb-12">
          <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${categoryInfo.color} flex items-center justify-center text-4xl mb-6`}>
            {categoryInfo.icon}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">
            {categoryInfo.name}
          </h1>
          
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto mb-8">
            {categoryInfo.description}
          </p>
          
          {/* Language Toggle */}
          <div className="flex justify-center mb-8">
            <LanguageToggle
              selectedLanguage={language}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </div>

        {/* Articles Content */}
        {articles && articles.length > 0 ? (
          <>
            <div className="mb-6 text-center">
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                {articles.length} कॉस्मिक अंतर्दृष्टि दिखाई जा रही है
                {language !== 'all' && (
                  <span> {language === 'hindi' ? ' हिंदी में' : ' अंग्रेजी में'}</span>
                )}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => {
                if (!article || !article._id) {
                  console.warn('Invalid article at index:', index, article);
                  return null;
                }
                return (
                  <ArticleCard key={article._id} article={article} />
                );
              })}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">{categoryInfo.icon}</div>
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
              कोई लेख नहीं मिला
            </h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8">
              {language !== 'all' 
                ? `इस श्रेणी में ${language === 'hindi' ? 'हिंदी' : 'अंग्रेजी'} में अभी तक कोई लेख उपलब्ध नहीं है।`
                : 'इस श्रेणी में अभी तक कोई लेख उपलब्ध नहीं है।'
              }
            </p>
            {language !== 'all' && (
              <button
                onClick={() => handleLanguageChange('all')}
                className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
              >
                सभी भाषाएं देखें
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
