import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
  if (!dateString) return 'No date';
  return new Date(dateString).toLocaleDateString('hi-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatRelativeTime(dateString) {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'अभी-अभी';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} मिनट पहले`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} घंटे पहले`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} दिन पहले`;
  
  return formatDate(dateString);
}

// Vedic Astrology Categories (based on traditional Jyotish)
export function getAstrologyCategories() {
  return [
    {
      id: 'daily-rashifal',
      name: 'दैनिक राशिफल',
      english: 'Daily Rashifal',
      icon: '⭐',
      color: 'from-yellow-400 to-orange-500',
      description: 'आपका दैनिक ज्योतिषीय मार्गदर्शन',
      vedic: true
    },
    {
      id: 'kundali-milan',
      name: 'कुंडली मिलान',
      english: 'Kundali Milan',
      icon: '💕',
      color: 'from-pink-400 to-red-500',
      description: 'विवाह और प्रेम संबंधी मार्गदर्शन',
      vedic: true
    },
    {
      id: 'career-vyavasaya',
      name: 'करियर और व्यवसाय',
      english: 'Career & Business',
      icon: '💼',
      color: 'from-blue-400 to-indigo-500',
      description: 'व्यावसायिक सफलता के लिए ज्योतिषीय सलाह',
      vedic: true
    },
    {
      id: 'swasthya-jyotish',
      name: 'स्वास्थ्य ज्योतिष',
      english: 'Health Astrology',
      icon: '🌿',
      color: 'from-green-400 to-emerald-500',
      description: 'आयुर्वेदिक और ज्योतिषीय स्वास्थ्य मार्गदर्शन',
      vedic: true
    },
    {
      id: 'shubh-muhurat',
      name: 'शुभ मुहूर्त',
      english: 'Auspicious Timing',
      icon: '⏰',
      color: 'from-amber-400 to-yellow-500',
      description: 'महत्वपूर्ण कार्यों के लिए शुभ समय',
      vedic: true
    },
    {
      id: 'ratna-vidya',
      name: 'रत्न विद्या',
      english: 'Gemstone Science',
      icon: '💎',
      color: 'from-cyan-400 to-blue-500',
      description: 'रत्नों की शक्ति और उपयोग',
      vedic: true
    },
    {
      id: 'graha-gochar',
      name: 'ग्रह गोचर',
      english: 'Planetary Transit',
      icon: '🪐',
      color: 'from-purple-400 to-violet-500',
      description: 'ग्रहों की चाल और प्रभाव',
      vedic: true
    },
    {
      id: 'tyohar-mahatva',
      name: 'त्योहार महत्व',
      english: 'Festival Significance',
      icon: '🎉',
      color: 'from-orange-400 to-red-500',
      description: 'हिंदू त्योहारों का ज्योतिषीय महत्व',
      vedic: true
    }
  ];
}

