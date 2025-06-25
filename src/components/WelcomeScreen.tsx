import React, { useState, useEffect } from 'react';
import { Coffee, Plus, Users, ArrowRight, Clock } from 'lucide-react';
import { AnimatedCoffeeCharacter } from './AnimatedCoffeeCharacter';
import { 
  trackParticipantManagement, 
  trackTimerDurationChange,
  trackUserEngagement 
} from '../utils/analytics';

interface WelcomeScreenProps {
  onStartMeeting: (participants: string[], timerDuration: number) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartMeeting }) => {
  const [participants, setParticipants] = useState<string[]>(['']);
  const [timerDuration, setTimerDuration] = useState<number>(120); // 2 minutos por defecto
  const [isAnimating, setIsAnimating] = useState(false);

  // Load saved data on component mount
  useEffect(() => {
    const savedParticipants = localStorage.getItem('dailyBrew_participants');
    const savedTimerDuration = localStorage.getItem('dailyBrew_timerDuration');
    
    if (savedParticipants) {
      try {
        const parsedParticipants = JSON.parse(savedParticipants);
        if (Array.isArray(parsedParticipants) && parsedParticipants.length > 0) {
          setParticipants(parsedParticipants);
          
          // Track feature discovery for returning users
          trackUserEngagement('feature_discovery', {
            feature: 'participant_persistence',
            saved_participant_count: parsedParticipants.filter(p => p.trim()).length,
          });
        }
      } catch (error) {
        console.log('Error loading saved participants:', error);
      }
    }
    
    if (savedTimerDuration) {
      const parsedDuration = parseInt(savedTimerDuration, 10);
      if (!isNaN(parsedDuration) && parsedDuration > 0) {
        setTimerDuration(parsedDuration);
      }
    }
  }, []);

  // Save participants to localStorage whenever they change
  useEffect(() => {
    const validParticipants = participants.filter(name => name.trim() !== '');
    if (validParticipants.length > 0) {
      localStorage.setItem('dailyBrew_participants', JSON.stringify(participants));
    }
  }, [participants]);

  // Save timer duration to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('dailyBrew_timerDuration', timerDuration.toString());
  }, [timerDuration]);

  const addParticipant = () => {
    const newParticipants = [...participants, ''];
    setParticipants(newParticipants);
    
    // Track participant management
    trackParticipantManagement('add', newParticipants.filter(p => p.trim()).length);
  };

  const updateParticipant = (index: number, name: string) => {
    const updated = [...participants];
    updated[index] = name;
    setParticipants(updated);
  };

  const removeParticipant = (index: number) => {
    if (participants.length > 1) {
      const newParticipants = participants.filter((_, i) => i !== index);
      setParticipants(newParticipants);
      
      // Track participant management
      trackParticipantManagement('remove', newParticipants.filter(p => p.trim()).length);
    }
  };

  const clearAllParticipants = () => {
    setParticipants(['']);
    localStorage.removeItem('dailyBrew_participants');
    
    // Track participant management
    trackParticipantManagement('clear_all', 0);
  };

  const handleTimerDurationChange = (newDuration: number) => {
    const oldDuration = timerDuration;
    setTimerDuration(newDuration);
    
    // Track timer duration change
    trackTimerDurationChange(newDuration, oldDuration);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // Si el campo actual no está vacío y es el último campo, agregar uno nuevo
      if (participants[index].trim() !== '' && index === participants.length - 1) {
        addParticipant();
        // Focus en el nuevo campo después de un pequeño delay
        setTimeout(() => {
          const inputs = document.querySelectorAll('input[type="text"]');
          const nextInput = inputs[index + 1] as HTMLInputElement;
          if (nextInput) {
            nextInput.focus();
          }
        }, 50);
      } else if (participants[index].trim() !== '') {
        // Si no es el último campo, mover al siguiente campo existente
        const inputs = document.querySelectorAll('input[type="text"]');
        const nextInput = inputs[index + 1] as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        } else {
          // Si no hay más campos, intentar iniciar la reunión
          const validParticipants = participants.filter(name => name.trim() !== '');
          if (validParticipants.length >= 2) {
            handleStartMeeting();
          }
        }
      }
    }
  };

  const handleStartMeeting = () => {
    const validParticipants = participants.filter(name => name.trim() !== '');
    if (validParticipants.length >= 2) {
      setIsAnimating(true);
      setTimeout(() => {
        onStartMeeting(validParticipants, timerDuration);
      }, 800);
    }
  };

  const validParticipants = participants.filter(name => name.trim() !== '');

  const timerOptions = [
    { value: 60, label: '1 minuto' },
    { value: 120, label: '2 minutos' },
    { value: 180, label: '3 minutos' },
    { value: 300, label: '5 minutos' },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4 transition-all duration-800 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
      <div className="max-w-2xl w-full">
        {/* Animated Character Header */}
        <div className="text-center animate-fade-in">
          <AnimatedCoffeeCharacter />
          
          <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent animate-title-bounce">
            Daily Brew
          </h1>
          <p className="text-xl text-gray-600 max-w-md mx-auto leading-relaxed animate-subtitle-fade">
            ¡Hola! Soy tu asistente cafetero. Preparemos una reunión deliciosa ☕
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20 animate-card-slide-up">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-semibold text-gray-800">¿Quién se une al café?</h2>
          </div>

          {/* Persistence indicator */}
          {validParticipants.length > 0 && (
            <div className="mb-4 p-3 bg-green-50 rounded-xl border border-green-200">
              <p className="text-green-700 text-sm font-medium mb-1">
                💾 Datos guardados automáticamente
              </p>
              <p className="text-green-600 text-xs">
                Tus participantes y configuración se mantienen entre sesiones
              </p>
            </div>
          )}

          {/* Keyboard shortcut hint */}
          <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-blue-700 text-sm font-medium mb-1">
              💡 Tip: Presiona <kbd className="px-2 py-1 bg-blue-200 rounded text-xs font-mono">Enter</kbd> para agregar rápidamente
            </p>
            <p className="text-blue-600 text-xs">
              Escribe un nombre y presiona Enter para agregar automáticamente el siguiente campo
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {participants.map((participant, index) => (
              <div key={index} className="flex items-center gap-3 group animate-input-appear" style={{animationDelay: `${index * 100}ms`}}>
                <div className="flex-1">
                  <input
                    type="text"
                    value={participant}
                    onChange={(e) => updateParticipant(index, e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    placeholder={`Participante ${index + 1}`}
                    className="w-full px-4 py-3 bg-white border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 text-gray-800 placeholder-gray-400"
                    autoFocus={index === participants.length - 1 && participants.length > 1}
                  />
                </div>
                {participants.length > 1 && (
                  <button
                    onClick={() => removeParticipant(index)}
                    className="opacity-0 group-hover:opacity-100 w-10 h-10 flex items-center justify-center bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-200"
                    title="Eliminar participante"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Timer Configuration */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-gray-800">Tiempo por participante</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {timerOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleTimerDurationChange(option.value)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    timerDuration === option.value
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100 border-2 border-amber-200 hover:scale-102'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={addParticipant}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-amber-100 text-amber-700 rounded-xl hover:bg-amber-200 transition-all duration-200 font-medium group"
              title="También puedes presionar Enter en el último campo"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
              Agregar participante
            </button>

            {validParticipants.length > 0 && (
              <button
                onClick={clearAllParticipants}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
                title="Limpiar todos los participantes guardados"
              >
                🗑️ Limpiar todo
              </button>
            )}

            <button
              onClick={handleStartMeeting}
              disabled={validParticipants.length < 2}
              className={`flex-1 flex items-center justify-center gap-3 px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 ${
                validParticipants.length >= 2
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-pulse-gentle'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Coffee className="w-6 h-6" />
              Preparar café
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {validParticipants.length > 0 && (
            <div className="mt-6 text-center animate-stats-appear">
              <p className="text-sm text-gray-600">
                {validParticipants.length} {validParticipants.length === 1 ? 'persona lista' : 'personas listas'} para el café ☕
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {timerDuration / 60} {timerDuration === 60 ? 'minuto' : 'minutos'} por participante
              </p>
            </div>
          )}

          {/* Additional keyboard shortcuts info */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">Atajos de teclado:</p>
              <div className="flex justify-center gap-4 text-xs text-gray-600">
                <span><kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Enter</kbd> Agregar/Siguiente</span>
                <span><kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Tab</kbd> Navegar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};