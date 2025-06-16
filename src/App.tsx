import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
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
import OilTestResults from "./pages/OilTestResults";
import ElectricalTestResults from "./pages/ElectricalTestResults";
import OLTCMaintenance from "./pages/OLTCMaintenance";
import AllTestResults from "./pages/AllTestResults";
import ChangePassword from "./pages/ChangePassword";
import UserManagement from "./pages/UserManagement";
import TransformerOilInventory from "./pages/TransformerOilInventory";
import TransformerConditionCheck from "./pages/TransformerConditionCheck";
import OilInventoryPage from "./pages/OilInventoryPage";
import DisbursementListPage from "./pages/DisbursementListPage";
import OilOrderReceiveListPage from "./pages/OilOrderReceiveListPage";
import ExpenseListPage from "./pages/ExpenseListPage";
import CalculationResultPage from "./pages/CalculationResultPage";
import OilReceiptDurationPage from "./pages/OilReceiptDurationPage";
import WeibullCalculationPage from "./pages/WeibullCalculationPage";
import OilPurchasePage from "./pages/OilPurchasePage";
import TransformerDetails from "./pages/TransformerDetails";
import BasicTransformerData from "./pages/BasicTransformerData";
import TransformerImportanceData from "./pages/TransformerImportanceData";
import VisualInspectionManagement from "./pages/VisualInspectionManagement";
import TestDataManagement from "./pages/TestDataManagement";
import VisualInspectionTopics from "./pages/VisualInspectionTopics";
import VisualInspectionCriteria from "./pages/VisualInspectionCriteria";
import HIScoreManagement from "./pages/HIScoreManagement";
import FactorScoreManagement from "./pages/FactorScoreManagement";
import SubComponentWeight from "./pages/SubComponentWeight";

const queryClient = new QueryClient();

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/transformer-abnormality" element={<TransformerAbnormality />} />
    <Route path="/age-assessment" element={<AgeAssessment />} />
    <Route path="/upload-data" element={<UploadData />} />
    <Route path="/upload-data/oil-test" element={<OilTestUpload />} />
    <Route path="/upload-data/electrical-test" element={<ElectricalTestUpload />} />
    <Route path="/upload-data/activate" element={<ActivateTestResults />} />
    
    {/* Reports Routes */}
    <Route path="/reports/standard" element={<StandardReport />} />
    <Route path="/reports/transformers" element={<TransformerReport />} />
    <Route path="/reports/damages" element={<DamageReport />} />
    
    {/* Transformer Info Routes */}
    <Route path="/transformer-info" element={<TransformerBasicInfo />} />
    <Route path="/transformer-info/details" element={<TransformerDetails />} />
    <Route path="/transformer-info/relocation" element={<TransformerRelocationInfo />} />
    
    {/* Transformer Importance Route */}
    <Route path="/transformer-importance" element={<TransformerImportance />} />
    
    {/* Economic Analysis Routes */}
    <Route path="/economic-analysis" element={<EconomicAnalysisFactorSetting />} />
    <Route path="/economic-analysis/factor-setting" element={<EconomicAnalysisFactorSetting />} />
    <Route path="/economic-analysis/price-loss" element={<EconomicAnalysisPriceLoss />} />
    <Route path="/economic-analysis/consideration-data" element={<EconomicAnalysisInfo />} />
    
    {/* Transformer Maintenance Routes */}
    <Route path="/transformer-maintenance" element={<TransformerMaintenanceSearch />} />
    <Route path="/transformer-maintenance/search" element={<TransformerMaintenanceSearch />} />
    <Route path="/transformer-maintenance/visual-inspection" element={<TransformerVisualInspection />} />
    <Route path="/transformer-maintenance/oil-test" element={<OilTestResults />} />
    <Route path="/transformer-maintenance/electrical-test" element={<ElectricalTestResults />} />
    <Route path="/transformer-maintenance/oltc" element={<OLTCMaintenance />} />
    <Route path="/transformer-maintenance/all-test-results" element={<AllTestResults />} />
    <Route path="/transformer-maintenance/condition-check" element={<TransformerConditionCheck />} />
    
    {/* Inventory Routes */}
    <Route path="/inventory" element={<OilInventoryPage />} />
    <Route path="/inventory/oil" element={<TransformerOilInventory />} />
    <Route path="/inventory/oil/stock" element={<OilInventoryPage />} />
    <Route path="/inventory/oil/withdrawal" element={<DisbursementListPage />} />
    <Route path="/inventory/oil/purchase" element={<OilPurchasePage />} />
    <Route path="/inventory/oil/orders" element={<OilOrderReceiveListPage />} />
    <Route path="/inventory/oil/expense" element={<ExpenseListPage />} />
    <Route path="/inventory/oil/calculation" element={<CalculationResultPage />} />
    <Route path="/inventory/oil/receipt-time" element={<OilReceiptDurationPage />} />
    <Route path="/inventory/Bushing-Arester-OLTC" element={<WeibullCalculationPage />} />
    
    {/* User Management Routes */}
    <Route path="/management" element={<UserManagement />} />
    <Route path="/management/user" element={<UserManagement />} />
    <Route path="/management/users" element={<UserManagement />} />
    <Route path="/management/change-password" element={<ChangePassword />} />
    <Route path="/management/basic-transformer-data" element={<BasicTransformerData />} />
    <Route path="/management/transformer-importance-data" element={<TransformerImportanceData />} />
    <Route path="/management/transformer-importance-data/visual-inspection" element={<VisualInspectionManagement />} />
    <Route path="/management/test-data" element={<TestDataManagement />} />
    <Route path="/management/test-data/vi-topics" element={<VisualInspectionTopics />} />
    <Route path="/management/test-data/vi-criteria" element={<VisualInspectionCriteria />} />
    <Route path="/management/test-data/hi-score" element={<HIScoreManagement />} />
    <Route path="/management/test-data/factor-score" element={<FactorScoreManagement />} />
    <Route path="/management/test-data/sub-component-weight" element={<SubComponentWeight />} />
    
    {/* Utility Routes */}
    <Route path="/manual" element={<NotFound />} />
    <Route path="/test-history" element={<NotFound />} />
    <Route path="/logout" element={<NotFound />} />
    
    {/* Catch-all route */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <AppRoutes />
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
