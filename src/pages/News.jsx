import React, { useEffect, useState } from 'react';
import { Newspaper, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const News = () => {
    const { isDark } = useTheme();
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { api } = await import('../services/api');
                const data = await api.getCryptoNews();
                if (data) {
                    const formatted = data.map(item => ({
                        id: item.id,
                        title: item.title,
                        source: item.source_info?.name || "Unknown",
                        time: new Date(item.published_on * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                        category: item.categories ? item.categories.split('|')[0] : "Crypto",
                        image: item.imageurl || "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80", // fallback
                        url: item.url,
                        body: item.body
                    }));
                    setNewsItems(formatted);
                }
            } catch (e) {
                console.error("News fetch error", e);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    return (
        <div className="container min-h-screen pb-20 pt-6 fade-in space-y-8">
            {/* Stylized Heading */}
            <div className="flex items-center gap-3">
                <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-amber-500 via-purple-500 to-indigo-500" />
                <div className="flex items-center gap-3">
                    <Newspaper className="text-accent-violet" size={28} />
                    <h1 className={`text-[28px] sm:text-[32px] font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Crypto News
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    [...Array(8)].map((_, i) => (
                        <div key={i} className={`rounded-2xl overflow-hidden animate-pulse border ${isDark ? 'bg-background-secondary border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                            }`}>
                            <div className={`h-48 ${isDark ? 'bg-background-tertiary' : 'bg-slate-100'}`} />
                            <div className="p-4 space-y-3">
                                <div className={`h-6 rounded w-3/4 ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`} />
                                <div className={`h-4 rounded ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`} />
                                <div className={`h-4 rounded w-1/2 ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`} />
                            </div>
                        </div>
                    ))
                ) : (
                    newsItems.map(item => (
                        <a
                            key={item.id}
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className={`group overflow-hidden block transition-all duration-300 hover:-translate-y-1 rounded-2xl border ${isDark
                                    ? 'bg-background-secondary border-slate-800 hover:shadow-glow hover:border-accent-violet/30'
                                    : 'bg-white border-slate-200 shadow-sm hover:shadow-lg hover:border-accent-violet/30'
                                }`}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs font-bold text-white uppercase border border-white/10">
                                    {item.category}
                                </div>
                            </div>
                            <div className="p-5 flex flex-col h-[calc(100%-12rem)]">
                                <div className="flex-1">
                                    <h2 className={`text-lg font-semibold mb-3 line-clamp-2 group-hover:text-accent-violet transition-colors ${isDark ? 'text-white' : 'text-slate-900'
                                        }`}>{item.title}</h2>
                                    <p className={`text-sm line-clamp-3 mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'
                                        }`}>
                                        {item.body}
                                    </p>
                                </div>
                                <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'
                                    }`}>
                                    <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-slate-500' : 'text-slate-500'
                                        }`}>
                                        <span className={`font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.source}</span>
                                        <span>•</span>
                                        <span>{item.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs font-bold text-accent-violet">
                                        Read <ExternalLink size={12} />
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))
                )}
            </div>
        </div>
    );
};

export default News;

