
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { AlertTriangle } from 'lucide-react';

interface StockChartProps {
  data?: any[];
  height?: number;
  isLoading?: boolean;
  showFraudMarkers?: boolean;
  className?: string;
}

export const StockChart: React.FC<StockChartProps> = ({
  data: externalData,
  height = 300,
  isLoading = false,
  showFraudMarkers = true,
  className
}) => {
  const [data, setData] = useState<any[]>([]);
  const [anomalies, setAnomalies] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Generate some sample data if not provided
  useEffect(() => {
    if (externalData) {
      setData(externalData);
      // Detect anomalies in the incoming data
      const anomalyIndices = externalData
        .map((item, index) => (item.anomaly ? index : null))
        .filter(index => index !== null);
      setAnomalies(anomalyIndices);
      return;
    }
    
    const generateData = () => {
      let value = 150 + Math.random() * 100;
      const baseDate = new Date();
      baseDate.setDate(baseDate.getDate() - 30);
      
      const newData = [];
      const newAnomalies = [];
      
      for (let i = 0; i < 30; i++) {
        // Occasional outliers
        const isAnomaly = Math.random() > 0.93;
        
        if (isAnomaly) {
          // Create a spike/dip
          value = value + (Math.random() > 0.5 ? 40 : -40);
          newAnomalies.push(i);
        } else {
          // Normal market fluctuation
          value = value + (Math.random() * 10 - 5);
        }
        
        const date = new Date(baseDate);
        date.setDate(date.getDate() + i);
        
        newData.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: Math.max(50, Math.round(value * 100) / 100),
          anomaly: isAnomaly
        });
      }
      
      setData(newData);
      setAnomalies(newAnomalies);
    };
    
    generateData();
  }, [externalData]);
  
  // Draw background gradient
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [height]);

  // Custom tooltip
  const renderTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isAnomaly = payload[0].payload.anomaly;
      
      return (
        <div className="glass-card p-3 border border-white/10 shadow-xl">
          <p className="text-sm mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-lg font-semibold",
              isAnomaly ? "text-destructive" : "text-primary"
            )}>
              ${payload[0].value}
            </span>
            
            {isAnomaly && (
              <AlertTriangle className="h-4 w-4 text-destructive" />
            )}
          </div>
          
          {isAnomaly && (
            <p className="text-xs text-destructive mt-1">Potential fraud detected</p>
          )}
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className={cn("chart-container rounded-lg overflow-hidden glass-card p-4", className)}>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full" 
        width={1000} 
        height={height}
      />
      
      {isLoading ? (
        <div className="flex items-center justify-center h-[300px]">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={height}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              domain={['dataMin - 20', 'dataMax + 20']}
            />
            <Tooltip content={renderTooltip} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="rgba(59, 130, 246, 1)"
              strokeWidth={2}
              dot={{ r: 3, fill: "#1e293b", stroke: "rgba(59, 130, 246, 1)", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
            />
            
            {/* Fraud markers */}
            {showFraudMarkers && anomalies.map((index) => (
              <ReferenceLine
                key={index}
                x={data[index]?.date}
                stroke="rgba(239, 68, 68, 0.8)"
                strokeDasharray="3 3"
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default StockChart;
