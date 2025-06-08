import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function PreviewPage() {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <div className="w-full min-h-screen relative overflow-hidden">
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-8">VODeco Platform</h1>
          <p className="text-xl mb-8">Water Resource Management & DAO Governance</p>
          
          <div className="space-x-4">
            <Button 
              onClick={() => setLocation('/dashboard')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Enter Dashboard
            </Button>
            
            {!isAuthenticated && (
              <Button 
                onClick={() => setLocation('/auth')}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-900"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}