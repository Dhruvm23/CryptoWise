import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import CoinTable from '../components/common/CoinTable';
import { ChevronLeft, ChevronRight, BarChart3 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCurrency } from '../context/CurrencyContext';

const Markets = () => {
    const { isDark } = useTheme();
    const { currency } = useCurrency();
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [category, setCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All' },
        { id: 'decentralized-finance-defi', name: 'DeFi' },
        { id: 'non-fungible-tokens-nft', name: 'NFT' },
        { id: 'meme-token', name: 'Meme' },
        { id: 'layer-1', name: 'Layer 1' },
        { id: 'layer-2', name: 'Layer 2' },
        { id: 'solana-ecosystem', name: 'Solana' },
    ];

    useEffect(() => {
        const fetchMarkets = async () => {
            setLoading(true);
            try {
                // Ensure 'all' is converted to undefined for the API
                const cat = category === 'all' ? undefined : category;
                const data = await api.getCoinsMarkets(currency.code.toLowerCase(), 50, page, cat);
                setCoins(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchMarkets();
    }, [page, category, currency]);

    return (
        <div className="container min-h-screen pb-20 pt-6 fade-in space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {/* Stylized Heading */}
                <div className="flex items-center gap-3">
                    <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-amber-500 via-purple-500 to-indigo-500" />
                    <div className="flex items-center gap-3">
                        <BarChart3 className="text-accent-violet" size={26} />
                        <h1 className={`text-[28px] sm:text-[32px] font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Markets
                        </h1>
                    </div>
                </div>

                {/* Categories */}
                <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    <div className="flex gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => { setCategory(cat.id); setPage(1); }}
                                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${category === cat.id
                                    ? 'bg-gradient-to-r from-accent-teal via-accent-violet to-accent-amber text-white font-semibold shadow-lg'
                                    : isDark
                                        ? 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-slate-800'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-slate-200'
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="glass-panel flex flex-col min-h-[600px]">
                {loading ? (
                    <div className="p-6 space-y-4">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className={`h-12 rounded animate-pulse ${isDark ? 'bg-background-secondary' : 'bg-slate-200'}`} />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="p-6">
                            <CoinTable coins={coins} />
                        </div>

                        {/* Pagination */}
                        <div className={`mt-auto border-t p-4 flex items-center justify-between ${isDark ? 'border-glass-border' : 'border-slate-200'}`}>
                            <button
                                disabled={page === 1}
                                onClick={() => setPage(p => p - 1)}
                                className="btn-glass flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={16} /> Previous
                            </button>
                            <span className={`text-sm font-medium px-3 py-1 rounded ${isDark ? 'bg-background-tertiary text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                                Page {page}
                            </span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                className="btn-glass flex items-center gap-2"
                            >
                                Next <ChevronRight size={16} />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Markets;

