import React from 'react';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const TrendingSection = ({ coins, loading }) => {
    const { isDark } = useTheme();

    if (loading) {
        return (
            <div className="glass-panel p-6 fade-in h-full">
                <div className={`flex items-center gap-3 mb-6 border-b pb-4 ${isDark ? 'border-glass-border' : 'border-slate-200'}`}>
                    <span className="h-6 w-1 rounded-full bg-gradient-to-b from-amber-500 via-purple-500 to-indigo-500" />
                    <Flame size={20} className="text-accent-amber" />
                    <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Trending Now</h2>
                </div>
                <div className="flex gap-4 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="glass-card min-w-[200px] p-4 flex flex-col gap-3 animate-pulse">
                            <div className="flex items-center justify-between">
                                <div className={`w-8 h-4 rounded ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`}></div>
                                <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`}></div>
                            </div>
                            <div>
                                <div className={`w-24 h-4 rounded mb-2 ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`}></div>
                                <div className={`w-12 h-3 rounded ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`}></div>
                            </div>
                            <div className={`w-16 h-4 rounded ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`}></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!coins.length) return null;

    return (
        <div className="glass-panel p-6 fade-in h-full">
            <div className={`flex items-center gap-3 mb-6 border-b pb-4 ${isDark ? 'border-glass-border' : 'border-slate-200'}`}>
                <span className="h-6 w-1 rounded-full bg-gradient-to-b from-amber-500 via-purple-500 to-indigo-500" />
                <Flame size={20} className="text-accent-amber" />
                <h2 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Trending Now</h2>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                {coins.map((item) => {
                    const coin = item.item;
                    const change = coin.data.price_change_percentage_24h.usd;
                    return (
                        <Link
                            to={`/coin/${coin.id}`}
                            key={coin.id}
                            className={`glass-card min-w-[200px] p-4 flex flex-col gap-3 snap-start group transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className={`text-xs font-bold px-2 py-1 rounded ${isDark ? 'bg-background-tertiary text-slate-400' : 'bg-slate-100 text-slate-600'
                                    }`}>#{coin.market_cap_rank}</span>
                                <img src={coin.thumb} alt={coin.name} className="w-8 h-8 rounded-full" />
                            </div>

                            <div>
                                <span className={`block font-bold group-hover:text-accent-violet transition-colors truncate ${isDark ? 'text-white' : 'text-slate-900'
                                    }`}>{coin.name}</span>
                                <span className={`text-xs uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{coin.symbol}</span>
                            </div>

                            <div className={`text-sm font-medium ${change >= 0 ? 'text-success' : 'text-danger'}`}>
                                {change > 0 ? '+' : ''}{change.toFixed(2)}%
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};

export default TrendingSection;

