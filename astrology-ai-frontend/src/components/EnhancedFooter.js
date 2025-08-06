'use client';
import Link from 'next/link';
import { getVedicZodiacSigns, getAstrologyCategories, getNavagrahas } from '@/lib/utils';

export default function EnhancedFooter() {
  const currentYear = new Date().getFullYear();
  const zodiacSigns = getVedicZodiacSigns();
  const categories = getAstrologyCategories();
  const navagrahas = getNavagrahas();

  return (
    <footer className="bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900 text-white relative overflow-hidden">
      {/* Traditional Indian Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      {/* Floating Vedic Symbols */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 text-4xl animate-pulse">🕉️</div>
        <div className="absolute bottom-10 right-10 text-3xl animate-pulse" style={{ animationDelay: '1s' }}>🔱</div>
        <div className="absolute top-1/2 left-1/4 text-3xl animate-pulse" style={{ animationDelay: '2s' }}>🪷</div>
        <div className="absolute top-1/4 right-1/4 text-3xl animate-pulse" style={{ animationDelay: '3s' }}>📿</div>
        <div className="absolute bottom-1/4 left-1/3 text-2xl animate-pulse" style={{ animationDelay: '4s' }}>⚡</div>
        <div className="absolute top-3/4 right-1/3 text-2xl animate-pulse" style={{ animationDelay: '5s' }}>🌟</div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Section - Enhanced */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">✨</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-yellow-100 hindi-text">वैदिक ज्योतिष AI</h3>
                <p className="text-sm text-orange-200">प्राचीन ज्ञान परंपरा • आधुनिक AI तकनीक</p>
              </div>
            </div>
            
            <p className="text-orange-200 text-sm leading-relaxed mb-6 hindi-text">
              हमारा प्लेटफॉर्म ऋषि-मुनियों के प्राचीन वैदिक ज्ञान को आधुनिक कृत्रिम बुद्धिमत्ता के साथ संयोजित करके 
              आपको व्यक्तिगत, सटीक और प्रामाणिक ज्योतिषीय मार्गदर्शन प्रदान करता है।
            </p>

            {/* Traditional Vedic Elements */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center p-2 bg-orange-800/30 rounded-lg border border-orange-700/50">
                <div className="text-lg mb-1">📚</div>
                <div className="text-xs text-orange-200">वैदिक ग्रंथ</div>
              </div>
              <div className="text-center p-2 bg-red-800/30 rounded-lg border border-red-700/50">
                <div className="text-lg mb-1">🧠</div>
                <div className="text-xs text-orange-200">AI विश्लेषण</div>
              </div>
              <div className="text-center p-2 bg-yellow-800/30 rounded-lg border border-yellow-700/50">
                <div className="text-lg mb-1">🎯</div>
                <div className="text-xs text-orange-200">व्यक्तिगत</div>
              </div>
            </div>

            {/* Spiritual Quote */}
            <div className="bg-gradient-to-r from-yellow-800/30 to-orange-800/30 rounded-lg p-3 border border-yellow-600/30">
              <p className="text-yellow-200 text-xs mb-1">वेद वाणी:</p>
              <p className="text-white text-sm sanskrit-text">"सत्यं शिवं सुन्दरम्"</p>
              <p className="text-orange-200 text-xs mt-1">सत्य, कल्याण और सौंदर्य</p>
            </div>
          </div>

          {/* Astrology Services */}
          <div>
            <h4 className="text-lg font-bold text-yellow-100 mb-4 flex items-center hindi-text">
              <span className="mr-2">🔮</span>
              ज्योतिष सेवाएं
            </h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link 
                    href={`/articles/category/${category.id}`}
                    className="text-orange-200 hover:text-yellow-300 text-sm transition-all duration-200 flex items-center group hindi-text"
                  >
                    <span className="mr-2 text-xs group-hover:scale-110 transition-transform">{category.icon}</span>
                    <span className="group-hover:translate-x-1 transition-transform">{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navagrahas */}
          <div>
            <h4 className="text-lg font-bold text-yellow-100 mb-4 flex items-center hindi-text">
              <span className="mr-2">🪐</span>
              नवग्रह
            </h4>
            <div className="space-y-2">
              {navagrahas.slice(0, 9).map((graha) => (
                <div
                  key={graha.id}
                  className="text-orange-200 text-xs flex items-center hover:text-yellow-300 transition-colors"
                >
                  <span className="mr-2">{graha.symbol}</span>
                  <span className="hindi-text">{graha.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Company & Contact */}
          <div>
            <h4 className="text-lg font-bold text-yellow-100 mb-4 flex items-center hindi-text">
              <span className="mr-2">🏢</span>
              संपर्क एवं जानकारी
            </h4>
            <ul className="space-y-3 mb-6">
              <li>
                <Link href="/about" className="text-orange-200 hover:text-yellow-300 text-sm transition-colors duration-200 hindi-text">
                  हमारे बारे में
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-orange-200 hover:text-yellow-300 text-sm transition-colors duration-200 hindi-text">
                  संपर्क करें
                </Link>
              </li>
              <li>
                <Link href="/articles" className="text-orange-200 hover:text-yellow-300 text-sm transition-colors duration-200 hindi-text">
                  सभी ज्योतिष लेख
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-orange-200 hover:text-yellow-300 text-sm transition-colors duration-200 hindi-text">
                  गोपनीयता नीति
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-orange-200 hover:text-yellow-300 text-sm transition-colors duration-200 hindi-text">
                  सेवा नियम
                </Link>
              </li>
            </ul>

            {/* Contact Details */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center text-orange-200">
                <span className="mr-2">📧</span>
                <a href="mailto:panditji@vedicastrology.ai" className="hover:text-yellow-300 transition-colors">
                  panditji@vedicastrology.ai
                </a>
              </div>
              <div className="flex items-center text-orange-200 hindi-text">
                <span className="mr-2">🌍</span>
                <span>भारत से विश्व सेवा</span>
              </div>
              <div className="flex items-center text-orange-200 hindi-text">
                <span className="mr-2">⏰</span>
                <span>24/7 AI सेवा उपलब्ध</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider with Pattern */}
        <div className="my-8 flex items-center">
          <div className="flex-1 border-t border-orange-700/50"></div>
          <div className="px-4 text-yellow-400">🕉️</div>
          <div className="flex-1 border-t border-orange-700/50"></div>
        </div>

        {/* AI Technology Showcase - Enhanced */}
        <div className="bg-gradient-to-r from-orange-800/40 to-red-800/40 rounded-2xl p-6 mb-8 border border-orange-600/30 backdrop-blur-sm">
          <div className="text-center mb-4">
            <h4 className="text-xl font-bold text-yellow-100 mb-3 flex items-center justify-center hindi-text">
              <span className="mr-2">🤖</span>
              उन्नत AI तकनीक + प्राचीन वैदिक ज्ञान
            </h4>
            <p className="text-orange-200 text-sm leading-relaxed mb-6 hindi-text max-w-4xl mx-auto">
              हमारा AI सिस्टम बृहत् पराशर होरा शास्त्र, जातक पारिजात, सारावली, फलदीपिका जैसे प्रामाणिक वैदिक ग्रंथों का अध्ययन करके, 
              वर्तमान ग्रह गोचर के साथ मिलाकर आपके लिए व्यक्तिगत और सटीक भविष्यवाणी तैयार करता है।
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-yellow-800/30 rounded-xl border border-yellow-600/30">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-yellow-200 font-bold text-sm mb-1">Gemini 2.5 Flash</div>
              <div className="text-orange-200 text-xs">उन्नत AI मॉडल</div>
            </div>
            <div className="text-center p-4 bg-orange-800/30 rounded-xl border border-orange-600/30">
              <div className="text-2xl mb-2">🔍</div>
              <div className="text-yellow-200 font-bold text-sm mb-1">Perplexity Search</div>
              <div className="text-orange-200 text-xs">रियल-टाइम डेटा</div>
            </div>
            <div className="text-center p-4 bg-red-800/30 rounded-xl border border-red-600/30">
              <div className="text-2xl mb-2">📚</div>
              <div className="text-yellow-200 font-bold text-sm mb-1">वैदिक शास्त्र</div>
              <div className="text-orange-200 text-xs">प्राचीन ग्रंथ ज्ञान</div>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center bg-green-600/20 px-4 py-2 rounded-full border border-green-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-green-300 text-sm font-medium hindi-text">AI पंडित जी सक्रिय • 24/7 सेवा उपलब्ध</span>
            </div>
          </div>
        </div>

        {/* Sacred Mantra Section */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-yellow-800/50 via-orange-800/50 to-red-800/50 rounded-2xl p-6 border border-yellow-600/30">
            <div className="mb-4">
              <p className="text-yellow-300 text-sm font-medium mb-3 hindi-text">🕉️ पवित्र श्लोक</p>
              <p className="text-white text-xl font-bold mb-2 sanskrit-text">
                ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः
              </p>
              <p className="text-white text-lg sanskrit-text mb-3">
                सर्वे भद्राणि पश्यन्तु मा कश्चिद् दुःखभाग्भवेत्
              </p>
              <p className="text-orange-200 text-sm hindi-text">
                "सभी सुखी हों, सभी रोगमुक्त रहें, सभी मंगलमय घटनाओं के साक्षी बनें और किसी को दुःख न सहना पड़े"
              </p>
            </div>
            <div className="text-orange-300 text-xs">- महाउपनिषद्</div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-orange-700/50">
          <div className="text-orange-200 text-sm mb-4 md:mb-0 hindi-text">
            <p>© {currentYear} वैदिक ज्योतिष AI प्लेटफॉर्म। सर्वाधिकार सुरक्षित।</p>
            <p className="text-xs mt-1">सभी सामग्री AstroAI Master (AI पंडित जी) द्वारा निर्मित।</p>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center text-green-400">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              <span className="hindi-text">AI सक्रिय</span>
            </div>
            <div className="flex items-center text-orange-200 hindi-text">
              <span className="mr-1">🌍</span>
              <span>हिंदी & English</span>
            </div>
            <div className="flex items-center text-yellow-300 hindi-text">
              <span className="mr-1">🔒</span>
              <span>सुरक्षित</span>
            </div>
          </div>
        </div>

        {/* Final Disclaimer */}
        <div className="mt-6 p-4 bg-red-900/30 border border-red-700/30 rounded-xl">
          <p className="text-red-200 text-xs text-center leading-relaxed hindi-text">
            <strong>महत्वपूर्ण सूचना:</strong> यह प्लेटफॉर्म शिक्षा, मार्गदर्शन और मनोरंजन के उद्देश्य से बनाया गया है। 
            महत्वपूर्ण जीवन निर्णयों के लिए योग्य ज्योतिषी से व्यक्तिगत सलाह अवश्य लें। 
            सभी AI-जनित सामग्री आध्यात्मिक मार्गदर्शन के रूप में प्रस्तुत की गई है। 
            🙏 ॐ शांति शांति शांतिः
          </p>
        </div>
      </div>
    </footer>
  );
}
