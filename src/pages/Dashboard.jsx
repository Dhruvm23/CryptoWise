import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import MarketStats from '../components/dashboard/MarketStats';
import TrendingSection from '../components/dashboard/TrendingSection';
import MiniCoinTable from '../components/dashboard/MiniCoinTable';
import CoinTable from '../components/common/CoinTable';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';

const Dashboard = () => {
    const { isDark } = useTheme();
    const { currency } = useCurrency();

    const [globalData, setGlobalData] = useState(null);
    const [trending, setTrending] = useState([]);
    const [topCoins, setTopCoins] = useState([]);
    const [gainers, setGainers] = useState([]);
    const [losers, setLosers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [category, setCategory] = useState('all');
    const categories = [
        { id: 'all', name: 'All' },
        { id: 'decentralized-finance-defi', name: 'DeFi' },
        { id: 'non-fungible-tokens-nft', name: 'NFT' },
        { id: 'meme-token', name: 'Meme' },
        { id: 'layer-1', name: 'Layer 1' },
    ];

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const [globalRes, trendingRes, marketsRes] = await Promise.all([
                    api.getGlobalStats(),
                    api.getTrending(),
                    api.getCoinsMarkets(currency.code.toLowerCase(), 50, 1)
                ]);

                setGlobalData(globalRes.data);
                setTrending(trendingRes.coins.slice(0, 5));
                setTopCoins(marketsRes);

                const sorted = [...marketsRes].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
                setGainers(sorted.slice(0, 5));
                setLosers(sorted.slice(-5).reverse());

            } catch (err) {
                console.error("Dashboard fetch error", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, [currency]);

    const handleCategoryChange = async (catId) => {
        setCategory(catId);
        const cat = catId === 'all' ? undefined : catId;
        try {
            const data = await api.getCoinsMarkets(currency.code.toLowerCase(), 50, 1, cat);
            setTopCoins(data);
        } catch (err) { console.error(err); }
    };

    return (
        <div className="container min-h-screen pb-20 pt-4 sm:pt-6 space-y-4 sm:space-y-6 fade-in">
            {/* Market Stats - scrollable on mobile */}
            <div>
                <MarketStats global={globalData} />
            </div>

            {/* Trending Section */}
            <div className="min-h-[200px] sm:min-h-[260px]">
                <TrendingSection coins={trending} loading={loading} />
            </div>

            {/* Gainers/Losers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <MiniCoinTable title="Top Gainers" coins={gainers} type="gainer" loading={loading} />
                <MiniCoinTable title="Top Losers" coins={losers} type="loser" loading={loading} />
            </div>

            <div className={`rounded-2xl shadow-xl p-4 sm:p-6 ${isDark
                ? 'bg-background-secondary border border-slate-800/60 shadow-black/20'
                : 'bg-white border border-slate-200 shadow-slate-200/50'
                }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-8 gap-4 sm:gap-6">
                    <div className="flex items-center gap-2">
                        <span className="h-6 w-1 rounded-full bg-gradient-to-b from-amber-500 via-purple-500 to-indigo-500" />
                        <h2 className={`text-lg sm:text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Market Overview</h2>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar scroll-smooth-touch -mx-1 px-1">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all whitespace-nowrap border touch-target ${category === cat.id
                                    ? 'bg-gradient-to-r from-accent-teal via-accent-violet to-accent-amber text-white border-transparent shadow-md shadow-accent-violet/30'
                                    : isDark
                                        ? 'bg-background-tertiary text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-slate-200'
                                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 hover:text-slate-900'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className={`h-16 rounded-xl animate-pulse ${isDark ? 'bg-background-tertiary' : 'bg-slate-100'}`} />
                        ))}
                    </div>
                ) : (
                    <CoinTable coins={topCoins} />
                )}
            </div>
        </div>
    );
};

export default Dashboard;

