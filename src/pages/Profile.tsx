
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  User, Shield, Mail, Calendar, CreditCard, 
  ChevronRight, LogOut, Save 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account"
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="py-4 px-6 border-b border-white/10 sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center space-x-2">
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
          
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-5xl mx-auto py-10 px-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-6">
            <div className="glass-card p-6 rounded-lg flex flex-col items-center space-y-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" alt={user?.name} />
                <AvatarFallback className="text-xl bg-primary/10 text-primary">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                <p className="text-xs mt-1 bg-primary/20 text-primary py-1 px-2 rounded-full inline-block">
                  {user?.plan || 'Free Trial'}
                </p>
              </div>
            </div>
            
            <div className="glass-card rounded-lg overflow-hidden">
              <nav className="flex flex-col divide-y divide-white/5">
                <Link to="/profile" className="flex items-center justify-between px-4 py-3 bg-primary/10 text-primary">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-3" />
                    <span>Account</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                
                <Link to="/settings" className="flex items-center justify-between px-4 py-3 hover:bg-white/5">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-3" />
                    <span>Security</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                
                <Link to="/settings/billing" className="flex items-center justify-between px-4 py-3 hover:bg-white/5">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-3" />
                    <span>Billing</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center justify-between px-4 py-3 hover:bg-destructive/10 text-destructive w-full text-left"
                >
                  <div className="flex items-center">
                    <LogOut className="h-5 w-5 mr-3" />
                    <span>Logout</span>
                  </div>
                </button>
              </nav>
            </div>
          </aside>
          
          {/* Main account form */}
          <div className="flex-1 glass-card rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
            
            <form className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <Input 
                    id="name" 
                    defaultValue={user?.name} 
                    className="bg-white/5"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email Address
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={user?.email} 
                    className="bg-white/5"
                  />
                </div>
              </div>
              
              <Separator className="bg-white/10" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Preferences</h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      Receive fraud alerts via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive fraud alerts on device
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button className="flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
