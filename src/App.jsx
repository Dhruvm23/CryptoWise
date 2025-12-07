import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';

import Dashboard from './pages/Dashboard';
import Markets from './pages/Markets';
import CoinDetail from './pages/CoinDetail';
import Portfolio from './pages/Portfolio';
import Watchlist from './pages/Watchlist';
import News from './pages/News';
import Learn from './pages/Learn';

// Learn Detail Pages
import WhatIsBitcoin from './pages/learn/WhatIsBitcoin';
import AltcoinsAndTokens from './pages/learn/AltcoinsAndTokens';
import HowToReadCharts from './pages/learn/HowToReadCharts';
import DefiExplained from './pages/learn/DefiExplained';
import StablecoinsAndRisks from './pages/learn/StablecoinsAndRisks';
import WalletsAndSecurity from './pages/learn/WalletsAndSecurity';

import { ThemeProvider } from './context/ThemeContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { AlertsProvider } from './context/AlertsContext';

function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <WatchlistProvider>
          <PortfolioProvider>
            <AlertsProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<MainLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="markets" element={<Markets />} />
                    <Route path="coin/:id" element={<CoinDetail />} />
                    <Route path="portfolio" element={<Portfolio />} />
                    <Route path="watchlist" element={<Watchlist />} />
                    <Route path="news" element={<News />} />
                    <Route path="learn" element={<Learn />} />
                    <Route path="learn/what-is-bitcoin" element={<WhatIsBitcoin />} />
                    <Route path="learn/altcoins-and-tokens" element={<AltcoinsAndTokens />} />
                    <Route path="learn/how-to-read-charts" element={<HowToReadCharts />} />
                    <Route path="learn/defi-explained" element={<DefiExplained />} />
                    <Route path="learn/stablecoins-and-risks" element={<StablecoinsAndRisks />} />
                    <Route path="learn/wallets-and-security" element={<WalletsAndSecurity />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Route>
                </Routes>
              </Router>
            </AlertsProvider>
          </PortfolioProvider>
        </WatchlistProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;

