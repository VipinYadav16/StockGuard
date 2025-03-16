import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, LogOut, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/hooks/use-theme';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account"
    });
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12',
        isScrolled
          ? 'bg-background/90 backdrop-blur-lg shadow-md'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 z-50"
          aria-label="StockGuard Home"
        >
          <div className="relative h-8 w-8 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
            </div>
            <div className="absolute inset-0 border-2 border-primary rounded-full"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Stock<span className="text-primary">Guard</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium relative py-2',
                  'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary',
                  'hover:text-primary transition-colors',
                  location.pathname === link.path
                    ? 'text-primary after:w-full'
                    : 'text-foreground after:w-0 hover:after:w-full after:transition-all after:duration-300'
                )}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={cn(
                  'text-sm font-medium relative py-2',
                  'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary',
                  'hover:text-primary transition-colors',
                  location.pathname === '/dashboard'
                    ? 'text-primary after:w-full'
                    : 'text-foreground after:w-0 hover:after:w-full after:transition-all after:duration-300'
                )}
              >
                Dashboard
              </Link>
            )}
          </div>
          
          {/* Theme Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Palette className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('default')} className={theme === 'default' ? 'bg-primary/10' : ''}>
                Dark Theme
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('light')} className={theme === 'light' ? 'bg-primary/10' : ''}>
                Light Theme
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border border-primary/20 hover:bg-primary/10 text-primary"
                  >
                    {user?.name || 'Account'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/settings')}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="border border-primary/20 hover:bg-primary/10 text-primary"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <AnimatedButton>Sign Up</AnimatedButton>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden z-50 p-2 text-foreground focus:outline-none"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-primary animate-fade-in" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            'fixed inset-0 bg-background/95 backdrop-blur-lg flex flex-col justify-center items-center space-y-8 md:hidden z-40 transition-all duration-300 ease-in-out',
            mobileMenuOpen
              ? 'opacity-100 visible'
              : 'opacity-0 invisible'
          )}
        >
          <div className="flex flex-col items-center space-y-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-xl font-medium',
                  location.pathname === link.path
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary',
                  'animate-fade-in transition-all',
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {link.name}
              </Link>
            ))}
            
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={cn(
                  'text-xl font-medium',
                  location.pathname === '/dashboard'
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary',
                  'animate-fade-in transition-all',
                )}
                style={{ animationDelay: '250ms' }}
              >
                Dashboard
              </Link>
            )}
            
            {/* Mobile Theme Selector */}
            <div className="flex flex-col items-center space-y-2 w-full">
              <p className="text-sm text-muted-foreground">Select Theme</p>
              <div className="flex space-x-3">
                {['default', 'light'].map((themeOption) => (
                  <Button 
                    key={themeOption}
                    variant={theme === themeOption ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme(themeOption as 'default' | 'light')}
                    className={`capitalize ${theme === themeOption ? 'bg-primary text-primary-foreground' : ''}`}
                  >
                    {themeOption === 'default' ? 'Dark' : 'Light'}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-4 w-full px-10 animate-fade-in" style={{ animationDelay: '300ms' }}>
            {isAuthenticated ? (
              <>
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground">Signed in as</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border border-destructive/20 hover:bg-destructive/10 text-destructive"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border border-primary/20 hover:bg-primary/10 text-primary"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="w-full">
                  <AnimatedButton className="w-full">Sign Up</AnimatedButton>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
