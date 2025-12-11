import React, { useEffect, useState } from 'react';
import { useWatchlist } from '../context/WatchlistContext';
import { useCurrency } from '../context/CurrencyContext';
import { api } from '../services/api';
import CoinTable from '../components/common/CoinTable';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import Sparkline from '../components/common/Sparkline';

const Watchlist = () => {
    const { watchlist, toggleWatchlist } = useWatchlist();
    const { currency } = useCurrency();
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWatchlist = async () => {
            if (watchlist.length === 0) {
                setCoins([]);
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                // CoinGecko markets endpoint allows ids parameter
                const ids = watchlist.join(',');
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.code}&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h,7d`);
                const data = await res.json();
                setCoins(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchWatchlist();
    }, [watchlist, currency.code]);

    if (watchlist.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6 sm:p-8">
                <Star size={48} className="text-secondary mb-4 opacity-50 sm:w-16 sm:h-16" />
                <h2 className="text-xl sm:text-2xl font-bold mb-2">Your Watchlist is Empty</h2>
                <p className="text-secondary mb-6 text-sm sm:text-base">Use the star icon to add coins to your watchlist.</p>
                <Link to="/markets" className="btn-primary px-6 py-3 rounded-xl font-bold touch-target">
                    Browse Markets
                </Link>
            </div>
        );
    }

    return (
        <div className="container min-h-screen pb-20 pt-4 sm:pt-6 space-y-4 sm:space-y-6 fade-in">
            {/* Heading */}
            <div className="flex items-center gap-3">
                <span className="h-6 sm:h-8 w-1.5 rounded-full bg-gradient-to-b from-amber-500 via-purple-500 to-indigo-500" />
                <h1 className="text-xl sm:text-2xl font-bold">My Watchlist</h1>
            </div>

            <div className="glass-panel p-4 sm:p-6 min-h-[400px]">
                {loading ? (
                    <div className="space-y-3 sm:space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-10 sm:h-12 bg-white/5 rounded animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <CoinTable coins={coins} />
                )}
            </div>
        </div>
    );
};

export default Watchlist;
