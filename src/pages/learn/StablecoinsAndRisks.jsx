import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, Shield, AlertTriangle, Scale } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const StablecoinsAndRisks = () => {
    const { isDark } = useTheme();

    return (
        <div className="container min-h-screen pb-20 pt-6 fade-in space-y-8 max-w-4xl mx-auto">
            <Link to="/learn" className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                <ArrowLeft size={16} /> Back to Learn
            </Link>

            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                    <Shield size={32} className="text-white" />
                </div>
                <div>
                    <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Stablecoins & Risks</h1>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Understanding crypto's price-stable assets</p>
                </div>
            </div>

            <div className={`rounded-2xl p-6 space-y-6 ${isDark ? 'bg-background-secondary border border-slate-800/60' : 'bg-white border border-slate-200'}`}>
                <section>
                    <h2 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>What are Stablecoins?</h2>
                    <p className={isDark ? 'text-slate-300' : 'text-slate-700'}>Stablecoins maintain a stable value relative to a reference asset like USD. They combine crypto benefits with price stability.</p>
                </section>

                <section>
                    <h2 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Types</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <DollarSign className="text-success mb-2" size={24} />
                            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Fiat-Backed</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>USDT, USDC - backed 1:1 by fiat</p>
                        </div>
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <Scale className="text-accent-violet mb-2" size={24} />
                            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Crypto-Backed</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>DAI - over-collateralized by crypto</p>
                        </div>
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <AlertTriangle className="text-accent-amber mb-2" size={24} />
                            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Algorithmic</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>High-risk, use algorithms for peg</p>
                        </div>
                    </div>
                </section>

                <section className={`p-4 rounded-xl border-l-4 border-danger ${isDark ? 'bg-danger/10' : 'bg-red-50'}`}>
                    <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}><strong>Key Risks:</strong> De-pegging, counterparty risk, regulatory uncertainty, smart contract bugs.</p>
                </section>
            </div>
        </div>
    );
};

export default StablecoinsAndRisks;
