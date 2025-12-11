/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                // Dark mode backgrounds
                background: {
                    primary: '#050312',   // Deep purple-black
                    secondary: '#0f0d1a', // Card Background
                    tertiary: '#1a1625',  // Hover states
                },
                // New accent colors (teal-violet-amber)
                primary: {
                    DEFAULT: '#14b8a6', // Teal
                    hover: '#0d9488',
                },
                accent: {
                    teal: '#14b8a6',
                    violet: '#6366f1',
                    amber: '#f59e0b',
                    DEFAULT: '#6366f1',
                },
                success: '#22c55e',
                danger: '#f97373',
                text: {
                    primary: '#eaecef',
                    secondary: '#9ca3af',
                    tertiary: '#6b7280',
                    muted: '#4b5563',
                },
                glass: {
                    border: 'rgba(255, 255, 255, 0.08)',
                    bg: 'rgba(255, 255, 255, 0.03)',
                },
                // Light mode colors
                light: {
                    bg: '#f8fafc',
                    surface: '#ffffff',
                    border: '#e2e8f0',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(99, 102, 241, 0.15)',
                'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'glow': '0 0 20px rgba(99, 102, 241, 0.4)',
                'glow-teal': '0 0 20px rgba(20, 184, 166, 0.4)',
                'glow-amber': '0 0 20px rgba(245, 158, 11, 0.4)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'slide-in-left': 'slideInLeft 0.3s ease-out forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
                slideInRight: {
                    '0%': { transform: 'translateX(100%)' },
                    '100%': { transform: 'translateX(0)' },
                },
            },
            screens: {
                'xs': '375px',
            },
            backgroundImage: {
                'gradient-accent': 'linear-gradient(135deg, #14b8a6 0%, #6366f1 50%, #f59e0b 100%)',
            },
        },
    },
    plugins: [],
}
