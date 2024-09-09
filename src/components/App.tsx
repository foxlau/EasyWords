import React from "react";
import "@/styles/tailwind.css";
import { ThemeProvider } from "./ThemeProvider.tsx";
import { TooltipProvider } from "./ui/tooltip.tsx";

interface AppProps {
  children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ children }) => {
  return (
    <React.StrictMode>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
