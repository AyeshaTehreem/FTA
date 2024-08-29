// src/components/LoadingScreen.js
import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-red-50 flex flex-col items-center justify-center z-50">
      <div className="text-8xl text-red-600 animate-bounce mb-6">FTA</div>
      <div className="text-5xl text-red-500 mb-8 animate-pulse">TIMES</div>
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-red-600 rounded-full animate-ping"></div>
        <div className="w-4 h-4 bg-red-600 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
        <div className="w-4 h-4 bg-red-600 rounded-full animate-ping" style={{animationDelay: '0.4s'}}></div>
      </div>
      <p className="mt-4 text-xl font-semibold text-red-700">Loading your news...</p>
    </div>
  );
};

export default LoadingScreen;