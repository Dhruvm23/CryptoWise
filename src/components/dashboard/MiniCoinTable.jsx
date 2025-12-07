import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';
import { useTheme } from '../../context/ThemeContext';

const MiniCoinTable = ({ title, coins, loading }) => {
    const { currency } = useCurrency();
    const { isDark } = useTheme();

    if (loading) {
        return (
            <div className="glass-panel p-6 fade-in h-full flex flex-col">
                <div className={`flex items-center justify-between mb-4 border-b pb-4 ${isDark ? 'border-glass-border' : 'border-slate-200'}`}>
                    <div className="flex items-center gap-2">
                        <span className="h-5 w-1 rounded-full bg-gradient-to-b from-amber-500 via-purple-500 to-indigo-500" />
                        <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
                    </div>
                </div>
                <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between animate-pulse">
                            <div className="flex items-center gap-3 w-1/2">
                                <div className={`w-4 h-4 rounded ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`} />
                                <div className={`w-6 h-6 rounded-full ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`} />
                                <div className={`w-20 h-4 rounded ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`} />
                            </div>
                            <div className={`w-16 h-4 rounded ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!coins.length) return null;

    return (
        <div className="glass-panel p-6 fade-in h-full flex flex-col">
            <div className={`flex items-center justify-between mb-4 border-b pb-4 ${isDark ? 'border-glass-border' : 'border-slate-200'}`}>
                <div className="flex items-center gap-2">
                    <span className="h-5 w-1 rounded-full bg-gradient-to-b from-amber-500 via-purple-500 to-indigo-500" />
                    <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
                </div>
                <Link to="/markets" className="text-sm font-semibold text-accent-violet hover:text-accent-teal transition-colors">View All</Link>
            </div>
            <div className="overflow-auto flex-1 custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className={`text-xs uppercase tracking-wider border-b ${isDark ? 'text-slate-400 border-glass-border' : 'text-slate-500 border-slate-200'}`}>
                            <th className="pb-3 px-4 w-8">#</th>
                            <th className="pb-3 px-4">Name</th>
                            <th className="pb-3 px-4 text-right">Price</th>
                            <th className="pb-3 px-4 text-right">24h%</th>
                        </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? 'divide-glass-border' : 'divide-slate-100'}`}>
                        {coins.map((coin, i) => (
                            <tr key={coin.id} className={`transition-colors group ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                                <td className={`py-3 px-4 text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{i + 1}</td>
                                <td className="py-3 px-4">
                                    <Link to={`/coin/${coin.id}`} className="flex items-center gap-3">
                                        <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
                                        <span className={`text-sm font-bold group-hover:text-accent-violet transition-colors ${isDark ? 'text-white' : 'text-slate-900'
                                            }`}>{coin.symbol.toUpperCase()}</span>
                                    </Link>
                                </td>
                                <td className={`py-3 px-4 text-right text-sm font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {currency.symbol}{coin.current_price < 1 ? coin.current_price.toFixed(4) : coin.current_price.toLocaleString()}
                                </td>
                                <td className={`py-3 px-4 text-right text-sm font-bold ${coin.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'}`}>
                                    {coin.price_change_percentage_24h > 0 ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MiniCoinTable;

