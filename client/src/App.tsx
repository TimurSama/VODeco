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
import MessagesPage from "@/pages/MessagesPage";
import ContactsPage from "@/pages/ContactsPage";
import ProfilePage from "@/pages/ProfilePage";
import InteractionsPage from "@/pages/InteractionsPage";
import TokenHubPage from "@/pages/TokenHubPage";
import BankPage from "@/pages/BankPage";
import CabinetsPage from "@/pages/CabinetsPage";
import DocsPage from "@/pages/DocsPage";
import AdminPanelPage from "@/pages/AdminPanelPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/account" component={AccountPage} />
      <Route path="/wallet" component={WalletPage} />
      <Route path="/messages" component={MessagesPage} />
      <Route path="/contacts" component={ContactsPage} />
      <Route path="/groups" component={GroupsPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/preview" component={PreviewPage} />
      <Route path="/dao" component={DAOPage} />
      <Route path="/interactions" component={InteractionsPage} />
      <Route path="/token-hub" component={TokenHubPage} />
      <Route path="/globo" component={GloboPage} />
      <Route path="/bank" component={BankPage} />
      <Route path="/cabinets" component={CabinetsPage} />
      <Route path="/settings" component={SettingsPageWithFooter} />
      <Route path="/support" component={SupportPageWithFooter} />
      <Route path="/docs" component={DocsPage} />
      <Route path="/admin" component={AdminPanelPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Компоненты-обертки для страниц с Footer
function SettingsPageWithFooter() {
  return (
    <>
      <SettingsPage />
      <Footer />
    </>
  );
}

function SupportPageWithFooter() {
  return (
    <>
      <SupportPage />
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
          {/* Footer перемещен в отдельные компоненты SupportPageWithFooter и SettingsPageWithFooter */}
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
