import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
];

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState(currencies[0]); // Default USD

    useEffect(() => {
        const savedCurrencyCode = localStorage.getItem('cryptowise_currency');
        if (savedCurrencyCode) {
            const savedCurrency = currencies.find(c => c.code === savedCurrencyCode);
            if (savedCurrency) setCurrency(savedCurrency);
        }
    }, []);

    const setCurrencyAndSave = (currencyCode) => {
        const newCurrency = currencies.find(c => c.code === currencyCode);
        if (newCurrency) {
            setCurrency(newCurrency);
            localStorage.setItem('cryptowise_currency', currencyCode);
        }
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency: setCurrencyAndSave, currencies }}>
            {children}
        </CurrencyContext.Provider>
    );
};
