import React from 'react';
import { Link } from 'react-router-dom';
import Sparkline from './Sparkline';
import { Star } from 'lucide-react';
import { useWatchlist } from '../../context/WatchlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useTheme } from '../../context/ThemeContext';

const CoinTable = ({ coins, showWatchlist = true }) => {
    const { toggleWatchlist, isInWatchlist } = useWatchlist();
    const { currency } = useCurrency();
    const { isDark } = useTheme();

    if (!coins || coins.length === 0) {
        return <div className={`p-8 text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>No coins data available</div>;
    }

    return (
        <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className={`border-b ${isDark ? 'border-glass-border' : 'border-slate-200'}`}>
                        {showWatchlist && <th className="py-3 px-4 w-10"></th>}
                        <th className={`py-3 px-4 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>#</th>
                        <th className={`py-3 px-4 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Name</th>
                        <th className={`py-3 px-4 text-right text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Price</th>
                        <th className={`py-3 px-4 text-right text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>24h %</th>
                        <th className={`py-3 px-4 text-right text-xs font-bold uppercase tracking-wider hidden md:table-cell ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Market Cap</th>
                        <th className={`py-3 px-4 text-right text-xs font-bold uppercase tracking-wider hidden lg:table-cell ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Volume (24h)</th>
                        <th className={`py-3 px-4 text-right text-xs font-bold uppercase tracking-wider hidden lg:table-cell w-32 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Last 7 Days</th>
                    </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-glass-border' : 'divide-slate-100'}`}>
                    {coins.map((coin) => (
                        <tr key={coin.id} className={`transition-colors group ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                            {showWatchlist && (
                                <td className="py-3 px-4 w-10">
                                    <button
                                        className={`p-1 rounded-full transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-200'}`}
                                        onClick={(e) => { e.preventDefault(); toggleWatchlist(coin.id); }}
                                    >
                                        <Star
                                            size={16}
                                            className={isInWatchlist(coin.id) ? 'text-accent-amber fill-accent-amber' : isDark ? 'text-slate-600 group-hover:text-slate-400' : 'text-slate-300 group-hover:text-slate-400'}
                                        />
                                    </button>
                                </td>
                            )}
                            <td className={`py-3 px-4 text-sm font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{coin.market_cap_rank}</td>
                            <td className="py-3 px-4">
                                <Link to={`/coin/${coin.id}`} className="flex items-center gap-3">
                                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                                    <div>
                                        <div className={`font-bold group-hover:text-accent-violet transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{coin.name}</div>
                                        <div className={`text-xs uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{coin.symbol}</div>
                                    </div>
                                </Link>
                            </td>
                            <td className={`py-3 px-4 text-right font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {currency.symbol}{coin.current_price.toLocaleString()}
                            </td>
                            <td className={`py-3 px-4 text-right font-bold ${coin.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'}`}>
                                {coin.price_change_percentage_24h > 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
                            </td>
                            <td className={`py-3 px-4 text-right hidden md:table-cell text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {currency.symbol}{coin.market_cap?.toLocaleString()}
                            </td>
                            <td className={`py-3 px-4 text-right hidden lg:table-cell text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                {currency.symbol}{coin.total_volume?.toLocaleString()}
                            </td>
                            <td className="py-3 px-4 hidden lg:table-cell">
                                <div className="h-10 w-28 ml-auto">
                                    {coin.sparkline_in_7d && (
                                        <Sparkline
                                            data={coin.sparkline_in_7d.price}
                                            color={coin.price_change_percentage_7d_in_currency >= 0 ? '#22c55e' : '#f97373'}
                                        />
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CoinTable;

