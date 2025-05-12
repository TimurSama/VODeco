import React from 'react';
import { Link, useLocation } from 'wouter';
import { 
  User, Wallet, MessageSquare, Users, UserCircle, Database, 
  Globe, BadgeDollarSign, Settings, LayoutDashboard, Eye, HardDrive, Bookmark, MessagesSquare,
  FolderKanban, LifeBuoy, FileText, ShieldAlert
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const [location] = useLocation();

  const navItems: SidebarItem[] = [
    { name: 'Account', path: '/account', icon: User },
    { name: 'Wallet', path: '/wallet', icon: Wallet },
    { name: 'Messages', path: '/messages', icon: MessageSquare },
    { name: 'Contacts', path: '/contacts', icon: Users },
    { name: 'Groups', path: '/groups', icon: Users },
    { name: 'Profile', path: '/profile', icon: UserCircle },
    { name: 'Preview', path: '/preview', icon: Eye },
    { name: 'DAO', path: '/dao', icon: Database },
    { name: 'Interactions', path: '/interactions', icon: MessagesSquare },
    { name: 'Token Hub', path: '/token-hub', icon: Bookmark },
    { name: 'Globo', path: '/globo', icon: Globe },
    { name: 'Bank', path: '/bank', icon: BadgeDollarSign },
    { name: 'Cabinets', path: '/cabinets', icon: HardDrive },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Support', path: '/support', icon: LifeBuoy },
    { name: 'Docs', path: '/docs', icon: FileText },
    { name: 'Admin', path: '/admin', icon: ShieldAlert },
  ];

  // Dashboard is separate to always show at the top
  const dashboardItem: SidebarItem = { name: 'Dashboard', path: '/', icon: LayoutDashboard };

  const isActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  return (
    <aside className={`fixed top-[60px] left-0 h-[calc(100vh-60px)] bg-card/90 backdrop-blur-sm border-r border-primary/10 
      transition-all duration-300 shadow-lg shadow-primary/5 z-30
      ${open ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'}`}>
      <div className="flex items-center justify-between p-3 border-b border-primary/10">
        <div className="text-primary font-medium">Меню</div>
        <button 
          onClick={() => setOpen(false)}
          className="p-1 rounded-full hover:bg-primary/10 text-primary/80 hover:text-primary transition-colors"
          aria-label="Закрыть меню"
        >
          ←
        </button>
      </div>

      <div className="p-2 overflow-y-auto h-full">
        {/* Dashboard always at top */}
        <Link href={dashboardItem.path} onClick={() => setOpen(false)}>
          <div className={`flex items-center p-3 mb-1 rounded-lg transition-all
            ${isActive(dashboardItem.path) 
              ? 'bg-primary/10 text-primary border border-primary/20' 
              : 'text-foreground/70 hover:bg-primary/5 hover:text-primary border border-transparent hover:border-primary/10'
            }`}>
            <dashboardItem.icon className="mr-3 h-5 w-5" />
            <span>{dashboardItem.name}</span>
          </div>
        </Link>

        <div className="my-3 border-b border-primary/10"></div>

        {/* Other nav items */}
        <div className="space-y-1">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} onClick={() => setOpen(false)}>
              <div className={`flex items-center p-3 rounded-lg transition-all
                ${isActive(item.path) 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'text-foreground/70 hover:bg-primary/5 hover:text-primary border border-transparent hover:border-primary/10'
                }`}>
                <item.icon className="mr-3 h-5 w-5" />
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-primary/10 bg-card">
        <div className="text-xs text-foreground/60 text-center">
          VODeco v1.0.0
        </div>
      </div>
      
      {/* Overlay to close the sidebar on touch outside */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-[-1]" 
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </aside>
  );
};

export default Sidebar;