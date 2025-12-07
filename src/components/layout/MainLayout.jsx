import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useTheme } from '../../context/ThemeContext';

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isDark } = useTheme();

    return (
        <div className={`flex min-h-screen font-sans selection:bg-accent-violet/30 transition-colors duration-300 ${isDark
            ? 'bg-background-primary text-slate-100'
            : 'bg-gradient-to-b from-amber-50/50 via-slate-50 to-indigo-50/50 text-slate-900'
            }`}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            <main className="flex-1 flex flex-col min-h-screen transition-all duration-300 ease-out lg:ml-64">
                <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
                <div className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 flex flex-col">
                    <div className="flex-1">
                        <Outlet />
                    </div>

                    <footer className={`mt-12 border-t pt-6 pb-2 text-xs flex flex-col sm:flex-row items-center justify-between gap-4 ${isDark ? 'border-slate-800/60 text-slate-500' : 'border-slate-200 text-slate-400'
                        }`}>
                        <p>© 2025 CryptoWise. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-accent-violet transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-accent-violet transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-accent-violet transition-colors">Contact Support</a>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
};


export default MainLayout;
