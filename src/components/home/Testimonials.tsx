
import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatarSrc: string;
}

export const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = React.useState(0);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Vipin Yadav",
      role: "Investment Analyst, FundTech Capital",
      content: "StockGuard has completely transformed how we monitor our portfolio. The AI-powered alerts have already saved us from at least three fraudulent schemes.",
      avatarSrc: "/id1.jpg"
    },
    {
      id: 2,
      name: "Shubham Tandon",
      role: "Day Trader",
      content: "As an individual trader, I needed something to help me spot manipulation. StockGuard gives me the same tools that institutional investors have. Well worth every penny.",
      avatarSrc: "/id2.jpg"
    },
    {
      id: 3,
      name: "Abhay Pratap Singh",
      role: "Financial Advisor, Wealth Partners",
      content: "The sentiment analysis feature is exceptionally accurate. It helps us understand market movements before they happen, giving our clients a significant advantage.",
      avatarSrc: "/id3.jpg"
    }
  ];

  const handlePrevious = () => {
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 relative bg-secondary/50">
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            Trusted by <span className="text-gradient">Financial Professionals</span>
          </h2>
          <p className="text-muted-foreground text-lg animate-fade-in" style={{ animationDelay: '100ms' }}>
            Hear from traders and analysts who rely on StockGuard to protect their investments.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Large quote icon */}
          <Quote className="absolute -top-10 -left-10 h-24 w-24 text-primary/10" />
          
          {/* Testimonial cards with transition effect */}
          <div className="relative h-[340px] md:h-[280px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={cn(
                  "absolute top-0 left-0 w-full transition-all duration-500 glass-card p-8 rounded-xl",
                  index === activeTestimonial 
                    ? "opacity-100 translate-x-0 z-10" 
                    : index < activeTestimonial 
                      ? "opacity-0 -translate-x-full z-0" 
                      : "opacity-0 translate-x-full z-0"
                )}
              >
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="flex-shrink-0">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary/30">
                      <img 
                        src={testimonial.avatarSrc} 
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-lg mb-6 text-foreground/90">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-10">
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handlePrevious}
                className="h-10 w-10 rounded-full border border-primary/20 hover:bg-primary/10 text-primary"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleNext}
                className="h-10 w-10 rounded-full border border-primary/20 hover:bg-primary/10 text-primary"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Indicator dots */}
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={cn(
                  "h-2 w-2 rounded-full mx-1 transition-all",
                  index === activeTestimonial 
                    ? "bg-primary w-6" 
                    : "bg-primary/30 hover:bg-primary/50"
                )}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
