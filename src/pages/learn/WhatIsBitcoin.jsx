import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bitcoin, Shield, Globe, Zap } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const WhatIsBitcoin = () => {
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
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                        <Bitcoin size={32} className="text-white" />
                    </div>
                    <div>
                        <h1 className={`text-3xl md:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            What is Bitcoin?
                        </h1>
                        <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            Understanding the first and largest cryptocurrency
                        </p>
                    </div>
                </div>
            </div>

            <div className={`rounded-2xl p-6 md:p-8 space-y-8 ${isDark ? 'bg-background-secondary border border-slate-800/60' : 'bg-white border border-slate-200 shadow-sm'
                }`}>
                <section className="space-y-4">
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Introduction
                    </h2>
                    <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Bitcoin (BTC) is a decentralized digital currency created in 2009 by an anonymous person or group using the pseudonym Satoshi Nakamoto. It was the first cryptocurrency and remains the largest by market capitalization.
                    </p>
                    <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Unlike traditional currencies issued by governments (fiat money), Bitcoin operates on a peer-to-peer network without the need for intermediaries like banks or payment processors.
                    </p>
                </section>

                <section className="space-y-4">
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        How Does Bitcoin Work?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <Shield className="text-accent-teal mb-3" size={24} />
                            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Blockchain Technology</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                All transactions are recorded on a public ledger called the blockchain, which is maintained by thousands of computers worldwide.
                            </p>
                        </div>
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <Globe className="text-accent-violet mb-3" size={24} />
                            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Decentralization</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                No single entity controls Bitcoin. It's governed by consensus among network participants.
                            </p>
                        </div>
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <Zap className="text-accent-amber mb-3" size={24} />
                            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Mining</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                New bitcoins are created through mining, where powerful computers solve complex mathematical problems.
                            </p>
                        </div>
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <Bitcoin className="text-orange-500 mb-3" size={24} />
                            <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Limited Supply</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                                Only 21 million bitcoins will ever exist, making it a deflationary asset unlike fiat currencies.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-4">
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Key Features
                    </h2>
                    <ul className={`space-y-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <li className="flex gap-3">
                            <span className="text-accent-teal">•</span>
                            <span><strong>Pseudonymous:</strong> Transactions are linked to addresses, not personal identities.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-accent-violet">•</span>
                            <span><strong>Borderless:</strong> Send or receive Bitcoin anywhere in the world, 24/7.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-accent-amber">•</span>
                            <span><strong>Irreversible:</strong> Once confirmed, transactions cannot be reversed.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="text-success">•</span>
                            <span><strong>Transparent:</strong> All transactions are publicly visible on the blockchain.</span>
                        </li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        Why is Bitcoin Valuable?
                    </h2>
                    <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Bitcoin derives its value from several factors: scarcity (limited supply), utility (can be used for payments and store of value), network effects (growing adoption), and security (robust cryptographic protection).
                    </p>
                    <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Many consider Bitcoin "digital gold" because it shares properties with gold—it's scarce, durable, portable, divisible, and fungible—while being easier to transfer and verify.
                    </p>
                </section>

                <section className={`p-4 rounded-xl border-l-4 border-accent-violet ${isDark ? 'bg-accent-violet/10' : 'bg-violet-50'}`}>
                    <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <strong>Remember:</strong> Cryptocurrency investments carry risk. Always do your own research and never invest more than you can afford to lose.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default WhatIsBitcoin;
