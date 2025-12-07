import React from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { useTheme } from '../../context/ThemeContext';
import { TrendingUp, TrendingDown, Activity, Bitcoin, Zap, BarChart2, Gauge } from 'lucide-react';

const MarketStats = ({ global }) => {
    const { currency } = useCurrency();
    const { isDark } = useTheme();
    const [fearGreed, setFearGreed] = React.useState({ value: 50, label: 'Neutral' });

    React.useEffect(() => {
        const fetchFG = async () => {
            try {
                const { api } = await import('../../services/api');
                const data = await api.getFearGreed();
                if (data && data.data && data.data.length > 0) {
                    const item = data.data[0];
                    setFearGreed({ value: item.value, label: item.value_classification });
                }
            } catch (e) {
                console.error("FG Error", e);
            }
        };
        fetchFG();
    }, []);

    if (!global) return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {[...Array(5)].map((_, i) => (
                <div key={i} className={`rounded-xl h-[120px] p-4 flex flex-col justify-between animate-pulse border ${isDark ? 'bg-background-secondary border-glass-border' : 'bg-white border-slate-200'
                    }`}>
                    <div className="flex justify-between items-center">
                        <div className={`w-20 h-4 rounded ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`}></div>
                        <div className={`w-8 h-8 rounded-lg ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`}></div>
                    </div>
                    <div>
                        <div className={`w-32 h-6 rounded mb-2 ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`}></div>
                        <div className={`w-16 h-4 rounded ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`}></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const StatCard = ({ label, value, change, icon: Icon, iconColor }) => (
        <div className="glass-card p-4 flex flex-col justify-between h-[120px] group">
            <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium group-hover:text-accent-violet transition-colors ${isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>{label}</span>
                <div className={`p-2 rounded-lg ${isDark ? 'bg-background-tertiary' : 'bg-slate-100'}`} style={{ color: iconColor }}>
                    <Icon size={18} />
                </div>
            </div>
            <div>
                <div className={`text-xl font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`} title={value}>{value}</div>
                {change !== undefined && (
                    <div className={`flex items-center gap-1 text-sm mt-1 font-medium ${change >= 0 ? 'text-success' : 'text-danger'}`}>
                        {change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        {Math.abs(change).toFixed(2)}%
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8 fade-in">
            <StatCard
                label="Market Cap"
                value={`${currency.symbol}${global.total_market_cap[currency.code.toLowerCase()]?.toLocaleString()}`}
                change={global.market_cap_change_percentage_24h_usd}
                icon={Activity}
                iconColor="#6366f1"
            />
            <StatCard
                label="24h Volume"
                value={`${currency.symbol}${global.total_volume[currency.code.toLowerCase()]?.toLocaleString()}`}
                icon={BarChart2}
                iconColor="#8B5CF6"
                change={0}
            />
            <StatCard
                label="BTC Dominance"
                value={`${global.market_cap_percentage.btc.toFixed(1)}%`}
                icon={Bitcoin}
                iconColor="#F7931A"
                change={global.market_cap_percentage.btc - 50}
            />
            <StatCard
                label="Active Coins"
                value={global.active_cryptocurrencies.toLocaleString()}
                icon={Zap}
                iconColor="#14b8a6"
            />

            {/* Fear & Greed Card */}
            <div className="glass-card p-4 flex flex-col justify-between h-[120px]">
                <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Fear & Greed</span>
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-background-tertiary' : 'bg-slate-100'}`} style={{ color: fearGreed.value > 50 ? '#22c55e' : '#f97373' }}>
                        <Gauge size={18} />
                    </div>
                </div>
                <div>
                    <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{fearGreed.value}</div>
                    <div className={`text-sm mt-1 font-medium ${fearGreed.value > 50 ? 'text-success' : 'text-danger'}`}>
                        {fearGreed.label}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketStats;

