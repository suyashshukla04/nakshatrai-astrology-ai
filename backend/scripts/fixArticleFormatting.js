// backend/scripts/fixArticleFormatting.js - Complete script
const mongoose = require('mongoose');
const Article = require('../models/Article');
require('dotenv').config();

class ArticleFormatter {
    // Clean markdown symbols from title
    cleanTitle(title) {
        return title
            .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove bold markers
            .replace(/\*(.*?)\*/g, '$1')     // Remove italic markers
            .replace(/#{1,6}\s*/g, '')       // Remove heading markers
            .replace(/`(.*?)`/g, '$1')       // Remove code markers
            .replace(/\n/g, ' ')             // Remove line breaks
            .trim();
    }

    // Clean markdown from content and fix formatting
    cleanContent(content) {
        return content
            // Remove excessive markdown
            .replace(/\*\*\*\*(.*?)\*\*\*\*/g, '<strong>$1</strong>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            
            // Fix headings
            .replace(/#{3}\s*(.*?)$/gm, '<h3>$1</h3>')
            .replace(/#{2}\s*(.*?)$/gm, '<h2>$1</h2>')
            .replace(/#{1}\s*(.*?)$/gm, '<h1>$1</h1>')
            
            // Fix paragraphs
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(.*)$/gm, '<p>$1</p>')
            .replace(/<p><\/p>/g, '')
            .replace(/<p><h/g, '<h')
            .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
            
            // Remove any remaining markdown symbols
            .replace(/\*\*/g, '')
            .replace(/##/g, '');
    }

    // Generate clean slug
    generateSlug(title) {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .substring(0, 60)
            .trim();
    }

    // Main formatting function
    async fixAllArticles() {
        try {
            console.log('🔧 Connecting to MongoDB Atlas...');
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('✅ Connected to database');

            const articles = await Article.find({});
            console.log(`📄 Found ${articles.length} articles to process`);

            let updatedCount = 0;

            for (let article of articles) {
                let hasChanges = false;
                const originalTitle = article.title;
                const originalContent = article.content;

                // Clean title
                const cleanTitle = this.cleanTitle(originalTitle);
                if (cleanTitle !== originalTitle) {
                    article.title = cleanTitle;
                    hasChanges = true;
                    console.log(`📝 Updated title: ${cleanTitle.substring(0, 50)}...`);
                }

                // Clean content
                const cleanContent = this.cleanContent(originalContent);
                if (cleanContent !== originalContent) {
                    article.content = cleanContent;
                    hasChanges = true;
                    console.log(`📄 Updated content for: ${article.title.substring(0, 30)}...`);
                }

                // Update slug if title changed
                if (hasChanges) {
                    article.slug = this.generateSlug(cleanTitle);
                    
                    // Update SEO title
                    article.seoTitle = cleanTitle.substring(0, 60);
                    
                    await article.save();
                    updatedCount++;
                    console.log(`✅ Saved: ${article.title.substring(0, 40)}...`);
                }
            }

            console.log(`\n🎉 Article formatting completed!`);
            console.log(`📊 Total articles processed: ${articles.length}`);
            console.log(`📝 Articles updated: ${updatedCount}`);
            console.log(`📄 Articles unchanged: ${articles.length - updatedCount}`);

            process.exit(0);

        } catch (error) {
            console.error('❌ Error fixing articles:', error);
            process.exit(1);
        }
    }
}

// Run the formatter
const formatter = new ArticleFormatter();
formatter.fixAllArticles();
