import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "./components/layout/Sidebar";
import BackgroundProvider from "@/components/layout/BackgroundProvider";
import AuthPage from "@/pages/auth-page";
import { AuthProvider } from "@/hooks/useAuth.tsx";
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

// Мобильные страницы
import MobileMessagesPage from "@/pages/MobileMessagesPage";
import MobileContactsPage from "@/pages/MobileContactsPage";
import "./mobile.css"; // Импортируем мобильные стили

// Импортируем наш hook для определения мобильного устройства
import { useMobileDetect } from "@/hooks/use-mobile-detect";

function Router() {
  // Используем hook
  const isMobile = useMobileDetect();
  
  useEffect(() => {
    console.log('Текущее устройство:', isMobile ? 'Мобильное' : 'Десктоп');
  }, [isMobile]);
  
  return (
    <Switch>
      {/* Маршруты с мобильными версиями */}
      <Route path="/messages">
        {isMobile ? <MobileMessagesPage /> : <MessagesPage />}
      </Route>
      <Route path="/contacts">
        {isMobile ? <MobileContactsPage /> : <ContactsPage />}
      </Route>
      
      {/* Стандартные маршруты */}
      <Route path="/account">
        <AccountPage />
      </Route>
      <Route path="/wallet">
        <WalletPage />
      </Route>
      <Route path="/groups">
        <GroupsPage />
      </Route>
      <Route path="/profile">
        <ProfilePage />
      </Route>
      <Route path="/preview">
        <PreviewPage />
      </Route>
      <Route path="/dao">
        <DAOPage />
      </Route>
      <Route path="/interactions">
        <InteractionsPage />
      </Route>
      <Route path="/token-hub">
        <TokenHubPage />
      </Route>
      <Route path="/globo">
        <GloboPage />
      </Route>
      <Route path="/bank">
        <BankPage />
      </Route>
      <Route path="/cabinets">
        <CabinetsPage />
      </Route>
      <Route path="/settings">
        <SettingsPageWithFooter />
      </Route>
      <Route path="/support">
        <SupportPageWithFooter />
      </Route>
      <Route path="/docs">
        <DocsPage />
      </Route>
      <Route path="/admin">
        <AdminPanelPage />
      </Route>
      <Route path="/auth">
        <AuthPage />
      </Route>
      <Route path="/">
        <Dashboard />
      </Route>
      <Route>
        <NotFound />
      </Route>
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
      <AuthProvider>
        <TooltipProvider>
          <BackgroundProvider>
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
          </BackgroundProvider>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
