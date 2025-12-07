export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Get the path from query params
    const { path } = req.query;

    if (!path) {
        return res.status(400).json({ error: 'Path parameter required' });
    }

    // Reconstruct the full path with query params
    const queryParams = new URLSearchParams(req.query);
    queryParams.delete('path'); // Remove path from query string

    const queryString = queryParams.toString();
    const fullUrl = `https://api.coingecko.com/api/v3/${path}${queryString ? '?' + queryString : ''}`;

    try {
        const response = await fetch(fullUrl, {
            headers: {
                'Accept': 'application/json',
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({
                error: `CoinGecko API error: ${response.statusText}`
            });
        }

        const data = await response.json();

        // Cache for 1 minute
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
        return res.status(200).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        return res.status(500).json({ error: 'Failed to fetch from CoinGecko' });
    }
}
