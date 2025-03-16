
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent successfully",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Reset form
      const form = e.target as HTMLFormElement;
      form.reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions about StockGuard? Our team is here to help. 
              Reach out to us and we'll get back to you as soon as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="glass-card rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                Send a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input 
                      id="name" 
                      required 
                      placeholder="Vipin Yadav"
                      className="bg-white/5"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      placeholder="mail@example.com"
                      className="bg-white/5"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input 
                    id="subject" 
                    required 
                    placeholder="How can we help you?"
                    className="bg-white/5"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    required 
                    placeholder="Type your message here..."
                    className="min-h-[150px] bg-white/5"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 mr-2 rounded-full border-2 border-current border-r-transparent animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <p className="text-muted-foreground mb-8">
                  Our team is available Monday through Friday from 9am to 5pm EST.
                  We strive to respond to all inquiries within 24 hours.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <p className="text-muted-foreground">
                        <Link to="mailto:support@stockguard.com" className="hover:text-primary">
                          support@stockguard.com
                        </Link>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Call Us</h3>
                      <p className="text-muted-foreground">
                        <Link to="tel:+18005551234" className="hover:text-primary">
                          +91 1234567890
                        </Link>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Visit Us</h3>
                      <p className="text-muted-foreground">
                        Bennett University, TechZone 2 , Greater Noida
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-card rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">How does StockGuard detect fraud?</h4>
                    <p className="text-sm text-muted-foreground">
                      StockGuard uses advanced AI algorithms to analyze trading patterns and detect anomalies that may indicate fraudulent activity.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Is my data secure with StockGuard?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, we employ end-to-end encryption and follow industry-best security practices to ensure your data remains protected.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Do you offer enterprise solutions?</h4>
                    <p className="text-sm text-muted-foreground">
                      Yes, we provide custom enterprise solutions for financial institutions and investment firms. Contact our sales team for details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
