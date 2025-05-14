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
import AccountPage from "@/pages/AccountPage";
import GroupsPage from "@/pages/GroupsPage";
import PreviewPage from "@/pages/PreviewPage";
import SettingsPage from "@/pages/SettingsPage";
import SupportPage from "@/pages/SupportPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/account" component={AccountPage} />
      <Route path="/wallet" component={WalletPage} />
      <Route path="/messages" component={NotFound} />
      <Route path="/contacts" component={NotFound} />
      <Route path="/groups" component={GroupsPage} />
      <Route path="/profile" component={NotFound} />
      <Route path="/preview" component={PreviewPage} />
      <Route path="/dao" component={DAOPage} />
      <Route path="/interactions" component={NotFound} />
      <Route path="/token-hub" component={NotFound} />
      <Route path="/globo" component={GloboPage} />
      <Route path="/bank" component={NotFound} />
      <Route path="/cabinets" component={NotFound} />
      <Route path="/settings" component={SettingsPageWithFooter} />
      <Route path="/support" component={SupportPageWithFooter} />
      <Route path="/docs" component={NotFound} />
      <Route path="/admin" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Компоненты-обертки для страниц с Footer
function SettingsPageWithFooter() {
  return (
    <>
      <NotFound />
      <Footer />
    </>
  );
}

function SupportPageWithFooter() {
  return (
    <>
      <NotFound />
      <Footer />
    </>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <div className="flex flex-grow relative mt-16">
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            <main className="flex-grow pt-4 px-2">
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
