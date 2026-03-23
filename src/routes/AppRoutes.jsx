import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import CoinDetails from '../pages/CoinDetails';
import CompareCoins from '../pages/CompareCoins';
import AIInsights from '../pages/AIInsights';
import NotFound from '../pages/NotFound';
import DashboardLayout from '../components/layout/DashboardLayout';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="coin-details/:coinId" element={<CoinDetails />} />
          <Route path="coin-details" element={<CoinDetails />} />
          <Route path="compare-coins" element={<CompareCoins />} />
          <Route path="ai-insights" element={<AIInsights />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;