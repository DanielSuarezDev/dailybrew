import React from 'react';
import { Coffee } from 'lucide-react';

interface CoffeeCupProps {
  name: string;
  isActive: boolean;
  hasSpoken: boolean;
  index: number;
  total: number;
}

export const CoffeeCup: React.FC<CoffeeCupProps> = ({ 
  name, 
  isActive, 
  hasSpoken, 
  index, 
  total 
}) => {
  const cupColors = [
    'from-amber-500 to-orange-600',
    'from-red-500 to-pink-600', 
    'from-blue-500 to-indigo-600',
    'from-green-500 to-emerald-600',
    'from-purple-500 to-violet-600',
    'from-yellow-500 to-amber-600',
  ];

  const cupColor = cupColors[index % cupColors.length];
  
  return (
    <div 
      className={`relative transition-all duration-500 ease-out ${
        isActive 
          ? 'scale-110 z-10' 
          : hasSpoken 
            ? 'scale-90 opacity-60' 
            : 'scale-100 hover:scale-105'
      }`}
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      {/* Glow effect for active cup */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl blur-xl opacity-60 animate-pulse"></div>
      )}
      
      {/* Coffee Cup */}
      <div className={`
        relative bg-white rounded-2xl p-6 shadow-xl border-4 transition-all duration-300
        ${isActive ? 'border-amber-400 shadow-2xl' : hasSpoken ? 'border-gray-300' : 'border-white hover:border-amber-200'}
        ${hasSpoken ? 'bg-gray-50' : 'bg-white'}
      `}>
        {/* Steam animation for active cup */}
        {isActive && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1 h-6 bg-gray-300 rounded-full animate-pulse opacity-60"
                  style={{
                    animationDelay: `${i * 200}ms`,
                    animationDuration: '2s'
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}

        {/* Coffee Cup Icon */}
        <div className={`
          inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 mx-auto
          bg-gradient-to-br ${hasSpoken ? 'from-gray-400 to-gray-500' : cupColor}
        `}>
          <Coffee className={`w-8 h-8 ${hasSpoken ? 'text-gray-200' : 'text-white'}`} />
        </div>

        {/* Participant Name */}
        <h3 className={`
          text-lg font-semibold text-center mb-2 transition-colors duration-300
          ${isActive ? 'text-amber-800' : hasSpoken ? 'text-gray-500' : 'text-gray-800'}
        `}>
          {name}
        </h3>

        {/* Status indicator */}
        <div className="flex justify-center">
          <div className={`
            w-3 h-3 rounded-full transition-all duration-300
            ${isActive ? 'bg-amber-500 animate-pulse' : hasSpoken ? 'bg-gray-400' : 'bg-green-400'}
          `}></div>
        </div>

        {/* Speaking indicator */}
        {isActive && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium animate-bounce">
              Hablando...
            </div>
          </div>
        )}

        {/* Completed checkmark */}
        {hasSpoken && (
          <div className="absolute top-2 right-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};