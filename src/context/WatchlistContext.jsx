import React, { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('cryptowise_watchlist');
        if (saved) {
            setWatchlist(JSON.parse(saved));
        }
    }, []);

    const saveWatchlist = (list) => {
        setWatchlist(list);
        localStorage.setItem('cryptowise_watchlist', JSON.stringify(list));
    };

    const addToWatchlist = (coinId) => {
        if (!watchlist.includes(coinId)) {
            saveWatchlist([...watchlist, coinId]);
        }
    };

    const removeFromWatchlist = (coinId) => {
        saveWatchlist(watchlist.filter(id => id !== coinId));
    };

    const toggleWatchlist = (coinId) => {
        if (watchlist.includes(coinId)) {
            removeFromWatchlist(coinId);
        } else {
            addToWatchlist(coinId);
        }
    };

    const isInWatchlist = (coinId) => watchlist.includes(coinId);

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, toggleWatchlist, isInWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};
