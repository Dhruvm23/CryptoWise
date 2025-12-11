import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import CoinChart from '../components/coins/CoinChart';
import OrderBook from '../components/coins/OrderBook';
import CoinNews from '../components/coins/CoinNews';
import { useCurrency } from '../context/CurrencyContext';
import { useWatchlist } from '../context/WatchlistContext';
import { useAlerts } from '../context/AlertsContext';
import { Star, ArrowUp, ArrowDown, ExternalLink, Bell, X, Globe, FileText, Activity, BarChart2, DollarSign, Database, Lock } from 'lucide-react';

const CoinDetail = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currency } = useCurrency();
    const { isInWatchlist, toggleWatchlist } = useWatchlist();

    // Alert State
    const { addAlert } = useAlerts();
    const [showAlertModal, setShowAlertModal] = useState(false);
    const [targetPrice, setTargetPrice] = useState('');
    const [condition, setCondition] = useState('above');

    useEffect(() => {
        const fetchCoin = async () => {
            setLoading(true);
            try {
                const data = await api.getCoinDetails(id);
                setCoin(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCoin();
    }, [id]);

    const handleCreateAlert = (e) => {
        e.preventDefault();
        if (targetPrice) {
            addAlert({
                coinId: id,
                targetPrice: parseFloat(targetPrice),
                condition,
                active: true
            });
            setShowAlertModal(false);
            setTargetPrice('');
        }
    };

    if (loading) return (
        <div className="container p-6 space-y-6 animate-pulse">
            <div className="h-40 bg-background-secondary rounded-2xl" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="h-96 bg-background-secondary rounded-2xl" />
                    <div className="h-64 bg-background-secondary rounded-2xl" />
                </div>
                <div className="h-96 bg-background-secondary rounded-2xl" />
            </div>
        </div>
    );

    if (!coin) return <div className="p-8 text-center text-text-secondary">Coin not found</div>;

    const currentPrice = coin.market_data.current_price[currency.code.toLowerCase()];
    const priceChange = coin.market_data.price_change_percentage_24h;

    const StatCard = ({ label, value, icon: Icon }) => (
        <div className="p-4 rounded-xl bg-background-secondary border border-glass-border flex flex-col justify-between h-full">
            <div className="flex items-center gap-2 mb-2 text-text-secondary">
                {Icon && <Icon size={14} />}
                <span className="text-xs font-bold uppercase">{label}</span>
            </div>
            <div className="text-lg font-bold text-text-primary break-words">
                {value}
            </div>
        </div>
    );

    return (
        <div className="container min-h-screen pb-20 pt-4 sm:pt-6 space-y-4 sm:space-y-6 fade-in">
            {/* Header Card */}
            <div className="glass-panel p-4 sm:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-3 sm:gap-4">
                    <img src={coin.image.large} alt={coin.name} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-lg" loading="lazy" />
                    <div>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-text-primary">{coin.name}</h1>
                            <span className="px-2 py-0.5 rounded bg-background-tertiary text-text-secondary text-xs sm:text-sm font-semibold border border-glass-border">{coin.symbol.toUpperCase()}</span>
                            <span className="px-2 py-0.5 rounded bg-background-tertiary text-xs font-mono text-text-muted hidden xs:inline">Rank #{coin.market_cap_rank}</span>
                        </div>
                        <div className="flex flex-wrap gap-3 sm:gap-4 mt-2 sm:mt-3">
                            {coin.links.homepage[0] && (
                                <a href={coin.links.homepage[0]} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-text-secondary hover:text-accent transition-colors">
                                    <Globe size={12} /> Website
                                </a>
                            )}
                            {coin.links.whitepaper && (
                                <a href={coin.links.whitepaper} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-text-secondary hover:text-accent transition-colors">
                                    <FileText size={12} /> Whitepaper
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-start sm:items-end w-full md:w-auto">
                    <div className="text-fluid-3xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
                        {currency.symbol}{currentPrice.toLocaleString()}
                    </div>
                    <div className={`flex items-center gap-1 font-bold mt-1 text-sm sm:text-base ${priceChange >= 0 ? 'text-success' : 'text-danger'}`}>
                        {priceChange >= 0 ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
                        {Math.abs(priceChange).toFixed(2)}% (24h)
                    </div>

                    <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 w-full md:w-auto">
                        <button
                            onClick={() => toggleWatchlist(coin.id)}
                            className={`flex flex-1 md:flex-none items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm transition-all touch-target ${isInWatchlist(coin.id)
                                ? 'bg-primary/10 text-primary border border-primary/20'
                                : 'btn-glass'
                                }`}
                        >
                            <Star size={16} fill={isInWatchlist(coin.id) ? "currentColor" : "none"} />
                            <span className="hidden xs:inline">{isInWatchlist(coin.id) ? 'Watchlist' : 'Add'}</span>
                        </button>

                        <button
                            onClick={() => setShowAlertModal(true)}
                            className="btn-glass flex flex-1 md:flex-none items-center justify-center gap-1 sm:gap-2 text-sm touch-target"
                        >
                            <Bell size={16} /> Alert
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Left Column: Chart & Stats */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                    {/* Price Chart Card */}
                    <div className="glass-panel p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 border-b border-glass-border pb-4">
                            <h3 className="text-lg sm:text-xl font-bold text-text-primary flex items-center gap-2">
                                <Activity size={18} className="text-accent sm:w-5 sm:h-5" />
                                Price Chart
                            </h3>
                            <div className="flex gap-1.5 sm:gap-2 overflow-x-auto hide-scrollbar -mx-1 px-1">
                                {['24h', '7d', '1m', '1y', 'Max'].map(range => (
                                    <button
                                        key={range}
                                        className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap touch-target ${range === '7d' ? 'bg-primary text-background-primary' : 'bg-background-tertiary text-text-secondary hover:bg-white/10'}`}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="aspect-chart">
                            <CoinChart coinId={id} />
                        </div>
                    </div>

                    {/* Market Stats Grid Card */}
                    <div className="glass-panel p-4 sm:p-6">
                        <h3 className="text-lg sm:text-xl font-bold text-text-primary mb-4 sm:mb-6 flex items-center gap-2">
                            <Database size={18} className="text-accent sm:w-5 sm:h-5" />
                            Market Stats
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                            <StatCard
                                label="Market Cap"
                                value={`${currency.symbol}${coin.market_data.market_cap[currency.code.toLowerCase()]?.toLocaleString()}`}
                                icon={DollarSign}
                            />
                            <StatCard
                                label="Fully Diluted"
                                value={`${currency.symbol}${coin.market_data.fully_diluted_valuation[currency.code.toLowerCase()]?.toLocaleString() || 'N/A'}`}
                                icon={Lock}
                            />
                            <StatCard
                                label="24h Volume"
                                value={`${currency.symbol}${coin.market_data.total_volume[currency.code.toLowerCase()]?.toLocaleString()}`}
                                icon={BarChart2}
                            />
                            <StatCard
                                label="Circulating Supply"
                                value={coin.market_data.circulating_supply?.toLocaleString()}
                                icon={Activity}
                            />
                            <StatCard
                                label="Total Supply"
                                value={coin.market_data.total_supply?.toLocaleString() || '∞'}
                                icon={Database}
                            />
                            <StatCard
                                label="Max Supply"
                                value={coin.market_data.max_supply?.toLocaleString() || '∞'}
                                icon={Database}
                            />
                        </div>
                    </div>

                    {/* About Section */}
                    {coin.description.en && (
                        <div className="glass-panel p-6">
                            <h3 className="text-xl font-bold text-text-primary mb-4">About {coin.name}</h3>
                            <div
                                className="text-text-secondary leading-relaxed text-sm prose prose-invert max-w-none max-h-60 overflow-y-auto custom-scrollbar"
                                dangerouslySetInnerHTML={{ __html: coin.description.en }}
                            />
                        </div>
                    )}
                </div>

                {/* Right Column: OrderBook & News */}
                <div className="space-y-6">
                    <OrderBook symbol={coin.symbol} />
                    <CoinNews coinName={coin.name} />
                </div>
            </div>

            {/* Alert Modal */}
            {showAlertModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
                    <div className="bg-background-secondary border border-glass-border rounded-2xl w-full max-w-sm p-6 relative shadow-2xl">
                        <button onClick={() => setShowAlertModal(false)} className="absolute top-4 right-4 text-text-secondary hover:text-text-primary">
                            <X size={20} />
                        </button>
                        <h3 className="text-xl font-bold mb-1 text-text-primary">Set Price Alert</h3>
                        <p className="text-sm text-text-secondary mb-6">Get notified when {coin.symbol.toUpperCase()} hits your target.</p>

                        <form onSubmit={handleCreateAlert} className="flex flex-col gap-4">
                            <div>
                                <label className="text-xs font-bold uppercase text-text-secondary mb-2 block">Target Price ({currency.symbol})</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">{currency.symbol}</span>
                                    <input
                                        type="number" step="any"
                                        value={targetPrice}
                                        onChange={(e) => setTargetPrice(e.target.value)}
                                        className="w-full input-glass pl-8 text-lg font-mono"
                                        placeholder={currentPrice}
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setCondition('above')}
                                    className={`py-3 rounded-xl border font-medium transition-all ${condition === 'above'
                                        ? 'bg-success text-white border-transparent'
                                        : 'border-glass-border text-text-secondary hover:bg-white/5'
                                        }`}
                                >
                                    Above
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCondition('below')}
                                    className={`py-3 rounded-xl border font-medium transition-all ${condition === 'below'
                                        ? 'bg-danger text-white border-transparent'
                                        : 'border-glass-border text-text-secondary hover:bg-white/5'
                                        }`}
                                >
                                    Below
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="btn-primary w-full py-3 mt-2 shadow-glow"
                            >
                                Create Alert
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CoinDetail;
