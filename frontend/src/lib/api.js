const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

console.log('🔍 API_BASE_URL:', API_BASE_URL);

export async function getArticles(params = {}) {
    const searchParams = new URLSearchParams(params);
    const fullUrl = `${API_BASE_URL}/articles?${searchParams}`;
    
    console.log('📡 Making API call to:', fullUrl);
    
    const response = await fetch(fullUrl, {
        next: { revalidate: 60 }
    });
    
    if (!response.ok) {
        console.error('❌ API call failed:', response.status, response.statusText);
        throw new Error('Failed to fetch articles');
    }
    
    return response.json();
}

export async function getArticleBySlug(slug, siteId = 'techmobile') {
    const fullUrl = `${API_BASE_URL}/articles/${slug}?siteId=${siteId}`;
    console.log('📡 Making API call to:', fullUrl);
    
    const response = await fetch(fullUrl, {
        next: { revalidate: 60 }
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch article');
    }
    
    return response.json();
}

export async function getArticlesByCategory(category, siteId = 'techmobile', limit = 6) {
    const fullUrl = `${API_BASE_URL}/articles/category/${category}?siteId=${siteId}&limit=${limit}`;
    console.log('📡 Making API call to:', fullUrl);
    
    const response = await fetch(fullUrl, {
        next: { revalidate: 60 }
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch articles by category');
    }
    
    return response.json();
}

export async function getSiteConfig(siteId = 'techmobile') {
    const fullUrl = `${API_BASE_URL}/site-config?siteId=${siteId}`;
    console.log('📡 Making API call to:', fullUrl);
    
    const response = await fetch(fullUrl, {
        next: { revalidate: 300 }
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch site config');
    }
    
    return response.json();
}

export async function submitContactForm(formData) {
    const fullUrl = `${API_BASE_URL}/contact`;
    console.log('📡 Making API call to:', fullUrl);
    
    const response = await fetch(fullUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit form');
    }
    
    return response.json();
}
