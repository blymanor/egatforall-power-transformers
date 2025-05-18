
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
import TransformerImportance from "./pages/TransformerImportance";
import EconomicAnalysisFactorSetting from "./pages/EconomicAnalysisFactorSetting";
import EconomicAnalysisPriceLoss from "./pages/EconomicAnalysisPriceLoss";
import EconomicAnalysisInfo from "./pages/EconomicAnalysisInfo";
import TransformerMaintenanceSearch from "./pages/TransformerMaintenanceSearch";
import TransformerVisualInspection from "./pages/TransformerVisualInspection";
import ChangePassword from "./pages/ChangePassword";
import UserManagement from "./pages/UserManagement";

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
          
          {/* Transformer Importance Route */}
          <Route path="/transformer-importance" element={<TransformerImportance />} />
          
          {/* Economic Analysis Routes */}
          <Route path="/economic-analysis" element={<EconomicAnalysisFactorSetting />} />
          <Route path="/economic-analysis/factor-setting" element={<EconomicAnalysisFactorSetting />} />
          <Route path="/economic-analysis/price-loss" element={<EconomicAnalysisPriceLoss />} />
          <Route path="/economic-analysis/info" element={<EconomicAnalysisInfo />} />
          <Route path="/economic-analysis/consideration-data" element={<EconomicAnalysisInfo />} />
          
          {/* Transformer Maintenance Routes */}
          <Route path="/transformer-maintenance" element={<TransformerMaintenanceSearch />} />
          <Route path="/transformer-maintenance/search" element={<TransformerMaintenanceSearch />} />
          <Route path="/transformer-maintenance/visual-inspection" element={<TransformerVisualInspection />} />
          <Route path="/transformer-maintenance/oil-test" element={<NotFound />} />
          <Route path="/transformer-maintenance/electrical-test" element={<NotFound />} />
          <Route path="/transformer-maintenance/oltc" element={<NotFound />} />
          <Route path="/transformer-maintenance/all-test-results" element={<NotFound />} />
          <Route path="/transformer-maintenance/condition-check" element={<NotFound />} />
          
          {/* User Management Routes */}
          <Route path="/management" element={<UserManagement />} />
          <Route path="/management/user" element={<UserManagement />} />
          <Route path="/management/users" element={<UserManagement />} />
          <Route path="/management/change-password" element={<ChangePassword />} />
          
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
