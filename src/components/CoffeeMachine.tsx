import React from 'react';
import { Coffee, AlertTriangle, Zap, Power, Settings, Droplets } from 'lucide-react';

interface CoffeeMachineProps {
  participantName: string;
  timeLeft: number;
  totalTime: number;
  isActive: boolean;
}

export const CoffeeMachine: React.FC<CoffeeMachineProps> = ({
  participantName,
  timeLeft,
  totalTime,
  isActive
}) => {
  const timeProgress = ((totalTime - timeLeft) / totalTime) * 100;
  const timePercentage = (timeLeft / totalTime) * 100;
  
  // Estados del café y expresiones basados en el tiempo restante
  const isInLove = timePercentage > 70; // Más del 70% del tiempo - enamoramiento
  const isUncomfortable = timePercentage <= 70 && timePercentage > 40; // Entre 70% y 40% - incomodidad
  const isPanicking = timePercentage <= 40; // Menos del 40% - pánico y auxilio

  // Estados del café basados en el tiempo restante
  const isNormal = timePercentage > 50; // Más del 50% del tiempo - café normal
  const isWarning = timePercentage <= 50 && timePercentage > 20; // Entre 50% y 20% - espuma
  const isOverflowing = timePercentage <= 20 && timeLeft > 0; // Menos del 20% - espuma desbordando
  const isSpilled = timeLeft === 0; // Tiempo agotado - derrame total

  // Cálculo preciso del nivel de café
  const getCoffeeLevel = () => {
    if (isSpilled) return 100; // Completamente lleno y derramándose
    if (isOverflowing) return 85 + (timeProgress * 0.15); // 85-100% con espuma desbordando
    if (isWarning) return 50 + (timeProgress * 0.35); // 50-85% llenándose con espuma
    return Math.min(50, timeProgress * 0.5); // 0-50% café normal
  };

  const coffeeLevel = getCoffeeLevel();
  const foamLevel = isWarning || isOverflowing || isSpilled ? Math.min(15, (timeProgress - 50) * 0.3) : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8">
      {/* Participant Name Banner */}
      <div className={`mb-8 px-8 py-4 rounded-2xl shadow-lg transition-all duration-500 backdrop-blur-md border border-white/30 ${
        isSpilled ? 'bg-red-500/80 animate-pulse' :
        isOverflowing ? 'bg-orange-500/80 animate-bounce' :
        isWarning ? 'bg-yellow-500/80' :
        'bg-green-500/80'
      }`}>
        <h2 className="text-2xl font-bold text-white text-center flex items-center gap-3">
          <Coffee className="w-8 h-8" />
          {participantName} está hablando
          {isSpilled && <AlertTriangle className="w-6 h-6 animate-bounce" />}
        </h2>
      </div>

      <div className="relative">
        {/* Compact Professional Coffee Machine */}
        <div className="relative">
          {/* Machine Body - More compact */}
          <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black rounded-3xl p-6 shadow-2xl border-4 border-gray-700 w-80">
            
            {/* Machine Face with Eyes and Expressions - Smaller */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
              <div className={`relative w-24 h-16 rounded-t-3xl transition-all duration-500 ${
                isPanicking ? 'bg-red-200 animate-pulse' :
                isUncomfortable ? 'bg-yellow-200' :
                'bg-green-200'
              }`}>
                
                {/* Eyes - Smaller */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex gap-3">
                  {/* Left Eye */}
                  <div className={`relative w-6 h-6 bg-white rounded-full border-2 border-gray-800 transition-all duration-300 ${
                    isPanicking ? 'animate-bounce' : ''
                  }`}>
                    {/* Pupil */}
                    <div className={`absolute transition-all duration-300 ${
                      isPanicking ? 'w-1.5 h-4 bg-black rounded-full top-1 left-2 animate-pulse' : // Pupil alargada de pánico
                      isUncomfortable ? 'w-2 h-2 bg-black rounded-full top-1.5 left-1' : // Pupil mirando hacia un lado
                      'w-3 h-3 bg-black rounded-full top-1.5 left-1.5' // Pupil normal centrada
                    }`}>
                      {/* Heart pupils when in love */}
                      {isInLove && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-red-500 text-xs animate-pulse">♥</div>
                        </div>
                      )}
                    </div>
                    
                    {/* Eye shine */}
                    <div className="absolute top-1 right-1 w-0.5 h-0.5 bg-white rounded-full opacity-80"></div>
                  </div>

                  {/* Right Eye */}
                  <div className={`relative w-6 h-6 bg-white rounded-full border-2 border-gray-800 transition-all duration-300 ${
                    isPanicking ? 'animate-bounce' : ''
                  }`} style={{ animationDelay: '0.1s' }}>
                    {/* Pupil */}
                    <div className={`absolute transition-all duration-300 ${
                      isPanicking ? 'w-1.5 h-4 bg-black rounded-full top-1 left-2 animate-pulse' : // Pupil alargada de pánico
                      isUncomfortable ? 'w-2 h-2 bg-black rounded-full top-1.5 left-3' : // Pupil mirando hacia el otro lado
                      'w-3 h-3 bg-black rounded-full top-1.5 left-1.5' // Pupil normal centrada
                    }`}>
                      {/* Heart pupils when in love */}
                      {isInLove && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-red-500 text-xs animate-pulse">♥</div>
                        </div>
                      )}
                    </div>
                    
                    {/* Eye shine */}
                    <div className="absolute top-1 right-1 w-0.5 h-0.5 bg-white rounded-full opacity-80"></div>
                  </div>
                </div>

                {/* Mouth/Expression */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                  {isPanicking ? (
                    // Mouth of panic/help - O shape
                    <div className="w-3 h-4 bg-gray-800 rounded-full animate-pulse"></div>
                  ) : isUncomfortable ? (
                    // Uncomfortable wavy mouth
                    <div className="relative">
                      <div className="w-6 h-0.5 bg-gray-800 rounded-full transform rotate-12"></div>
                      <div className="w-6 h-0.5 bg-gray-800 rounded-full transform -rotate-12 -mt-0.5"></div>
                    </div>
                  ) : (
                    // Happy smile when in love
                    <div className="w-6 h-3 border-b-2 border-gray-800 rounded-b-full"></div>
                  )}
                </div>

                {/* Blush cheeks when in love */}
                {isInLove && (
                  <>
                    <div className="absolute top-5 left-1.5 w-2 h-2 bg-pink-300 rounded-full opacity-60 animate-pulse"></div>
                    <div className="absolute top-5 right-1.5 w-2 h-2 bg-pink-300 rounded-full opacity-60 animate-pulse"></div>
                  </>
                )}

                {/* Sweat drops when uncomfortable */}
                {isUncomfortable && (
                  <>
                    <div className="absolute top-1 left-1 w-0.5 h-1.5 bg-blue-400 rounded-full animate-bounce opacity-70"></div>
                    <div className="absolute top-2 right-1.5 w-0.5 h-1.5 bg-blue-400 rounded-full animate-bounce opacity-70" style={{ animationDelay: '0.3s' }}></div>
                  </>
                )}
              </div>
            </div>

            {/* Panic Steam/Smoke from machine when panicking */}
            {isPanicking && (
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                <div className="flex space-x-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-8 bg-gray-400 rounded-full animate-pulse opacity-60"
                      style={{
                        animationDelay: `${i * 150}ms`,
                        animationDuration: '1s'
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* Machine Top Panel - Compact */}
            <div className="bg-gradient-to-r from-gray-700 to-gray-600 rounded-t-2xl p-4 mb-4 border-b-2 border-gray-500">
              <div className="flex justify-between items-center">
                {/* Status LEDs */}
                <div className="flex gap-2">
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-green-400 animate-pulse shadow-lg shadow-green-400/50' : 'bg-gray-500'
                  }`}></div>
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isWarning ? 'bg-yellow-400 animate-pulse shadow-lg shadow-yellow-400/50' : 'bg-gray-500'
                  }`}></div>
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isOverflowing || isSpilled ? 'bg-red-400 animate-pulse shadow-lg shadow-red-400/50' : 'bg-gray-500'
                  }`}></div>
                </div>

                {/* Digital Display */}
                <div className="bg-black rounded-lg px-3 py-1.5 border border-gray-600">
                  <div className={`font-mono text-sm transition-colors duration-300 ${
                    isPanicking ? 'text-red-400 animate-pulse' :
                    isUncomfortable ? 'text-yellow-400' :
                    'text-green-400'
                  }`}>
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex gap-1.5">
                  <button className={`w-6 h-6 rounded-full transition-all duration-200 ${
                    isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-600'
                  } flex items-center justify-center`}>
                    <Power className="w-3 h-3 text-white" />
                  </button>
                  <button className="w-6 h-6 bg-gray-600 hover:bg-gray-500 rounded-full transition-all duration-200 flex items-center justify-center">
                    <Settings className="w-3 h-3 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* Water Tank (Side) - Smaller */}
            <div className="absolute -right-3 top-16 w-12 h-24 bg-gradient-to-b from-blue-100 to-blue-200 rounded-r-2xl border-2 border-gray-400 opacity-80">
              <div className="absolute bottom-1.5 left-1.5 right-1.5 h-18 bg-gradient-to-t from-blue-400 to-blue-300 rounded-lg">
                {/* Water level indicator */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500 to-blue-400 rounded-lg animate-pulse opacity-60"></div>
              </div>
              <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-4 h-1.5 bg-gray-400 rounded-full"></div>
            </div>

            {/* Coffee Bean Hopper (Left Side) - Smaller */}
            <div className="absolute -left-3 top-14 w-10 h-16 bg-gradient-to-b from-amber-800 to-amber-900 rounded-l-2xl border-2 border-gray-400">
              <div className="absolute bottom-1.5 left-1 right-1 h-12 bg-gradient-to-t from-amber-900 to-amber-700 rounded-lg overflow-hidden">
                {/* Coffee beans animation */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-0.5 h-0.5 bg-amber-600 rounded-full animate-bounce"
                    style={{
                      left: `${Math.random() * 80}%`,
                      top: `${Math.random() * 80}%`,
                      animationDelay: `${i * 200}ms`,
                      animationDuration: '2s'
                    }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Main Brewing Chamber - Compact */}
            <div className="bg-gradient-to-b from-gray-600 to-gray-700 rounded-2xl p-4 mb-4 relative">
              {/* Heating Element Glow */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl animate-pulse"></div>
              )}
              
              {/* Pressure Gauge */}
              <div className="absolute top-2 right-2 w-8 h-8 bg-black rounded-full border-2 border-gray-400 flex items-center justify-center">
                <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 ${
                  isActive ? 'border-green-400 bg-green-400/20' : 'border-gray-500'
                }`}>
                  <div className={`w-full h-full rounded-full transition-all duration-500 ${
                    isActive ? 'bg-gradient-to-r from-green-400 to-yellow-400 animate-spin' : 'bg-gray-600'
                  }`}></div>
                </div>
              </div>

              {/* Coffee Dispenser Head - Compact */}
              <div className="flex justify-center mb-3">
                <div className="relative">
                  {/* Main Dispenser */}
                  <div className="w-12 h-16 bg-gradient-to-b from-gray-500 to-gray-600 rounded-b-3xl border-2 border-gray-400 relative">
                    {/* Dispenser Holes */}
                    <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 grid grid-cols-3 gap-0.5">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-0.5 h-0.5 bg-gray-800 rounded-full"></div>
                      ))}
                    </div>
                    
                    {/* Steam Vents */}
                    <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 flex gap-0.5">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-0.5 h-1.5 bg-gray-800 rounded-full"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Coffee Stream */}
                  {isActive && (
                    <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                      {/* Multiple coffee streams */}
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-0.5 transition-all duration-300 rounded-full ${
                            isSpilled ? 'h-18 bg-gradient-to-b from-red-800 to-red-900 animate-pulse' :
                            isOverflowing ? 'h-16 bg-gradient-to-b from-amber-800 to-amber-900' :
                            isWarning ? 'h-12 bg-gradient-to-b from-amber-700 to-amber-800' :
                            'h-10 bg-gradient-to-b from-amber-600 to-amber-700'
                          } opacity-80`}
                          style={{
                            left: `${(i - 1) * 3}px`,
                            animationDelay: `${i * 100}ms`
                          }}
                        >
                          {/* Coffee drops */}
                          <div className="absolute inset-0 overflow-hidden rounded-full">
                            {[...Array(3)].map((_, j) => (
                              <div
                                key={j}
                                className="absolute w-0.5 h-0.5 bg-amber-300 rounded-full animate-bounce opacity-60"
                                style={{
                                  left: '25%',
                                  animationDelay: `${j * 150}ms`,
                                  animationDuration: '0.8s'
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Steam Effect */}
                  {isActive && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="flex space-x-0.5">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-0.5 h-6 bg-gray-300 rounded-full animate-pulse opacity-40"
                            style={{
                              animationDelay: `${i * 200}ms`,
                              animationDuration: '2s'
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Coffee Cup Platform - Compact */}
            <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl p-3 relative">
              {/* Platform Grating */}
              <div className="grid grid-cols-8 gap-0.5 mb-3">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="h-0.5 bg-gray-800 rounded-full"></div>
                ))}
              </div>

              {/* Realistic Coffee Cup - Compact */}
              <div className="flex justify-center">
                <div className="relative">
                  {/* Cup Shadow */}
                  <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-28 h-3 bg-black/20 rounded-full blur-sm"></div>
                  
                  {/* Main Cup - More realistic with transparency */}
                  <div className="w-24 h-32 relative overflow-hidden shadow-xl">
                    {/* Cup Body - Realistic glass/ceramic look */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/85 rounded-b-3xl border-3 border-gray-200 backdrop-blur-sm">
                      {/* Inner cup shadow for depth */}
                      <div className="absolute inset-1.5 rounded-b-3xl bg-gradient-to-b from-transparent via-gray-100/20 to-gray-200/30"></div>
                      
                      {/* Realistic rim highlight */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-b from-white to-transparent rounded-t-3xl"></div>
                    </div>
                    
                    {/* Coffee inside cup with realistic liquid movement */}
                    <div 
                      className={`absolute bottom-0.5 left-0.5 right-0.5 transition-all duration-1000 ease-out rounded-b-3xl overflow-hidden ${
                        isSpilled ? 'bg-gradient-to-t from-red-900 via-red-800 to-red-700' :
                        isOverflowing ? 'bg-gradient-to-t from-amber-900 via-amber-800 to-amber-700' :
                        isWarning ? 'bg-gradient-to-t from-amber-800 via-amber-700 to-amber-600' :
                        'bg-gradient-to-t from-amber-700 via-amber-600 to-amber-500'
                      }`}
                      style={{ height: `${coffeeLevel}%` }}
                    >
                      {/* Realistic coffee surface with movement */}
                      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-amber-300/60 via-amber-400/40 to-transparent rounded-full">
                        {/* Surface ripples animation */}
                        {isActive && (
                          <>
                            <div className="absolute top-0.5 left-1.5 w-3 h-0.5 bg-amber-200/40 rounded-full animate-pulse"></div>
                            <div className="absolute top-0 right-2 w-2 h-0.5 bg-amber-200/30 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-0.5 bg-amber-200/50 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                          </>
                        )}
                      </div>
                      
                      {/* Liquid movement effect - subtle sway */}
                      {isActive && (
                        <div className="absolute inset-0 animate-liquid-sway">
                          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-amber-300/20 to-transparent"></div>
                        </div>
                      )}
                      
                      {/* Coffee Foam Layer */}
                      {(isWarning || isOverflowing || isSpilled) && (
                        <div 
                          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-amber-100/80 via-amber-200/60 to-amber-300/40 transition-all duration-500 backdrop-blur-sm"
                          style={{ height: `${foamLevel}px` }}
                        >
                          {/* Foam Bubbles with realistic movement */}
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-0.5 h-0.5 bg-white/60 rounded-full animate-pulse"
                              style={{
                                left: `${15 + (i * 10)}%`,
                                top: `${Math.random() * 80}%`,
                                animationDelay: `${i * 300}ms`,
                                animationDuration: `${1.5 + Math.random()}s`
                              }}
                            ></div>
                          ))}
                          
                          {/* Foam surface movement */}
                          {isActive && (
                            <div className="absolute inset-0 animate-foam-bubble">
                              <div className="absolute top-0 left-1/4 w-1.5 h-0.5 bg-white/30 rounded-full"></div>
                              <div className="absolute top-0.5 right-1/4 w-1 h-0.5 bg-white/40 rounded-full"></div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Overflowing Foam */}
                      {(isOverflowing || isSpilled) && coffeeLevel > 90 && (
                        <div className="absolute -top-1.5 left-1.5 right-1.5 h-3 bg-gradient-to-b from-amber-200/80 to-amber-300/60 rounded-t-full animate-bounce opacity-80 backdrop-blur-sm">
                          {/* Foam drips */}
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-0.5 h-1.5 bg-amber-300/70 rounded-full animate-bounce"
                              style={{
                                left: `${25 + (i * 25)}%`,
                                top: '100%',
                                animationDelay: `${i * 200}ms`
                              }}
                            ></div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Cup Handle - More realistic */}
                    <div className="absolute right-0 top-1/2 transform translate-x-2.5 -translate-y-1/2">
                      <div className="w-6 h-12 border-3 border-gray-200 rounded-r-full bg-transparent shadow-lg backdrop-blur-sm">
                        {/* Handle inner shadow */}
                        <div className="absolute inset-0.5 border-2 border-gray-100/50 rounded-r-full"></div>
                      </div>
                    </div>

                    {/* Participant Name Label */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border-2 border-gray-200">
                        <span className="text-xs font-bold text-gray-800">{participantName}</span>
                      </div>
                    </div>

                    {/* Cup Measurement Lines - More subtle */}
                    <div className="absolute left-1.5 top-6 space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-3 h-0.5 bg-gray-300/40 opacity-30"></div>
                      ))}
                    </div>

                    {/* Realistic light reflection on cup */}
                    <div className="absolute top-3 left-3 w-1.5 h-6 bg-gradient-to-b from-white/60 to-transparent rounded-full blur-sm"></div>
                  </div>

                  {/* Major Spill - Only when time is completely up */}
                  {isSpilled && (
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                      <div className="w-36 h-8 rounded-full bg-red-800 animate-persistent-spill opacity-70 relative">
                        {/* Main puddle */}
                        <div className="absolute inset-0 rounded-full bg-red-900 opacity-60 animate-pulse"></div>
                        
                        {/* Continuous dripping drops */}
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-1.5 h-1.5 bg-red-700 rounded-full animate-drip"
                              style={{
                                left: `${(i - 2) * 10}px`,
                                animationDelay: `${i * 200}ms`,
                                animationDuration: '1.5s'
                              }}
                            ></div>
                          ))}
                        </div>

                        {/* Splash effects */}
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-0.5 h-0.5 bg-red-600 rounded-full animate-bounce opacity-60"
                            style={{
                              left: `${25 + (i * 15)}%`,
                              top: '-6px',
                              animationDelay: `${i * 300}ms`,
                              animationDuration: '2s'
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Minor overflow warning */}
                  {isOverflowing && !isSpilled && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className="w-28 h-4 rounded-full bg-amber-700/60 opacity-50 animate-pulse backdrop-blur-sm">
                        <div className="absolute inset-0 rounded-full bg-amber-800/40"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};