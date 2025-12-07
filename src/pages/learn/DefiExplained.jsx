import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Landmark, Repeat, PiggyBank, Vote } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const DefiExplained = () => {
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
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                        <Landmark size={32} className="text-white" />
                    </div>
                    <div>
                        <h1 className={`text-3xl md:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            DeFi Explained
                        </h1>
                        <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Decentralized Finance without intermediaries
                        </p>
                    </div>
                </div>
            </div>

            <div className={`rounded-2xl p-6 md:p-8 space-y-8 ${isDark ? 'bg-background-secondary border border-slate-800/60' : 'bg-white border border-slate-200 shadow-sm'
                }`}>
                <section className="space-y-4">
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        What is DeFi?
                    </h2>
                    <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        DeFi (Decentralized Finance) refers to financial services built on blockchain technology that operate without traditional intermediaries like banks, brokers, or exchanges.
                    </p>
                    <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Instead, smart contracts automatically execute financial transactions based on predetermined rules, making finance more accessible, transparent, and efficient.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Key DeFi Services
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <Repeat className="text-accent-teal mb-3" size={24} />
                            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Decentralized Exchanges (DEX)</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Trade crypto directly from your wallet without intermediaries. Examples: Uniswap, SushiSwap.
                            </p>
                        </div>
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <PiggyBank className="text-accent-violet mb-3" size={24} />
                            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Lending & Borrowing</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Earn interest by lending crypto or borrow against your holdings. Examples: Aave, Compound.
                            </p>
                        </div>
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <Landmark className="text-accent-amber mb-3" size={24} />
                            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Yield Farming</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Provide liquidity to protocols and earn rewards in the form of additional tokens.
                            </p>
                        </div>
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <Vote className="text-purple-500 mb-3" size={24} />
                            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>DAOs</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Decentralized Autonomous Organizations let token holders vote on protocol changes.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Benefits & Risks
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h3 className={`font-semibold mb-3 text-success`}>Benefits</h3>
                            <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                <li>• Accessible to anyone with internet</li>
                                <li>• No credit checks or KYC required</li>
                                <li>• 24/7 availability</li>
                                <li>• Higher yields than traditional banking</li>
                                <li>• Full control over your assets</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className={`font-semibold mb-3 text-danger`}>Risks</h3>
                            <ul className={`space-y-2 text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                                <li>• Smart contract bugs/exploits</li>
                                <li>• Impermanent loss in liquidity pools</li>
                                <li>• High volatility</li>
                                <li>• Regulatory uncertainty</li>
                                <li>• No customer support or refunds</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className={`p-4 rounded-xl border-l-4 border-accent-amber ${isDark ? 'bg-accent-amber/10' : 'bg-amber-50'}`}>
                    <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <strong>Caution:</strong> DeFi is experimental and high-risk. Only use funds you can afford to lose, and always verify smart contract addresses before interacting with them.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default DefiExplained;
