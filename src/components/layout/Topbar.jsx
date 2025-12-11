import React, { useState, useEffect, useRef } from 'react';
import { Menu, Search, Sun, Moon, Bell, X, ChevronDown } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useCurrency } from '../../context/CurrencyContext';
import { api } from '../../services/api';
import useDebounce from '../../hooks/useDebounce';
import { Link, useNavigate } from 'react-router-dom';
import NotificationPanel from '../common/NotificationPanel';

const Topbar = ({ onMenuClick }) => {
    const { isDark, toggleTheme } = useTheme();
    const { currency, setCurrency, currencies } = useCurrency();
    const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    // Search State
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const debouncedQuery = useDebounce(query, 500);
    const navigate = useNavigate();
    const searchRef = useRef(null);

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearch(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (debouncedQuery.length < 2) {
                setResults([]);
                return;
            }
            setLoading(true);
            try {
                const res = await api.searchCoins(debouncedQuery);
                setResults(res.coins || []);
            } catch (error) {
                console.error("Search error", error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        if (debouncedQuery) fetchSearchResults();
    }, [debouncedQuery]);

    const handleSearchSelect = (coinId) => {
        setQuery('');
        setResults([]);
        setShowSearch(false);
        navigate(`/coin/${coinId}`);
    };

    return (
        <header className={`h-16 sticky top-0 backdrop-blur-xl border-b flex items-center justify-between px-4 md:px-6 z-30 transition-all ${isDark
            ? 'bg-background-primary/80 border-slate-800'
            : 'bg-white/80 border-slate-200'
            }`}>
            {/* Mobile Nav - Left */}
            <div className="flex items-center gap-2 md:hidden">
                <button
                    onClick={onMenuClick}
                    className={`p-2 -ml-2 transition-colors touch-target ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                    aria-label="Open menu"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Logo - Center on mobile, hidden on md+ (shown in sidebar) */}
            <div className="md:hidden flex-1 flex justify-center">
                <Link to="/" className={`text-lg ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    <span className="font-black italic bg-gradient-to-r from-accent-teal via-accent-violet to-accent-amber bg-clip-text text-transparent">Crypto</span>
                    <span className="font-extrabold italic text-accent-amber">Wise</span>
                </Link>
            </div>

            {/* Search - Hidden on mobile, visible on md+ */}
            <div className="hidden md:block flex-1 max-w-md mx-auto relative" ref={searchRef}>
                <div className="relative group">
                    <Search size={16} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-slate-500 group-focus-within:text-accent-violet' : 'text-slate-400 group-focus-within:text-accent-violet'}`} />
                    <input
                        className={`w-full border text-sm rounded-full pl-10 pr-10 py-2 outline-none transition-all ${isDark
                            ? 'bg-background-tertiary border-slate-800 focus:border-accent-violet/50 focus:ring-2 focus:ring-accent-violet/20 text-slate-200 placeholder:text-slate-600'
                            : 'bg-slate-100 border-slate-200 focus:border-accent-violet/50 focus:ring-2 focus:ring-accent-violet/20 text-slate-800 placeholder:text-slate-400'
                            }`}
                        type="text"
                        placeholder="Search coins (e.g. BTC, ETH)..."
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setShowSearch(true);
                        }}
                        onFocus={() => setShowSearch(true)}
                    />
                    {query && (
                        <button
                            onClick={() => { setQuery(''); setResults([]); }}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-500 hover:text-slate-300' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* Dropdown */}
                {showSearch && (query.length > 0) && (
                    <div className={`absolute top-full left-4 right-4 mt-2 border rounded-xl shadow-xl overflow-hidden max-h-[300px] overflow-y-auto z-50 ${isDark ? 'bg-background-secondary border-slate-800 shadow-black/50' : 'bg-white border-slate-200 shadow-slate-200/50'
                        }`}>
                        {loading ? (
                            <div className={`p-4 text-center text-sm animate-pulse ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Searching...</div>
                        ) : results.length > 0 ? (
                            results.map((coin) => (
                                <div
                                    key={coin.id}
                                    onClick={() => handleSearchSelect(coin.id)}
                                    className={`flex items-center gap-3 p-3 cursor-pointer transition-colors border-b last:border-0 ${isDark ? 'hover:bg-slate-800 border-slate-800/50' : 'hover:bg-slate-50 border-slate-100'
                                        }`}
                                >
                                    <img src={coin.thumb} alt={coin.name} className="w-8 h-8 rounded-full" />
                                    <div className="flex flex-col">
                                        <span className={`font-semibold text-sm line-clamp-1 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{coin.name}</span>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>{coin.symbol}</span>
                                            {coin.market_cap_rank && <span className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>#{coin.market_cap_rank}</span>}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : query.length >= 2 ? (
                            <div className={`p-8 text-center text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                                <Search size={24} className="mx-auto mb-2 opacity-20" />
                                No results found for "{query}"
                            </div>
                        ) : null}
                    </div>
                )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-3">
                <div className="relative">
                    <button
                        className={`flex items-center gap-1 md:gap-2 text-sm font-medium transition-colors py-1.5 px-2 md:px-3 rounded-lg ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                        onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                    >
                        <span className="hidden sm:inline">{currency.symbol}</span>
                        <span>{currency.code}</span>
                        <ChevronDown size={14} />
                    </button>
                    {showCurrencyDropdown && (
                        <div className={`absolute top-full right-0 mt-2 border rounded-xl shadow-xl w-32 overflow-hidden py-1 z-50 ${isDark ? 'bg-background-secondary border-slate-800' : 'bg-white border-slate-200'
                            }`}>
                            {currencies.map(c => (
                                <button
                                    key={c.code}
                                    onClick={() => { setCurrency(c.code); setShowCurrencyDropdown(false); }}
                                    className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 ${currency.code === c.code
                                        ? 'text-accent-violet font-bold'
                                        : isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                >
                                    <span className="w-4">{c.symbol}</span>
                                    <span>{c.code}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-all focus:ring-2 focus:ring-accent-violet/30 ${isDark ? 'text-slate-400 hover:text-amber-400 hover:bg-slate-800' : 'text-slate-600 hover:text-violet-600 hover:bg-slate-100'
                        }`}
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* Notification Button with Panel */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`p-2 rounded-lg transition-all relative ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                    >
                        <Bell size={20} />
                        <span className={`absolute top-2 right-2 w-2 h-2 bg-accent-amber rounded-full ring-2 animate-pulse ${isDark ? 'ring-background-primary' : 'ring-white'}`}></span>
                    </button>
                    <NotificationPanel
                        isOpen={showNotifications}
                        onClose={() => setShowNotifications(false)}
                    />
                </div>
            </div>
        </header>
    );
};

export default Topbar;

