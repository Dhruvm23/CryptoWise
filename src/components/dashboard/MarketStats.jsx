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

    // Loading skeleton
    if (!global) return (
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-4 md:overflow-visible">
            {[...Array(5)].map((_, i) => (
                <div key={i} className={`flex-shrink-0 w-[140px] sm:w-[160px] md:w-auto rounded-xl h-[100px] sm:h-[110px] md:h-[120px] p-3 sm:p-4 flex flex-col justify-between animate-pulse border ${isDark ? 'bg-background-secondary border-glass-border' : 'bg-white border-slate-200'
                    }`}>
                    <div className="flex justify-between items-center">
                        <div className={`w-16 sm:w-20 h-3 sm:h-4 rounded ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`}></div>
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`}></div>
                    </div>
                    <div>
                        <div className={`w-24 sm:w-32 h-5 sm:h-6 rounded mb-1 sm:mb-2 ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`}></div>
                        <div className={`w-12 sm:w-16 h-3 sm:h-4 rounded ${isDark ? 'bg-background-tertiary' : 'bg-slate-200'}`}></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const StatCard = ({ label, value, change, icon: Icon, iconColor }) => (
        <div className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-auto glass-card p-3 sm:p-4 flex flex-col justify-between h-[100px] sm:h-[110px] md:h-[120px] group">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
                <span className={`text-xs sm:text-sm font-medium group-hover:text-accent-violet transition-colors truncate mr-2 ${isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>{label}</span>
                <div className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${isDark ? 'bg-background-tertiary' : 'bg-slate-100'}`} style={{ color: iconColor }}>
                    <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                </div>
            </div>
            <div>
                <div className={`text-base sm:text-lg md:text-xl font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`} title={value}>{value}</div>
                {change !== undefined && (
                    <div className={`flex items-center gap-1 text-xs sm:text-sm mt-0.5 sm:mt-1 font-medium ${change >= 0 ? 'text-success' : 'text-danger'}`}>
                        {change >= 0 ? <TrendingUp size={12} className="sm:w-[14px] sm:h-[14px]" /> : <TrendingDown size={12} className="sm:w-[14px] sm:h-[14px]" />}
                        {Math.abs(change).toFixed(2)}%
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar scroll-smooth-touch md:grid md:grid-cols-3 lg:grid-cols-5 md:gap-4 md:overflow-visible md:pb-0 mb-4 sm:mb-6 md:mb-8 fade-in -mx-1 px-1 md:mx-0 md:px-0">
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
            <div className="flex-shrink-0 w-[140px] sm:w-[160px] md:w-auto glass-card p-3 sm:p-4 flex flex-col justify-between h-[100px] sm:h-[110px] md:h-[120px]">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <span className={`text-xs sm:text-sm font-medium truncate mr-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Fear & Greed</span>
                    <div className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 ${isDark ? 'bg-background-tertiary' : 'bg-slate-100'}`} style={{ color: fearGreed.value > 50 ? '#22c55e' : '#f97373' }}>
                        <Gauge size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </div>
                </div>
                <div>
                    <div className={`text-base sm:text-lg md:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{fearGreed.value}</div>
                    <div className={`text-xs sm:text-sm mt-0.5 sm:mt-1 font-medium ${fearGreed.value > 50 ? 'text-success' : 'text-danger'}`}>
                        {fearGreed.label}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketStats;

