import React from 'react';

export const AnimatedCoffeeCharacter: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center mb-12">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating coffee beans */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-3 bg-amber-600 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
        
        {/* Floating steam clouds */}
        {[...Array(5)].map((_, i) => (
          <div
            key={`steam-${i}`}
            className="absolute w-8 h-4 bg-gray-200 rounded-full opacity-10 animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${i * 1}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      {/* Main Character Container */}
      <div className="relative z-10 animate-float-gentle">
        {/* Character Shadow */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/10 rounded-full blur-md animate-shadow-pulse"></div>
        
        {/* Coffee Machine Character */}
        <div className="relative">
          {/* Steam coming from the top */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-8 bg-gray-300 rounded-full opacity-60 animate-steam-rise"
                style={{
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: '2s'
                }}
              ></div>
            ))}
          </div>

          {/* Main Body - Coffee Machine */}
          <div className="relative w-40 h-48 bg-gradient-to-b from-amber-100 via-amber-50 to-white rounded-3xl border-4 border-amber-300 shadow-2xl overflow-hidden">
            
            {/* Machine Top */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-amber-400 to-amber-300 rounded-t-3xl border-b-2 border-amber-500">
              {/* Control buttons */}
              <div className="flex justify-center gap-2 pt-3">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            </div>

            {/* Eyes */}
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 flex gap-6">
              {/* Left Eye */}
              <div className="relative w-8 h-8 bg-white rounded-full border-2 border-gray-800 animate-blink">
                <div className="absolute top-2 left-2 w-4 h-4 bg-black rounded-full animate-eye-look">
                  {/* Eye shine */}
                  <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full"></div>
                </div>
                {/* Eyelashes */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-0.5 h-2 bg-gray-600 rounded-full transform -rotate-12"></div>
                </div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 translate-x-1">
                  <div className="w-0.5 h-2 bg-gray-600 rounded-full"></div>
                </div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 translate-x-2">
                  <div className="w-0.5 h-2 bg-gray-600 rounded-full transform rotate-12"></div>
                </div>
              </div>

              {/* Right Eye */}
              <div className="relative w-8 h-8 bg-white rounded-full border-2 border-gray-800 animate-blink" style={{animationDelay: '0.1s'}}>
                <div className="absolute top-2 left-2 w-4 h-4 bg-black rounded-full animate-eye-look" style={{animationDelay: '0.2s'}}>
                  {/* Eye shine */}
                  <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full"></div>
                </div>
                {/* Eyelashes */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-0.5 h-2 bg-gray-600 rounded-full transform -rotate-12"></div>
                </div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 translate-x-1">
                  <div className="w-0.5 h-2 bg-gray-600 rounded-full"></div>
                </div>
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 translate-x-2">
                  <div className="w-0.5 h-2 bg-gray-600 rounded-full transform rotate-12"></div>
                </div>
              </div>
            </div>

            {/* Cheeks */}
            <div className="absolute top-20 left-4 w-4 h-4 bg-pink-200 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute top-20 right-4 w-4 h-4 bg-pink-200 rounded-full opacity-60 animate-pulse" style={{animationDelay: '0.5s'}}></div>

            {/* Mouth */}
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2">
              <div className="w-8 h-4 border-b-2 border-gray-800 rounded-b-full animate-smile"></div>
            </div>

            {/* Coffee dispenser */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-8 bg-gradient-to-b from-gray-600 to-gray-700 rounded-b-2xl border-2 border-gray-500">
                {/* Dispenser holes */}
                <div className="flex justify-center gap-1 pt-2">
                  <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                  <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Coffee cup at the bottom */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                {/* Cup */}
                <div className="w-16 h-20 bg-gradient-to-b from-white to-gray-100 rounded-b-2xl border-2 border-gray-300 shadow-lg">
                  {/* Coffee inside */}
                  <div className="absolute bottom-1 left-1 right-1 h-8 bg-gradient-to-t from-amber-800 to-amber-600 rounded-b-2xl">
                    {/* Coffee surface */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400 rounded-full opacity-60"></div>
                  </div>
                  
                  {/* Cup handle */}
                  <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2">
                    <div className="w-4 h-8 border-2 border-gray-300 rounded-r-full bg-transparent"></div>
                  </div>
                </div>

                {/* Heart floating above cup */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-red-400 text-lg animate-heart-float">
                  ♥
                </div>
              </div>
            </div>

            {/* Side decorations */}
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <div className="w-1 h-16 bg-amber-400 rounded-full opacity-30"></div>
            </div>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <div className="w-1 h-16 bg-amber-400 rounded-full opacity-30"></div>
            </div>

            {/* Brand name */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="text-xs font-bold text-amber-700 tracking-wider">DAILY BREW</div>
            </div>
          </div>

          {/* Arms */}
          <div className="absolute top-24 -left-8 w-6 h-16 bg-gradient-to-b from-amber-100 to-amber-50 rounded-full border-2 border-amber-300 transform rotate-12 animate-wave-left"></div>
          <div className="absolute top-24 -right-8 w-6 h-16 bg-gradient-to-b from-amber-100 to-amber-50 rounded-full border-2 border-amber-300 transform -rotate-12 animate-wave-right"></div>

          {/* Hands */}
          <div className="absolute top-36 -left-10 w-4 h-4 bg-amber-100 rounded-full border-2 border-amber-300 animate-wave-left"></div>
          <div className="absolute top-36 -right-10 w-4 h-4 bg-amber-100 rounded-full border-2 border-amber-300 animate-wave-right"></div>
        </div>

        {/* Sparkles around character */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute text-yellow-400 text-lg animate-sparkle"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: '2s'
            }}
          >
            ✨
          </div>
        ))}
      </div>
    </div>
  );
};