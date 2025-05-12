import { Card, CardContent } from "@/components/ui/card";
import { UserCircle } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full border border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center mb-6">
            <div className="hexagon h-20 w-20 bg-gradient-to-r from-primary/30 to-secondary/30 
              flex items-center justify-center mb-4">
              <UserCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-primary">Профиль пользователя</h1>
          </div>

          <p className="mt-4 text-foreground/80">
            Управление вашим публичным профилем в системе VODeco.
          </p>
          
          <div className="mt-6 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
            <p className="text-secondary text-sm">
              Настройте ваш профиль: информация о специализации, опыте работы, достижениях и роли в проектах.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}