// Traditional Vedic Zodiac Signs (Rashis)
export function getVedicZodiacSigns() {
  return [
    { 
      id: 'mesha', 
      name: 'मेष', 
      english: 'Mesha (Aries)', 
      symbol: '♈', 
      element: 'अग्नि', 
      elementEng: 'Fire',
      dates: '21 मार्च - 19 अप्रैल',
      lord: 'मंगल',
      lordEng: 'Mars',
      nature: 'चर',
      guna: 'रजस्',
      lucky_color: 'लाल',
      lucky_day: 'मंगलवार',
      body_parts: 'सिर, चेहरा'
    },
    { 
      id: 'vrishabha', 
      name: 'वृषभ', 
      english: 'Vrishabha (Taurus)', 
      symbol: '♉', 
      element: 'पृथ्वी', 
      elementEng: 'Earth',
      dates: '20 अप्रैल - 20 मई',
      lord: 'शुक्र',
      lordEng: 'Venus',
      nature: 'स्थिर',
      guna: 'रजस्',
      lucky_color: 'सफ़ेद',
      lucky_day: 'शुक्रवार',
      body_parts: 'गला, गर्दन'
    },
    { 
      id: 'mithuna', 
      name: 'मिथुन', 
      english: 'Mithuna (Gemini)', 
      symbol: '♊', 
      element: 'वायु', 
      elementEng: 'Air',
      dates: '21 मई - 20 जून',
      lord: 'बुध',
      lordEng: 'Mercury',
      nature: 'द्विस्वभाव',
      guna: 'रजस्',
      lucky_color: 'हरा',
      lucky_day: 'बुधवार',
      body_parts: 'कंधे, हाथ'
    },
    { 
      id: 'karka', 
      name: 'कर्क', 
      english: 'Karka (Cancer)', 
      symbol: '♋', 
      element: 'जल', 
      elementEng: 'Water',
      dates: '21 जून - 22 जुलाई',
      lord: 'चंद्र',
      lordEng: 'Moon',
      nature: 'चर',
      guna: 'सत्व',
      lucky_color: 'मोती जैसा सफ़ेद',
      lucky_day: 'सोमवार',
      body_parts: 'छाती, पेट'
    },
    { 
      id: 'simha', 
      name: 'सिंह', 
      english: 'Simha (Leo)', 
      symbol: '♌', 
      element: 'अग्नि', 
      elementEng: 'Fire',
      dates: '23 जुलाई - 22 अगस्त',
      lord: 'सूर्य',
      lordEng: 'Sun',
      nature: 'स्थिर',
      guna: 'सत्व',
      lucky_color: 'सुनहरा',
      lucky_day: 'रविवार',
      body_parts: 'हृदय, पीठ'
    },
    { 
      id: 'kanya', 
      name: 'कन्या', 
      english: 'Kanya (Virgo)', 
      symbol: '♍', 
      element: 'पृथ्वी', 
      elementEng: 'Earth',
      dates: '23 अगस्त - 22 सितंबर',
      lord: 'बुध',
      lordEng: 'Mercury',
      nature: 'द्विस्वभाव',
      guna: 'रजस्',
      lucky_color: 'नीला',
      lucky_day: 'बुधवार',
      body_parts: 'पेट, आंतें'
    },
    { 
      id: 'tula', 
      name: 'तुला', 
      english: 'Tula (Libra)', 
      symbol: '♎', 
      element: 'वायु', 
      elementEng: 'Air',
      dates: '23 सितंबर - 22 अक्टूबर',
      lord: 'शुक्र',
      lordEng: 'Venus',
      nature: 'चर',
      guna: 'रजस्',
      lucky_color: 'गुलाबी',
      lucky_day: 'शुक्रवार',
      body_parts: 'कमर, गुर्दे'
    },
    { 
      id: 'vrishchika', 
      name: 'वृश्चिक', 
      english: 'Vrishchika (Scorpio)', 
      symbol: '♏', 
      element: 'जल', 
      elementEng: 'Water',
      dates: '23 अक्टूबर - 21 नवंबर',
      lord: 'मंगल',
      lordEng: 'Mars',
      nature: 'स्थिर',
      guna: 'तमस्',
      lucky_color: 'मैरून',
      lucky_day: 'मंगलवार',
      body_parts: 'गुप्तांग, मलाशय'
    },
    { 
      id: 'dhanu', 
      name: 'धनु', 
      english: 'Dhanu (Sagittarius)', 
      symbol: '♐', 
      element: 'अग्नि', 
      elementEng: 'Fire',
      dates: '22 नवंबर - 21 दिसंबर',
      lord: 'बृहस्पति',
      lordEng: 'Jupiter',
      nature: 'द्विस्वभाव',
      guna: 'सत्व',
      lucky_color: 'पीला',
      lucky_day: 'गुरुवार',
      body_parts: 'जांघें, कूल्हे'
    },
    { 
      id: 'makara', 
      name: 'मकर', 
      english: 'Makara (Capricorn)', 
      symbol: '♑', 
      element: 'पृथ्वी', 
      elementEng: 'Earth',
      dates: '22 दिसंबर - 19 जनवरी',
      lord: 'शनि',
      lordEng: 'Saturn',
      nature: 'चर',
      guna: 'तमस्',
      lucky_color: 'काला',
      lucky_day: 'शनिवार',
      body_parts: 'घुटने, हड्डियां'
    },
    { 
      id: 'kumbha', 
      name: 'कुम्भ', 
      english: 'Kumbha (Aquarius)', 
      symbol: '♒', 
      element: 'वायु', 
      elementEng: 'Air',
      dates: '20 जनवरी - 18 फरवरी',
      lord: 'शनि',
      lordEng: 'Saturn',
      nature: 'स्थिर',
      guna: 'तमस्',
      lucky_color: 'आसमानी',
      lucky_day: 'शनिवार',
      body_parts: 'पिंडलियां, टखने'
    },
    { 
      id: 'meena', 
      name: 'मीन', 
      english: 'Meena (Pisces)', 
      symbol: '♓', 
      element: 'जल', 
      elementEng: 'Water',
      dates: '19 फरवरी - 20 मार्च',
      lord: 'बृहस्पति',
      lordEng: 'Jupiter',
      nature: 'द्विस्वभाव',
      guna: 'सत्व',
      lucky_color: 'पीला',
      lucky_day: 'गुरुवार',
      body_parts: 'पैर, तलवे'
    }
  ];
}

