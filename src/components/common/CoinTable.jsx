import React from 'react';
import { Link } from 'react-router-dom';
import Sparkline from './Sparkline';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
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

    // Mobile Card Component
    const MobileCard = ({ coin }) => (
        <Link
            to={`/coin/${coin.id}`}
            className={`block p-3 sm:p-4 rounded-xl border transition-all active:scale-[0.98] ${isDark
                ? 'bg-background-secondary border-glass-border hover:bg-background-tertiary'
                : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
                }`}
        >
            <div className="flex items-center justify-between gap-3">
                {/* Left: Coin Info */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    {showWatchlist && (
                        <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWatchlist(coin.id); }}
                            className={`p-1.5 rounded-full transition-colors touch-target flex-shrink-0 ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-200'}`}
                            aria-label={isInWatchlist(coin.id) ? 'Remove from watchlist' : 'Add to watchlist'}
                        >
                            <Star
                                size={16}
                                className={isInWatchlist(coin.id) ? 'text-accent-amber fill-accent-amber' : isDark ? 'text-slate-500' : 'text-slate-400'}
                            />
                        </button>
                    )}
                    <img src={coin.image} alt={coin.name} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex-shrink-0" loading="lazy" />
                    <div className="min-w-0">
                        <div className={`font-bold text-sm sm:text-base truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{coin.name}</div>
                        <div className="flex items-center gap-2">
                            <span className={`text-xs uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{coin.symbol}</span>
                            <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>#{coin.market_cap_rank}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Price & Change */}
                <div className="text-right flex-shrink-0">
                    <div className={`font-bold text-sm sm:text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {currency.symbol}{coin.current_price.toLocaleString()}
                    </div>
                    <div className={`flex items-center justify-end gap-1 text-xs sm:text-sm font-bold ${coin.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'}`}>
                        {coin.price_change_percentage_24h >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%
                    </div>
                </div>
            </div>

            {/* Bottom row: Market cap (optional) */}
            <div className={`mt-2 pt-2 border-t flex justify-between text-xs ${isDark ? 'border-glass-border text-slate-400' : 'border-slate-100 text-slate-500'}`}>
                <span>Market Cap</span>
                <span className="font-medium">{currency.symbol}{coin.market_cap?.toLocaleString()}</span>
            </div>
        </Link>
    );

    return (
        <>
            {/* Mobile View: Card Layout (hidden on md+) */}
            <div className="md:hidden space-y-3">
                {coins.map((coin) => (
                    <MobileCard key={coin.id} coin={coin} />
                ))}
            </div>

            {/* Desktop View: Table Layout (hidden below md) */}
            <div className="hidden md:block overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                        <tr className={`border-b ${isDark ? 'border-glass-border' : 'border-slate-200'}`}>
                            {showWatchlist && <th className="py-3 px-3 lg:px-4 w-10"></th>}
                            <th className={`py-3 px-3 lg:px-4 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>#</th>
                            <th className={`py-3 px-3 lg:px-4 text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Name</th>
                            <th className={`py-3 px-3 lg:px-4 text-right text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Price</th>
                            <th className={`py-3 px-3 lg:px-4 text-right text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>24h %</th>
                            <th className={`py-3 px-3 lg:px-4 text-right text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Market Cap</th>
                            <th className={`py-3 px-3 lg:px-4 text-right text-xs font-bold uppercase tracking-wider hidden lg:table-cell ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Volume (24h)</th>
                            <th className={`py-3 px-3 lg:px-4 text-right text-xs font-bold uppercase tracking-wider hidden xl:table-cell w-32 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Last 7 Days</th>
                        </tr>
                    </thead>
                    <tbody className={`divide-y ${isDark ? 'divide-glass-border' : 'divide-slate-100'}`}>
                        {coins.map((coin) => (
                            <tr key={coin.id} className={`transition-colors group ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                                {showWatchlist && (
                                    <td className="py-3 px-3 lg:px-4 w-10">
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
                                <td className={`py-3 px-3 lg:px-4 text-sm font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{coin.market_cap_rank}</td>
                                <td className="py-3 px-3 lg:px-4">
                                    <Link to={`/coin/${coin.id}`} className="flex items-center gap-3">
                                        <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" loading="lazy" />
                                        <div>
                                            <div className={`font-bold group-hover:text-accent-violet transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>{coin.name}</div>
                                            <div className={`text-xs uppercase font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{coin.symbol}</div>
                                        </div>
                                    </Link>
                                </td>
                                <td className={`py-3 px-3 lg:px-4 text-right font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {currency.symbol}{coin.current_price.toLocaleString()}
                                </td>
                                <td className={`py-3 px-3 lg:px-4 text-right font-bold ${coin.price_change_percentage_24h >= 0 ? 'text-success' : 'text-danger'}`}>
                                    {coin.price_change_percentage_24h > 0 ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
                                </td>
                                <td className={`py-3 px-3 lg:px-4 text-right text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                    {currency.symbol}{coin.market_cap?.toLocaleString()}
                                </td>
                                <td className={`py-3 px-3 lg:px-4 text-right hidden lg:table-cell text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {currency.symbol}{coin.total_volume?.toLocaleString()}
                                </td>
                                <td className="py-3 px-3 lg:px-4 hidden xl:table-cell">
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
        </>
    );
};

export default CoinTable;

