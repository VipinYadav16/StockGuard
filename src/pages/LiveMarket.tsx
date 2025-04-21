import React, { useState } from "react";
import { Search, Loader, BarChart2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// MarketData for dropdown
const MarketData = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "MSFT", name: "Microsoft Corp." },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "AMZN", name: "Amazon.com Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "META", name: "Meta Platforms Inc." },
  { symbol: "NVDA", name: "NVIDIA Corp." },
  { symbol: "RELIANCE.NS", name: "Reliance Industries Ltd." },
  { symbol: "TCS.NS", name: "Tata Consultancy Services Ltd." },
  { symbol: "INFY.NS", name: "Infosys Ltd." },
  { symbol: "HDFCBANK.NS", name: "HDFC Bank Ltd." },
  { symbol: "ICICIBANK.NS", name: "ICICI Bank Ltd." },
];

const LiveMarket = () => {
  const { user } = useAuth();
  const [stockCode, setStockCode] = useState(""); // Stock selection state
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Dynamically generate image path for stock
  const getStockImage = (code: string) => `/pred/${code}.png`; // Points to public/pred/

  const handleStockChange = (code: string) => {
    setStockCode(code);
    setIsLoading(true);

    // Simulate a 2-second loading delay before displaying the stock data
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Stock Analysis</h2>
            <p className="text-muted-foreground">Analyze Stock Manipualation</p>
          </div>
        </div>

        {/* Stock select */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock-search">Stock</Label>
                <Select value={stockCode} onValueChange={handleStockChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a stock" />
                  </SelectTrigger>
                  <SelectContent>
                    {MarketData.map((stock) => (
                      <SelectItem key={stock.symbol} value={stock.symbol}>
                        {stock.symbol} - {stock.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Show result only when a stock is selected */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Loader className="h-10 w-10 animate-spin mb-4 text-primary" />
            <h3 className="text-lg font-medium">Running Stock Analysis...</h3>
            <p className="text-muted-foreground">{stockCode}</p>
          </div>
        ) : stockCode ? (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <CardTitle className="text-2xl">{stockCode}</CardTitle>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <span className="text-sm text-muted-foreground">
                    Last updated: Apr 20, 2025
                  </span>
                  <Badge
                    variant="outline"
                    className="bg-primary/10 text-primary"
                  >
                    Selected Stock
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="w-full relative rounded-md overflow-hidden bg-muted/50">
                <img
                  src={getStockImage(stockCode)}
                  alt={`Stock chart for ${stockCode}`}
                  className="w-full h-auto object-contain"
                />
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <BarChart2 className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium">Select a stock to begin</h3>
            <p className="text-muted-foreground max-w-md mt-2">
              Use the dropdown above to view.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LiveMarket;
