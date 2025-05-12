import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Dashboard from "@/pages/Dashboard";
import WalletPage from "@/pages/WalletPage";
import GloboPage from "@/pages/GloboPage";
import ProjectsPage from "@/pages/ProjectsPage";
import DAOPage from "@/pages/DAOPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/wallet" component={WalletPage} />
      <Route path="/globo" component={GloboPage} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/dao" component={DAOPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
