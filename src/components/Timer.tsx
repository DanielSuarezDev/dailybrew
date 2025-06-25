import React from 'react';
import { Clock, Pause, Play } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  isPaused: boolean;
  onTogglePause: () => void;
}

export const Timer: React.FC<TimerProps> = ({ 
  timeLeft, 
  totalTime, 
  isRunning, 
  isPaused, 
  onTogglePause 
}) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  
  const isWarning = timeLeft <= 30 && timeLeft > 10;
  const isDanger = timeLeft <= 10;

  return (
    <div className="flex items-center gap-4">
      {/* Circular Progress Timer */}
      <div className="relative">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
          isDanger ? 'bg-red-100 animate-pulse' : 
          isWarning ? 'bg-yellow-100' : 
          'bg-green-100'
        }`}>
          <svg className="w-20 h-20 transform -rotate-90 absolute" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className={`transition-colors duration-300 ${
                isDanger ? 'text-red-200' : 
                isWarning ? 'text-yellow-200' : 
                'text-green-200'
              }`}
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className={`transition-all duration-1000 ease-linear ${
                isDanger ? 'text-red-500' : 
                isWarning ? 'text-yellow-500' : 
                'text-green-500'
              }`}
              strokeLinecap="round"
            />
          </svg>
          
          <div className={`text-center z-10 font-bold transition-colors duration-300 ${
            isDanger ? 'text-red-600' : 
            isWarning ? 'text-yellow-600' : 
            'text-green-600'
          }`}>
            <div className="text-lg leading-none">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex flex-col gap-2">
        <button
          onClick={onTogglePause}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isPaused 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
          }`}
        >
          {isPaused ? (
            <>
              <Play className="w-4 h-4" />
              Reanudar
            </>
          ) : (
            <>
              <Pause className="w-4 h-4" />
              Pausar
            </>
          )}
        </button>
        
        <div className="text-xs text-gray-500 text-center">
          {isDanger ? '¡Tiempo casi agotado!' : 
           isWarning ? 'Último medio minuto' : 
           'Tiempo restante'}
        </div>
      </div>
    </div>
  );
};