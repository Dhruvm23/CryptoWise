import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useCurrency } from '../../context/CurrencyContext';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { format } from 'date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const CoinChart = ({ coinId }) => {
    const [days, setDays] = useState('1');
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currency } = useCurrency();

    const ranges = [
        { label: '24H', value: '1' },
        { label: '7D', value: '7' },
        { label: '1M', value: '30' },
        { label: '3M', value: '90' },
        { label: '1Y', value: '365' },
        { label: 'Max', value: 'max' },
    ];

    useEffect(() => {
        const fetchChart = async () => {
            setLoading(true);
            try {
                const res = await api.getMarketChart(coinId, currency.code, days);
                const prices = res.prices;

                setChartData({
                    labels: prices.map(price => price[0]),
                    datasets: [
                        {
                            label: 'Price',
                            data: prices.map(price => price[1]),
                            borderColor: '#3b82f6',
                            backgroundColor: (context) => {
                                const ctx = context.chart.ctx;
                                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                                gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
                                gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
                                return gradient;
                            },
                            fill: true,
                            borderWidth: 2,
                            pointRadius: 0,
                            pointHoverRadius: 4,
                        },
                    ],
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchChart();
    }, [coinId, days, currency.code]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                titleColor: '#94a3b8',
                bodyColor: '#f8fafc',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                callbacks: {
                    title: (context) => {
                        const date = new Date(context[0].raw.x || context[0].label);
                        return days === '1'
                            ? format(date, 'HH:mm')
                            : format(date, 'MMM d, yyyy');
                    },
                    label: (context) => {
                        return `${currency.symbol}${context.parsed.y.toLocaleString()}`;
                    }
                }
            },
        },
        scales: {
            x: {
                display: false,
                grid: { display: false },
                ticks: { maxTicksLimit: 8 }
            },
            y: {
                display: true,
                position: 'right',
                grid: {
                    color: 'rgba(148, 163, 184, 0.1)',
                },
                ticks: {
                    color: '#64748b',
                    callback: (value) => `${currency.symbol}${value.toLocaleString()}`
                }
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        }
    };

    return (
        <div className="glass-panel p-6">
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <h3 className="text-xl font-bold">Price Chart</h3>
                <div className="flex bg-[var(--bg-secondary)] p-1 rounded-lg border border-[var(--glass-border)]">
                    {ranges.map(range => (
                        <button
                            key={range.value}
                            onClick={() => setDays(range.value)}
                            className={`px-3 py-1 rounded text-sm font-medium transition-all ${days === range.value
                                    ? 'bg-[var(--accent-color)] text-white shadow'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-[400px] w-full">
                {loading ? (
                    <div className="h-full w-full flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
                    </div>
                ) : chartData ? (
                    <Line options={options} data={chartData} />
                ) : (
                    <div className="h-full flex items-center justify-center text-secondary">
                        No chart data available
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoinChart;
