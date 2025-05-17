
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const RiskGraph: React.FC = () => {
  return (
    <Card className="bg-white shadow-sm border border-gray-100">
      <CardContent className="p-4">
        <h2 className="text-xl font-bold text-black mb-3">Risk Analysis Graph</h2>
        <div className="relative h-[300px] w-full bg-[#f9f9f9] border border-gray-200 rounded-md p-2">
          <div className="absolute bottom-0 left-0 w-full h-full p-4">
            {/* X and Y Axis Labels */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between px-4">
              <span className="text-xs text-gray-500">Low</span>
              <span className="text-xs text-gray-500">Medium</span>
              <span className="text-xs text-gray-500">High</span>
            </div>
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-4">
              <span className="text-xs text-gray-500">High</span>
              <span className="text-xs text-gray-500">Moderate</span>
              <span className="text-xs text-gray-500">Low</span>
            </div>
            
            {/* Colored sections - simplification of the risk graph */}
            <div className="absolute inset-10 grid grid-cols-3 grid-rows-3">
              <div className="bg-green-500"></div>
              <div className="bg-yellow-400"></div>
              <div className="bg-red-500"></div>
              <div className="bg-blue-500"></div>
              <div className="bg-yellow-400"></div>
              <div className="bg-red-500"></div>
              <div className="bg-blue-500"></div>
              <div className="bg-green-500"></div>
              <div className="bg-yellow-400"></div>
            </div>
            
            {/* Dots representing transformers - random positions */}
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white border-2 border-gray-700 w-2 h-2"
                style={{
                  left: `${Math.random() * 80 + 10}%`,
                  bottom: `${Math.random() * 80 + 10}%`,
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
