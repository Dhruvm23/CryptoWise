import React, { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

export const PortfolioProvider = ({ children }) => {
    const [holdings, setHoldings] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem('cryptowise_portfolio');
        if (saved) {
            setHoldings(JSON.parse(saved));
        }
    }, []);

    const saveHoldings = (newHoldings) => {
        setHoldings(newHoldings);
        localStorage.setItem('cryptowise_portfolio', JSON.stringify(newHoldings));
    };

    const addHolding = (asset) => {
        // asset: { id, coinId, symbol, amount, buyPrice, date }
        saveHoldings([...holdings, { ...asset, id: Date.now().toString() }]);
    };

    const removeHolding = (id) => {
        saveHoldings(holdings.filter(h => h.id !== id));
    };

    return (
        <PortfolioContext.Provider value={{ holdings, addHolding, removeHolding }}>
            {children}
        </PortfolioContext.Provider>
    );
};
