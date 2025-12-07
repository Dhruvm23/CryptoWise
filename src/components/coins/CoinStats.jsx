import React from 'react';
import { DollarSign, Activity, Database, BarChart2 } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';

const CoinStats = ({ coin }) => {
    const { currency } = useCurrency();
    const md = coin.market_data;

    // Values in current currency
    const cur = currency.code.toLowerCase();

    const stats = [
        { label: 'Market Cap', value: md.market_cap[cur], icon: DollarSign },
        { label: 'Fully Diluted Valuation', value: md.fully_diluted_valuation[cur], icon: Activity },
        { label: '24h Trading Vol', value: md.total_volume[cur], icon: BarChart2 },
        { label: 'Circulating Supply', value: md.circulating_supply, suffix: coin.symbol.toUpperCase(), icon: Database },
        { label: 'Total Supply', value: md.total_supply, suffix: coin.symbol.toUpperCase(), icon: Database },
        { label: 'Max Supply', value: md.max_supply || '∞', suffix: coin.symbol.toUpperCase(), icon: Database },
    ];

    const formatVal = (val, suffix = '') => {
        if (val === undefined || val === null) return '-';
        if (val === '∞') return '∞';
        return `${suffix ? '' : currency.symbol}${val.toLocaleString()} ${suffix}`;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, i) => (
                <div key={i} className="glass-card p-4 flex items-start justify-between">
                    <div>
                        <div className="text-secondary text-sm mb-1">{stat.label}</div>
                        <div className="font-bold text-lg">{formatVal(stat.value, stat.suffix)}</div>
                    </div>
                    <div className="p-2 rounded-lg bg-white/5 text-accent">
                        <stat.icon size={20} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CoinStats;
