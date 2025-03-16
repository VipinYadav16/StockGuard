
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, ArrowUpDown, TrendingUp, TrendingDown, 
  BarChart2, ChevronDown, ChevronRight, Clock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StockChart from '@/components/dashboard/StockChart';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MarketData = [
  { 
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 178.72,
    change: 2.34,
    changePercent: 1.32,
    volume: '23.4M',
    marketCap: '2.8T',
    trend: 'up',
  },
  { 
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: 337.50,
    change: 5.23,
    changePercent: 1.57,
    volume: '18.7M',
    marketCap: '2.5T',
    trend: 'up',
  },
  { 
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 134.67,
    change: -1.28,
    changePercent: -0.94,
    volume: '12.5M',
    marketCap: '1.7T',
    trend: 'down',
  },
  { 
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 165.27,
    change: 3.42,
    changePercent: 2.11,
    volume: '21.2M',
    marketCap: '1.7T',
    trend: 'up',
  },
  { 
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    price: 230.45,
    change: -8.72,
    changePercent: -3.65,
    volume: '32.8M',
    marketCap: '735B',
    trend: 'down',
  },
  { 
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 342.32,
    change: 4.56,
    changePercent: 1.35,
    volume: '15.3M',
    marketCap: '877B',
    trend: 'up',
  },
  { 
    symbol: 'NFLX',
    name: 'Netflix Inc.',
    price: 554.12,
    change: -2.34,
    changePercent: -0.42,
    volume: '4.2M',
    marketCap: '245B',
    trend: 'down',
  },
  { 
    symbol: 'NVDA',
    name: 'NVIDIA Corp.',
    price: 435.10,
    change: 12.48,
    changePercent: 2.95,
    volume: '28.5M',
    marketCap: '1.07T',
    trend: 'up',
  }
];

