
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { TwitterIcon, LinkedinIcon, YoutubeIcon, GithubIcon } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'API', href: '/api' },
        { name: 'Integrations', href: '/integrations' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/docs' },
        { name: 'Blog', href: '/blog' },
        { name: 'Community', href: '/community' },
        { name: 'Support', href: '/support' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
        { name: 'Terms', href: '/terms' },
        { name: 'Privacy', href: '/privacy' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <TwitterIcon className="h-5 w-5" />, href: '#', label: 'Twitter' },
    { icon: <LinkedinIcon className="h-5 w-5" />, href: '#', label: 'LinkedIn' },
    { icon: <YoutubeIcon className="h-5 w-5" />, href: '#', label: 'YouTube' },
    { icon: <GithubIcon className="h-5 w-5" />, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="bg-secondary pt-16 pb-8 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-6">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="relative h-8 w-8 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                </div>
                <div className="absolute inset-0 border-2 border-primary rounded-full"></div>
              </div>
              <span className="text-xl font-bold">
                Stock<span className="text-primary">Guard</span>
              </span>
            </Link>
            
            <p className="text-muted-foreground mb-6 max-w-md">
              StockGuard uses advanced AI to detect market manipulation and fraud in real-time, 
              helping investors protect their portfolios from deceptive practices.
            </p>
            
            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Links */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="font-medium mb-4">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom section with copyright */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} StockGuard. All rights reserved. Designed & Developed @ Vipin Yadav
            </p>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
