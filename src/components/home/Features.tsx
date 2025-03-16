
import React from 'react';
import { cn } from '@/lib/utils';
import { Brain, Bell, BarChart4, Shield, CheckCircle2 } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, delay }) => (
  <div 
    className="glass-card rounded-xl p-6 hover-card"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex flex-col space-y-3">
      <div className="inline-flex p-3 rounded-lg bg-primary/10 border border-primary/20 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  </div>
);

export const Features = () => {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Fraud Detection",
      description: "Advanced algorithms detect manipulative trading patterns, pump & dump schemes, and insider trading.",
      delay: 100
    },
    {
      icon: <Bell className="h-6 w-6" />,
      title: "Real-time Alerts",
      description: "Receive instant notifications about suspicious activities in stocks you're monitoring.",
      delay: 200
    },
    {
      icon: <BarChart4 className="h-6 w-6" />,
      title: "Market Sentiment Analysis",
      description: "Track how financial news impacts stock prices with our AI-powered sentiment engine.",
      delay: 300
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Data Privacy & Security",
      description: "Your financial data is protected with enterprise-grade security that complies with SEBI & GDPR regulations.",
      delay: 400
    }
  ];

  return (
    <section className="py-24 relative">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Cutting-Edge Features to <span className="text-gradient">Secure Your Investments</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            StockGuard combines artificial intelligence with deep financial expertise to provide unmatched protection against fraud.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
        
        {/* Feature highlight */}
        <div className="mt-24 glass-panel p-8 rounded-2xl animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold">
                How Our AI Detects Stock Fraud
              </h3>
              <p className="text-muted-foreground">
                Our platform analyzes millions of data points to identify suspicious patterns that humans might miss.
              </p>
              
              <ul className="space-y-3">
                {[
                  "Monitors trading volumes and price movements in real-time",
                  "Identifies unusual trading patterns using machine learning",
                  "Analyzes sentiment across news and social media",
                  "Compares current patterns with historical fraud cases"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-blue-400/20 p-6 border border-white/10">
                <div className="h-full w-full relative">
                  {/* Mock dashboard chart */}
                  <div className="absolute inset-0 flex items-end">
                    <div className="w-full h-40 flex items-end">
                      {Array.from({ length: 24 }).map((_, i) => {
                        const height = 30 + Math.random() * 70;
                        return (
                          <div 
                            key={i}
                            className="flex-1 mx-px bg-gradient-to-t from-primary/80 to-blue-400/80 rounded-t"
                            style={{ 
                              height: `${height}%`,
                              animationDelay: `${i * 100}ms` 
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Detection overlay */}
                  <div className="absolute top-1/3 right-1/4 h-16 w-16 rounded-full border-2 border-destructive animate-pulse"></div>
                  <div className="absolute top-1/3 right-1/4 h-16 w-16 rounded-full border border-destructive animate-pulse" style={{ animationDelay: '500ms' }}></div>
                  
                  {/* Alert box */}
                  <div className="absolute top-1/4 right-1/5 bg-destructive/90 backdrop-blur-sm text-white text-xs p-2 rounded shadow-lg">
                    Pump & Dump detected!
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-primary/20 rounded-full blur-[60px]" />
              <div className="absolute -z-10 -top-6 -left-6 w-64 h-64 bg-blue-400/20 rounded-full blur-[60px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
