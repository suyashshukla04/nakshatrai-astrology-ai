'use client';
import Link from 'next/link';
import { getVedicZodiacSigns, getAstrologyCategories } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const zodiacSigns = getVedicZodiacSigns();
  const categories = getAstrologyCategories();

  return (
    <footer className="bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-4xl">🕉️</div>
        <div className="absolute bottom-10 right-10 text-3xl">🔱</div>
        <div className="absolute top-1/2 left-1/4 text-3xl">🪷</div>
        <div className="absolute top-1/4 right-1/4 text-3xl">📿</div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">✨</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-yellow-100">वैदिक ज्योतिष AI</h3>
                <p className="text-xs text-orange-200">प्राचीन ज्ञान • आधुनिक AI</p>
              </div>
            </div>
            <p className="text-orange-200 text-sm leading-relaxed mb-6">
              प्राचीन वैदिक ज्ञान और आधुनिक कृत्रिम बुद्धिमत्ता के संयोजन से आपके लिए 
              सटीक ज्योतिषीय मार्गदर्शन प्रदान करने वाला भारत का पहला AI प्लेटफॉर्म।
            </p>
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-sm">🌟</div>
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-sm">🔮</div>
              <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-sm">📿</div>
            </div>
          </div>

          {/* Astrology Services */}
          <div>
            <h4 className="text-lg font-bold text-yellow-100 mb-4 flex items-center">
              <span className="mr-2">🔮</span>
              ज्योतिष सेवाएं
            </h4>
            <ul className="space-y-3">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/articles/category/${category.id}`}
                    className="text-orange-200 hover:text-yellow-300 text-sm transition-colors duration-200 flex items-center"
                  >
                    <span className="mr-2 text-xs">{category.icon}</span>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Zodiac Signs */}
          <div>
            <h4 className="text-lg font-bold text-yellow-100 mb-4 flex items-center">
              <span className="mr-2">♈</span>
              राशि चक्र
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {zodiacSigns.slice(0, 12).map((sign) => (
                <Link
                  key={sign.id}
                  href={`/articles/zodiac/${sign.id}`}
                  className="text-orange-200 hover:text-yellow-300 text-xs transition-colors duration-200 flex items-center"
                >
                  <span className="mr-1">{sign.symbol}</span>
                  {sign.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="text-lg font-bold text-yellow-100 mb-4 flex items-center">
              <span className="mr-2">🏢</span>
              कंपनी जानकारी
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-orange-200 hover:text-yellow-300 text-sm transition-colors duration-200">
                  हमारे बारे में
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-orange-200 hover:text-yellow-300 text-sm transition-colors duration-200">
                  संपर्क करें
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-orange-200 hover:text-yellow-300 text-sm transition-colors duration-200">
                  सभी लेख
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-orange-200 hover:text-yellow-300 text-sm transition-colors duration-200">
                  गोपनीयता नीति
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-orange-200 hover:text-yellow-300 text-sm transition-colors duration-200">
                  सेवा की शर्तें
                </Link>
              </li>
            </ul>

            {/* Contact Info */}
            <div className="mt-6">
              <div className="flex items-center text-orange-200 text-sm mb-2">
                <span className="mr-2">📧</span>
                <a href="mailto:contact@vedicastrology.ai" className="hover:text-yellow-300 transition-colors">
                  contact@vedicastrology.ai
                </a>
              </div>
              <div className="flex items-center text-orange-200 text-sm">
                <span className="mr-2">🌍</span>
                <span>भारत से विश्व भर में सेवा</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-orange-700/50 my-8"></div>

        {/* AI Technology Section */}
        <div className="bg-orange-800/30 rounded-2xl p-6 mb-8 border border-orange-700/50">
          <div className="text-center">
            <h4 className="text-lg font-bold text-yellow-100 mb-3 flex items-center justify-center">
              <span className="mr-2">🤖</span>
              AI तकनीक के साथ प्राचीन ज्ञान
            </h4>
            <p className="text-orange-200 text-sm leading-relaxed mb-4">
              हमारा प्लेटफॉर्म बृहत् पराशर होरा शास्त्र, जातक पारिजात, और अन्य वैदिक ग्रंथों के ज्ञान को 
              आधुनिक AI मॉडल्स के साथ मिलाकर आपके लिए व्यक्तिगत ज्योतिषीय सेवाएं प्रदान करता है।
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs">
              <div className="flex items-center bg-yellow-600/20 px-3 py-1 rounded-full">
                <span className="mr-1">⚡</span>
                <span>Gemini 2.5 Flash AI</span>
              </div>
              <div className="flex items-center bg-orange-600/20 px-3 py-1 rounded-full">
                <span className="mr-1">🔍</span>
                <span>Perplexity Real-time Data</span>
              </div>
              <div className="flex items-center bg-red-600/20 px-3 py-1 rounded-full">
                <span className="mr-1">📚</span>
                <span>Traditional Vedic Texts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Traditional Mantra */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-yellow-800/50 to-orange-800/50 rounded-xl p-4 border border-yellow-600/30">
            <p className="text-yellow-200 text-sm font-medium mb-2">🕉️ श्लोक</p>
            <p className="text-white text-lg font-bold mb-2 sanskrit-text">
              ॐ ज्योतिर्गमय तमसो मा ज्योतिर्गमय
            </p>
            <p className="text-orange-200 text-xs">
              "अंधकार से प्रकाश की ओर ले चलो" - उपनिषद्
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-orange-700/50">
          <div className="text-orange-200 text-sm mb-4 md:mb-0">
            <p>© {currentYear} वैदिक ज्योतिष AI प्लेटफॉर्म। सर्वाधिकार सुरक्षित।</p>
            <p className="text-xs mt-1">सभी सामग्री AstroAI Master द्वारा निर्मित।</p>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span>AI सक्रिय</span>
            </div>
            <div className="flex items-center text-orange-200">
              <span className="mr-1">🌍</span>
              <span>हिंदी & English</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-red-900/20 border border-red-700/30 rounded-lg">
          <p className="text-red-200 text-xs text-center leading-relaxed">
            <strong>अस्वीकरण:</strong> यह प्लेटफॉर्म मनोरंजन और शैक्षिक उद्देश्यों के लिए है। 
            महत्वपूर्ण जीवन निर्णयों के लिए योग्य ज्योतिषी से सलाह लें। 
            सभी AI-जनित सामग्री व्यक्तिगत मार्गदर्शन के रूप में है।
          </p>
        </div>
      </div>
    </footer>
  );
}
