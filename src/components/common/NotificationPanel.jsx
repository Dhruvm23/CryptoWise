import React, { useState } from 'react';
import { X, Bell, CheckCheck, TrendingUp, AlertTriangle, Info } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const NotificationPanel = ({ isOpen, onClose }) => {
    const { isDark } = useTheme();
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'price',
            title: 'Bitcoin hits $100K',
            message: 'BTC has reached a new all-time high of $100,000',
            time: '2 min ago',
            read: false
        },
        {
            id: 2,
            type: 'alert',
            title: 'High Volatility Alert',
            message: 'ETH has moved 8% in the last hour',
            time: '15 min ago',
            read: false
        },
        {
            id: 3,
            type: 'info',
            title: 'Portfolio Update',
            message: 'Your portfolio is up 5.2% today',
            time: '1 hour ago',
            read: true
        },
        {
            id: 4,
            type: 'info',
            title: 'New Feature Available',
            message: 'Try our new price alerts feature',
            time: '3 hours ago',
            read: true
        }
    ]);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const getIcon = (type) => {
        switch (type) {
            case 'price': return <TrendingUp size={16} className="text-success" />;
            case 'alert': return <AlertTriangle size={16} className="text-accent-amber" />;
            default: return <Info size={16} className="text-accent-violet" />;
        }
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
            />

            {/* Panel */}
            <div className={`absolute top-full right-0 mt-2 w-80 md:w-96 rounded-xl shadow-xl border z-50 overflow-hidden ${isDark
                    ? 'bg-background-secondary border-slate-800'
                    : 'bg-white border-slate-200 shadow-lg'
                }`}>
                {/* Header */}
                <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-100'
                    }`}>
                    <div className="flex items-center gap-2">
                        <Bell size={18} className={isDark ? 'text-white' : 'text-slate-900'} />
                        <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            Notifications
                        </h3>
                        {unreadCount > 0 && (
                            <span className="bg-accent-violet text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {unreadCount}
                            </span>
                        )}
                    </div>
                    <button
                        onClick={markAllAsRead}
                        className={`text-xs font-medium transition-colors ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        <CheckCheck size={16} />
                    </button>
                </div>

                {/* Notifications List */}
                <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length === 0 ? (
                        <div className={`p-8 text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            <Bell size={32} className="mx-auto mb-2 opacity-30" />
                            <p className="text-sm">No notifications</p>
                        </div>
                    ) : (
                        notifications.map(notification => (
                            <div
                                key={notification.id}
                                className={`p-4 border-b transition-colors cursor-pointer group ${notification.read
                                        ? isDark ? 'border-slate-800/50' : 'border-slate-50'
                                        : isDark ? 'bg-accent-violet/5 border-slate-800' : 'bg-violet-50/50 border-slate-100'
                                    } ${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'}`}
                                onClick={() => markAsRead(notification.id)}
                            >
                                <div className="flex gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${isDark ? 'bg-background-tertiary' : 'bg-slate-100'
                                        }`}>
                                        {getIcon(notification.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <h4 className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-slate-900'
                                                }`}>
                                                {notification.title}
                                            </h4>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); deleteNotification(notification.id); }}
                                                className={`opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-600'
                                                    }`}
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                        <p className={`text-xs mt-1 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'
                                            }`}>
                                            {notification.message}
                                        </p>
                                        <span className={`text-xs mt-2 block ${isDark ? 'text-slate-500' : 'text-slate-400'
                                            }`}>
                                            {notification.time}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                    <div className={`p-3 text-center border-t ${isDark ? 'border-slate-800' : 'border-slate-100'
                        }`}>
                        <button className="text-sm font-medium text-accent-violet hover:text-accent-teal transition-colors">
                            View All Notifications
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default NotificationPanel;
