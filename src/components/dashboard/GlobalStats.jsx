import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';

const GlobalStats = ({ global }) => {
    const { currency } = useCurrency();
    if (!global) return null;

    const stats = [
        { label: 'Market Cap', value: `${currency.symbol}${global.total_market_cap[currency.code.toLowerCase()]?.toLocaleString()}`, change: global.market_cap_change_percentage_24h_usd },
        { label: '24h Volume', value: `${currency.symbol}${global.total_volume[currency.code.toLowerCase()]?.toLocaleString()}` },
        { label: 'BTC Dominance', value: `${global.market_cap_percentage.btc.toFixed(1)}%` },
        { label: 'Active Coins', value: global.active_cryptocurrencies.toLocaleString() }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
                <div key={i} className="glass-card p-4 flex flex-col justify-center">
                    <div className="text-secondary text-xs font-medium uppercase tracking-wider mb-1">{stat.label}</div>
                    <div className="text-lg font-bold text-[var(--text-primary)]">{stat.value}</div>
                    {stat.change !== undefined && (
                        <div className={`text-xs mt-1 ${stat.change >= 0 ? 'text-success' : 'text-danger'}`}>
                            {stat.change > 0 ? '+' : ''}{stat.change.toFixed(1)}%
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default GlobalStats;
