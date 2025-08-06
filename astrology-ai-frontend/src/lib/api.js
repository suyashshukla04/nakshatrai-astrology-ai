const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://nakshatrai.com/api';

console.log('🔮 Astrology API Base URL:', API_BASE_URL);

// Request cache to prevent duplicate API calls
const requestCache = new Map();
const CACHE_DURATION = 30000; // 30 seconds

function getCacheKey(url, params) {
  return `${url}?${new URLSearchParams(params).toString()}`;
}

function getCachedRequest(cacheKey) {
  const cached = requestCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setCachedRequest(cacheKey, data) {
  requestCache.set(cacheKey, {
    data,
    timestamp: Date.now()
  });
}

export async function getArticles(params = {}) {
  const defaultParams = { siteId: 'astroai', ...params };
  const searchParams = new URLSearchParams(defaultParams);
  const fullUrl = `${API_BASE_URL}/articles?${searchParams}`;
  
  const cacheKey = getCacheKey(`${API_BASE_URL}/articles`, defaultParams);
  const cached = getCachedRequest(cacheKey);
  
  if (cached) {
    console.log('🌟 Using cached astrology articles');
    return cached;
  }
  
  console.log('🌟 Fetching astrology articles:', fullUrl);
  
  const response = await fetch(fullUrl, {
    next: { revalidate: 60 }
  });
  
  if (!response.ok) {
    console.error('❌ Failed to fetch astrology articles:', response.status);
    throw new Error('Failed to fetch astrology articles');
  }
  
  const data = await response.json();
  setCachedRequest(cacheKey, data);
  return data;
}

export async function getArticleBySlug(slug, siteId = 'astroai') {
  const fullUrl = `${API_BASE_URL}/articles/${slug}?siteId=${siteId}`;
  console.log('🔮 Fetching astrology article:', fullUrl);
  
  const response = await fetch(fullUrl, {
    next: { revalidate: 60 }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch astrology article');
  }
  
  return response.json();
}

export async function getArticlesByCategory(category, siteId = 'astroai', limit = 12, language = null) {
  const params = { siteId, limit };
  if (language && language !== 'all') params.language = language;
  
  const searchParams = new URLSearchParams(params);
  const fullUrl = `${API_BASE_URL}/articles/category/${category}?${searchParams}`;
  
  const cacheKey = getCacheKey(`${API_BASE_URL}/articles/category/${category}`, params);
  const cached = getCachedRequest(cacheKey);
  
  if (cached) {
    console.log('📚 Using cached articles by category');
    return cached;
  }
  
  console.log('📚 Fetching articles by category:', fullUrl);
  
  const response = await fetch(fullUrl, {
    next: { revalidate: 60 }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch articles by category');
  }
  
  const data = await response.json();
  setCachedRequest(cacheKey, data);
  return data;
}

export async function getArticlesByZodiacSign(zodiacSign, siteId = 'astroai', limit = 6, language = null) {
  const params = { siteId, limit };
  if (language && language !== 'all') params.language = language;
  
  const searchParams = new URLSearchParams(params);
  const fullUrl = `${API_BASE_URL}/articles/zodiac/${zodiacSign}?${searchParams}`;
  
  console.log('♈ Fetching articles by zodiac:', fullUrl);
  
  const response = await fetch(fullUrl, {
    next: { revalidate: 60 }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch articles by zodiac sign');
  }
  
  return response.json();
}

export async function getArticlesByLanguage(language, siteId = 'astroai', limit = 12, category = null) {
  const params = { siteId, limit };
  if (category && category !== 'all') params.category = category;
  
  const searchParams = new URLSearchParams(params);
  const fullUrl = `${API_BASE_URL}/articles/language/${language}?${searchParams}`;
  
  console.log('🌍 Fetching articles by language:', fullUrl);
  
  const response = await fetch(fullUrl, {
    next: { revalidate: 60 }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch articles by language');
  }
  
  return response.json();
}

export async function getTodaysHoroscope(siteId = 'astroai', language = 'hindi') {
  const params = { siteId, language };
  const searchParams = new URLSearchParams(params);
  const fullUrl = `${API_BASE_URL}/todays-horoscope?${searchParams}`;
  
  const cacheKey = getCacheKey(`${API_BASE_URL}/todays-horoscope`, params);
  const cached = getCachedRequest(cacheKey);
  
  if (cached) {
    console.log('🌟 Using cached horoscope');
    return cached;
  }
  
  console.log('🌟 Fetching today\'s horoscope:', fullUrl);
  
  const response = await fetch(fullUrl, {
    next: { revalidate: 300 } // 5 minutes cache for daily horoscope
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch today\'s horoscope');
  }
  
  const data = await response.json();
  setCachedRequest(cacheKey, data);
  return data;
}

export async function getSiteConfig(siteId = 'astroai') {
  const fullUrl = `${API_BASE_URL}/site-config?siteId=${siteId}`;
  console.log('⚙️ Fetching astrology site config:', fullUrl);
  
  const response = await fetch(fullUrl, {
    next: { revalidate: 300 }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch astrology site config');
  }
  
  return response.json();
}

export async function submitContactForm(formData) {
  const fullUrl = `${API_BASE_URL}/contact`;
  console.log('📩 Submitting contact form:', fullUrl);
  
  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to submit contact form');
  }
  
  return response.json();
}

export async function generateDemoContent(formData) {
  const fullUrl = `${API_BASE_URL}/generate-demo-content`;
  console.log('🤖 Generating demo content:', fullUrl);
  
  const response = await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to generate demo content');
  }
  
  return response.json();
}
