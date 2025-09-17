import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/DashboardPage";
import Mood from "./pages/Mood";
import Support from "./pages/Support";
import Resources from "./pages/Resources";
import Login from "./pages/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/mood" element={<Mood />} />
          <Route path="/support" element={<Support />} />
          <Route path="/resources" element={<Resources />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
        <ToastContainer position="top-right" autoClose={3000} />
    </QueryClientProvider>
);

export default App;