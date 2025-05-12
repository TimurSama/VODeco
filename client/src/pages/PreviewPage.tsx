import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";

export default function PreviewPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full border border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center mb-6">
            <div className="hexagon h-20 w-20 bg-gradient-to-r from-primary/30 to-secondary/30 
              flex items-center justify-center mb-4">
              <Eye className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-primary">Предпросмотр</h1>
          </div>

          <p className="mt-4 text-foreground/80">
            Предварительный просмотр проектов и данных перед публикацией.
          </p>
          
          <div className="mt-6 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
            <p className="text-secondary text-sm">
              Проверяйте визуализацию данных, отчеты и изменения перед их отправкой в общую систему.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}