// Navagrahas (Nine Planets in Vedic Astrology)
export function getNavagrahas() {
  return [
    { 
      id: 'surya', 
      name: 'सूर्य', 
      english: 'Surya (Sun)', 
      symbol: '☉', 
      element: 'अग्नि',
      day: 'रविवार',
      color: 'लाल',
      gem: 'माणिक',
      metal: 'सोना',
      direction: 'पूर्व',
      mantra: 'ॐ सूर्याय नमः',
      deity: 'भगवान सूर्य',
      nature: 'पिता, आत्मा, राजा'
    },
    { 
      id: 'chandra', 
      name: 'चंद्र', 
      english: 'Chandra (Moon)', 
      symbol: '☽', 
      element: 'जल',
      day: 'सोमवार',
      color: 'सफ़ेद',
      gem: 'मोती',
      metal: 'चांदी',
      direction: 'उत्तर-पश्चिम',
      mantra: 'ॐ चंद्राय नमः',
      deity: 'भगवान शिव',
      nature: 'माता, मन, भावनाएं'
    },
    { 
      id: 'mangal', 
      name: 'मंगल', 
      english: 'Mangal (Mars)', 
      symbol: '♂', 
      element: 'अग्नि',
      day: 'मंगलवार',
      color: 'लाल',
      gem: 'मूंगा',
      metal: 'तांबा',
      direction: 'दक्षिण',
      mantra: 'ॐ मंगलाय नमः',
      deity: 'भगवान हनुमान',
      nature: 'शक्ति, साहस, भाई'
    },
    { 
      id: 'budh', 
      name: 'बुध', 
      english: 'Budh (Mercury)', 
      symbol: '☿', 
      element: 'पृथ्वी',
      day: 'बुधवार',
      color: 'हरा',
      gem: 'पन्ना',
      metal: 'पीतल',
      direction: 'उत्तर',
      mantra: 'ॐ बुधाय नमः',
      deity: 'भगवान विष्णु',
      nature: 'बुद्धि, वाणी, व्यापार'
    },
    { 
      id: 'brihaspati', 
      name: 'बृहस्पति', 
      english: 'Brihaspati (Jupiter)', 
      symbol: '♃', 
      element: 'आकाश',
      day: 'गुरुवार',
      color: 'पीला',
      gem: 'पुखराज',
      metal: 'सोना',
      direction: 'उत्तर-पूर्व',
      mantra: 'ॐ बृहस्पतये नमः',
      deity: 'भगवान दक्षिणामूर्ति',
      nature: 'गुरु, ज्ञान, धर्म'
    },
    { 
      id: 'shukra', 
      name: 'शुक्र', 
      english: 'Shukra (Venus)', 
      symbol: '♀', 
      element: 'जल',
      day: 'शुक्रवार',
      color: 'सफ़ेद',
      gem: 'हीरा',
      metal: 'चांदी',
      direction: 'दक्षिण-पूर्व',
      mantra: 'ॐ शुक्राय नमः',
      deity: 'माता लक्ष्मी',
      nature: 'प्रेम, सुंदरता, कला'
    },
    { 
      id: 'shani', 
      name: 'शनि', 
      english: 'Shani (Saturn)', 
      symbol: '♄', 
      element: 'वायु',
      day: 'शनिवार',
      color: 'काला',
      gem: 'नीलम',
      metal: 'लोहा',
      direction: 'पश्चिम',
      mantra: 'ॐ शनये नमः',
      deity: 'भगवान शनि',
      nature: 'न्याय, कर्म, अनुशासन'
    },
    { 
      id: 'rahu', 
      name: 'राहु', 
      english: 'Rahu (North Node)', 
      symbol: '☊', 
      element: 'वायु',
      day: 'शनिवार',
      color: 'धुआं रंग',
      gem: 'गोमेद',
      metal: 'सीसा',
      direction: 'दक्षिण-पश्चिम',
      mantra: 'ॐ राहवे नमः',
      deity: 'देवी दुर्गा',
      nature: 'छाया ग्रह, इच्छा, भ्रम'
    },
    { 
      id: 'ketu', 
      name: 'केतु', 
      english: 'Ketu (South Node)', 
      symbol: '☋', 
      element: 'अग्नि',
      day: 'मंगलवार',
      color: 'भूरा',
      gem: 'लहसुनिया',
      metal: 'सीसा',
      direction: 'उत्तर-पश्चिम',
      mantra: 'ॐ केतवे नमः',
      deity: 'भगवान गणेश',
      nature: 'छाया ग्रह, मोक्ष, अध्यात्म'
    }
  ];
}

