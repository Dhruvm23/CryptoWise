import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, HelpCircle, TrendingUp, Shield, Layers, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Learn = () => {
    const { isDark } = useTheme();

    const topics = [
        {
            title: "What is Bitcoin?",
            desc: "Understand the fundamentals of the first cryptocurrency and blockchain technology.",
            icon: <BookOpen className="text-orange-500" size={32} />,
            path: "/learn/what-is-bitcoin"
        },
        {
            title: "Altcoins & Tokens",
            desc: "Learn the difference between coins and tokens, and explore the vast ecosystem beyond Bitcoin.",
            icon: <Layers className="text-blue-500" size={32} />,
            path: "/learn/altcoins-and-tokens"
        },
        {
            title: "How to Read Charts",
            desc: "Master technical analysis basics. Candlesticks, trends, moving averages, and volume.",
            icon: <TrendingUp className="text-green-500" size={32} />,
            path: "/learn/how-to-read-charts"
        },
        {
            title: "DeFi Explained",
            desc: "Decentralized Finance allows you to lend, borrow, and trade without intermediaries.",
            icon: <HelpCircle className="text-purple-500" size={32} />,
            path: "/learn/defi-explained"
        },
        {
            title: "Stablecoins & Risks",
            desc: "What are stablecoins? How do they keep their peg? What are the risks involved?",
            icon: <Shield className="text-red-500" size={32} />,
            path: "/learn/stablecoins-and-risks"
        },
        {
            title: "Wallets & Security",
            desc: "How to store your crypto safely. Hot wallets vs. Cold wallets and avoiding scams.",
            icon: <Shield className="text-yellow-500" size={32} />,
            path: "/learn/wallets-and-security"
        }
    ];

    return (
        <div className="container min-h-screen pb-20 pt-6 fade-in space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
                <h1 className={`text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Crypto Education</h1>
                <p className={isDark ? 'text-slate-400 text-lg' : 'text-slate-600 text-lg'}>
                    New to crypto? Start here. We've curated simple guides to help you understand the basics of blockchain and cryptocurrency markets.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topics.map((topic, i) => (
                    <Link
                        key={i}
                        to={topic.path}
                        className={`p-6 rounded-2xl group cursor-pointer transition-all duration-300 hover:-translate-y-1 ${isDark
                                ? 'bg-background-secondary border border-slate-800/60 hover:shadow-glow hover:border-accent-violet/30'
                                : 'bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-accent-violet/30'
                            }`}
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${isDark ? 'bg-background-tertiary' : 'bg-slate-100'
                            }`}>
                            {topic.icon}
                        </div>
                        <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{topic.title}</h3>
                        <p className={`mb-6 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {topic.desc}
                        </p>
                        <div className="flex items-center gap-2 text-accent-violet font-bold text-sm group-hover:gap-3 transition-all">
                            Start Learning <ArrowRight size={16} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Learn;

