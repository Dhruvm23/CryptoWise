import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import useDebounce from '../../hooks/useDebounce';
import { useCurrency } from '../../context/CurrencyContext';
import { usePortfolio } from '../../context/PortfolioContext'; // Use if needed directly or pass prop
import { X, Search } from 'lucide-react';

const AddAssetForm = ({ onClose }) => {
    const [query, setQuery] = useState('');
    const [selectedCoin, setSelectedCoin] = useState(null);
    const [amount, setAmount] = useState('');
    const [buyPrice, setBuyPrice] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [results, setResults] = useState([]);

    const debouncedQuery = useDebounce(query, 500);
    const { addHolding } = usePortfolio();
    const { currency } = useCurrency();

    useEffect(() => {
        if (debouncedQuery.length < 2) {
            setResults([]);
            return;
        }
        const search = async () => {
            try {
                const res = await api.searchCoins(debouncedQuery);
                setResults(res.coins || []);
            } catch (err) {
                console.error(err);
            }
        };
        search();
    }, [debouncedQuery]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedCoin && amount && buyPrice) {
            addHolding({
                coinId: selectedCoin.id,
                symbol: selectedCoin.symbol,
                name: selectedCoin.name,
                large: selectedCoin.large,
                amount: parseFloat(amount),
                buyPrice: parseFloat(buyPrice),
                date,
                currency: currency.code // Save which currency bought in? Or normalize? Let's assume input is in current global currency for simplicity
            });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-2xl w-full max-w-md p-6 relative shadow-2xl">
                <button onClick={onClose} className="absolute top-4 right-4 text-secondary hover:text-primary">
                    <X size={24} />
                </button>

                <h2 className="text-xl font-bold mb-6">Add Transaction</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Coin Select */}
                    <div className="relative">
                        <label className="text-sm text-secondary mb-1 block">Select Coin</label>
                        {selectedCoin ? (
                            <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-glass-border">
                                <div className="flex items-center gap-2">
                                    <img src={selectedCoin.large} alt={selectedCoin.name} className="w-6 h-6 rounded-full" />
                                    <span>{selectedCoin.name}</span>
                                </div>
                                <button type="button" onClick={() => { setSelectedCoin(null); setQuery(''); }} className="text-xs text-accent">Change</button>
                            </div>
                        ) : (
                            <>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search e.g. Bitcoin"
                                        className="w-full p-3 pl-10 bg-white/5 border border-glass-border rounded-xl focus:border-accent outline-none"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                </div>
                                {results.length > 0 && !selectedCoin && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--bg-secondary)] border border-glass-border rounded-xl shadow-xl z-10 max-h-40 overflow-y-auto">
                                        {results.map(coin => (
                                            <div
                                                key={coin.id}
                                                onClick={() => setSelectedCoin(coin)}
                                                className="flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer"
                                            >
                                                <img src={coin.thumb} alt={coin.name} className="w-5 h-5 rounded-full" />
                                                <span className="text-sm">{coin.name}</span>
                                                <span className="text-xs text-secondary">{coin.symbol}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-secondary mb-1 block">Quantity</label>
                            <input
                                type="number"
                                step="any"
                                placeholder="0.00"
                                className="w-full p-3 bg-white/5 border border-glass-border rounded-xl focus:border-accent outline-none"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm text-secondary mb-1 block">Buy Price ({currency.symbol})</label>
                            <input
                                type="number"
                                step="any"
                                placeholder="0.00"
                                className="w-full p-3 bg-white/5 border border-glass-border rounded-xl focus:border-accent outline-none"
                                value={buyPrice}
                                onChange={(e) => setBuyPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-secondary mb-1 block">Date</label>
                        <input
                            type="date"
                            className="w-full p-3 bg-white/5 border border-glass-border rounded-xl focus:border-accent outline-none text-[var(--text-primary)]"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-bold py-3 rounded-xl transition-colors"
                        disabled={!selectedCoin || !amount || !buyPrice}
                    >
                        Add Asset
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddAssetForm;
