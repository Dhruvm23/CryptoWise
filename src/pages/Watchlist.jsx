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
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
                <Star size={64} className="text-secondary mb-4 opacity-50" />
                <h2 className="text-2xl font-bold mb-2">Your Watchlist is Empty</h2>
                <p className="text-secondary mb-6">Use the star icon to add coins to your watchlist.</p>
                <Link to="/markets" className="bg-[var(--accent-color)] text-white px-6 py-3 rounded-xl font-bold">
                    Browse Markets
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-[1600px] mx-auto fade-in">
            <h1 className="text-2xl font-bold mb-6">My Watchlist</h1>

            <div className="glass-panel p-6 min-h-[400px]">
                {loading ? (
                    <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="h-12 bg-white/5 rounded animate-pulse" />
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
