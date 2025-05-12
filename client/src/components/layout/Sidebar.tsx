import React from 'react';
import { Link, useLocation } from 'wouter';
import { 
  User, Wallet, MessageSquare, Users, UserCircle, Database, 
  Globe, BadgeDollarSign, Settings, LayoutDashboard, Eye, HardDrive, Bookmark, MessagesSquare,
  FolderKanban, LifeBuoy, FileText, ShieldAlert
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
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
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="flex items-center justify-between p-3 border-b border-primary/20">
        {!collapsed && <div className="text-primary font-semibold">Navigation</div>}
        <button 
          onClick={() => setCollapsed(!collapsed)} 
          className="p-1 rounded-md hover:bg-primary/10 text-primary"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <div className="p-2 overflow-y-auto">
        {/* Dashboard always at top */}
        <Link href={dashboardItem.path}>
          <div className={`sidebar-item ${isActive(dashboardItem.path) ? 'active' : ''}`}>
            <dashboardItem.icon className={`${collapsed ? 'mx-auto' : 'mr-2'} h-5 w-5`} />
            {!collapsed && <span>{dashboardItem.name}</span>}
          </div>
        </Link>

        <div className={`my-2 border-b border-primary/10 ${collapsed ? 'mx-auto w-10' : ''}`}></div>

        {/* Other nav items */}
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <div className={`sidebar-item ${isActive(item.path) ? 'active' : ''}`}>
              <item.icon className={`${collapsed ? 'mx-auto' : 'mr-2'} h-5 w-5`} />
              {!collapsed && <span>{item.name}</span>}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-auto p-3 border-t border-primary/20">
        {!collapsed && (
          <div className="text-xs text-foreground/60 text-center">
            VODeco v1.0.0
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;