import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import DriverLogin from "./pages/DriverLogin";
import DriverApp from "./pages/DriverApp";
import Dashboard from "./pages/Dashboard";
import DriverProfile from "./pages/DriverProfile";
import NotFound from "./pages/NotFound";
import RegisterAuthorizedPerson from "./pages/RegisterAuthorizedPerson";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/driver/login" element={<DriverLogin />} />
            <Route path="/driver" element={<DriverApp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/dashboard/driver/:id"
              element={<DriverProfile />}
            />

            {/* NEW ROUTE */}
            <Route
              path="/register"
              element={<RegisterAuthorizedPerson />}
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;