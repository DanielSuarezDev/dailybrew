import React from 'react';

interface TimerBackgroundProps {
  timeLeft: number;
  totalTime: number;
  participantNumber: number;
  participantName: string;
}

export const TimerBackground: React.FC<TimerBackgroundProps> = ({
  timeLeft,
  totalTime,
  participantNumber,
  participantName
}) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timePercentage = (timeLeft / totalTime) * 100;

  // Get opacity based on time remaining - More visible now
  const getTimerOpacity = () => {
    if (timePercentage <= 20) return 'opacity-80'; // Very visible when critical
    if (timePercentage <= 50) return 'opacity-60'; // More visible when warning
    return 'opacity-40'; // Still visible when normal
  };

  // Get text color based on time remaining - Enhanced visibility
  const getTextColor = () => {
    if (timePercentage <= 20) return 'text-white'; // Fully visible when critical
    if (timePercentage <= 50) return 'text-white/90'; // Very visible when warning
    return 'text-white/80'; // Good visibility when normal
  };

  // Get timer glow effect
  const getTimerGlow = () => {
    if (timePercentage <= 20) return 'animate-timer-glow drop-shadow-2xl'; // Glowing when critical
    if (timePercentage <= 50) return 'drop-shadow-xl'; // Strong shadow when warning
    return 'drop-shadow-lg'; // Subtle shadow when normal
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      {/* Decorative background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large decorative circles */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating coffee beans */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-4 bg-white/10 rounded-full animate-float opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          ></div>
        ))}
        
        {/* Steam effects */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`steam-${i}`}
            className="absolute w-12 h-6 bg-white/5 rounded-full animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${5 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      {/* Timer Duration Info - MOVED TO TOP */}
      <div className={`absolute top-20 left-1/2 transform -translate-x-1/2 text-center ${getTextColor()}`}>
        <p className="text-xl md:text-2xl lg:text-3xl font-black tracking-wide drop-shadow-lg">
          {Math.floor(totalTime / 60)} MIN POR PARTICIPANTE
        </p>
      </div>

      {/* Participant Label - Below timer duration */}
      <div className={`absolute top-36 left-1/2 transform -translate-x-1/2 text-center ${getTextColor()}`}>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-wider mb-3 drop-shadow-lg">
          PARTICIPANTE #{participantNumber}
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl font-bold opacity-90 drop-shadow-md">
          {participantName}
        </p>
      </div>

      {/* Giant Timer - More prominent and visible */}
      <div className={`${getTimerOpacity()} ${getTextColor()} ${getTimerGlow()} transition-all duration-1000`}>
        <div className="text-[14rem] md:text-[18rem] lg:text-[24rem] xl:text-[28rem] font-black leading-none tracking-tighter">
          <span className="inline-block">{minutes.toString().padStart(2, '0')}</span>
          <span className="inline-block animate-pulse">:</span>
          <span className="inline-block">{seconds.toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Motivational Message - Positioned lower */}
      <div className={`absolute bottom-32 left-1/2 transform -translate-x-1/2 text-center ${getTextColor()}`}>
        <p className="text-2xl md:text-3xl lg:text-4xl font-black tracking-wide drop-shadow-lg">
          {timePercentage <= 20 ? "¡NO QUEMES TU CAFÉ!" :
           timePercentage <= 50 ? "MANTÉN EL RITMO" :
           "COMPARTE TUS IDEAS"}
        </p>
      </div>

      {/* Progress Ring - Enhanced visibility */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-[700px] h-[700px] transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-white/20"
          />
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 90}`}
            strokeDashoffset={`${2 * Math.PI * 90 * (timeLeft / totalTime)}`}
            className={`transition-all duration-1000 ease-linear ${
              timePercentage <= 20 ? 'text-white/90 drop-shadow-lg' :
              timePercentage <= 50 ? 'text-white/70 drop-shadow-md' :
              'text-white/50'
            }`}
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Enhanced pulsing effect for critical time */}
      {timePercentage <= 20 && (
        <div className="absolute inset-0 bg-white/8 animate-pulse"></div>
      )}

      {/* Additional glow effect for timer when critical */}
      {timePercentage <= 20 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-white/5 rounded-full animate-pulse blur-3xl"></div>
        </div>
      )}
    </div>
  );
};