import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, BarChart2, Activity, LineChart } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const HowToReadCharts = () => {
    const { isDark } = useTheme();

    return (
        <div className="container min-h-screen pb-20 pt-6 fade-in space-y-8 max-w-4xl mx-auto">
            <Link
                to="/learn"
                className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
            >
                <ArrowLeft size={16} />
                Back to Learn
            </Link>

            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <TrendingUp size={32} className="text-white" />
                    </div>
                    <div>
                        <h1 className={`text-3xl md:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            How to Read Charts
                        </h1>
                        <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Master the basics of technical analysis
                        </p>
                    </div>
                </div>
            </div>

            <div className={`rounded-2xl p-6 md:p-8 space-y-8 ${isDark ? 'bg-background-secondary border border-slate-800/60' : 'bg-white border border-slate-200 shadow-sm'
                }`}>
                <section className="space-y-4">
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Candlestick Charts
                    </h2>
                    <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Candlestick charts are the most popular way to visualize price movements. Each "candle" represents a specific time period and shows four key prices.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <div className="w-8 h-8 rounded bg-success/20 flex items-center justify-center mb-3">
                                <div className="w-3 h-6 bg-success rounded-sm"></div>
                            </div>
                            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Green Candle</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Price closed higher than it opened. The bottom is the open, top is the close.
                            </p>
                        </div>
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <div className="w-8 h-8 rounded bg-danger/20 flex items-center justify-center mb-3">
                                <div className="w-3 h-6 bg-danger rounded-sm"></div>
                            </div>
                            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Red Candle</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Price closed lower than it opened. The top is the open, bottom is the close.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Key Indicators
                    </h2>
                    <div className="space-y-4">
                        <div className={`p-4 rounded-xl flex gap-4 items-start ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <LineChart className="text-accent-teal flex-shrink-0" size={24} />
                            <div>
                                <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Moving Averages (MA)</h3>
                                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    Smooth out price data to identify trends. Common periods are 50-day and 200-day MAs.
                                </p>
                            </div>
                        </div>
                        <div className={`p-4 rounded-xl flex gap-4 items-start ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <BarChart2 className="text-accent-violet flex-shrink-0" size={24} />
                            <div>
                                <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Volume</h3>
                                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    Shows how much of an asset was traded. High volume confirms price movements.
                                </p>
                            </div>
                        </div>
                        <div className={`p-4 rounded-xl flex gap-4 items-start ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <Activity className="text-accent-amber flex-shrink-0" size={24} />
                            <div>
                                <h3 className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>RSI (Relative Strength Index)</h3>
                                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                    Measures momentum. Above 70 = overbought, below 30 = oversold.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Support & Resistance
                    </h2>
                    <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <strong>Support</strong> is a price level where buying interest is strong enough to prevent further decline. <strong>Resistance</strong> is where selling pressure prevents prices from rising further.
                    </p>
                    <ul className={`space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <li>• Support levels often become resistance after being broken</li>
                        <li>• The more times a level is tested, the stronger it becomes</li>
                        <li>• Round numbers often act as psychological support/resistance</li>
                    </ul>
                </section>

                <section className={`p-4 rounded-xl border-l-4 border-success ${isDark ? 'bg-success/10' : 'bg-green-50'}`}>
                    <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <strong>Pro Tip:</strong> Technical analysis works best when combined with fundamental analysis and proper risk management. No indicator is 100% accurate.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default HowToReadCharts;
