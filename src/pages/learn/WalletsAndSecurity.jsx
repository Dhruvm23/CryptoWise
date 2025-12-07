import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Wallet, Lock, Key, AlertTriangle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const WalletsAndSecurity = () => {
    const { isDark } = useTheme();

    return (
        <div className="container min-h-screen pb-20 pt-6 fade-in space-y-8 max-w-4xl mx-auto">
            <Link to="/learn" className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                <ArrowLeft size={16} /> Back to Learn
            </Link>

            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                    <Lock size={32} className="text-white" />
                </div>
                <div>
                    <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Wallets & Security</h1>
                    <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>How to store your crypto safely</p>
                </div>
            </div>

            <div className={`rounded-2xl p-6 space-y-6 ${isDark ? 'bg-background-secondary border border-slate-800/60' : 'bg-white border border-slate-200'}`}>
                <section>
                    <h2 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Types of Wallets</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <Wallet className="text-accent-teal mb-2" size={24} />
                            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Hot Wallets</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Connected to internet. Mobile apps, browser extensions. Convenient but less secure.</p>
                        </div>
                        <div className={`p-4 rounded-xl ${isDark ? 'bg-background-tertiary' : 'bg-slate-50'}`}>
                            <Lock className="text-accent-violet mb-2" size={24} />
                            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Cold Wallets</h3>
                            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Offline storage. Hardware wallets like Ledger, Trezor. Most secure for long-term.</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>Security Best Practices</h2>
                    <ul className={`space-y-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <li className="flex gap-2"><Key className="text-accent-amber flex-shrink-0" size={18} /> Never share your seed phrase with anyone</li>
                        <li className="flex gap-2"><Key className="text-accent-amber flex-shrink-0" size={18} /> Use hardware wallets for large amounts</li>
                        <li className="flex gap-2"><Key className="text-accent-amber flex-shrink-0" size={18} /> Enable 2FA on exchange accounts</li>
                        <li className="flex gap-2"><Key className="text-accent-amber flex-shrink-0" size={18} /> Verify URLs and avoid phishing sites</li>
                    </ul>
                </section>

                <section className={`p-4 rounded-xl border-l-4 border-accent-amber ${isDark ? 'bg-accent-amber/10' : 'bg-amber-50'}`}>
                    <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-700'}`}><strong>Remember:</strong> "Not your keys, not your crypto." Always keep backup of your seed phrase in a secure offline location.</p>
                </section>
            </div>
        </div>
    );
};

export default WalletsAndSecurity;
