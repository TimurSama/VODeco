import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { User as UserType } from "@shared/schema";
import { User, LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Link } from "wouter";

export function AuthStatus() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const typedUser = user as UserType;
  
  if (isLoading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <User className="h-4 w-4 mr-2" />
        Загрузка...
      </Button>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <Button 
        variant="ghost" 
        size="sm"
        onClick={() => window.location.href = "/api/login"}
      >
        <LogIn className="h-4 w-4 mr-2" />
        Вход
      </Button>
    );
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            {typedUser?.profileImageUrl ? (
              <AvatarImage src={typedUser.profileImageUrl} alt={typedUser.username || "Пользователь"} />
            ) : (
              <AvatarFallback>{typedUser?.username?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            )}
          </Avatar>
          <span className="hidden md:inline">{typedUser?.username || "Пользователь"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="h-4 w-4 mr-2" />
            Профиль
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account">
            <User className="h-4 w-4 mr-2" />
            Аккаунт
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => window.location.href = "/api/logout"}>
          <LogOut className="h-4 w-4 mr-2" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}