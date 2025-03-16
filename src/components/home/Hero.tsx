
import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export const Hero = () => {
  const stockBarsRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  // Create animated stock chart background
  useEffect(() => {
    if (!stockBarsRef.current) return;
    
    const container = stockBarsRef.current;
    const barCount = 60;
    
    // Clear existing bars
    container.innerHTML = '';
    
    // Create dynamic stock bars
    for (let i = 0; i < barCount; i++) {
      const bar = document.createElement('div');
      bar.className = 'stock-bar';
      
      // Randomize heights and animation delays
      const height = 40 + Math.random() * 80; // Between 40% and 120%
      const delay = Math.random() * 2; // Random delay up to 2s
      
      bar.style.height = `${height}px`;
      bar.style.animationDelay = `${delay}s`;
      
      // Add color variations (green for up, red for down)
      if (Math.random() > 0.7) {
        bar.style.backgroundColor = 'rgba(74, 222, 128, 0.5)'; // green
        bar.style.boxShadow = '0 0 8px rgba(74, 222, 128, 0.3)';
      } else if (Math.random() < 0.2) {
        bar.style.backgroundColor = 'rgba(248, 113, 113, 0.5)'; // red
        bar.style.boxShadow = '0 0 8px rgba(248, 113, 113, 0.3)';
      }
      
      container.appendChild(bar);
    }
  }, []);

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      
      {/* Animated stock chart background */}
      <div className="absolute inset-0 opacity-30 overflow-hidden">
        <div 
          ref={stockBarsRef}
          className="absolute bottom-0 left-0 w-full h-60 flex items-end justify-around"
        />
      </div>
      
      {/* Glow effect */}
      <div className="absolute left-1/3 top-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute right-1/3 bottom-1/3 w-72 h-72 bg-blue-400/20 rounded-full blur-[100px] -z-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Animated badge */}
          <div className="inline-flex items-center bg-primary/10 rounded-full px-4 py-1.5 mb-6 border border-primary/20 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            <span className="text-xs font-medium text-primary">AI-Powered Stock Fraud Detection</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <span className="inline-block">Protect Your</span>{' '}
            <span className="inline-block text-gradient">Investments</span>{' '}
            <span className="inline-block">with AI Intelligence</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Our advanced AI algorithms detect stock market fraud in real-time, keeping your investments safe from manipulation.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <AnimatedButton size="lg" className="w-full sm:w-auto" onClick={handleGetStarted}>
              Get Started <ChevronRight className="ml-2 h-4 w-4" />
            </AnimatedButton>
            
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10"
            >
              <Play className="mr-2 h-4 w-4" /> Watch Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '400ms' }}>
            {[
              { label: 'Fraud Cases Detected', value: '10,000+' },
              { label: 'Customer Satisfaction', value: '99.8%' },
              { label: 'Average Detection Time', value: '<5ms' }
            ].map((stat, index) => (
              <div 
                key={index}
                className="glass-card p-6 rounded-lg"
              >
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
