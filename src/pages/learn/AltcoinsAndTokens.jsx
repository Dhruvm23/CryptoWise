import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Layers, Coins, Code, Gem } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AltcoinsAndTokens = () => {
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
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                        <Layers size={32} className="text-white" />
                    </div>
                    <div>
                        <h1 className={`text-3xl md:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Altcoins & Tokens
                        </h1>
                        <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Exploring the vast crypto ecosystem beyond Bitcoin
                        </p>
                    </div>
                </div>
            </div>

            <div className={`rounded-2xl p-6 md:p-8 space-y-8 ${isDark ? 'bg-background-secondary border border-slate-800/60' : 'bg-white border border-slate-200 shadow-sm'
                }`}>
                <section className="space-y-4">
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        What are Altcoins?
                    </h2>
                    <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        "Altcoin" is short for "alternative coin" and refers to any cryptocurrency other than Bitcoin. There are thousands of altcoins, each with different purposes, technologies, and use cases.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Types of Altcoins
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <Coins className="text-accent-teal mb-3" size={24} />
                            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Payment Coins</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Designed for transactions (e.g., Litecoin, Bitcoin Cash). Often faster or cheaper than Bitcoin.
                            </p>
                        </div>
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <Code className="text-accent-violet mb-3" size={24} />
                            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Platform Coins</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Power smart contract platforms (e.g., Ethereum, Solana, Cardano). Enable building apps on blockchain.
                            </p>
                        </div>
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <Gem className="text-accent-amber mb-3" size={24} />
                            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Utility Tokens</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Provide access to specific services or products within a blockchain ecosystem.
                            </p>
                        </div>
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <Layers className="text-blue-500 mb-3" size={24} />
                            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Governance Tokens</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Give holders voting rights on protocol decisions (e.g., UNI, AAVE).
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Coins vs Tokens
                    </h2>
                    <div className={`overflow-x-auto rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                        <table className="w-full text-sm">
                            <thead>
                                <tr className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                                    <th className="text-left p-4 font-semibold">Coins</th>
                                    <th className="text-left p-4 font-semibold">Tokens</th>
                                </tr>
                            </thead>
                            <tbody className={isDark ? 'text-slate-300' : 'text-slate-700'}>
                                <tr className={`border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                                    <td className="p-4">Have their own blockchain</td>
                                    <td className="p-4">Built on existing blockchains</td>
                                </tr>
                                <tr className={`border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                                    <td className="p-4">Examples: BTC, ETH, SOL</td>
                                    <td className="p-4">Examples: USDT, LINK, SHIB</td>
                                </tr>
                                <tr className={`border-t ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                                    <td className="p-4">Used for payments, gas fees</td>
                                    <td className="p-4">Represent assets, access, or utility</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className={`p-4 rounded-xl border-l-4 border-accent-teal ${isDark ? 'bg-accent-teal/10' : 'bg-teal-50'}`}>
                    <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <strong>Tip:</strong> Before investing in any altcoin, research its team, technology, use case, and tokenomics. Many projects fail or turn out to be scams.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AltcoinsAndTokens;
