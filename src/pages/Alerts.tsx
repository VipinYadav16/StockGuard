import React, { useState } from 'react';
import { 
  AlertTriangle, Bell, Filter, Calendar, ChevronDown, 
  TrendingUp, TrendingDown, Info, ArrowUpDown, Eye, 
  BarChart2, X, Check, Plus
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import FraudAlerts from '@/components/dashboard/FraudAlerts';
import StockChart from '@/components/dashboard/StockChart';

// Sample alert data
const allAlerts = [
  {
    id: 'alert-1',
    stock: 'TSLA',
    type: 'pump_dump',
    riskLevel: 'high',
    timestamp: '10 minutes ago',
    description: 'Unusual trading volume detected with rapid price increase followed by sudden drop',
    change: 5.7,
    confidence: 92,
    status: 'new'
  },
  {
    id: 'alert-2',
    stock: 'NVDA',
    type: 'insider_trading',
    riskLevel: 'medium',
    timestamp: '45 minutes ago',
    description: 'Suspicious trading activity detected prior to earnings announcement',
    change: 2.3,
    confidence: 78,
    status: 'new'
  },
  {
    id: 'alert-3',
    stock: 'AAPL',
    type: 'spoofing',
    riskLevel: 'low',
    timestamp: '2 hours ago',
    description: 'Multiple large orders placed and cancelled to influence market price',
    change: 0.8,
    confidence: 65,
    status: 'reviewed'
  },
  {
    id: 'alert-4',
    stock: 'GOOG',
    type: 'wash_trading',
    riskLevel: 'medium',
    timestamp: '3 hours ago',
    description: 'Simultaneous buy and sell orders potentially from related accounts',
    change: 1.6,
    confidence: 81,
    status: 'dismissed'
  },
  {
    id: 'alert-5',
    stock: 'AMC',
    type: 'pump_dump',
    riskLevel: 'high',
    timestamp: '5 hours ago',
    description: 'Coordinated social media activity followed by unusual trading volume',
    change: 12.3,
    confidence: 95,
    status: 'reviewed'
  },
  {
    id: 'alert-6',
    stock: 'GME',
    type: 'manipulation',
    riskLevel: 'high',
    timestamp: '1 day ago',
    description: 'Potential coordinated trading activity to influence market price',
    change: 8.7,
    confidence: 88,
    status: 'new'
  },
];

const alertTypeBadges: Record<string, { label: string, className: string }> = {
  pump_dump: { label: 'Pump & Dump', className: 'bg-destructive text-destructive-foreground' },
  insider_trading: { label: 'Insider Trading', className: 'bg-warning text-warning-foreground' },
  spoofing: { label: 'Spoofing', className: 'bg-primary/80 text-primary-foreground' },
  wash_trading: { label: 'Wash Trading', className: 'bg-yellow-600 text-yellow-50' },
  manipulation: { label: 'Market Manipulation', className: 'bg-red-500/80 text-red-50' },
};

const Alerts = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState<string | null>(allAlerts[0].id);
  
  // Filter alerts based on active tab
  const filteredAlerts = allAlerts.filter(alert => {
    if (activeTab === 'all') return true;
    if (activeTab === 'new') return alert.status === 'new';
    if (activeTab === 'reviewed') return alert.status === 'reviewed';
    if (activeTab === 'dismissed') return alert.status === 'dismissed';
    return true;
  });
  
  const currentAlert = allAlerts.find(alert => alert.id === selectedAlert);

  const getFraudTypeLabel = (type: string) => {
    return alertTypeBadges[type]?.label || type;
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-destructive';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Fraud Alerts</h2>
            <p className="text-muted-foreground">AI-detected potential market manipulation activities</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2 bg-white/5">
              <Calendar className="h-4 w-4" />
              <span>Last 7 Days</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
            
            <Button size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: 'All Alerts', 
              value: allAlerts.length, 
              icon: <Bell className="h-5 w-5 text-primary" />,
              active: activeTab === 'all',
              tab: 'all'
            },
            { 
              label: 'New Alerts', 
              value: allAlerts.filter(a => a.status === 'new').length, 
              icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
              active: activeTab === 'new',
              tab: 'new'
            },
            { 
              label: 'Reviewed', 
              value: allAlerts.filter(a => a.status === 'reviewed').length, 
              icon: <Check className="h-5 w-5 text-success" />,
              active: activeTab === 'reviewed',
              tab: 'reviewed'
            },
            { 
              label: 'Dismissed', 
              value: allAlerts.filter(a => a.status === 'dismissed').length, 
              icon: <X className="h-5 w-5 text-muted-foreground" />,
              active: activeTab === 'dismissed',
              tab: 'dismissed'
            }
          ].map((stat, index) => (
            <button 
              key={index} 
              className={`glass-card p-6 rounded-lg relative overflow-hidden ${
                stat.active ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setActiveTab(stat.tab)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-white/5">
                  {stat.icon}
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </button>
          ))}
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Alerts list */}
          <div className="lg:col-span-1 glass-card rounded-lg overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <h3 className="font-semibold">Alert Stream</h3>
                <Badge>{filteredAlerts.length}</Badge>
              </div>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <ArrowUpDown className="h-3 w-3" />
                <span className="text-xs">Sort</span>
              </Button>
            </div>
            
            <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert) => (
                  <button
                    key={alert.id}
                    className={`w-full px-4 py-3 text-left hover:bg-white/5 transition-colors ${
                      selectedAlert === alert.id ? 'bg-primary/10' : ''
                    }`}
                    onClick={() => setSelectedAlert(alert.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{alert.stock}</span>
                        <Badge className={alertTypeBadges[alert.type]?.className || 'bg-primary'}>
                          {getFraudTypeLabel(alert.type)}
                        </Badge>
                        
                        {alert.status === 'new' && (
                          <Badge variant="outline" className="bg-blue-500/20 text-blue-400">New</Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {alert.timestamp}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground truncate mb-2">
                      {alert.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs flex items-center ${getRiskColor(alert.riskLevel)}`}>
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {alert.riskLevel.charAt(0).toUpperCase() + alert.riskLevel.slice(1)} Risk
                      </span>
                      
                      <span className="text-xs flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1 text-destructive" />
                        <span className="text-destructive">+{alert.change}%</span>
                      </span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <Bell className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                  <p>No alerts found in this category</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Alert details */}
          <div className="lg:col-span-2 space-y-6">
            {currentAlert ? (
              <>
                {/* Alert details */}
                <div className="glass-card rounded-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold">{currentAlert.stock}</h3>
                        <Badge className={alertTypeBadges[currentAlert.type]?.className || 'bg-primary'}>
                          {getFraudTypeLabel(currentAlert.type)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Detected {currentAlert.timestamp}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant="outline" 
                          className={`${
                            currentAlert.riskLevel === 'high' 
                              ? 'bg-destructive/10 text-destructive' 
                              : currentAlert.riskLevel === 'medium'
                                ? 'bg-warning/10 text-warning'
                                : 'bg-success/10 text-success'
                          }`}
                        >
                          {currentAlert.riskLevel.charAt(0).toUpperCase() + currentAlert.riskLevel.slice(1)} Risk
                        </Badge>
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          AI Confidence: {currentAlert.confidence}%
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Inspect
                      </Button>
                      <Button variant="default" size="sm">
                        <BarChart2 className="h-4 w-4 mr-1" />
                        Analyze
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                      <p>{currentAlert.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Detection Factors</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li>Abnormal trading volume</li>
                          <li>Unusual price movements</li>
                          <li>Order book pattern anomalies</li>
                          <li>Social media correlation</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Impact Assessment</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li>Market distortion: Moderate</li>
                          <li>Price manipulation: High</li>
                          <li>Investor risk: Significant</li>
                          <li>Regulatory concern: High</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Recommended Actions</h4>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          <li>Monitor trading patterns</li>
                          <li>Review historical data</li>
                          <li>Check news correlation</li>
                          <li>Consider regulatory reporting</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stock chart */}
                <div className="glass-card rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Price Action</h4>
                    <div className="flex gap-2">
                      <Select defaultValue="1d">
                        <SelectTrigger className="w-20 bg-white/5">
                          <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1h">1H</SelectItem>
                          <SelectItem value="4h">4H</SelectItem>
                          <SelectItem value="1d">1D</SelectItem>
                          <SelectItem value="1w">1W</SelectItem>
                          <SelectItem value="1m">1M</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute top-6 right-6 z-10">
                      <Badge className="bg-destructive">Anomaly Detected</Badge>
                    </div>
                    <div className="h-[250px]">
                      {/* We'll use the StockChart component here but with fraud markers enabled */}
                      <StockChart height={250} showFraudMarkers={true} />
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-4">
                  <Button className="flex-1" variant="outline">
                    <Check className="h-4 w-4 mr-2" />
                    Mark as Reviewed
                  </Button>
                  <Button 
                    className="flex-1 border-destructive/20 text-destructive hover:bg-destructive/10"
                    variant="outline"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Dismiss Alert
                  </Button>
                  <Button className="flex-1">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Report to Team
                  </Button>
                </div>
              </>
            ) : (
              <div className="glass-card rounded-lg p-8 text-center">
                <Info className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
                <h3 className="text-xl font-medium mb-2">No Alert Selected</h3>
                <p className="text-muted-foreground mb-4">
                  Select an alert from the list to view detailed information and analysis.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
