
import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Newspaper, ArrowRight, Twitter, BarChart2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SentimentWidgetProps {
  className?: string;
  sentimentScore?: number;
  isLoading?: boolean;
  newsItems?: {
    source: string;
    title: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    timestamp: string;
  }[];
}

export const SentimentWidget: React.FC<SentimentWidgetProps> = ({
  className,
  sentimentScore = 62, // 0-100 scale, above 50 is positive
  isLoading = false,
  newsItems: externalNewsItems,
}) => {
  // Sample news data
  const defaultNewsItems = [
    {
      source: 'Bloomberg',
      title: 'Tech stocks rally on positive earnings forecasts',
      sentiment: 'positive',
      timestamp: '38 min ago'
    },
    {
      source: 'CNBC',
      title: 'Market volatility increases as Fed considers rate hikes',
      sentiment: 'negative',
      timestamp: '1 hour ago'
    },
    {
      source: 'Twitter',
      title: 'Trending discussions about potential cryptocurrency regulations',
      sentiment: 'neutral',
      timestamp: '2 hours ago'
    }
  ];

  const newsItems = externalNewsItems || defaultNewsItems;

  const getSentimentColor = (score: number) => {
    if (score >= 70) return 'text-success';
    if (score >= 40) return 'text-primary';
    return 'text-destructive';
  };

  const getSentimentIcon = (score: number) => {
    if (score >= 60) return <TrendingUp className="h-5 w-5 text-success" />;
    if (score >= 40) return <BarChart2 className="h-5 w-5 text-primary" />;
    return <TrendingDown className="h-5 w-5 text-destructive" />;
  };

  const getSentimentText = (score: number) => {
    if (score >= 70) return 'Bullish';
    if (score >= 60) return 'Positive';
    if (score >= 40) return 'Neutral';
    if (score >= 30) return 'Negative';
    return 'Bearish';
  };

  const getNewsSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Badge variant="outline" className="bg-success/20 text-success border-success/30">Positive</Badge>;
      case 'negative':
        return <Badge variant="outline" className="bg-destructive/20 text-destructive border-destructive/30">Negative</Badge>;
      default:
        return <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">Neutral</Badge>;
    }
  };

  const getSourceIcon = (source: string) => {
    if (source.toLowerCase().includes('twitter')) return <Twitter className="h-4 w-4" />;
    return <Newspaper className="h-4 w-4" />;
  };

  return (
    <div className={cn("glass-card rounded-lg overflow-hidden", className)}>
      <div className="p-4 border-b border-white/10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {getSentimentIcon(sentimentScore)}
          <h3 className="font-semibold">Market Sentiment</h3>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">
          Full Analysis <ArrowRight className="ml-1 h-3 w-3" />
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      ) : (
        <>
          <div className="p-4 flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-4 sm:mb-0 text-center sm:text-left">
              <p className="text-sm text-muted-foreground mb-1">Overall Sentiment</p>
              <div className="flex items-center justify-center sm:justify-start">
                <span className={cn("text-3xl font-bold mr-2", getSentimentColor(sentimentScore))}>
                  {sentimentScore}
                </span>
                <span className="text-lg">/100</span>
              </div>
              <p className={cn("text-sm font-medium mt-1", getSentimentColor(sentimentScore))}>
                {getSentimentText(sentimentScore)}
              </p>
            </div>
            
            <div className="w-full sm:w-48">
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full",
                    sentimentScore >= 70 ? "bg-success" : 
                    sentimentScore >= 40 ? "bg-primary" : 
                    "bg-destructive"
                  )}
                  style={{ width: `${sentimentScore}%` }}
                />
              </div>
              
              <div className="flex justify-between mt-1">
                <span className="text-xs text-destructive">Bearish</span>
                <span className="text-xs text-success">Bullish</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium">Latest News Impact</h4>
              <Badge variant="outline" className="text-xs">30+ sources</Badge>
            </div>
            
            <div className="space-y-3">
              {newsItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 mt-1 p-1.5 rounded-full bg-white/5">
                    {getSourceIcon(item.source)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-medium text-muted-foreground">{item.source}</span>
                      <div className="flex items-center gap-2">
                        {getNewsSentimentBadge(item.sentiment)}
                        <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-sm truncate group-hover:text-primary transition-colors">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SentimentWidget;
