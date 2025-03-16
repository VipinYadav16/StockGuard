
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, Bell, BarChart2, User, Settings, 
  ChevronRight, LogOut, ChevronDown, Menu
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import SearchIcon from '@/components/ui/SearchIcon';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account"
    });
    navigate('/');
  };
  
  const sidebarItems = [
    { 
      icon: <LayoutDashboard className="h-5 w-5" />, 
      label: 'Dashboard', 
      href: '/dashboard', 
      active: location.pathname === '/dashboard'
    },
    { 
      icon: <BarChart2 className="h-5 w-5" />, 
      label: 'Live Market', 
      href: '/live-market',
      active: location.pathname === '/live-market'
    },
    { 
      icon: <Bell className="h-5 w-5" />, 
      label: 'Alerts', 
      href: '/alerts', 
      badge: 4,
      active: location.pathname === '/alerts'
    },
    { 
      icon: <User className="h-5 w-5" />, 
      label: 'Profile', 
      href: '/profile',
      active: location.pathname === '/profile'
    },
    { 
      icon: <Settings className="h-5 w-5" />, 
      label: 'Settings', 
      href: '/settings',
      active: location.pathname === '/settings'
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transition-transform bg-secondary",
          isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-white/10">
            <Link to="/" className="flex items-center space-x-2">
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
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg transition-colors",
                      item.active 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-white/5"
                    )}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                    {item.badge && (
                      <Badge className="ml-auto bg-destructive text-white">{item.badge}</Badge>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* User info */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center space-x-3">
              <Avatar className="h-9 w-9 bg-primary/10">
                <AvatarFallback className="text-primary">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground">{user?.plan || 'Free Trial'}</p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full mt-4 justify-start text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={cn(
            "fixed bottom-6 left-6 z-50 p-3 rounded-full bg-primary text-white shadow-lg",
            sidebarOpen && "bg-secondary"
          )}
        >
          {sidebarOpen ? 
            <ChevronDown className="h-5 w-5" /> : 
            <Menu className="h-5 w-5" />
          }
        </button>
      )}
      
      {/* Main content */}
      <main 
        className={cn(
          "flex-1 transition-all",
          !isMobile && "ml-64"
        )}
      >
        {/* Header */}
        <header className="bg-secondary/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-30">
          <div className="px-6 py-4 flex items-center justify-between">
            {isMobile && (
              <h1 className="text-xl font-semibold">StockGuard</h1>
            )}
            {!isMobile && (
              <h1 className="text-xl font-semibold">
                {sidebarItems.find(item => item.active)?.label || 'Dashboard'}
              </h1>
            )}
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  placeholder="Search for stocks..."
                  className="w-64 bg-white/5 border-white/10"
                />
                <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              
              <div className="relative">
                <Button variant="ghost" className="p-2 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive"></span>
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Dashboard content */}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
