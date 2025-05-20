import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { WalletProvider } from "./context/WalletContext";
import { ThemeProvider } from "next-themes";
import './i18n';

createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    <WalletProvider>
      <App />
    </WalletProvider>
  </ThemeProvider>
);
