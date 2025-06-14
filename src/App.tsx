
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import OilInventoryMain from "./pages/OilInventoryMain";
import OilWarehouse from "./pages/OilWarehouse";
import OilDistribution from "./pages/OilDistribution";
import OilOrders from "./pages/OilOrders";
import CostAnalysis from "./pages/CostAnalysis";
import CalculationResults from "./pages/CalculationResults";
import DeliveryTime from "./pages/DeliveryTime";
import WeibullCalculation from "./pages/WeibullCalculation";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/oil-inventory" element={<OilInventoryMain />} />
          <Route path="/oil-warehouse" element={<OilWarehouse />} />
          <Route path="/oil-distribution" element={<OilDistribution />} />
          <Route path="/oil-orders" element={<OilOrders />} />
          <Route path="/cost-analysis" element={<CostAnalysis />} />
          <Route path="/calculation-results" element={<CalculationResults />} />
          <Route path="/delivery-time" element={<DeliveryTime />} />
          <Route path="/weibull-calculation" element={<WeibullCalculation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
