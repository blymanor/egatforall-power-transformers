
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const RiskGraph: React.FC = () => {
  return (
    <Card className="bg-white shadow-sm border border-gray-100">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-black mb-4">กราฟวิเคราะห์ความเสี่ยง</h2>
        <div className="flex justify-center">
          <div className="relative h-[450px] w-[600px] bg-white border border-gray-400">
            
            {/* Y-axis label (Probability) */}
            <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-gray-700">
              Probability of Failure (%)
            </div>
            
            {/* Y-axis values */}
            <div className="absolute -left-10 top-0 h-full flex flex-col justify-between py-4 text-xs text-gray-600">
              <span>100</span>
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>
            
            {/* X-axis label (Consequence) */}
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700">
              Consequence of Failure (%)
            </div>
            
            {/* X-axis values */}
            <div className="absolute -bottom-6 left-0 w-full flex justify-between px-4 text-xs text-gray-600">
              <span>0</span>
              <span>20</span>
              <span>40</span>
              <span>60</span>
              <span>80</span>
              <span>100</span>
            </div>
            
            {/* Risk zones background */}
            <div className="absolute inset-0">
              {/* Green zone (Low-Low) */}
              <div className="absolute top-[60%] left-0 w-[40%] h-[40%] bg-green-300 opacity-60"></div>
              
              {/* Yellow zones (Low-Medium, Medium-Low) */}
              <div className="absolute top-[60%] left-[40%] w-[40%] h-[40%] bg-yellow-300 opacity-60"></div>
              <div className="absolute top-[40%] left-0 w-[40%] h-[20%] bg-yellow-300 opacity-60"></div>
              
              {/* Orange zones (Medium-Medium, Low-High, High-Low) */}
              <div className="absolute top-[40%] left-[40%] w-[40%] h-[20%] bg-orange-300 opacity-60"></div>
              <div className="absolute top-[60%] left-[80%] w-[20%] h-[40%] bg-orange-300 opacity-60"></div>
              <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-orange-300 opacity-60"></div>
              
              {/* Red zones (High-Medium, Medium-High, High-High) */}
              <div className="absolute top-0 left-[40%] w-[40%] h-[40%] bg-red-300 opacity-60"></div>
              <div className="absolute top-[40%] left-[80%] w-[20%] h-[20%] bg-red-300 opacity-60"></div>
              <div className="absolute top-0 left-[80%] w-[20%] h-[40%] bg-red-400 opacity-70"></div>
            </div>
            
            {/* Grid lines */}
            <div className="absolute inset-0">
              {/* Horizontal lines */}
              <div className="absolute left-0 right-0 top-[20%] border-t border-gray-600"></div>
              <div className="absolute left-0 right-0 top-[40%] border-t-2 border-gray-800"></div>
              <div className="absolute left-0 right-0 top-[60%] border-t-2 border-gray-800"></div>
              <div className="absolute left-0 right-0 top-[80%] border-t border-gray-600"></div>
              
              {/* Vertical lines */}
              <div className="absolute top-0 bottom-0 left-[20%] border-l border-gray-600"></div>
              <div className="absolute top-0 bottom-0 left-[40%] border-l-2 border-gray-800"></div>
              <div className="absolute top-0 bottom-0 left-[60%] border-l border-gray-600"></div>
              <div className="absolute top-0 bottom-0 left-[80%] border-l-2 border-gray-800"></div>
            </div>
            
            {/* Risk level labels */}
            <div className="absolute top-[5%] left-[5%] text-xs font-medium text-gray-700 bg-white px-1">HIGH</div>
            <div className="absolute top-[30%] left-[5%] text-xs font-medium text-gray-700 bg-white px-1">MEDIUM</div>
            <div className="absolute top-[70%] left-[5%] text-xs font-medium text-gray-700 bg-white px-1">LOW</div>
            
            <div className="absolute bottom-[5%] left-[15%] text-xs font-medium text-gray-700 bg-white px-1">LOW</div>
            <div className="absolute bottom-[5%] left-[50%] text-xs font-medium text-gray-700 bg-white px-1">MEDIUM</div>
            <div className="absolute bottom-[5%] right-[5%] text-xs font-medium text-gray-700 bg-white px-1">HIGH</div>
            
            {/* Data points - mostly yellow/orange clustered in medium zones */}
            {/* Large cluster in medium-medium zone */}
            {Array.from({ length: 150 }).map((_, i) => (
              <div
                key={`main-cluster-${i}`}
                className="absolute rounded-full bg-yellow-500 w-1 h-1 opacity-80"
                style={{
                  left: `${40 + Math.random() * 35}%`,
                  top: `${35 + Math.random() * 30}%`,
                }}
              ></div>
            ))}
            
            {/* Secondary cluster in low-medium zone */}
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={`secondary-cluster-${i}`}
                className="absolute rounded-full bg-yellow-400 w-1 h-1 opacity-70"
                style={{
                  left: `${20 + Math.random() * 25}%`,
                  top: `${50 + Math.random() * 25}%`,
                }}
              ></div>
            ))}
            
            {/* Sparse points in green zone */}
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={`green-zone-${i}`}
                className="absolute rounded-full bg-green-600 w-1 h-1"
                style={{
                  left: `${5 + Math.random() * 30}%`,
                  top: `${65 + Math.random() * 30}%`,
                }}
              ></div>
            ))}
            
            {/* Some points in orange zones */}
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`orange-zone-${i}`}
                className="absolute rounded-full bg-orange-600 w-1 h-1"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              ></div>
            ))}
            
            {/* Few points in red zones */}
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={`red-zone-${i}`}
                className="absolute rounded-full bg-red-600 w-1 h-1"
                style={{
                  left: `${70 + Math.random() * 25}%`,
                  top: `${5 + Math.random() * 35}%`,
                }}
              ></div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskGraph;
