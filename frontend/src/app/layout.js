import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeContext';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Astrology AI Platform - Ancient Wisdom Meets Modern AI',
  description: 'AI-powered astrology predictions combining ancient Vedic wisdom with modern insights. Get personalized horoscopes, compatibility readings, and cosmic guidance in English and Hindi.',
  keywords: 'astrology, AI astrology, horoscope, zodiac signs, vedic astrology, predictions, compatibility, gemstones, muhurat',
  authors: [{ name: 'AstroAI Master' }],
  creator: 'Astrology AI Platform',
  publisher: 'Astrology AI Platform',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nakshatrai.com',
    title: 'Astrology AI Platform - Ancient Wisdom Meets Modern AI',
    description: 'AI-powered astrology predictions combining ancient Vedic wisdom with modern insights.',
    siteName: 'Astrology AI Platform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Astrology AI Platform - Ancient Wisdom Meets Modern AI',
    description: 'AI-powered astrology predictions combining ancient Vedic wisdom with modern insights.',
    creator: '@astrologyai',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional meta tags for astrology SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#6366f1" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>" />
        
        {/* Structured Data for Astrology */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Astrology AI Platform",
              "description": "AI-powered astrology predictions combining ancient Vedic wisdom with modern insights",
              "url": "https://nakshatrai.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://nakshatrai.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen transition-colors duration-300`}>
        <ThemeProvider>
          <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            
            {/* Footer */}
            <footer className="bg-light-bg dark:bg-dark-bg border-t border-light-border dark:border-dark-border py-16 mt-16">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8">
                  {/* Brand Section */}
                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-cosmic-500 to-mystical-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">✨</span>
                      </div>
                      <div>
                        <span className="text-xl font-bold text-light-text dark:text-dark-text">Astrology AI Platform</span>
                        <div className="text-xs text-light-text-muted dark:text-dark-text-muted">Ancient Wisdom • Modern AI</div>
                      </div>
                    </div>
                    <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 leading-relaxed">
                      Experience the perfect fusion of ancient Vedic astrology wisdom with cutting-edge AI technology. 
                      Get personalized cosmic guidance, compatibility insights, and spiritual wisdom in both English and Hindi.
                    </p>
                    <div className="flex space-x-4">
                      <span className="inline-flex items-center px-3 py-1 bg-cosmic-100 dark:bg-cosmic-900/30 text-cosmic-700 dark:text-cosmic-400 rounded-full text-sm">
                        🌟 AI-Powered
                      </span>
                      <span className="inline-flex items-center px-3 py-1 bg-mystical-100 dark:bg-mystical-900/30 text-mystical-700 dark:text-mystical-400 rounded-full text-sm">
                        🌍 Multi-Language
                      </span>
                    </div>
                    <p className="text-sm text-light-text-muted dark:text-dark-text-muted mt-6">
                      © 2025 Astrology AI Platform. All content generated by AstroAI Master.
                    </p>
                  </div>
                  
                  {/* Astrology Categories */}
                  <div>
                    <h3 className="font-semibold text-light-text dark:text-dark-text mb-4">🔮 Astrology Services</h3>
                    <ul className="space-y-3 text-light-text-secondary dark:text-dark-text-secondary">
                      <li><a className="hover:text-cosmic-500 transition-colors flex items-center" href="/articles/category/daily-horoscope"><span className="mr-2">⭐</span>Daily Horoscope</a></li>
                      <li><a className="hover:text-cosmic-500 transition-colors flex items-center" href="/articles/category/love-compatibility"><span className="mr-2">💕</span>Love Compatibility</a></li>
                      <li><a className="hover:text-cosmic-500 transition-colors flex items-center" href="/articles/category/career-guidance"><span className="mr-2">💼</span>Career Guidance</a></li>
                      <li><a className="hover:text-cosmic-500 transition-colors flex items-center" href="/articles/category/gemstone-guide"><span className="mr-2">💎</span>Gemstone Guide</a></li>
                      <li><a className="hover:text-cosmic-500 transition-colors flex items-center" href="/articles/category/muhurat-timing"><span className="mr-2">⏰</span>Auspicious Timing</a></li>
                    </ul>
                  </div>
                  
                  {/* Company Links */}
                  <div>
                    <h3 className="font-semibold text-light-text dark:text-dark-text mb-4">🏢 Company</h3>
                    <ul className="space-y-3 text-light-text-secondary dark:text-dark-text-secondary">
                      <li><a className="hover:text-cosmic-500 transition-colors" href="/about">About AstroAI</a></li>
                      <li><a className="hover:text-cosmic-500 transition-colors" href="/contact">Contact Us</a></li>
                      <li><a className="hover:text-cosmic-500 transition-colors" href="/articles">All Articles</a></li>
                      <li><a className="hover:text-cosmic-500 transition-colors" href="/privacy">Privacy Policy</a></li>
                      <li><a className="hover:text-cosmic-500 transition-colors" href="/terms">Terms of Service</a></li>
                    </ul>
                  </div>
                </div>
                
                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-light-border dark:border-dark-border text-center">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="text-sm text-light-text-muted dark:text-dark-text-muted mb-4 md:mb-0">
                      Made with ❤️ for astrology enthusiasts worldwide
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-light-text-muted dark:text-dark-text-muted">
                      <span>🌟 Powered by Advanced AI</span>
                      <span>•</span>
                      <span>🔮 Ancient Wisdom</span>
                      <span>•</span>
                      <span>🌍 Global Reach</span>
                    </div>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      <Footer />
        </body>
    </html>
  );
}
