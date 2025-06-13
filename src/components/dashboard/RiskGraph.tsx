
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RiskGraph: React.FC = () => {
  const [showOriginalGraph, setShowOriginalGraph] = useState(true);

  const toggleGraph = () => {
    setShowOriginalGraph(!showOriginalGraph);
  };

  return (
    <Card className="bg-white shadow-sm border border-gray-100">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-black mb-4">กราฟวิเคราะห์ความเสี่ยง</h2>
        
        {showOriginalGraph ? (
          <div className="flex justify-center">
            <div className="relative" style={{ width: '700px', height: '580px', paddingTop: '60px', paddingLeft: '120px', paddingRight: '60px', paddingBottom: '80px' }}>
              
              {/* Chart title - now clickable */}
              <Button
                variant="ghost"
                onClick={toggleGraph}
                className="absolute top-4 right-12 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                ดูกราฟความเสี่ยง
              </Button>
              
              {/* Main graph area - removed border and background */}
              <div className="relative" style={{ width: '480px', height: '360px' }}>
                
                {/* Y-axis label (rotated) */}
                <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-gray-700 whitespace-nowrap">
                  Probability of Failure (100-%Overall Condition)
                </div>
                
                {/* Y-axis values */}
                <div className="absolute -left-16 top-0 h-full flex flex-col justify-between py-0 text-xs text-gray-600">
                  <span className="transform -translate-y-1/2">100</span>
                  <span className="transform -translate-y-1/2">60</span>
                  <span className="transform -translate-y-1/2">30</span>
                  <span className="transform -translate-y-1/2">15</span>
                  <span className="transform -translate-y-1/2">0</span>
                </div>
                
                {/* Y-axis risk level labels */}
                <div className="absolute -left-12 top-0 h-full flex flex-col justify-between py-8 text-xs font-bold text-gray-700">
                  <span className="transform -rotate-90 origin-center whitespace-nowrap">HIGH</span>
                  <span className="transform -rotate-90 origin-center whitespace-nowrap">MODERATE</span>
                  <span className="transform -rotate-90 origin-center whitespace-nowrap">LOW</span>
                </div>
                
                {/* X-axis label */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700 whitespace-nowrap">
                  Consequence of Failure (%)
                </div>
                
                {/* X-axis values */}
                <div className="absolute -bottom-12 left-0 w-full flex justify-between px-0 text-xs text-gray-600">
                  <span className="transform -translate-x-1/2">0</span>
                  <span className="transform -translate-x-1/2">15</span>
                  <span className="transform -translate-x-1/2">40</span>
                  <span className="transform -translate-x-1/2">60</span>
                  <span className="transform -translate-x-1/2">100</span>
                </div>
                
                {/* X-axis risk level labels */}
                <div className="absolute -bottom-8 left-0 w-full flex justify-between px-8 text-xs font-bold text-gray-700">
                  <span>LOW</span>
                  <span>MODERATE</span>
                  <span>HIGH</span>
                </div>
                
                {/* Risk zones background - using medium-toned colors without borders */}
                <div className="absolute inset-0">
                  {/* Low-Low (Green) */}
                  <div className="absolute bg-green-500" style={{ left: '0%', bottom: '0%', width: '31%', height: '42%' }}></div>
                  
                  {/* Moderate-Low (Blue) */}
                  <div className="absolute bg-blue-500" style={{ left: '31%', bottom: '0%', width: '25%', height: '42%' }}></div>
                  
                  {/* High-Low (Orange) */}
                  <div className="absolute bg-orange-500" style={{ left: '56%', bottom: '0%', width: '44%', height: '42%' }}></div>
                  
                  {/* Low-Moderate (Blue) */}
                  <div className="absolute bg-blue-500" style={{ left: '0%', bottom: '42%', width: '31%', height: '25%' }}></div>
                  
                  {/* Moderate-Moderate (Yellow) */}
                  <div className="absolute bg-yellow-500" style={{ left: '31%', bottom: '42%', width: '25%', height: '25%' }}></div>
                  
                  {/* High-Moderate (Orange) */}
                  <div className="absolute bg-orange-500" style={{ left: '56%', bottom: '42%', width: '25%', height: '25%' }}></div>
                  
                  {/* Low-High (Orange) */}
                  <div className="absolute bg-orange-500" style={{ left: '0%', bottom: '67%', width: '31%', height: '33%' }}></div>
                  
                  {/* Moderate-High (Red) */}
                  <div className="absolute bg-red-500" style={{ left: '31%', bottom: '67%', width: '25%', height: '33%' }}></div>
                  
                  {/* High-High (Dark Red) */}
                  <div className="absolute bg-red-600" style={{ left: '56%', bottom: '67%', width: '44%', height: '33%' }}></div>
                </div>
                
                {/* Data points */}
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={`cluster1-${i}`}
                    className="absolute rounded-full bg-yellow-600 w-1 h-1"
                    style={{
                      left: `${8 + Math.random() * 18}%`,
                      bottom: `${8 + Math.random() * 28}%`,
                    }}
                  ></div>
                ))}
                
                {Array.from({ length: 180 }).map((_, i) => (
                  <div
                    key={`cluster2-${i}`}
                    className="absolute rounded-full bg-yellow-600 w-1 h-1"
                    style={{
                      left: `${15 + Math.random() * 35}%`,
                      bottom: `${35 + Math.random() * 25}%`,
                    }}
                  ></div>
                ))}
                
                {Array.from({ length: 60 }).map((_, i) => (
                  <div
                    key={`cluster3-${i}`}
                    className="absolute rounded-full bg-yellow-600 w-1 h-1"
                    style={{
                      left: `${25 + Math.random() * 45}%`,
                      bottom: `${20 + Math.random() * 50}%`,
                    }}
                  ></div>
                ))}
                
                {Array.from({ length: 25 }).map((_, i) => (
                  <div
                    key={`cluster4-${i}`}
                    className="absolute rounded-full bg-yellow-600 w-1 h-1"
                    style={{
                      left: `${55 + Math.random() * 35}%`,
                      bottom: `${60 + Math.random() * 30}%`,
                    }}
                  ></div>
                ))}
                
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={`cluster5-${i}`}
                    className="absolute rounded-full bg-yellow-600 w-1 h-1"
                    style={{
                      left: `${70 + Math.random() * 25}%`,
                      bottom: `${75 + Math.random() * 20}%`,
                    }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="relative" style={{ width: '700px', height: '580px', paddingTop: '60px', paddingLeft: '120px', paddingRight: '60px', paddingBottom: '80px' }}>
              
              {/* Chart title - now clickable */}
              <Button
                variant="ghost"
                onClick={toggleGraph}
                className="absolute top-4 right-12 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                กราฟความเสี่ยง
              </Button>
              
              {/* Main graph area - removed border and background */}
              <div className="relative" style={{ width: '480px', height: '360px' }}>
                
                {/* Y-axis label (rotated) */}
                <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-gray-700 whitespace-nowrap">
                  Probability of Failure (100-%Overall Condition)
                </div>
                
                {/* Y-axis values */}
                <div className="absolute -left-16 top-0 h-full flex flex-col justify-between py-0 text-xs text-gray-600">
                  <span className="transform -translate-y-1/2">100</span>
                  <span className="transform -translate-y-1/2">60</span>
                  <span className="transform -translate-y-1/2">30</span>
                  <span className="transform -translate-y-1/2">15</span>
                  <span className="transform -translate-y-1/2">0</span>
                </div>
                
                {/* Y-axis risk level labels */}
                <div className="absolute -left-12 top-0 h-full flex flex-col justify-between py-8 text-xs font-bold text-gray-700">
                  <span className="transform -rotate-90 origin-center whitespace-nowrap">HIGH</span>
                  <span className="transform -rotate-90 origin-center whitespace-nowrap">MODERATE</span>
                  <span className="transform -rotate-90 origin-center whitespace-nowrap">LOW</span>
                </div>
                
                {/* X-axis label */}
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-700 whitespace-nowrap">
                  Consequence of Failure (%)
                </div>
                
                {/* X-axis values */}
                <div className="absolute -bottom-12 left-0 w-full flex justify-between px-0 text-xs text-gray-600">
                  <span className="transform -translate-x-1/2">0</span>
                  <span className="transform -translate-x-1/2">15</span>
                  <span className="transform -translate-x-1/2">40</span>
                  <span className="transform -translate-x-1/2">60</span>
                  <span className="transform -translate-x-1/2">100</span>
                </div>
                
                {/* X-axis risk level labels */}
                <div className="absolute -bottom-8 left-0 w-full flex justify-between px-8 text-xs font-bold text-gray-700">
                  <span>LOW</span>
                  <span>MODERATE</span>
                  <span>HIGH</span>
                </div>
                
                {/* Perfect diagonal zones - corrected positioning */}
                <div className="absolute inset-0">
                  <svg className="w-full h-full" viewBox="0 0 480 360" preserveAspectRatio="none">
                    {/* Green zone (bottom-left triangle) */}
                    <polygon points="0,360 144,360 0,216" fill="#22c55e" />
                    
                    {/* Blue zones - adjusted for better fit */}
                    <polygon points="0,216 144,360 288,360 0,72" fill="#3b82f6" />
                    
                    {/* Yellow zones - corrected diagonal */}
                    <polygon points="0,72 288,360 432,360 0,0 72,0" fill="#eab308" />
                    
                    {/* Orange zones - fixed positioning */}
                    <polygon points="72,0 432,360 480,360 480,144 216,0" fill="#f97316" />
                    
                    {/* Red zone (top-right) - corrected */}
                    <polygon points="216,0 480,144 480,0" fill="#dc2626" />
                  </svg>
                </div>
                
                {/* Data points distributed across diagonal zones */}
                {Array.from({ length: 300 }).map((_, i) => {
                  let x, y;
                  const rand = Math.random();
                  
                  if (rand < 0.4) {
                    x = 5 + Math.random() * 35;
                    y = 5 + Math.random() * 40;
                  } else if (rand < 0.7) {
                    x = 20 + Math.random() * 40;
                    y = 15 + Math.random() * 45;
                  } else if (rand < 0.9) {
                    x = 40 + Math.random() * 40;
                    y = 25 + Math.random() * 50;
                  } else {
                    x = 60 + Math.random() * 35;
                    y = 60 + Math.random() * 35;
                  }
                  
                  return (
                    <div
                      key={`diagonal-cluster-${i}`}
                      className="absolute rounded-full bg-white w-1.5 h-1.5 border border-gray-600"
                      style={{
                        left: `${x}%`,
                        bottom: `${y}%`,
                      }}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RiskGraph;
