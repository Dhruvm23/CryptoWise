import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
    LayoutDashboard,
    TrendingUp,
    PieChart,
    Star,
    Newspaper,
    GraduationCap,
    X
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = ({ isOpen, onClose }) => {
    const { isDark } = useTheme();

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
        { icon: <TrendingUp size={20} />, label: 'Markets', path: '/markets' },
        { icon: <PieChart size={20} />, label: 'Portfolio', path: '/portfolio' },
        { icon: <Star size={20} />, label: 'Watchlist', path: '/watchlist' },
        { icon: <Newspaper size={20} />, label: 'News', path: '/news' },
        { icon: <GraduationCap size={20} />, label: 'Learn', path: '/learn' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            <aside className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-out lg:translate-x-0 shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isDark
                ? 'bg-background-secondary border-r border-slate-800/60'
                : 'bg-white border-r border-slate-200'
                }`}>
                <div className={`h-16 flex items-center px-6 border-b ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-teal via-accent-violet to-accent-amber flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-accent-violet/20 group-hover:scale-105 transition-transform">
                            CW
                        </div>
                        <span className={`text-xl tracking-tight transition-colors ${isDark ? 'text-slate-100 group-hover:text-white' : 'text-slate-900 group-hover:text-accent-violet'}`}>
                            <span className="font-black italic bg-gradient-to-r from-accent-teal via-accent-violet to-accent-amber bg-clip-text text-transparent">Crypto</span>
                            <span className="font-extrabold italic text-accent-amber">Wise</span>
                        </span>
                    </Link>
                    <button onClick={onClose} className={`ml-auto lg:hidden ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
                        <X size={20} />
                    </button>
                </div>

                <nav className="p-4 space-y-2 mt-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm
                                ${isActive
                                    ? `bg-gradient-to-r from-accent-teal/10 via-accent-violet/10 to-accent-amber/10 text-accent-violet border-l-4 border-accent-violet shadow-lg ${isDark ? 'shadow-black/20' : 'shadow-accent-violet/10'}`
                                    : `${isDark ? 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'} border-l-4 border-transparent hover:-translate-y-0.5`
                                }
                            `}
                            onClick={() => {
                                if (window.innerWidth < 1024) onClose();
                            }}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
