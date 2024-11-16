import React from 'react';
import { LineChart, Wallet, TrendingUp as TrendingUpIcon } from 'lucide-react';
import { PriceCard } from './components/PriceCard';
import { Chart } from './components/Chart';
import { useMarketData } from './hooks/useMarketData';

function App() {
  const { cryptoData, isLoading, isError } = useMarketData();

  // Sample historical data (in production, this would come from an API)
  const sampleChartData = Array.from({ length: 30 }, (_, i) => ({
    time: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: 40000 + Math.random() * 10000,
  }));

  if (isError) return <div className="text-center p-8">Error loading market data</div>;
  if (isLoading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <LineChart className="h-8 w-8 text-blue-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">MarketView</h1>
            </div>
            <nav className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-gray-900 flex items-center">
                <Wallet className="h-5 w-5 mr-1" />
                Portfolio
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 flex items-center">
                <TrendingUpIcon className="h-5 w-5 mr-1" />
                Markets
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market Overview */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PriceCard
              name="Bitcoin"
              symbol="BTC"
              price={cryptoData.bitcoin.usd}
              change={cryptoData.bitcoin.usd_24h_change}
              image="https://images.unsplash.com/photo-1519162584292-56dfc9eb5db4?auto=format&fit=crop&q=80&w=100"
            />
            <PriceCard
              name="Ethereum"
              symbol="ETH"
              price={cryptoData.ethereum.usd}
              change={cryptoData.ethereum.usd_24h_change}
              image="https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=100"
            />
            <PriceCard
              name="Binance Coin"
              symbol="BNB"
              price={cryptoData.binancecoin.usd}
              change={cryptoData.binancecoin.usd_24h_change}
              image="https://images.unsplash.com/photo-1622630998477-20aa696ecb05?auto=format&fit=crop&q=80&w=100"
            />
          </div>
        </section>

        {/* Charts */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Price Charts</h2>
          <div className="space-y-6">
            <Chart data={sampleChartData} title="Bitcoin (BTC) - 30 Day Price History" />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;