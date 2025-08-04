import ArticleCard from './ArticleCard';

export default function RelatedArticles({ articles }) {
    if (!articles || articles.length === 0) return null;

    return (
        <section className="mt-16 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <ArticleCard key={article._id} article={article} />
                ))}
            </div>
        </section>
    );
}
