import { getArticles, getSiteConfig } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';
import Link from 'next/link';

export default async function HomePage() {
  try {
    const [articlesResponse, configResponse] = await Promise.all([
      getArticles({ limit: 6 }),
      getSiteConfig()
    ]);

    const { articles } = articlesResponse.data;
    const { site } = configResponse.data;

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16 mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {site.brandName}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {site.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/articles"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Browse All Articles
            </Link>
            <Link
              href="/articles/category/today"
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Latest News
            </Link>
          </div>
        </section>

        {/* Latest Articles */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
            <Link
              href="/articles"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </section>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Tech Mobile Insights</h1>
        <p className="text-gray-600">Loading latest articles...</p>
      </div>
    );
  }
}
