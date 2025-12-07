import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TrendingCoins = () => {
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await api.getTrending();
                setTrending(res.coins.slice(0, 5)); // Top 5
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, []);

    if (loading) return <div className="animate-pulse h-40 bg-gray-800/20 rounded-xl"></div>;

    return (
        <div className="flex flex-col gap-3">
            {trending.map(({ item }) => (
                <Link
                    to={`/coin/${item.id}`}
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                >
                    <div className="flex items-center gap-3">
                        <img src={item.small} alt={item.name} className="w-8 h-8 rounded-full" />
                        <div>
                            <div className="font-semibold text-sm">{item.name}</div>
                            <div className="text-xs text-secondary">{item.symbol}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-mono">#{item.market_cap_rank}</span>
                        <div className={`text-xs px-2 py-1 rounded bg-white/5`}>
                            {item.data.price_change_percentage_24h.usd.toFixed(2)}%
                        </div>
                    </div>
                </Link>
            ))}
            <Link to="/markets" className="text-xs text-accent text-center mt-2 flex items-center justify-center gap-1">
                View All Markets <ArrowRight size={12} />
            </Link>
        </div>
    );
};

export default TrendingCoins;
