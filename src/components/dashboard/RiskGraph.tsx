
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
              
              {/* Main graph area */}
              <div className="relative bg-white border-2 border-gray-400" style={{ width: '480px', height: '360px' }}>
                
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
                
                {/* Risk zones background - using medium-toned colors */}
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
                  <div className="absolute bg-orange-500" style={{ left: '56%', bottom: '42%', width: '44%', height: '25%' }}></div>
                  
                  {/* Low-High (Orange) */}
                  <div className="absolute bg-orange-500" style={{ left: '0%', bottom: '67%', width: '31%', height: '33%' }}></div>
                  
                  {/* Moderate-High (Red) */}
                  <div className="absolute bg-red-500" style={{ left: '31%', bottom: '67%', width: '25%', height: '33%' }}></div>
                  
                  {/* High-High (Dark Red) */}
                  <div className="absolute bg-red-600" style={{ left: '56%', bottom: '67%', width: '44%', height: '33%' }}></div>
                </div>
                
                {/* Grid lines */}
                <div className="absolute inset-0">
                  {/* Horizontal lines at 42% and 67% (corresponding to 15 and 30 on Y-axis) */}
                  <div className="absolute left-0 right-0 border-t-2 border-gray-800" style={{ bottom: '42%' }}></div>
                  <div className="absolute left-0 right-0 border-t-2 border-gray-800" style={{ bottom: '67%' }}></div>
                  
                  {/* Vertical lines at 31% and 56% (corresponding to 40 and 60 on X-axis) */}
                  <div className="absolute top-0 bottom-0 border-l-2 border-gray-800" style={{ left: '31%' }}></div>
                  <div className="absolute top-0 bottom-0 border-l-2 border-gray-800" style={{ left: '56%' }}></div>
                </div>
                
                {/* Data points - all yellow with medium tone */}
                {/* Dense cluster in Low-Low zone */}
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
                
                {/* Main dense cluster in Low-Moderate to Moderate-Moderate zone */}
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
                
                {/* Scattered points in moderate zones */}
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
                
                {/* Sparse points in high risk zones */}
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
                
                {/* Very sparse points in extreme high risk */}
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
              
              {/* Main graph area */}
              <div className="relative bg-white border-2 border-gray-400" style={{ width: '480px', height: '360px' }}>
                
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
                
                {/* Risk zones background - different gradient style based on reference image */}
                <div className="absolute inset-0">
                  {/* Green triangle (Low-Low) */}
                  <div style={{
                    position: 'absolute',
                    left: '0%',
                    bottom: '0%',
                    width: '0',
                    height: '0',
                    borderLeft: '150px solid #22c55e',
                    borderTop: '150px solid transparent'
                  }}></div>
                  
                  {/* Blue triangle */}
                  <div style={{
                    position: 'absolute',
                    left: '31%',
                    bottom: '0%',
                    width: '0',
                    height: '0',
                    borderLeft: '120px solid #3b82f6',
                    borderTop: '240px solid transparent'
                  }}></div>
                  
                  {/* Yellow gradient area */}
                  <div className="absolute bg-gradient-to-br from-yellow-300 to-yellow-500" 
                    style={{ left: '15%', bottom: '15%', width: '50%', height: '50%' }}></div>
                  
                  {/* Orange gradient area */}
                  <div className="absolute bg-gradient-to-br from-orange-400 to-orange-600" 
                    style={{ left: '40%', bottom: '30%', width: '45%', height: '55%' }}></div>
                  
                  {/* Red gradient area */}
                  <div className="absolute bg-gradient-to-br from-red-500 to-red-700" 
                    style={{ left: '60%', bottom: '60%', width: '40%', height: '40%' }}></div>
                </div>
                
                {/* Diagonal grid lines - creating triangular pattern like in reference */}
                <div className="absolute inset-0">
                  {/* Main diagonal lines */}
                  <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                    {/* Diagonal line from bottom-left to top-right */}
                    <line x1="0%" y1="100%" x2="31%" y2="58%" stroke="black" strokeWidth="2"/>
                    <line x1="31%" y1="100%" x2="56%" y2="33%" stroke="black" strokeWidth="2"/>
                    <line x1="0%" y1="58%" x2="100%" y2="0%" stroke="black" strokeWidth="2"/>
                    
                    {/* Horizontal lines */}
                    <line x1="0%" y1="42%" x2="100%" y2="42%" stroke="black" strokeWidth="2"/>
                    <line x1="0%" y1="67%" x2="100%" y2="67%" stroke="black" strokeWidth="2"/>
                    
                    {/* Vertical lines */}
                    <line x1="31%" y1="0%" x2="31%" y2="100%" stroke="black" strokeWidth="2"/>
                    <line x1="56%" y1="0%" x2="56%" y2="100%" stroke="black" strokeWidth="2"/>
                  </svg>
                </div>
                
                {/* Data points - same yellow dots but distributed across triangular zones */}
                {Array.from({ length: 300 }).map((_, i) => {
                  // Create distribution that follows triangular pattern
                  let x, y;
                  const rand = Math.random();
                  
                  if (rand < 0.6) {
                    // Most points in lower triangle area
                    x = 10 + Math.random() * 60;
                    y = 10 + Math.random() * 50;
                  } else if (rand < 0.85) {
                    // Some points in middle area
                    x = 30 + Math.random() * 50;
                    y = 30 + Math.random() * 40;
                  } else {
                    // Few points in high risk area
                    x = 60 + Math.random() * 35;
                    y = 60 + Math.random() * 35;
                  }
                  
                  return (
                    <div
                      key={`alt-cluster-${i}`}
                      className="absolute rounded-full bg-yellow-600 w-1 h-1"
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
