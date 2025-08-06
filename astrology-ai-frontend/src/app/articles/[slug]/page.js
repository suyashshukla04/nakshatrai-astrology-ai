import { getArticleBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatDate, getCategoryColor, getLanguageFlag } from '@/lib/utils';

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  
  try {
    const response = await getArticleBySlug(slug, 'astroai');
    const { article, relatedArticles = [] } = response.data;
    
    if (!article) {
      notFound();
    }

    const cleanTitle = (article.title || 'Untitled Article')
      .replace(/\*\*/g, '')
      .replace(/\n/g, ' ')
      .trim();

    const processedContent = article.content
      .replace(/&lt;h2&gt;/g, '<h2 class="text-3xl font-bold text-light-text dark:text-dark-text mt-10 mb-6 leading-tight">')
      .replace(/&lt;h3&gt;/g, '<h3 class="text-2xl font-bold text-light-text dark:text-dark-text mt-8 mb-4 leading-tight">')
      .replace(/&lt;strong&gt;/g, '<strong class="font-bold text-cosmic-600 dark:text-cosmic-400">')
      .replace(/&lt;p&gt;/g, '<p class="text-light-text-secondary dark:text-gray-300 mb-6 leading-relaxed text-lg">');

    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-12">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getCategoryColor(article.category)}`}>
                  {article.category?.charAt(0).toUpperCase() + article.category?.slice(1).replace('-', ' ')}
                </span>
                {article.language && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-light-bg-secondary dark:bg-dark-bg-secondary text-light-text-secondary dark:text-dark-text-secondary border border-light-border dark:border-dark-border">
                    {getLanguageFlag(article.language)} {article.language === 'hindi' ? 'हिंदी' : 'English'}
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-6 leading-tight">
                {cleanTitle}
              </h1>
              
              {/* Article Meta */}
              <div className="flex flex-wrap items-center gap-6 text-light-text-secondary dark:text-dark-text-secondary mb-8">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-cosmic-500 to-mystical-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                  <span className="font-medium">{article.author || 'AstroAI Master'}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>{article.readingTime || 5} min read</span>
                </div>
              </div>

              {/* Astrology Metadata */}
              {(article.zodiacSign || article.planetaryInfluence) && (
                <div className="flex flex-wrap gap-3 mb-8">
                  {article.zodiacSign && (
                    <div className="flex items-center px-4 py-2 bg-cosmic-100 dark:bg-cosmic-900/30 text-cosmic-700 dark:text-cosmic-400 rounded-xl border border-cosmic-200 dark:border-cosmic-700">
                      <span className="text-lg mr-2">♈</span>
                      <span className="font-medium">{article.zodiacSign}</span>
                    </div>
                  )}
                  {article.planetaryInfluence && (
                    <div className="flex items-center px-4 py-2 bg-mystical-100 dark:bg-mystical-900/30 text-mystical-700 dark:text-mystical-400 rounded-xl border border-mystical-200 dark:border-mystical-700">
                      <span className="text-lg mr-2">🪐</span>
                      <span className="font-medium">{article.planetaryInfluence}</span>
                    </div>
                  )}
                </div>
              )}
            </header>

            {/* Featured Image */}
            {article.featuredImage && (
              <div className="relative w-full h-96 md:h-[500px] mb-12 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={article.featuredImage}
                  alt={cleanTitle}
                  fill
                  className="object-cover"
                  unoptimized={article.featuredImage?.includes('oaidalleapiprodscus')}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            )}

            {/* Article Content */}
            <article className="prose prose-lg max-w-none mb-12">
              <div 
                className="article-content text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />
            </article>

            {/* AI Attribution */}
            <div className="bg-gradient-to-r from-cosmic-50 to-mystical-50 dark:from-cosmic-900/20 dark:to-mystical-900/20 border border-cosmic-200 dark:border-cosmic-700 rounded-2xl p-6 mb-12">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cosmic-500 to-mystical-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold">AI</span>
                </div>
                <div>
                  <h3 className="font-bold text-light-text dark:text-dark-text mb-2">
                    🤖 Generated by AstroAI Master
                  </h3>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary text-sm leading-relaxed">
                    This article was created by our advanced AI system that combines ancient Vedic wisdom with modern computational analysis. 
                    Our AI studies traditional astrological texts and applies current planetary data to provide personalized cosmic guidance.
                  </p>
                  <div className="flex items-center mt-3 text-xs text-light-text-muted dark:text-dark-text-muted">
                    <span className="mr-4">⚡ Model: {article.aiModel || 'Gemini-2.5-Flash'}</span>
                    <span className="mr-4">🎨 Style: {article.contentStyle || 'Practical Astrology'}</span>
                    <span>📊 Quality Score: {article.qualityScore || 'High'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="border-t border-light-border dark:border-dark-border pt-8 mb-12">
                <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-4">
                  🏷️ Related Topics
                </h3>
                <div className="flex flex-wrap gap-3">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-light-bg-secondary dark:bg-dark-bg-tertiary text-light-text-secondary dark:text-dark-text-secondary rounded-xl text-sm font-medium hover:bg-cosmic-50 dark:hover:bg-cosmic-900/20 transition-colors cursor-pointer border border-light-border dark:border-dark-border"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Articles */}
            {relatedArticles && relatedArticles.length > 0 && (
              <section className="border-t border-light-border dark:border-dark-border pt-12">
                <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-8">
                  🌟 More Cosmic Insights
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedArticles.map((relatedArticle) => (
                    <a
                      key={relatedArticle._id}
                      href={`/articles/${relatedArticle.slug}`}
                      className="group bg-light-bg-secondary dark:bg-dark-bg-secondary rounded-2xl p-6 border border-light-border dark:border-dark-border hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    >
                      {relatedArticle.featuredImage && (
                        <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
                          <Image
                            src={relatedArticle.featuredImage}
                            alt={relatedArticle.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, 300px"
                          />
                        </div>
                      )}
                      <h3 className="font-bold text-light-text dark:text-dark-text mb-2 group-hover:text-cosmic-500 transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <div className="flex items-center text-sm text-light-text-muted dark:text-dark-text-muted">
                        <span className="mr-3">{formatDate(relatedArticle.publishedAt)}</span>
                        <span>{relatedArticle.readingTime || 5} min read</span>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}
