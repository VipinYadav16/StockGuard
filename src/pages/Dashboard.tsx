
import React, { useState } from 'react';
import { 
  TrendingUp, Clock, AlertTriangle, Shield, 
  ChevronDown, Filter, TrendingDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import StockChart from '@/components/dashboard/StockChart';
import FraudAlerts from '@/components/dashboard/FraudAlerts';
import SentimentWidget from '@/components/dashboard/SentimentWidget';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-6">
        {/* Overview section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-1">Market Overview</h2>
              <p className="text-muted-foreground">Get real-time insights on potential fraud activity</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2 bg-white/5">
                <Clock className="h-4 w-4" />
                <span>Last 30 Days</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
              
              <Button size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </div>
          </div>
          
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { 
                icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
                label: 'Fraud Alerts', 
                value: '23', 
                change: '+12%',
                trend: 'up',
                color: 'text-destructive'
              },
              { 
                icon: <TrendingUp className="h-5 w-5 text-success" />,
                label: 'Monitored Stocks', 
                value: '543', 
                change: '+7%',
                trend: 'up',
                color: 'text-success'
              },
              { 
                icon: <Shield className="h-5 w-5 text-primary" />,
                label: 'Protection Score', 
                value: '92%', 
                change: '+3%',
                trend: 'up',
                color: 'text-primary'
              }
            ].map((stat, index) => (
              <div key={index} className="glass-card p-6 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-white/5">
                    {stat.icon}
                  </div>
                  <div className={cn("flex items-center text-xs", stat.color)}>
                    <span>{stat.change}</span>
                    {stat.trend === 'up' ? 
                      <TrendingUp className="h-3 w-3 ml-1" /> : 
                      <TrendingDown className="h-3 w-3 ml-1" />
                    }
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>
          
          {/* Main chart */}
          <div className="mb-8">
            <Tabs defaultValue="market" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="bg-secondary">
                  <TabsTrigger value="market">Market Overview</TabsTrigger>
                  <TabsTrigger value="high-risk">High Risk Stocks</TabsTrigger>
                  <TabsTrigger value="watchlist">My Watchlist</TabsTrigger>
                </TabsList>
                
                <Select defaultValue="AAPL">
                  <SelectTrigger className="w-48 bg-secondary border-white/10">
                    <SelectValue placeholder="Select Stock" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AAPL">Apple (AAPL)</SelectItem>
                    <SelectItem value="MSFT">Microsoft (MSFT)</SelectItem>
                    <SelectItem value="GOOG">Google (GOOG)</SelectItem>
                    <SelectItem value="AMZN">Amazon (AMZN)</SelectItem>
                    <SelectItem value="TSLA">Tesla (TSLA)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <TabsContent value="market" className="mt-0">
                <StockChart height={400} showFraudMarkers={true} />
              </TabsContent>
              <TabsContent value="high-risk" className="mt-0">
                <StockChart height={400} showFraudMarkers={true} />
              </TabsContent>
              <TabsContent value="watchlist" className="mt-0">
                <StockChart height={400} showFraudMarkers={true} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Widgets grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FraudAlerts />
          <SentimentWidget />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
