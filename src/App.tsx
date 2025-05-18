
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TransformerAbnormality from "./pages/TransformerAbnormality";
import AgeAssessment from "./pages/AgeAssessment";
import UploadData from "./pages/UploadData";
import ActivateTestResults from "./pages/ActivateTestResults";
import OilTestUpload from "./pages/OilTestUpload";
import ElectricalTestUpload from "./pages/ElectricalTestUpload";
import TransformerReport from "./pages/TransformerReport";
import DamageReport from "./pages/DamageReport";
import TransformerBasicInfo from "./pages/TransformerBasicInfo";
import StandardReport from "./pages/StandardReport";
import TransformerRelocationInfo from "./pages/TransformerRelocationInfo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/transformer-abnormality" element={<TransformerAbnormality />} />
          <Route path="/age-assessment" element={<AgeAssessment />} />
          <Route path="/upload-data" element={<UploadData />} />
          <Route path="/upload-data/oil-test" element={<OilTestUpload />} />
          <Route path="/upload-data/electrical-test" element={<ElectricalTestUpload />} />
          <Route path="/upload-data/activate" element={<ActivateTestResults />} />
          
          {/* Reports Routes */}
          <Route path="/reports" element={<NotFound />} />
          <Route path="/reports/standard" element={<StandardReport />} />
          <Route path="/reports/transformers" element={<TransformerReport />} />
          <Route path="/reports/damages" element={<DamageReport />} />
          
          {/* Transformer Info Routes */}
          <Route path="/transformer-info" element={<TransformerBasicInfo />} />
          <Route path="/transformer-info/details" element={<TransformerBasicInfo />} />
          <Route path="/transformer-info/relocation" element={<TransformerRelocationInfo />} />
          
          {/* Transformer Maintenance Routes */}
          <Route path="/transformer-maintenance" element={<NotFound />} />
          <Route path="/transformer-maintenance/search" element={<NotFound />} />
          <Route path="/transformer-maintenance/visual-inspection" element={<NotFound />} />
          <Route path="/transformer-maintenance/oil-test" element={<NotFound />} />
          <Route path="/transformer-maintenance/electrical-test" element={<NotFound />} />
          <Route path="/transformer-maintenance/oltc" element={<NotFound />} />
          <Route path="/transformer-maintenance/all-test-results" element={<NotFound />} />
          <Route path="/transformer-maintenance/condition-check" element={<NotFound />} />
          
          {/* Other Main Routes */}
          <Route path="/transformer-importance" element={<NotFound />} />
          <Route path="/economic-analysis" element={<NotFound />} />
          <Route path="/inventory" element={<NotFound />} />
          <Route path="/management" element={<NotFound />} />
          
          {/* Utility Routes */}
          <Route path="/manual" element={<NotFound />} />
          <Route path="/test-history" element={<NotFound />} />
          <Route path="/logout" element={<NotFound />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
