import React from 'react';
import { Sparkles, Wand2, Palette } from 'lucide-react';

const LoadingSpinner = ({ message = "Creating your masterpiece..." }) => {
  return (
    <div className="relative">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
      
      <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-fuchsia-500/30 rounded-3xl p-12 shadow-2xl">
        <div className="text-center">
          {/* Main Loading Animation */}
          <div className="relative mb-8">
            {/* Outer rotating ring */}
            <div className="w-24 h-24 border-4 border-transparent bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full animate-spin mx-auto relative">
              <div className="absolute inset-2 bg-gray-900 rounded-full"></div>
            </div>
            
            {/* Inner pulsing circle */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-16 h-16 bg-gradient-to-r from-fuchsia-400 to-pink-400 rounded-full animate-pulse flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white flex items-center justify-center">
              <Wand2 className="w-6 h-6 mr-3 text-fuchsia-400" />
              {message}
            </h3>
            
            <p className="text-gray-400 text-lg">
              Our AI is painting your perfect outfit
            </p>
          </div>

          {/* Loading Steps */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-center space-x-3">
              <div className="flex space-x-2">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className="w-3 h-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full animate-bounce"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  ></div>
                ))}
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <div className="flex justify-center items-center space-x-2 text-gray-500">
                <Palette className="w-4 h-4" />
                <span className="text-sm">Analyzing style preferences...</span>
              </div>
            </div>
          </div>

          {/* Progress Bar Effect */}
          <div className="mt-8">
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Fun Loading Messages */}
          <div className="mt-6">
            <div className="text-sm text-gray-500">
              <div className="animate-pulse">
                ✨ Mixing colors and textures...
              </div>
            </div>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-fuchsia-400 rounded-full opacity-30 animate-float"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${20 + ((i % 3) * 20)}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + (i * 0.3)}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Custom CSS for enhanced animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-20px) translateX(10px) scale(1.2); 
            opacity: 0.8;
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;