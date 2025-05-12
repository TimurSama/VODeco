import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full border border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center mb-6">
            <div className="hexagon h-20 w-20 bg-gradient-to-r from-primary/30 to-secondary/30 
              flex items-center justify-center mb-4">
              <User className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-primary">Личный аккаунт</h1>
          </div>

          <p className="mt-4 text-foreground/80">
            Эта страница позволяет управлять вашим аккаунтом в системе VODeco.
          </p>
          
          <div className="mt-6 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
            <p className="text-secondary text-sm">
              Здесь будет информация о вашем профиле, настройках и персональных данных.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}