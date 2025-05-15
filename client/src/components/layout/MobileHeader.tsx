import { useState } from 'react';
import { Menu, ChevronLeft, Bell, User, X } from 'lucide-react';
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface MobileHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  notificationCount?: number;
}

export default function MobileHeader({ 
  title, 
  showBackButton = false, 
  onBack, 
  notificationCount = 0 
}: MobileHeaderProps) {
  const [location, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Основные пункты меню
  const mainMenuItems = [
    { name: 'Дашборд', path: '/' },
    { name: 'Аккаунт', path: '/account' },
    { name: 'Кошелёк', path: '/wallet' },
    { name: 'Сообщения', path: '/messages', badge: 2 },
    { name: 'Контакты', path: '/contacts' },
    { name: 'Группы', path: '/groups' },
    { name: 'Профиль', path: '/profile' },
  ];
  
  // Другие пункты меню
  const otherMenuItems = [
    { name: 'DAO', path: '/dao' },
    { name: 'Взаимодействия', path: '/interactions' },
    { name: 'Token Hub', path: '/token-hub' },
    { name: 'Глобус', path: '/globo' },
    { name: 'Банк', path: '/bank' },
    { name: 'Кабинеты', path: '/cabinets' },
    { name: 'Настройки', path: '/settings' },
    { name: 'Поддержка', path: '/support' },
    { name: 'Документация', path: '/docs' },
  ];
  
  // Обработчик клика на пункт меню
  const handleMenuItemClick = (path: string) => {
    setMenuOpen(false);
    setLocation(path);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-primary/10 px-4 py-2 h-14 flex items-center justify-between">
      {/* Левая часть шапки */}
      <div className="flex items-center gap-2">
        {showBackButton ? (
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
        ) : (
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80vw] p-0">
              <div className="flex flex-col h-full overflow-y-auto">
                {/* Заголовок бокового меню */}
                <div className="flex items-center justify-between p-4 border-b border-primary/10">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback className="bg-primary/20 text-primary">ВО</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-primary">VODeco</h3>
                      <p className="text-xs text-foreground/60">DAO Eco Platform</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Основные пункты меню */}
                <div className="p-4 flex flex-col gap-1">
                  {mainMenuItems.map((item) => (
                    <Button
                      key={item.path}
                      variant={location === item.path ? "secondary" : "ghost"}
                      className="justify-start h-10"
                      onClick={() => handleMenuItemClick(item.path)}
                    >
                      <span className="flex-1 text-left">{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-2">{item.badge}</Badge>
                      )}
                    </Button>
                  ))}
                </div>
                
                <Separator className="my-2" />
                
                {/* Другие пункты меню */}
                <div className="p-4 flex flex-col gap-1">
                  {otherMenuItems.map((item) => (
                    <Button
                      key={item.path}
                      variant={location === item.path ? "secondary" : "ghost"}
                      className="justify-start h-10"
                      onClick={() => handleMenuItemClick(item.path)}
                    >
                      {item.name}
                    </Button>
                  ))}
                </div>
                
                <div className="mt-auto p-4 border-t border-primary/10">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => handleMenuItemClick('/account')}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Мой аккаунт
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        )}
        
        {/* Заголовок или логотип */}
        <div className="flex items-center">
          {!showBackButton && (
            <Avatar className="h-8 w-8 mr-2">
              <AvatarFallback className="bg-primary/20 text-primary">ВО</AvatarFallback>
            </Avatar>
          )}
          <h1 className="text-lg font-bold">
            {title || 'VODeco'}
          </h1>
        </div>
      </div>
      
      {/* Правая часть шапки */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/messages">
            <div className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 min-w-4 p-0 flex items-center justify-center text-[10px]">
                  {notificationCount}
                </Badge>
              )}
            </div>
          </Link>
        </Button>
        
        <Button variant="ghost" size="icon" asChild>
          <Link href="/profile">
            <User className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </header>
  );
}