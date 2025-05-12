import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full border border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center mb-6">
            <div className="hexagon h-20 w-20 bg-gradient-to-r from-primary/30 to-secondary/30 
              flex items-center justify-center mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-primary">Документация</h1>
          </div>

          <p className="mt-4 text-foreground/80">
            Документация по платформе VODeco и ее компонентам.
          </p>
          
          <div className="mt-6 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
            <p className="text-secondary text-sm">
              Подробные руководства по использованию системы, API и интеграции с внешними сервисами.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}