// Vedic Houses (Bhavas)
export function getVedicHouses() {
  return [
    { id: 1, name: 'लग्न भाव', english: 'Lagna (Ascendant)', significance: 'व्यक्तित्व, स्वास्थ्य, स्वरूप' },
    { id: 2, name: 'धन भाव', english: 'Dhana Bhava', significance: 'धन, परिवार, वाणी' },
    { id: 3, name: 'सहज भाव', english: 'Sahaja Bhava', significance: 'भाई-बहन, साहस, यात्रा' },
    { id: 4, name: 'सुख भाव', english: 'Sukha Bhava', significance: 'माता, घर, सुख, शिक्षा' },
    { id: 5, name: 'पुत्र भाव', english: 'Putra Bhava', significance: 'संतान, बुद्धि, पूर्व पुण्य' },
    { id: 6, name: 'रिपु भाव', english: 'Ripu Bhava', significance: 'शत्रु, रोग, नौकरी' },
    { id: 7, name: 'कलत्र भाव', english: 'Kalatra Bhava', significance: 'जीवनसाथी, साझेदारी' },
    { id: 8, name: 'आयु भाव', english: 'Ayu Bhava', significance: 'आयु, गुप्त विद्या, विपत्ति' },
    { id: 9, name: 'भाग्य भाव', english: 'Bhagya Bhava', significance: 'भाग्य, धर्म, पिता, गुरु' },
    { id: 10, name: 'कर्म भाव', english: 'Karma Bhava', significance: 'कर्म, प्रतिष्ठा, व्यवसाय' },
    { id: 11, name: 'लाभ भाव', english: 'Labha Bhava', significance: 'लाभ, आय, मित्र' },
    { id: 12, name: 'व्यय भाव', english: 'Vyaya Bhava', significance: 'व्यय, मोक्ष, विदेश यात्रा' }
  ];
}

