// utils/contentAnalyzer.js - Analyze content quality
class ContentAnalyzer {
    static analyzeContent(content) {
        return {
            wordCount: content.split(' ').length,
            paragraphCount: content.split('\n\n').length,
            hasHeaders: content.includes('##'),
            hasPunctuation: this.checkPunctuation(content),
            readabilityScore: this.calculateReadability(content),
            aiDetectionRisk: this.checkAIPatterns(content),
            seoScore: this.calculateSEOScore(content)
        };
    }

    static checkPunctuation(content) {
        const sentences = content.split(/[.!?]+/);
        const properSentences = sentences.filter(s => s.trim().length > 5);
        return properSentences.length > 10;
    }

    static checkAIPatterns(content) {
        const aiPatterns = [
            /It is important to/gi,
            /It is worth noting/gi,
            /In conclusion/gi,
            /Furthermore/gi,
            /Moreover/gi
        ];
        
        const matches = aiPatterns.reduce((count, pattern) => {
            return count + (content.match(pattern) || []).length;
        }, 0);

        return matches > 5 ? 'High Risk' : matches > 2 ? 'Medium Risk' : 'Low Risk';
    }

    static calculateReadability(content) {
        const words = content.split(' ').length;
        const sentences = content.split(/[.!?]+/).length;
        const avgWordsPerSentence = words / sentences;
        
        if (avgWordsPerSentence < 15) return 'Easy';
        if (avgWordsPerSentence < 20) return 'Medium';
        return 'Complex';
    }

    static calculateSEOScore(content) {
        let score = 0;
        
        if (content.length > 1200) score += 25;
        if (content.includes('##')) score += 25;
        if (content.split('\n\n').length > 5) score += 25;
        if (content.match(/\*\*.*?\*\*/g)) score += 25;
        
        return score;
    }
}

module.exports = ContentAnalyzer;
