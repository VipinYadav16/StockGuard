
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, Info, TrendingUp, ArrowUpDown, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FraudAlert {
  id: string;
  stock: string;
  type: 'pump_dump' | 'insider_trading' | 'spoofing' | 'wash_trading';
  riskLevel: 'high' | 'medium' | 'low';
  timestamp: string;
  change: number;
  confidence: number;
}

interface FraudAlertsProps {
  alerts?: FraudAlert[];
  isLoading?: boolean;
  className?: string;
  onViewAlert?: (id: string) => void;
}

export const FraudAlerts: React.FC<FraudAlertsProps> = ({
  alerts: externalAlerts,
  isLoading = false,
  className,
  onViewAlert = () => {}
}) => {
  // Sample data if not provided
  const defaultAlerts: FraudAlert[] = [
    {
      id: 'alert-1',
      stock: 'TSLA',
      type: 'pump_dump',
      riskLevel: 'high',
      timestamp: '10 minutes ago',
      change: 5.7,
      confidence: 92
    },
    {
      id: 'alert-2',
      stock: 'NVDA',
      type: 'insider_trading',
      riskLevel: 'medium',
      timestamp: '45 minutes ago',
      change: 2.3,
      confidence: 78
    },
    {
      id: 'alert-3',
      stock: 'AAPL',
      type: 'spoofing',
      riskLevel: 'low',
      timestamp: '2 hours ago',
      change: 0.8,
      confidence: 65
    },
    {
      id: 'alert-4',
      stock: 'GOOG',
      type: 'wash_trading',
      riskLevel: 'medium',
      timestamp: '3 hours ago',
      change: 1.6,
      confidence: 81
    }
  ];

  const alerts = externalAlerts || defaultAlerts;

  const getFraudTypeLabel = (type: string) => {
    switch (type) {
      case 'pump_dump':
        return 'Pump & Dump';
      case 'insider_trading':
        return 'Insider Trading';
      case 'spoofing':
        return 'Spoofing';
      case 'wash_trading':
        return 'Wash Trading';
      default:
        return type;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      case 'medium':
        return 'bg-warning text-warning-foreground';
      case 'low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className={cn("glass-card rounded-lg overflow-hidden", className)}>
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <h3 className="font-semibold">Fraud Alerts</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">
          View All <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <div className="divide-y divide-white/5">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">{alert.stock}</span>
                  <Badge variant="outline" className={cn(getRiskColor(alert.riskLevel), "capitalize")}>
                    {alert.riskLevel} risk
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Info className="h-3 w-3 mr-1" />
                  {alert.timestamp}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{getFraudTypeLabel(alert.type)}</span>
                <div className="flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-destructive" />
                  <span className="text-sm text-destructive">+{alert.change}%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">AI Confidence:</span>
                  <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${alert.confidence}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium">{alert.confidence}%</span>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-primary"
                  onClick={() => onViewAlert(alert.id)}
                >
                  Analyze
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FraudAlerts;