const LiveMarket = () => {
  const { user } = useAuth();
  const [selectedStock, setSelectedStock] = useState(MarketData[0].symbol);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredStocks = MarketData.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedStockData = MarketData.find(stock => stock.symbol === selectedStock);

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Live Market</h2>
            <p className="text-muted-foreground">Real-time market data and analysis</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2 bg-white/5">
              <Clock className="h-4 w-4" />
              <span>Market Hours</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            
            <Button size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="mb-8">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for stocks..."
                className="pl-10 bg-white/5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-40 bg-white/5">
                <SelectValue placeholder="Market" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Markets</SelectItem>
                <SelectItem value="nasdaq">NASDAQ</SelectItem>
                <SelectItem value="nyse">NYSE</SelectItem>
                <SelectItem value="crypto">Crypto</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="trending">
              <SelectTrigger className="w-40 bg-white/5">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="change">Biggest Change</SelectItem>
                <SelectItem value="volume">Highest Volume</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stock list */}
          <div className="lg:col-span-1 glass-card rounded-lg overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-semibold">Top Stocks</h3>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <ArrowUpDown className="h-3 w-3" />
                <span className="text-xs">Sort</span>
              </Button>
            </div>
            
            <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
              {filteredStocks.map((stock) => (
                <button
                  key={stock.symbol}
                  className={`w-full px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors ${
                    selectedStock === stock.symbol ? 'bg-primary/10' : ''
                  }`}
                  onClick={() => setSelectedStock(stock.symbol)}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                      {stock.symbol.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="font-medium">{stock.symbol}</p>
                      <p className="text-xs text-muted-foreground">{stock.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <p className="font-medium">${stock.price.toFixed(2)}</p>
                    <p className={`text-xs flex items-center ${
                      stock.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      {stock.trend === 'up' ? 
                        <TrendingUp className="h-3 w-3 mr-1" /> : 
                        <TrendingDown className="h-3 w-3 mr-1" />
                      }
                      {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </p>
                  </div>
                </button>
              ))}
              
              {filteredStocks.length === 0 && (
                <div className="p-6 text-center text-muted-foreground">
                  No stocks found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>
          
          {/* Chart and details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected stock chart */}
            <div className="glass-card rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{selectedStockData?.symbol}</h3>
                    <p className="text-sm text-muted-foreground">{selectedStockData?.name}</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <p className="text-lg font-medium">${selectedStockData?.price.toFixed(2)}</p>
                    <Badge 
                      className={`ml-2 ${
                        selectedStockData?.trend === 'up' ? 'bg-success' : 'bg-destructive'
                      }`}
                    >
                      {selectedStockData?.trend === 'up' ? 
                        <TrendingUp className="h-3 w-3 mr-1" /> : 
                        <TrendingDown className="h-3 w-3 mr-1" />
                      }
                      {selectedStockData?.changePercent > 0 ? '+' : ''}{selectedStockData?.changePercent.toFixed(2)}%
                    </Badge>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Select defaultValue="1d">
                    <SelectTrigger className="w-20 bg-white/5">
                      <SelectValue placeholder="Period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1d">1D</SelectItem>
                      <SelectItem value="1w">1W</SelectItem>
                      <SelectItem value="1m">1M</SelectItem>
                      <SelectItem value="3m">3M</SelectItem>
                      <SelectItem value="1y">1Y</SelectItem>
                      <SelectItem value="5y">5Y</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="sm">
                    <BarChart2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <StockChart height={300} showFraudMarkers={false} />
            </div>
            
            {/* Stock details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass-card rounded-lg p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Market Data</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Market Cap</span>
                    <span className="font-medium">{selectedStockData?.marketCap}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Volume</span>
                    <span className="font-medium">{selectedStockData?.volume}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">52w High</span>
                    <span className="font-medium">$198.23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">52w Low</span>
                    <span className="font-medium">$124.17</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">P/E Ratio</span>
                    <span className="font-medium">28.5</span>
                  </div>
                </div>
              </div>
              
              <div className="glass-card rounded-lg p-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">AI Analysis</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Fraud Risk</span>
                    <Badge variant="outline" className="bg-success/10 text-success">Low</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Volatility</span>
                    <Badge variant="outline" className="bg-warning/10 text-warning">Medium</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Sentiment</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary">Positive</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Unusual Activity</span>
                    <span className="font-medium text-muted-foreground">None Detected</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">AI Confidence</span>
                    <span className="font-medium">92%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* News and tweets */}
            <div className="glass-card rounded-lg overflow-hidden">
              <Tabs defaultValue="news">
                <div className="border-b border-white/10">
                  <TabsList className="bg-transparent border-b border-transparent">
                    <TabsTrigger value="news" className="data-[state=active]:bg-transparent data-[state=active]:text-primary">
                      Latest News
                    </TabsTrigger>
                    <TabsTrigger value="tweets" className="data-[state=active]:bg-transparent data-[state=active]:text-primary">
                      Tweets
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="news" className="p-0">
                  <div className="divide-y divide-white/5">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="p-4 hover:bg-white/5">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-muted-foreground">CNBC • 2 hours ago</span>
                          <Badge variant="outline" className="text-xs">Earnings</Badge>
                        </div>
                        <h4 className="font-medium mb-1">
                          {selectedStockData?.name} Reports Strong Q2 Earnings, Beats Expectations
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          The tech giant reported earnings of $1.52 per share, exceeding analyst estimates...
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="tweets" className="p-0">
                  <div className="divide-y divide-white/5">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="p-4 hover:bg-white/5">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-8 w-8 rounded-full bg-white/10"></div>
                          <div>
                            <p className="font-medium">@financialanalyst</p>
                            <p className="text-xs text-muted-foreground">45 minutes ago</p>
                          </div>
                        </div>
                        <p className="text-sm">
                          $${selectedStockData?.symbol} looking strong after earnings. 
                          The company's focus on AI initiatives is paying off. 
                          I expect this momentum to continue through Q3. #stocks #investing
                        </p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LiveMarket;
