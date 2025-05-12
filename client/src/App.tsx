import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "@/pages/Dashboard";
import WalletPage from "@/pages/WalletPage";
import GloboPage from "@/pages/GloboPage";
import DAOPage from "@/pages/DAOPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/account" component={NotFound} />
      <Route path="/wallet" component={WalletPage} />
      <Route path="/messages" component={NotFound} />
      <Route path="/contacts" component={NotFound} />
      <Route path="/groups" component={NotFound} />
      <Route path="/profile" component={NotFound} />
      <Route path="/preview" component={NotFound} />
      <Route path="/dao" component={DAOPage} />
      <Route path="/interactions" component={NotFound} />
      <Route path="/token-hub" component={NotFound} />
      <Route path="/globo" component={GloboPage} />
      <Route path="/bank" component={NotFound} />
      <Route path="/cabinets" component={NotFound} />
      <Route path="/settings" component={NotFound} />
      <Route path="/support" component={NotFound} />
      <Route path="/docs" component={NotFound} />
      <Route path="/admin" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex flex-grow">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <main className={`flex-grow ${collapsed ? 'main-with-sidebar-collapsed' : 'main-with-sidebar'}`}>
              <Router />
            </main>
          </div>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
