
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

const Pricing = () => {
  const [billingMode, setBillingMode] = useState<'monthly' | 'annual'>('monthly');

  const pricingPlans = [
    {
      name: 'Free',
      price: {
        monthly: 0,
        annual: 0
      },
      description: 'Basic protection for casual investors',
      features: [
        { included: true, text: 'Basic fraud detection' },
        { included: true, text: '1 day delayed alerts' },
        { included: true, text: 'Monitor up to 5 stocks' },
        { included: false, text: 'Real-time alerts' },
        { included: false, text: 'Sentiment analysis' },
        { included: false, text: 'Historical data access' },
        { included: false, text: 'API access' }
      ],
      cta: 'Get Started',
      highlighted: false
    },
    {
      name: 'Pro',
      price: {
        monthly: 29,
        annual: 24
      },
      description: 'Advanced protection for serious investors',
      features: [
        { included: true, text: 'Advanced fraud detection' },
        { included: true, text: 'Real-time alerts' },
        { included: true, text: 'Monitor up to 50 stocks' },
        { included: true, text: 'Sentiment analysis' },
        { included: true, text: 'Historical data (3 months)' },
        { included: false, text: 'API access' },
        { included: false, text: 'Custom alert rules' }
      ],
      cta: 'Buy Pro',
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: {
        monthly: 99,
        annual: 89
      },
      description: 'Ultimate protection for professional traders',
      features: [
        { included: true, text: 'Premium fraud detection' },
        { included: true, text: 'Priority real-time alerts' },
        { included: true, text: 'Unlimited stock monitoring' },
        { included: true, text: 'Advanced sentiment analysis' },
        { included: true, text: 'Full historical data access' },
        { included: true, text: 'API access' },
        { included: true, text: 'Custom alert rules' }
      ],
      cta: 'Contact Sales',
      highlighted: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute right-1/4 top-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10" />
        
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent <span className="text-gradient">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10">
              Choose the plan that fits your investment strategy. All plans come with a 14-day free trial.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`text-sm ${billingMode === 'monthly' ? 'text-white' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch 
                checked={billingMode === 'annual'}
                onCheckedChange={(checked) => setBillingMode(checked ? 'annual' : 'monthly')}
              />
              <span className={`text-sm flex items-center ${billingMode === 'annual' ? 'text-white' : 'text-muted-foreground'}`}>
                Annual
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary">
                  Save 15%
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`glass-card rounded-lg p-8 border ${
                  plan.highlighted 
                    ? 'border-primary' 
                    : 'border-white/10'
                } relative`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="px-4 py-1 bg-primary text-primary-foreground rounded-full text-xs uppercase font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ${plan.price[billingMode]}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    {plan.price[billingMode] > 0 ? `/month` : ''}
                  </span>
                  {billingMode === 'annual' && plan.price.annual > 0 && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Billed annually (${plan.price.annual * 12}/year)
                    </p>
                  )}
                </div>
                
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />
                      )}
                      <span className={feature.included ? '' : 'text-muted-foreground'}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Link to={plan.name === 'Free' ? "/signup" : "/signup"}>
                  <Button 
                    className="w-full" 
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQs */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Can I switch plans later?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new features will be immediately available. If you downgrade, the changes will take effect at the end of your current billing cycle."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, all paid plans come with a 14-day free trial. You can try all the features before committing to a subscription. No credit card required for the free trial."
              },
              {
                question: "How does the fraud detection work?",
                answer: "Our AI algorithms analyze market data, trading patterns, news, and social media to identify potential fraud indicators. When suspicious activity is detected, you'll receive alerts based on your plan's capabilities."
              },
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time. If you cancel, you'll still have access to your paid features until the end of your current billing period."
              }
            ].map((faq, index) => (
              <div key={index} className="p-6 rounded-lg border border-white/10 bg-white/5">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to protect your investments?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of investors who trust StockGuard to keep their portfolios safe from fraud.
            </p>
            <Link to="/signup">
              <Button size="lg">Get Started Now</Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Pricing;
