import { getArticles, getSiteConfig } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';
import TodaysHoroscope from '@/components/TodaysHoroscope';
import VedicPredictionBanner from '@/components/VedicPredictionBanner';
import { getAstrologyCategories } from '@/lib/utils';
import InteractiveAIDemo from '@/components/InteractiveAIDemo';
import Link from 'next/link';

export default async function HomePage() {
  try {
    const [articlesResponse, configResponse] = await Promise.all([
      getArticles({ limit: 8, siteId: 'astroai' }),
      getSiteConfig('astroai')
    ]);

    const { articles } = articlesResponse.data;
    const { site } = configResponse.data;
    const categories = getAstrologyCategories();

    return (
      <div className="min-h-screen">
        {/* Vedic Prediction Banner */}
        <VedicPredictionBanner />

        {/* Today's Horoscope Section */}
        <section className="py-12 bg-light-bg dark:bg-dark-bg">
          <div className="container mx-auto px-4">
            <TodaysHoroscope />
          </div>
        </section>

        {/* Vedic Astrology Services Grid */}
        <section className="py-12 bg-light-bg-secondary dark:bg-dark-bg-secondary">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-4">
                🌟 वैदिक ज्योतिष सेवाएं
              </h2>
              <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
                प्राचीन ग्रंथों की ज्ञान परंपरा और आधुनिक AI तकनीक के साथ आपका कॉस्मिक मार्गदर्शन
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/articles/category/${category.id}`}
                  className="group bg-light-bg dark:bg-dark-bg rounded-2xl p-6 border border-light-border dark:border-dark-border hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-2 group-hover:text-orange-500 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center text-orange-500 font-medium text-sm">
                    <span>और जानें</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Articles Section */}
        <section className="py-12 bg-light-bg dark:bg-dark-bg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                  ✨ नवीनतम कॉस्मिक ज्ञान
                </h2>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  AI और प्राचीन ज्ञान से तैयार ताज़ा ज्योतिष लेख
                </p>
              </div>
              <Link
                href="/articles"
                className="hidden md:flex items-center text-orange-500 hover:text-orange-600 font-medium transition-colors"
              >
                सभी लेख देखें
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
            
            <div className="text-center mt-8 md:hidden">
              <Link
                href="/articles"
                className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
              >
                सभी लेख देखें
                <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* AI Vedic Technology Section */}
        <section className="py-12 bg-gradient-to-br from-orange-900 to-red-900 text-white" id="prediction-form">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                🤖 AI संचालित वैदिक ज्योतिष
              </h2>
              <p className="text-lg text-orange-100 mb-8 leading-relaxed">
                हमारा प्लेटफॉर्म प्राचीन वैदिक ज्योतिष की ज्ञान परंपरा को अत्याधुनिक कृत्रिम बुद्धिमत्ता के साथ 
                मिलाकर आपको व्यक्तिगत कॉस्मिक मार्गदर्शन प्रदान करता है।
              </p>
            </div>

            {/* Interactive Demo Component */}
            <div>
              <InteractiveAIDemo />
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="text-4xl mb-4">🔮</div>
        <h1 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
          वैदिक ज्योतिष AI प्लेटफॉर्म में आपका स्वागत है
        </h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8">
          प्राचीन ज्ञान आधुनिक AI तकनीक से मिलता है व्यक्तिगत कॉस्मिक मार्गदर्शन के लिए।
        </p>
        <Link
          href="/articles"
          className="inline-flex items-center px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-medium"
        >
          ज्योतिष लेख देखें
        </Link>
      </div>
    );
  }
}
