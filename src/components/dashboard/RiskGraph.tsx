
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const RiskGraph: React.FC = () => {
  return (
    <Card className="bg-white shadow-sm border border-gray-100">
      <CardContent className="p-4">
        <h2 className="text-xl font-bold text-black mb-3">กราฟวิเคราะห์ความเสี่ยง</h2>
        <div className="flex justify-center">
          <div className="relative h-[400px] w-[500px] bg-white border-2 border-gray-300 rounded-md">
            {/* Chart title */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700">
              See Risk Graph
            </div>
            
            {/* Y-axis */}
            <div className="absolute -left-12 top-0 h-full flex flex-col justify-between py-8 text-xs text-gray-600">
              <span>100</span>
              <span className="transform -rotate-90 origin-center whitespace-nowrap absolute left-3 top-16">High</span>
              <span className="transform -rotate-90 origin-center whitespace-nowrap absolute left-3 top-44">Moderate</span>
              <span>30</span>
              <span>15</span>
              <span className="transform -rotate-90 origin-center whitespace-nowrap absolute left-3 top-72">Low</span>
              <span>0</span>
            </div>
            
            {/* X-axis */}
            <div className="absolute -bottom-8 left-0 w-full flex justify-between px-8 text-xs text-gray-600">
              <span>0</span>
              <span>Low</span>
              <span>40</span>
              <span>Moderate</span>
              <span>60</span>
              <span>High</span>
              <span>100</span>
            </div>
            
            {/* Risk zones with proper colors and positioning */}
            <div className="absolute inset-2 grid grid-cols-3 grid-rows-3">
              {/* Top row - High risk zone */}
              <div className="bg-orange-400"></div>
              <div className="bg-red-400"></div>
              <div className="bg-red-500"></div>
              
              {/* Middle row - Moderate risk zone */}
              <div className="bg-blue-500"></div>
              <div className="bg-yellow-300"></div>
              <div className="bg-orange-400"></div>
              
              {/* Bottom row - Low risk zone */}
              <div className="bg-green-400"></div>
              <div className="bg-blue-500"></div>
              <div className="bg-orange-400"></div>
            </div>
            
            {/* Risk level lines */}
            <div className="absolute left-2 right-2 top-[25%] border-t-2 border-gray-800"></div>
            <div className="absolute left-2 right-2 top-[62%] border-t-2 border-gray-800"></div>
            <div className="absolute top-2 bottom-2 left-[33%] border-l-2 border-gray-800"></div>
            <div className="absolute top-2 bottom-2 left-[67%] border-l-2 border-gray-800"></div>
            
            {/* Data points representing transformers */}
            {/* Green cluster in low-low zone */}
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={`green-${i}`}
                className="absolute rounded-full bg-green-600 w-1.5 h-1.5"
                style={{
                  left: `${15 + Math.random() * 15}%`,
                  bottom: `${15 + Math.random() * 15}%`,
                }}
              ></div>
            ))}
            
            {/* Yellow cluster in moderate zone */}
            {Array.from({ length: 120 }).map((_, i) => (
              <div
                key={`yellow-${i}`}
                className="absolute rounded-full bg-yellow-500 w-1.5 h-1.5"
                style={{
                  left: `${35 + Math.random() * 25}%`,
                  bottom: `${35 + Math.random() * 25}%`,
                }}
              ></div>
            ))}
            
            {/* Red dots in high risk zones */}
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={`red-${i}`}
                className="absolute rounded-full bg-red-600 w-1.5 h-1.5"
                style={{
                  left: `${50 + Math.random() * 40}%`,
                  bottom: `${60 + Math.random() * 30}%`,
                }}
              ></div>
            ))}
            
            {/* Orange dots scattered */}
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={`orange-${i}`}
                className="absolute rounded-full bg-orange-600 w-1.5 h-1.5"
                style={{
                  left: `${Math.random() * 90 + 5}%`,
                  bottom: `${Math.random() * 90 + 5}%`,
                }}
              ></div>
            ))}
            
            {/* Blue dots in blue zones */}
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={`blue-${i}`}
                className="absolute rounded-full bg-blue-700 w-1.5 h-1.5"
                style={{
                  left: `${10 + Math.random() * 25}%`,
                  bottom: `${40 + Math.random() * 20}%`,
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
