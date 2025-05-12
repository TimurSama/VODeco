import { Card, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full border border-primary/20 bg-card/80 backdrop-blur-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center mb-6">
            <div className="hexagon h-20 w-20 bg-gradient-to-r from-primary/30 to-secondary/30 
              flex items-center justify-center mb-4">
              <Settings className="h-8 w-8 text-primary animate-spin-slow" />
            </div>
            <h1 className="text-2xl font-bold text-primary">Page Under Development</h1>
          </div>

          <p className="mt-4 text-foreground/80">
            This section of VODeco is currently being constructed. We're building advanced 
            features to support water resource management through decentralized technology.
          </p>
          
          <div className="mt-6 p-4 bg-secondary/10 rounded-lg border border-secondary/20">
            <p className="text-secondary text-sm">
              The complete platform will feature seamless integration between ecological monitoring, 
              DAO governance, and tokenized investment opportunities.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
