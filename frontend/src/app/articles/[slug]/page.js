// // C:\Users\suyas\mobile-tech-automation-v2\frontend\src\app\articles\[slug]\page.js

// import { getArticleBySlug } from '@/lib/api';
// import { notFound } from 'next/navigation';
// import Image from 'next/image';
// import { formatDate, getCategoryColor } from '@/lib/utils';

// export default async function ArticlePage({ params }) {
//     const { slug } = await params;
    
//     try {
//         const response = await getArticleBySlug(slug);
//         const { article } = response.data;
        
//         if (!article) {
//             notFound();
//         }

//         // Clean title for display
//         const cleanTitle = (article.title || 'Untitled Article')
//             .replace(/\*\*/g, '')
//             .replace(/\n/g, ' ')
//             .trim();

//         // Process content to ensure proper heading formatting
//         const processedContent = article.content
//             .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-light-text dark:text-dark-text mt-8 mb-4">')
//             .replace(/<h3>/g, '<h3 class="text-xl font-bold text-light-text dark:text-dark-text mt-6 mb-3">')
//             .replace(/<strong>/g, '<strong class="font-bold text-light-text dark:text-dark-text">')
//             .replace(/<p>/g, '<p class="text-light-text-secondary dark:text-dark-text-secondary mb-4 leading-relaxed">');

//         return (
//             <div className="container mx-auto px-4 py-8">
//                 <div className="max-w-4xl mx-auto">
//                     {/* Article Header */}
//                     <header className="mb-8">
//                         <div className="mb-4">
//                             <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(article.category)}`}>
//                                 {article.category?.charAt(0).toUpperCase() + article.category?.slice(1)}
//                             </span>
//                         </div>
                        
//                         <h1 className="text-4xl font-bold text-light-text dark:text-dark-text mb-4 leading-tight">
//                             {cleanTitle}
//                         </h1>
                        
//                         <div className="flex items-center text-light-text-secondary dark:text-dark-text-secondary mb-6">
//                             <span className="mr-4">By {article.author || 'MobileTechAI'}</span>
//                             <span className="mr-4">{formatDate(article.publishedAt)}</span>
//                             <span>{article.readingTime || 5} min read</span>
//                         </div>
//                     </header>

//                     {/* Featured Image */}
//                     {article.featuredImage && (
//                         <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
//                             <Image
//                                 src={article.featuredImage}
//                                 alt={cleanTitle}
//                                 fill
//                                 className="object-cover"
//                                 unoptimized={article.featuredImage?.includes('oaidalleapiprodscus')}
//                             />
//                         </div>
//                     )}

//                     {/* Article Content with Proper Typography */}
//                     <div className="prose prose-lg max-w-none mb-8">
//                         <div 
//                             className="article-content"
//                             dangerouslySetInnerHTML={{ __html: processedContent }}
//                         />
//                     </div>

//                     {/* Tags */}
//                     {article.tags && article.tags.length > 0 && (
//                         <div className="border-t border-light-border dark:border-dark-border pt-6">
//                             <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-3">Tags</h3>
//                             <div className="flex flex-wrap gap-2">
//                                 {article.tags.map((tag, index) => (
//                                     <span
//                                         key={index}
//                                         className="px-3 py-1 bg-light-bg-secondary dark:bg-dark-bg-tertiary text-light-text-secondary dark:text-dark-text-secondary rounded-full text-sm"
//                                     >
//                                         #{tag}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         );
//     } catch (error) {
//         console.error('Error loading article:', error);
//         notFound();
//     }
// }
import { getArticleBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatDate, getCategoryColor } from '@/lib/utils';
import ConversionBanner from '@/components/ConversionBanner';

export default async function ArticlePage({ params }) {
    const { slug } = await params;
    
    try {
        const response = await getArticleBySlug(slug);
        const { article } = response.data;
        
        if (!article) {
            notFound();
        }

        // Clean title for display
        const cleanTitle = (article.title || 'Untitled Article')
            .replace(/\*\*/g, '')
            .replace(/\n/g, ' ')
            .trim();

        // Process content to ensure proper heading formatting
        const processedContent = article.content
            .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-light-text dark:text-dark-text mt-8 mb-4">')
            .replace(/<h3>/g, '<h3 class="text-xl font-bold text-light-text dark:text-dark-text mt-6 mb-3">')
            .replace(/<strong>/g, '<strong class="font-bold text-light-text dark:text-dark-text">')
            .replace(/<p>/g, '<p class="text-light-text-secondary dark:text-dark-text-secondary mb-4 leading-relaxed">');

        return (
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Article Header */}
                    <header className="mb-8">
                        <div className="mb-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(article.category)}`}>
                                {article.category?.charAt(0).toUpperCase() + article.category?.slice(1)}
                            </span>
                        </div>
                        
                        <h1 className="text-4xl font-bold text-light-text dark:text-dark-text mb-4 leading-tight">
                            {cleanTitle}
                        </h1>
                        
                        <div className="flex items-center text-light-text-secondary dark:text-dark-text-secondary mb-6">
                            <span className="mr-4">By {article.author || 'MobileTechAI'}</span>
                            <span className="mr-4">{formatDate(article.publishedAt)}</span>
                            <span>{article.readingTime || 5} min read</span>
                        </div>
                    </header>

                    {/* Featured Image */}
                    {article.featuredImage && (
                        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
                            <Image
                                src={article.featuredImage}
                                alt={cleanTitle}
                                fill
                                className="object-cover"
                                unoptimized={article.featuredImage?.includes('oaidalleapiprodscus')}
                            />
                        </div>
                    )}

                    {/* 🎯 MID-ARTICLE CONVERSION BANNER */}
                    <ConversionBanner type="mid-article" />

                    {/* Article Content with Proper Typography */}
                    <div className="prose prose-lg max-w-none mb-8">
                        <div 
                            className="article-content"
                            dangerouslySetInnerHTML={{ __html: processedContent }}
                        />
                    </div>

                    {/* 🎯 END-OF-ARTICLE CONVERSION BANNER */}
                    <ConversionBanner type="end-article" />

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                        <div className="border-t border-light-border dark:border-dark-border pt-6">
                            <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-3">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {article.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-light-bg-secondary dark:bg-dark-bg-tertiary text-light-text-secondary dark:text-dark-text-secondary rounded-full text-sm"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error loading article:', error);
        notFound();
    }
}
