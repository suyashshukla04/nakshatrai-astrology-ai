// // frontend/src/app/articles/category/[category]/page.js
// import { getArticlesByCategory } from '@/lib/api';
// import ArticleCard from '@/components/ArticleCard';
// import { getCategoryColor } from '@/lib/utils';

// export default async function CategoryPage({ params }) {
//     const { category } = await params;

//     const categoryTitles = {
//         today: 'Today\'s News',
//         current: 'Current Analysis',
//         historical: 'Historical Insights',
//         trendy: 'Trending Topics'
//     };

//     const categoryDescriptions = {
//         today: 'Latest breaking news and developments in mobile technology',
//         current: 'In-depth analysis of current devices and market trends',
//         historical: 'Historical perspectives and evolution of mobile technology',
//         trendy: 'Emerging trends and future predictions in mobile tech'
//     };

//     let articles = [];
//     let error = null;

//     try {
//         const response = await getArticlesByCategory(category, 'techmobile', 20);
//         articles = response.data || [];
        
//         // Debug logging
//         console.log('Category:', category);
//         console.log('API Response:', response);
//         console.log('Articles:', articles);
//         console.log('First article:', articles[0]);
        
//     } catch (err) {
//         error = err.message;
//         console.error('Error fetching articles:', err);
//     }

//     if (error) {
//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <div className="text-center py-16">
//                     <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Articles</h1>
//                     <p className="text-gray-600">Failed to load articles for this category: {error}</p>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="mb-8">
//                 <div className="mb-4">
//                     <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getCategoryColor(category)}`}>
//                         {category?.charAt(0).toUpperCase() + category?.slice(1) || 'Unknown'}
//                     </span>
//                 </div>
//                 <h1 className="text-3xl font-bold text-gray-900 mb-4">
//                     {categoryTitles[category] || `${category?.charAt(0).toUpperCase() + category?.slice(1) || 'Unknown'} Articles`}
//                 </h1>
//                 <p className="text-gray-600 text-lg">
//                     {categoryDescriptions[category] || `Articles in the ${category || 'unknown'} category`}
//                 </p>
//             </div>

//             {articles && articles.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {articles.map((article, index) => {
//                         // Additional safety check
//                         if (!article || !article._id) {
//                             console.warn('Invalid article at index:', index, article);
//                             return null;
//                         }
//                         return (
//                             <ArticleCard key={article._id} article={article} />
//                         );
//                     })}
//                 </div>
//             ) : (
//                 <div className="text-center py-16">
//                     <h2 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h2>
//                     <p className="text-gray-600">No articles available in this category yet.</p>
//                 </div>
//             )}
//         </div>
//     );
// }
import { getArticlesByCategory } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';
import { getCategoryColor } from '@/lib/utils';
import ConversionBanner from '@/components/ConversionBanner';

export default async function CategoryPage({ params }) {
    const { category } = await params;

    const categoryTitles = {
        today: 'Today\'s News',
        current: 'Current Analysis',
        historical: 'Historical Insights',
        trendy: 'Trending Topics'
    };

    const categoryDescriptions = {
        today: 'Latest breaking news and developments in mobile technology',
        current: 'In-depth analysis of current devices and market trends',
        historical: 'Historical perspectives and evolution of mobile technology',
        trendy: 'Emerging trends and future predictions in mobile tech'
    };

    let articles = [];
    let error = null;

    try {
        const response = await getArticlesByCategory(category, 'techmobile', 20);
        articles = response.data || [];
        
        // Debug logging
        console.log('Category:', category);
        console.log('API Response:', response);
        console.log('Articles:', articles);
        console.log('First article:', articles[0]);
        
    } catch (err) {
        error = err.message;
        console.error('Error fetching articles:', err);
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-16">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Articles</h1>
                    <p className="text-gray-600">Failed to load articles for this category: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Category Header */}
            <div className="mb-8">
                <div className="mb-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getCategoryColor(category)}`}>
                        {category?.charAt(0).toUpperCase() + category?.slice(1) || 'Unknown'}
                    </span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {categoryTitles[category] || `${category?.charAt(0).toUpperCase() + category?.slice(1) || 'Unknown'} Articles`}
                </h1>
                <p className="text-gray-600 text-lg">
                    {categoryDescriptions[category] || `Articles in the ${category || 'unknown'} category`}
                </p>
            </div>

            {/* 🎯 CATEGORY SHOWCASE CONVERSION BANNER */}
            <ConversionBanner type="category-showcase" className="mb-8" />

            {/* Articles Content */}
            {articles && articles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, index) => {
                        // Additional safety check
                        if (!article || !article._id) {
                            console.warn('Invalid article at index:', index, article);
                            return null;
                        }
                        return (
                            <ArticleCard key={article._id} article={article} />
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h2>
                    <p className="text-gray-600">No articles available in this category yet.</p>
                </div>
            )}
        </div>
    );
}
