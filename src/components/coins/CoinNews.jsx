import React, { useEffect, useState } from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';

const CoinNews = ({ coinName }) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock news generator since free APIs with specific coin filtering are rare without auth/CORS
        // In a real production app, we would use a proper backend to proxy requests to CryptoPanic or similar.
        const fetchNews = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));

            const mockNews = [
                {
                    title: `${coinName} sees massive surge in trading volume`,
                    source: 'CryptoDaily',
                    time: '2 hours ago',
                    url: '#'
                },
                {
                    title: `Analysts predict bright future for ${coinName} amidst market volatility`,
                    source: 'CoinTelegraph',
                    time: '4 hours ago',
                    url: '#'
                },
                {
                    title: `New partnership announced for ${coinName} ecosystem`,
                    source: 'Decrypt',
                    time: '6 hours ago',
                    url: '#'
                }
            ];
            setNews(mockNews);
            setLoading(false);
        };

        if (coinName) fetchNews();
    }, [coinName]);

    return (
        <div className="glass-panel p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Newspaper size={20} /> Latest News for {coinName}
            </h3>
            <div className="flex flex-col gap-4">
                {loading ? (
                    [1, 2, 3].map(i => <div key={i} className="h-16 animate-pulse bg-white/5 rounded-lg"></div>)
                ) : (
                    news.map((item, i) => (
                        <a
                            key={i}
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="block p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-glass-border group"
                        >
                            <div className="flex justify-between items-start">
                                <h4 className="font-semibold group-hover:text-accent transition-colors">{item.title}</h4>
                                <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="flex gap-3 mt-2 text-xs text-secondary">
                                <span>{item.source}</span>
                                <span>•</span>
                                <span>{item.time}</span>
                            </div>
                        </a>
                    ))
                )}
            </div>
        </div>
    );
};

export default CoinNews;
