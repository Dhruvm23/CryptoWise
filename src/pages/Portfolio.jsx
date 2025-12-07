import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { useCurrency } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';
import AddAssetForm from '../components/portfolio/AddAssetForm';
import { Plus, Trash2, PieChart, Wallet } from 'lucide-react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Portfolio = () => {
    const { holdings, removeHolding } = usePortfolio();
    const { currency } = useCurrency();
    const { isDark } = useTheme();
    const [prices, setPrices] = useState({});
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const fetchPrices = async () => {
            if (holdings.length === 0) return;
            // Get unique coin IDs
            const ids = [...new Set(holdings.map(h => h.coinId))].join(',');
            try {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.code}&ids=${ids}&order=market_cap_desc`);
                const data = await res.json();
                const priceMap = {};
                if (Array.isArray(data)) {
                    data.forEach(coin => {
                        priceMap[coin.id] = coin.current_price;
                    });
                }
                setPrices(priceMap);
            } catch (err) {
                console.error("Price fetch error", err);
            }
        };
        fetchPrices();
    }, [holdings, currency.code]);

    // Calculate Totals
    let totalBalance = 0;
    let totalCost = 0;
    const portfolioItems = holdings.map(h => {
        const currentPrice = prices[h.coinId] || 0;
        const value = h.amount * currentPrice;
        const cost = h.amount * h.buyPrice; // Assuming buyPrice was in same currency or roughly equivalent
        // In real app, currency conversion for history is complex. We assume user inputs buy price in current selected currency for simplicity.

        totalBalance += value;
        totalCost += cost;

        return {
            ...h,
            currentPrice,
            value,
            pl: value - cost,
            plPercent: cost > 0 ? ((value - cost) / cost) * 100 : 0
        };
    });

    const totalPL = totalBalance - totalCost;
    const totalPLPercent = totalCost > 0 ? (totalPL / totalCost) * 100 : 0;

    // Chart Data
    const chartData = {
        labels: portfolioItems.map(i => i.symbol.toUpperCase()),
        datasets: [{
            data: portfolioItems.map(i => i.value),
            backgroundColor: [
                '#14b8a6', '#6366f1', '#f59e0b', '#22c55e', '#8b5cf6', '#ec4899', '#f97316'
            ],
            borderWidth: 0,
        }]
    };

    return (
        <div className="container min-h-screen pb-20 pt-6 font-sans fade-in space-y-6">
            <div className="flex justify-between items-center">
                {/* Stylized Heading */}
                <div className="flex items-center gap-3">
                    <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-amber-500 via-purple-500 to-indigo-500" />
                    <div className="flex items-center gap-3">
                        <Wallet className="text-accent-violet" size={26} />
                        <h1 className={`text-[28px] sm:text-[32px] font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            My Portfolio
                        </h1>
                    </div>
                </div>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="btn-primary flex items-center gap-2 shadow-lg"
                >
                    <Plus size={20} /> Add Asset
                </button>
            </div>

            {holdings.length === 0 ? (
                <div className={`rounded-2xl min-h-[400px] flex flex-col items-center justify-center p-8 text-center space-y-6 border ${isDark ? 'bg-background-secondary border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center ${isDark ? 'bg-background-tertiary' : 'bg-slate-100'
                        }`}>
                        <PieChart size={48} className={isDark ? 'text-slate-600' : 'text-slate-400'} />
                    </div>
                    <div>
                        <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Portfolio is Empty</h3>
                        <p className={`max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Add your first crypto asset to start tracking your wealth.</p>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="btn-primary px-8"
                    >
                        Get Started
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    {/* Left Column: Stats & List */}
                    <div className="xl:col-span-2 space-y-6">
                        {/* Summary Card */}
                        <div className={`rounded-2xl p-6 border ${isDark
                                ? 'bg-gradient-to-br from-background-secondary to-background-tertiary border-slate-800'
                                : 'bg-gradient-to-br from-white to-slate-50 border-slate-200 shadow-sm'
                            }`}>
                            <div className={`text-sm font-medium mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Balance</div>
                            <div className={`text-4xl font-bold mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>{currency.symbol}{totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className={`p-4 rounded-xl ${isDark ? 'bg-black/20' : 'bg-slate-100'}`}>
                                    <div className={`text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Total Profit/Loss</div>
                                    <div className={`text-xl font-bold ${totalPL >= 0 ? 'text-success' : 'text-danger'}`}>
                                        {totalPL >= 0 ? '+' : ''}{currency.symbol}{Math.abs(totalPL).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                                    </div>
                                </div>
                                <div className={`p-4 rounded-xl ${isDark ? 'bg-black/20' : 'bg-slate-100'}`}>
                                    <div className={`text-xs mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>P/L %</div>
                                    <div className={`text-xl font-bold ${totalPLPercent >= 0 ? 'text-success' : 'text-danger'}`}>
                                        {totalPLPercent >= 0 ? '+' : ''}{Math.abs(totalPLPercent).toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Holdings List */}
                        <div className={`rounded-2xl overflow-hidden border ${isDark ? 'bg-background-secondary border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                            }`}>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className={`border-b ${isDark ? 'bg-background-tertiary border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                                        <tr>
                                            <th className={`px-6 py-4 text-left text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Asset</th>
                                            <th className={`px-6 py-4 text-right text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Balance</th>
                                            <th className={`px-6 py-4 text-right text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Price</th>
                                            <th className={`px-6 py-4 text-right text-xs font-bold uppercase tracking-wider hidden sm:table-cell ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Allocation</th>
                                            <th className="px-6 py-4"></th>
                                        </tr>
                                    </thead>
                                    <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
                                        {portfolioItems.map(item => (
                                            <tr key={item.id} className={`transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <img src={item.large} alt={item.name} className="w-8 h-8 rounded-full" />
                                                        <div>
                                                            <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.symbol.toUpperCase()}</div>
                                                            <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.amount} {item.symbol.toUpperCase()}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{currency.symbol}{item.value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
                                                    <div className={`text-xs font-medium ${item.pl >= 0 ? 'text-success' : 'text-danger'}`}>
                                                        {item.pl >= 0 ? '+' : ''}{item.plPercent.toFixed(2)}%
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <div className={`text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{currency.symbol}{item.currentPrice.toLocaleString()}</div>
                                                    <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Buy: {item.buyPrice}</div>
                                                </td>
                                                <td className={`px-6 py-4 whitespace-nowrap text-right hidden sm:table-cell text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                                    {totalBalance > 0 ? ((item.value / totalBalance) * 100).toFixed(1) : 0}%
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <button
                                                        onClick={() => removeHolding(item.id)}
                                                        className={`p-2 rounded-lg transition-all ${isDark ? 'text-slate-400 hover:text-danger hover:bg-danger/10' : 'text-slate-400 hover:text-danger hover:bg-danger/10'}`}
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Chart */}
                    <div className={`rounded-2xl p-6 flex flex-col items-center border ${isDark ? 'bg-background-secondary border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                        }`}>
                        <div className="flex items-center gap-2 mb-6 w-full">
                            <span className="h-5 w-1 rounded-full bg-gradient-to-b from-amber-500 via-purple-500 to-indigo-500" />
                            <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Allocation</h3>
                        </div>
                        <div className="w-full max-w-[280px] relative">
                            <Pie
                                data={chartData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'bottom',
                                            labels: {
                                                color: isDark ? '#94a3b8' : '#64748b',
                                                padding: 20,
                                                usePointStyle: true
                                            }
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {showAddForm && <AddAssetForm onClose={() => setShowAddForm(false)} />}
        </div>
    );
};

export default Portfolio;

