import React, { useEffect, useState } from 'react';

const OrderBook = ({ symbol }) => {
    const [bids, setBids] = useState([]);
    const [asks, setAsks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderBook = async () => {
            if (!symbol) return;
            // Map common symbols to USDT pair (Basic mapping)
            const pair = `${symbol.toUpperCase()}USDT`;

            try {
                // Dynamic import to avoid circular dependency issues if any
                const { api } = await import('../../services/api');
                const data = await api.getBinanceOrderBook(pair);

                if (data && data.bids && data.asks) {
                    setBids(data.bids);
                    setAsks(data.asks.reverse());
                    setLoading(false);
                    setError(null);
                } else {
                    throw new Error("No data");
                }
            } catch (err) {
                setLoading(false);
                setError("Order book unavailable for this pair (Binance)");
            }
        };

        fetchOrderBook();
        const interval = setInterval(fetchOrderBook, 3000);
        return () => clearInterval(interval);
    }, [symbol]);

    if (loading) return <div className="h-40 animate-pulse bg-white/5 rounded-xl"></div>;
    if (error) return null; // Hide if error (likely not on Binance or CORS issue)

    const maxTotal = Math.max(
        ...bids.map(b => parseFloat(b[1])),
        ...asks.map(a => parseFloat(a[1]))
    );

    return (
        <div className="glass-panel p-6">
            <h3 className="text-xl font-bold mb-4">Order Book (Binance)</h3>
            <div className="flex gap-4 text-xs font-mono">
                <div className="flex-1">
                    <div className="flex justify-between text-secondary mb-2">
                        <span>Price (USDT)</span>
                        <span>Qty</span>
                    </div>
                    <div className="flex flex-col-reverse gap-1 mb-2">
                        {/* Asks (Sells) - Red */}
                        {asks.map((ask, i) => (
                            <div key={i} className="flex justify-between relative relative-bar">
                                <span className="text-danger z-10">{parseFloat(ask[0]).toFixed(2)}</span>
                                <span className="text-secondary z-10">{parseFloat(ask[1]).toFixed(4)}</span>
                                <div
                                    className="absolute right-0 top-0 bottom-0 bg-danger/10"
                                    style={{ width: `${(parseFloat(ask[1]) / maxTotal) * 100}%` }}
                                ></div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-glass-border my-2"></div>

                    <div className="flex flex-col gap-1">
                        {/* Bids (Buys) - Green */}
                        {bids.map((bid, i) => (
                            <div key={i} className="flex justify-between relative relative-bar">
                                <span className="text-success z-10">{parseFloat(bid[0]).toFixed(2)}</span>
                                <span className="text-secondary z-10">{parseFloat(bid[1]).toFixed(4)}</span>
                                <div
                                    className="absolute right-0 top-0 bottom-0 bg-success/10"
                                    style={{ width: `${(parseFloat(bid[1]) / maxTotal) * 100}%` }}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderBook;
