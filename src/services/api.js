// Detect if running in production (Vercel)
const IS_PRODUCTION = typeof window !== 'undefined' && !window.location.hostname.includes('localhost');

// Use proxy in production, direct API in development
const BASE_URL = IS_PRODUCTION
    ? '/api/coingecko'
    : 'https://api.coingecko.com/api/v3';

// ============================================
// CACHING SYSTEM - Stores responses to reduce API calls
// ============================================
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes (increased from 1 min)

// ============================================
// REQUEST THROTTLER - Limits calls to avoid rate limits
// ============================================
const REQUEST_LIMIT = 10; // Max requests per minute
const REQUEST_WINDOW = 60 * 1000; // 1 minute window
const requestTimestamps = [];
const requestQueue = [];
let isProcessingQueue = false;

// Build the URL based on environment
const buildUrl = (endpoint) => {
    if (IS_PRODUCTION) {
        // In production, use the proxy with path parameter
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

        // Split endpoint into path and query params
        const [path, queryString] = cleanEndpoint.split('?');

        let url = `${BASE_URL}?path=${encodeURIComponent(path)}`;

        // Add other query params if they exist
        if (queryString) {
            const params = new URLSearchParams(queryString);
            params.forEach((value, key) => {
                url += `&${key}=${encodeURIComponent(value)}`;
            });
        }

        return url;
    }
    // In development, use direct API
    return `${BASE_URL}${endpoint}`;
};

// Check if we can make a request right now
const canMakeRequest = () => {
    const now = Date.now();
    // Remove timestamps older than the window
    while (requestTimestamps.length > 0 && now - requestTimestamps[0] > REQUEST_WINDOW) {
        requestTimestamps.shift();
    }
    return requestTimestamps.length < REQUEST_LIMIT;
};

// Wait until we can make a request
const waitForSlot = () => {
    return new Promise((resolve) => {
        const check = () => {
            if (canMakeRequest()) {
                resolve();
            } else {
                // Wait until the oldest request expires
                const waitTime = REQUEST_WINDOW - (Date.now() - requestTimestamps[0]) + 100;
                setTimeout(check, Math.min(waitTime, 1000));
            }
        };
        check();
    });
};

// Process queued requests one by one
const processQueue = async () => {
    if (isProcessingQueue || requestQueue.length === 0) return;

    isProcessingQueue = true;

    while (requestQueue.length > 0) {
        await waitForSlot();
        const { endpoint, options, resolve, reject } = requestQueue.shift();

        try {
            requestTimestamps.push(Date.now());
            const response = await fetch(buildUrl(endpoint), options);

            if (!response.ok) {
                if (response.status === 429) {
                    // Put back in queue and wait longer
                    console.warn('Rate limited, retrying after delay...');
                    requestQueue.unshift({ endpoint, options, resolve, reject });
                    await new Promise(r => setTimeout(r, 5000)); // Wait 5 seconds
                    continue;
                }
                throw new Error(`API Error: ${response.statusText}`);
            }

            const data = await response.json();
            resolve(data);
        } catch (error) {
            reject(error);
        }
    }

    isProcessingQueue = false;
};

// ============================================
// MAIN FETCH FUNCTION - With caching & throttling
// ============================================
const fetchWithCache = async (endpoint, options = {}) => {
    const cacheKey = endpoint + JSON.stringify(options);
    const cached = cache.get(cacheKey);

    // Return cached data if still valid
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
    }

    // If we can make a request immediately, do it
    if (canMakeRequest()) {
        requestTimestamps.push(Date.now());

        try {
            const response = await fetch(buildUrl(endpoint), options);

            if (!response.ok) {
                if (response.status === 429) {
                    console.warn('Rate limit hit, queuing request...');
                    // Fall through to queue the request
                } else {
                    throw new Error(`API Error: ${response.statusText}`);
                }
            } else {
                const data = await response.json();
                cache.set(cacheKey, { data, timestamp: Date.now() });
                return data;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            // If we have stale cache, return it as fallback
            if (cached) {
                console.warn('Returning stale cache as fallback');
                return cached.data;
            }
            throw error;
        }
    }

    // Queue the request if we're at the limit
    return new Promise((resolve, reject) => {
        requestQueue.push({
            endpoint, options, resolve: (data) => {
                cache.set(cacheKey, { data, timestamp: Date.now() });
                resolve(data);
            }, reject
        });
        processQueue();
    });
};

// ============================================
// API ENDPOINTS
// ============================================
export const api = {
    getGlobalStats: () => fetchWithCache('/global'),

    getTrending: () => fetchWithCache('/search/trending'),

    getCoinsMarkets: (currency = 'usd', perPage = 100, page = 1, category) => {
        const queryParams = new URLSearchParams({
            vs_currency: currency,
            order: 'market_cap_desc',
            per_page: perPage,
            page: page,
            sparkline: true,
            price_change_percentage: '1h,24h,7d'
        });

        if (category && category !== 'all' && category !== '') {
            queryParams.append('category', category);
        }

        return fetchWithCache(`/coins/markets?${queryParams.toString()}`);
    },

    getCoinDetails: (id) =>
        fetchWithCache(`/coins/${id}?localization=false&tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`),

    searchCoins: (query) =>
        fetchWithCache(`/search?query=${query}`),

    getMarketChart: (id, currency = 'usd', days = '1') =>
        fetchWithCache(`/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`),

    // --- External APIs (not rate limited by CoinGecko) ---

    getFearGreed: async () => {
        try {
            const res = await fetch('https://api.alternative.me/fng/');
            const data = await res.json();
            return data;
        } catch (e) {
            console.error(e);
            return null;
        }
    },

    getCryptoNews: async () => {
        try {
            const res = await fetch('https://min-api.cryptocompare.com/data/v2/news/?lang=EN');
            const data = await res.json();
            return data.Data;
        } catch (e) {
            console.error(e);
            return [];
        }
    },

    getBinanceOrderBook: async (symbol = 'BTCUSDT') => {
        try {
            const res = await fetch(`https://api.binance.com/api/v3/depth?symbol=${symbol.toUpperCase()}&limit=10`);
            const data = await res.json();
            return data;
        } catch (e) {
            console.error(e);
            return null;
        }
    },

    // Utility: Clear cache (useful for debugging)
    clearCache: () => {
        cache.clear();
        console.log('API cache cleared');
    },

    // Utility: Get cache stats
    getCacheStats: () => ({
        size: cache.size,
        queueLength: requestQueue.length,
        requestsInWindow: requestTimestamps.length
    })
};