// Vedic Nakshatras (27 Lunar Mansions)
export function getNakshatras() {
  return [
    { id: 1, name: 'अश्विनी', english: 'Ashwini', lord: 'केतु', deity: 'अश्विनी कुमार' },
    { id: 2, name: 'भरणी', english: 'Bharani', lord: 'शुक्र', deity: 'यम' },
    { id: 3, name: 'कृत्तिका', english: 'Krittika', lord: 'सूर्य', deity: 'अग्नि' },
    { id: 4, name: 'रोहिणी', english: 'Rohini', lord: 'चंद्र', deity: 'ब्रह्मा' },
    { id: 5, name: 'मृगशिरा', english: 'Mrigashira', lord: 'मंगल', deity: 'सोम' },
    { id: 6, name: 'आर्द्रा', english: 'Ardra', lord: 'राहु', deity: 'रुद्र' },
    { id: 7, name: 'पुनर्वसु', english: 'Punarvasu', lord: 'बृहस्पति', deity: 'अदिति' },
    { id: 8, name: 'पुष्य', english: 'Pushya', lord: 'शनि', deity: 'बृहस्पति' },
    { id: 9, name: 'आश्लेषा', english: 'Ashlesha', lord: 'बुध', deity: 'नाग' },
    { id: 10, name: 'मघा', english: 'Magha', lord: 'केतु', deity: 'पितृगण' },
    { id: 11, name: 'पूर्वाफाल्गुनी', english: 'Purva Phalguni', lord: 'शुक्र', deity: 'भग' },
    { id: 12, name: 'उत्तराफाल्गुनी', english: 'Uttara Phalguni', lord: 'सूर्य', deity: 'अर्यमा' },
    { id: 13, name: 'हस्त', english: 'Hasta', lord: 'चंद्र', deity: 'सविता' },
    { id: 14, name: 'चित्रा', english: 'Chitra', lord: 'मंगल', deity: 'त्वष्टा' },
    { id: 15, name: 'स्वाती', english: 'Swati', lord: 'राहु', deity: 'वायु' },
    { id: 16, name: 'विशाखा', english: 'Vishakha', lord: 'बृहस्पति', deity: 'इंद्राग्नि' },
    { id: 17, name: 'अनुराधा', english: 'Anuradha', lord: 'शनि', deity: 'मित्र' },
    { id: 18, name: 'ज्येष्ठा', english: 'Jyeshtha', lord: 'बुध', deity: 'इंद्र' },
    { id: 19, name: 'मूल', english: 'Mula', lord: 'केतु', deity: 'निरृति' },
    { id: 20, name: 'पूर्वाषाढ़ा', english: 'Purva Ashadha', lord: 'शुक्र', deity: 'आप:' },
    { id: 21, name: 'उत्तराषाढ़ा', english: 'Uttara Ashadha', lord: 'सूर्य', deity: 'विश्वेदेव' },
    { id: 22, name: 'श्रवण', english: 'Shravana', lord: 'चंद्र', deity: 'विष्णु' },
    { id: 23, name: 'धनिष्ठा', english: 'Dhanishtha', lord: 'मंगल', deity: 'वसु' },
    { id: 24, name: 'शतभिषा', english: 'Shatabhisha', lord: 'राहु', deity: 'वरुण' },
    { id: 25, name: 'पूर्वाभाद्रपद', english: 'Purva Bhadrapada', lord: 'बृहस्पति', deity: 'अज एकपाद' },
    { id: 26, name: 'उत्तराभाद्रपद', english: 'Uttara Bhadrapada', lord: 'शनि', deity: 'अहिर्बुध्न्य' },
    { id: 27, name: 'रेवती', english: 'Revati', lord: 'बुध', deity: 'पूषा' }
  ];
}

export function truncateText(text, maxLength = 150) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
}

export function generateSlug(title) {
  if (!title) return 'untitled';
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function getLanguageFlag(language) {
  const flags = {
    hindi: '🇮🇳',
    english: '🇺🇸',
    sanskrit: '🕉️'
  };
  return flags[language] || '🇮🇳';
}

// Get category color with Vedic theming
export function getCategoryColor(category) {
  const vedic_categories = getAstrologyCategories();
  const found = vedic_categories.find(cat => cat.id === category);
  if (!found) return 'bg-saffron-100 text-saffron-800 border-saffron-200 dark:bg-saffron-900/30 dark:text-saffron-400 dark:border-saffron-700';
  
  const colorMap = {
    'from-yellow-400 to-orange-500': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700',
    'from-pink-400 to-red-500': 'bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-900/30 dark:text-pink-400 dark:border-pink-700',
    'from-blue-400 to-indigo-500': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700',
    'from-green-400 to-emerald-500': 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700',
    'from-orange-400 to-red-500': 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-700',
    'from-cyan-400 to-blue-500': 'bg-cyan-100 text-cyan-800 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400 dark:border-cyan-700',
    'from-purple-400 to-violet-500': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-700',
    'from-amber-400 to-yellow-500': 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-700',
  };
  
  return colorMap[found.color] || 'bg-saffron-100 text-saffron-800 border-saffron-200 dark:bg-saffron-900/30 dark:text-saffron-400 dark:border-saffron-700';
}

// Backward compatibility exports
export const getZodiacSigns = getVedicZodiacSigns;
export const getPlanetaryBodies = getNavagrahas;
