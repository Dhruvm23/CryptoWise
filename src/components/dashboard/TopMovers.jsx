import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useCurrency } from '../../context/CurrencyContext';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopMovers = () => {
    const [gainers, setGainers] = useState([]);
    const [losers, setLosers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currency } = useCurrency();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch top 100 coins
                const data = await api.getCoinsMarkets(currency.code, 100, 1);

                // Sort by percentage change
                const sorted = [...data].sort((a, b) =>
                    b.price_change_percentage_24h - a.price_change_percentage_24h
                );

                setGainers(sorted.slice(0, 3));
                setLosers(sorted.slice(-3).reverse());
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currency]);

    if (loading) return <div className="animate-pulse h-40 bg-gray-800/20 rounded-xl"></div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold text-success flex items-center gap-2">
                    <TrendingUp size={16} /> Top Gainers
                </h4>
                {gainers.map(coin => (
                    <MoverItem key={coin.id} coin={coin} type="gainer" currencySymbol={currency.symbol} />
                ))}
            </div>

            <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold text-danger flex items-center gap-2">
                    <TrendingDown size={16} /> Top Losers
                </h4>
                {losers.map(coin => (
                    <MoverItem key={coin.id} coin={coin} type="loser" currencySymbol={currency.symbol} />
                ))}
            </div>
        </div>
    );
};

const MoverItem = ({ coin, type, currencySymbol }) => (
    <Link
        to={`/coin/${coin.id}`}
        className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
    >
        <div className="flex items-center gap-3">
            <img src={coin.image} alt={coin.name} className="w-6 h-6 rounded-full" />
            <div className="flex flex-col">
                <span className="font-semibold text-sm">{coin.symbol.toUpperCase()}</span>
                <span className="text-xs text-secondary">{currencySymbol}{coin.current_price.toLocaleString()}</span>
            </div>
        </div>
        <div className={`text-sm font-bold ${type === 'gainer' ? 'text-success' : 'text-danger'}`}>
            {type === 'gainer' ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
        </div>
    </Link>
);

export default TopMovers;
