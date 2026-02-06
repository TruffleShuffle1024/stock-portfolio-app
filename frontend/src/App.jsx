import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, PlusCircle, Brain, DollarSign, Activity, Trash2, BarChart3 } from 'lucide-react';

// Main App Component
function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiInsight, setAiInsight] = useState('');
  const [showAddStock, setShowAddStock] = useState(false);
  const [newStock, setNewStock] = useState({ symbol: '', name: '', shares: '', purchasePrice: '' });

  // Simulated API calls (replace with actual backend later)
  useEffect(() => {
    // Load sample data
    const sampleStocks = [
      { id: 1, symbol: 'AAPL', name: 'Apple Inc.', shares: 50, purchasePrice: 150, currentPrice: 175.50, change: 2.5 },
      { id: 2, symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 25, purchasePrice: 140, currentPrice: 138.75, change: -1.2 },
      { id: 3, symbol: 'MSFT', name: 'Microsoft Corp.', shares: 40, purchasePrice: 380, currentPrice: 405.30, change: 1.8 }
    ];
    setStocks(sampleStocks);
  }, []);

  const addStock = (e) => {
    e.preventDefault();
    if (!newStock.symbol || !newStock.name || !newStock.shares || !newStock.purchasePrice) return;
    
    const stock = {
      id: Date.now(),
      symbol: newStock.symbol.toUpperCase(),
      name: newStock.name,
      shares: parseFloat(newStock.shares),
      purchasePrice: parseFloat(newStock.purchasePrice),
      currentPrice: parseFloat(newStock.purchasePrice), // In real app, fetch current price
      change: 0
    };
    
    setStocks([...stocks, stock]);
    setNewStock({ symbol: '', name: '', shares: '', purchasePrice: '' });
    setShowAddStock(false);
  };

  const deleteStock = (id) => {
    setStocks(stocks.filter(s => s.id !== id));
  };

  const getAIAnalysis = async () => {
    setLoading(true);
    // Simulate AI analysis
    setTimeout(() => {
      const totalValue = stocks.reduce((sum, s) => sum + (s.shares * s.currentPrice), 0);
      const totalGain = stocks.reduce((sum, s) => sum + (s.shares * (s.currentPrice - s.purchasePrice)), 0);
      const gainPercent = ((totalGain / (totalValue - totalGain)) * 100).toFixed(2);
      
      setAiInsight(`Portfolio Analysis: Your portfolio is currently worth $${totalValue.toLocaleString('en-US', {minimumFractionDigits: 2})} with a total gain of $${totalGain.toLocaleString('en-US', {minimumFractionDigits: 2})} (${gainPercent}%). ${gainPercent > 5 ? 'Strong performance! Consider taking some profits.' : gainPercent < -5 ? 'Portfolio is underperforming. Review holdings and consider rebalancing.' : 'Portfolio is stable. Continue monitoring.'} Diversification looks ${stocks.length >= 5 ? 'good' : 'limited - consider adding more positions'}.`);
      setLoading(false);
    }, 1500);
  };

  const totalPortfolioValue = stocks.reduce((sum, stock) => sum + (stock.shares * stock.currentPrice), 0);
  const totalGainLoss = stocks.reduce((sum, stock) => sum + (stock.shares * (stock.currentPrice - stock.purchasePrice)), 0);
  const gainLossPercent = totalPortfolioValue > 0 ? ((totalGainLoss / (totalPortfolioValue - totalGainLoss)) * 100).toFixed(2) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-amber-500/5 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent mb-2 tracking-tight">
                Curtis's Portfolio
              </h1>
              <p className="text-slate-400 text-lg font-light">Smart stock management powered by AI</p>
            </div>
            <button
              onClick={() => setShowAddStock(!showAddStock)}
              className="group relative px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-105"
            >
              <PlusCircle className="inline mr-2 w-5 h-5" />
              Add Stock
            </button>
          </div>

          {/* Portfolio Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Value</span>
                <DollarSign className="w-5 h-5 text-emerald-400" />
              </div>
              <p className="text-3xl font-bold text-white mb-1">
                ${totalPortfolioValue.toLocaleString('en-US', {minimumFractionDigits: 2})}
              </p>
              <p className="text-slate-500 text-sm">{stocks.length} positions</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Gain/Loss</span>
                {totalGainLoss >= 0 ? <TrendingUp className="w-5 h-5 text-emerald-400" /> : <TrendingDown className="w-5 h-5 text-red-400" />}
              </div>
              <p className={`text-3xl font-bold mb-1 ${totalGainLoss >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                ${totalGainLoss >= 0 ? '+' : ''}{totalGainLoss.toLocaleString('en-US', {minimumFractionDigits: 2})}
              </p>
              <p className={`text-sm font-medium ${totalGainLoss >= 0 ? 'text-emerald-500/80' : 'text-red-500/80'}`}>
                {totalGainLoss >= 0 ? '+' : ''}{gainLossPercent}%
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">AI Insights</span>
                <Activity className="w-5 h-5 text-cyan-400" />
              </div>
              <button
                onClick={getAIAnalysis}
                disabled={loading || stocks.length === 0}
                className="w-full mt-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg text-cyan-300 font-medium transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Get Analysis
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* AI Insight Box */}
        {aiInsight && (
          <div className="mb-8 p-6 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl backdrop-blur-sm animate-fadeIn">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl">
                <Brain className="w-6 h-6 text-cyan-300" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">AI Portfolio Analysis</h3>
                <p className="text-slate-300 leading-relaxed">{aiInsight}</p>
              </div>
            </div>
          </div>
        )}

        {/* Add Stock Form */}
        {showAddStock && (
          <div className="mb-8 p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl animate-slideDown">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-emerald-400" />
              Add New Stock
            </h3>
            <form onSubmit={addStock} className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Symbol (e.g., AAPL)"
                value={newStock.symbol}
                onChange={(e) => setNewStock({...newStock, symbol: e.target.value.toUpperCase()})}
                className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                required
              />
              <input
                type="text"
                placeholder="Company Name"
                value={newStock.name}
                onChange={(e) => setNewStock({...newStock, name: e.target.value})}
                className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Shares"
                value={newStock.shares}
                onChange={(e) => setNewStock({...newStock, shares: e.target.value})}
                className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder="Purchase Price"
                value={newStock.purchasePrice}
                onChange={(e) => setNewStock({...newStock, purchasePrice: e.target.value})}
                className="px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                required
              />
              <button
                type="submit"
                className="md:col-span-4 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-[1.02]"
              >
                Add to Portfolio
              </button>
            </form>
          </div>
        )}

        {/* Stock List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-emerald-400" />
              Your Holdings
            </h2>
          </div>

          {stocks.length === 0 ? (
            <div className="text-center py-16 px-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/30 rounded-2xl">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full flex items-center justify-center">
                <BarChart3 className="w-10 h-10 text-slate-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No stocks yet</h3>
              <p className="text-slate-500 mb-6">Add your first stock to start tracking your portfolio</p>
              <button
                onClick={() => setShowAddStock(true)}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg font-semibold text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
              >
                <PlusCircle className="inline mr-2 w-5 h-5" />
                Add Your First Stock
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {stocks.map((stock, index) => (
                <div
                  key={stock.id}
                  className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:border-slate-600/50 transition-all duration-300 animate-slideUp"
                  style={{animationDelay: `${index * 50}ms`}}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                          <span className="text-emerald-300 font-bold text-sm">{stock.symbol}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{stock.symbol}</h3>
                          <p className="text-slate-400 text-sm">{stock.name}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div>
                          <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Shares</p>
                          <p className="text-white font-semibold">{stock.shares}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Purchase Price</p>
                          <p className="text-white font-semibold">${stock.purchasePrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Current Price</p>
                          <p className="text-white font-semibold">${stock.currentPrice.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Total Value</p>
                          <p className="text-white font-semibold">${(stock.shares * stock.currentPrice).toLocaleString('en-US', {minimumFractionDigits: 2})}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Gain/Loss</p>
                          <p className={`font-semibold ${(stock.currentPrice - stock.purchasePrice) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {(stock.currentPrice - stock.purchasePrice) >= 0 ? '+' : ''}$
                            {(stock.shares * (stock.currentPrice - stock.purchasePrice)).toFixed(2)}
                            <span className="text-xs ml-1">
                              ({(((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) * 100).toFixed(2)}%)
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteStock(stock.id)}
                      className="ml-4 p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-lg text-red-400 transition-all duration-300 hover:scale-110"
                      title="Delete stock"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-slate-500 text-sm">
          <p>Built by Curtis Fawcett • Powered by AI</p>
        </footer>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}

export default App;
