import React, { useState, useEffect, useRef } from 'react';
import { Coffee, ArrowRight, Home, CheckCircle, Clock, Volume2, VolumeX } from 'lucide-react';
import { CoffeeCup } from './CoffeeCup';
import { CoffeeMachine } from './CoffeeMachine';
import { Timer } from './Timer';
import { TimerBackground } from './TimerBackground';
import { Participant, TimerState } from '../types';
import { 
  trackParticipantTurn, 
  trackTimerAction, 
  trackViewToggle, 
  trackMusicToggle,
  trackUserEngagement 
} from '../utils/analytics';

interface MeetingScreenProps {
  participants: Participant[];
  timerDuration: number;
  onRestart: () => void;
  onGoHome: () => void;
  onMeetingComplete?: (totalDuration: number) => void;
}

export const MeetingScreen: React.FC<MeetingScreenProps> = ({ 
  participants, 
  timerDuration,
  onRestart, 
  onGoHome,
  onMeetingComplete 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [participantList, setParticipantList] = useState(participants);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [meetingComplete, setMeetingComplete] = useState(false);
  const [showCoffeeMachine, setShowCoffeeMachine] = useState(true); // Default to machine view
  const [isMuted, setIsMuted] = useState(false);
  const [meetingStartTime] = useState(Date.now());
  const audioRef = useRef<HTMLAudioElement>(null);
  const [timerState, setTimerState] = useState<TimerState>({
    timeLeft: timerDuration,
    isRunning: true,
    isPaused: false,
  });

  const currentParticipant = participantList[currentIndex];
  const completedCount = participantList.filter(p => p.hasSpoken).length;
  const progress = (completedCount / participantList.length) * 100;

  // Initialize background music
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set volume to 30%
      audioRef.current.loop = true;
      
      // Try to play the music
      const playMusic = async () => {
        try {
          await audioRef.current?.play();
        } catch (error) {
          console.log('Autoplay prevented, user interaction required');
        }
      };
      
      if (!isMuted) {
        playMusic();
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Handle mute/unmute
  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.log);
      }
    }
  }, [isMuted]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (timerState.isRunning && !timerState.isPaused && timerState.timeLeft > 0 && !meetingComplete) {
      interval = setInterval(() => {
        setTimerState(prev => ({
          ...prev,
          timeLeft: Math.max(0, prev.timeLeft - 1)
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerState.isRunning, timerState.isPaused, timerState.timeLeft, meetingComplete]);

  // Función para obtener el siguiente participante aleatorio
  const getNextRandomParticipant = () => {
    const remainingParticipants = participantList
      .map((participant, index) => ({ participant, index }))
      .filter(({ participant }) => !participant.hasSpoken);

    if (remainingParticipants.length === 0) {
      return -1; // No hay más participantes
    }

    // Si solo queda uno, devolver ese
    if (remainingParticipants.length === 1) {
      return remainingParticipants[0].index;
    }

    // Seleccionar aleatoriamente entre los participantes restantes
    // Excluir el participante actual si aún no ha hablado
    const availableParticipants = remainingParticipants.filter(
      ({ index }) => index !== currentIndex
    );

    const participantsToChooseFrom = availableParticipants.length > 0 
      ? availableParticipants 
      : remainingParticipants;

    const randomIndex = Math.floor(Math.random() * participantsToChooseFrom.length);
    return participantsToChooseFrom[randomIndex].index;
  };

  const handleNext = () => {
    if (completedCount < participantList.length) {
      setIsTransitioning(true);
      
      // Track participant turn completion
      const timeUsed = timerDuration - timerState.timeLeft;
      trackParticipantTurn(
        currentIndex,
        currentParticipant?.name || '',
        timeUsed,
        timerDuration
      );
      
      // Mark current participant as spoken
      const updated = [...participantList];
      if (currentIndex < updated.length) {
        updated[currentIndex].hasSpoken = true;
      }
      setParticipantList(updated);

      setTimeout(() => {
        // Check if meeting is complete after marking current participant
        const newCompletedCount = updated.filter(p => p.hasSpoken).length;
        
        if (newCompletedCount >= participantList.length) {
          setMeetingComplete(true);
          setTimerState(prev => ({ ...prev, isRunning: false }));
          
          // Track meeting completion
          const totalDuration = Date.now() - meetingStartTime;
          if (onMeetingComplete) {
            onMeetingComplete(totalDuration);
          }
        } else {
          // Get next random participant
          const nextIndex = getNextRandomParticipant();
          
          if (nextIndex !== -1) {
            setCurrentIndex(nextIndex);
            // Reset timer for next participant
            setTimerState({
              timeLeft: timerDuration,
              isRunning: true,
              isPaused: false,
            });
          } else {
            // This shouldn't happen, but just in case
            setMeetingComplete(true);
            setTimerState(prev => ({ ...prev, isRunning: false }));
          }
        }
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleTogglePause = () => {
    const newPausedState = !timerState.isPaused;
    setTimerState(prev => ({
      ...prev,
      isPaused: newPausedState
    }));
    
    // Track timer action
    trackTimerAction(
      newPausedState ? 'pause' : 'resume',
      timerState.timeLeft,
      timerDuration
    );
  };

  const toggleView = () => {
    const newView = !showCoffeeMachine;
    setShowCoffeeMachine(newView);
    
    // Track view toggle
    trackViewToggle(
      newView ? 'machine' : 'cups',
      participantList.length
    );
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    // Track music toggle
    trackMusicToggle(newMutedState);
  };

  useEffect(() => {
    // Shuffle participants on mount and select first random participant
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    const shuffledWithIds = shuffled.map((p, index) => ({ ...p, id: `${p.id}-${index}` }));
    setParticipantList(shuffledWithIds);
    
    // Set random starting participant
    const randomStartIndex = Math.floor(Math.random() * shuffledWithIds.length);
    setCurrentIndex(randomStartIndex);
    
    // Track meeting engagement
    trackUserEngagement('feature_discovery', {
      feature: 'random_participant_selection',
      participant_count: shuffledWithIds.length,
      timer_duration: timerDuration,
    });
  }, [participants, timerDuration]);

  // Get background color based on timer state
  const getBackgroundGradient = () => {
    const timePercentage = (timerState.timeLeft / timerDuration) * 100;
    
    if (timePercentage <= 20 || timerState.timeLeft === 0) {
      return 'from-red-400 via-red-300 to-pink-300'; // Danger - Red
    } else if (timePercentage <= 50) {
      return 'from-orange-400 via-yellow-300 to-amber-300'; // Warning - Orange/Yellow
    } else {
      return 'from-emerald-400 via-teal-300 to-cyan-300'; // Good - Green/Teal
    }
  };

  if (meetingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="animate-bounce mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-2xl">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            ¡Café completado! ☕
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            Excelente reunión. Todos han compartido sus updates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onGoHome}
              className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
            >
              <Home className="w-5 h-5" />
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000 relative overflow-hidden`}>
      {/* Background Music */}
      <audio
        ref={audioRef}
        preload="auto"
        className="hidden"
      >
        <source src="https://www.soundjay.com/misc/sounds/coffee-shop-ambience.mp3" type="audio/mpeg" />
        <source src="https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3" type="audio/mpeg" />
        {/* Fallback to a royalty-free coffee shop ambience */}
        <source src="https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-one/zapsplat_ambiences_coffee_shop_busy_general_ambience_people_talking_coffee_machine_etc_london_uk_16851.mp3" type="audio/mpeg" />
      </audio>

      {/* Giant Timer Background - Always visible */}
      <TimerBackground 
        timeLeft={timerState.timeLeft}
        totalTime={timerDuration}
        participantNumber={currentIndex + 1}
        participantName={currentParticipant?.name || ''}
      />

      {/* Top Controls Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Home Button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-2xl px-4 py-2">
              <Coffee className="w-6 h-6 text-white" />
              <span className="text-white font-bold text-lg">Daily Brew</span>
            </div>
            
            {/* Home Button */}
            <button
              onClick={onGoHome}
              className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white/30 transition-all duration-200 font-medium"
              title="Volver al inicio"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Inicio</span>
            </button>
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center gap-3">
            {/* Progress indicator */}
            <div className="bg-white/20 backdrop-blur-md rounded-2xl px-4 py-2 flex items-center gap-3">
              <Clock className="w-5 h-5 text-white" />
              <span className="text-white font-medium">{completedCount + 1}/{participantList.length}</span>
              <div className="w-16 h-2 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Music Control */}
            <button
              onClick={toggleMute}
              className={`p-3 rounded-2xl backdrop-blur-md transition-all duration-200 ${
                isMuted 
                  ? 'bg-white/20 text-white/60 hover:bg-white/30' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
              title={isMuted ? 'Activar música' : 'Silenciar música'}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* View Toggle */}
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-1 flex">
              <button
                onClick={() => setShowCoffeeMachine(true)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  showCoffeeMachine 
                    ? 'bg-white text-gray-800 shadow-md' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Máquina
              </button>
              <button
                onClick={() => setShowCoffeeMachine(false)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  !showCoffeeMachine 
                    ? 'bg-white text-gray-800 shadow-md' 
                    : 'text-white hover:bg-white/20'
                }`}
              >
                Tazas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 pt-24">
        {showCoffeeMachine ? (
          /* Coffee Machine View with Timer Background */
          <div className="max-w-4xl mx-auto">
            <CoffeeMachine
              participantName={currentParticipant?.name || ''}
              timeLeft={timerState.timeLeft}
              totalTime={timerDuration}
              isActive={!timerState.isPaused && timerState.isRunning}
            />
          </div>
        ) : (
          /* Traditional Cups View */
          <>
            {/* Current Speaker Spotlight */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className={`text-center transition-all duration-500 ${isTransitioning ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-2xl shadow-lg mb-6 border border-white/30">
                  <Coffee className="w-6 h-6" />
                  <span className="text-xl font-semibold">
                    Turno de {currentParticipant?.name}
                  </span>
                </div>
                
                <p className="text-lg text-white/80 mb-4">
                  Es momento de compartir tus updates del día 🌟
                </p>
                
                {/* Random Selection Indicator */}
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/30">
                  🎲 Seleccionado aleatoriamente
                </div>
              </div>
            </div>

            {/* Coffee Cups Grid */}
            <div className="max-w-6xl mx-auto mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                {participantList.map((participant, index) => (
                  <div
                    key={participant.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CoffeeCup
                      name={participant.name}
                      isActive={index === currentIndex}
                      hasSpoken={participant.hasSpoken}
                      index={index}
                      total={participantList.length}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Bottom Controls - Simplified */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            {/* Single Main Action Button */}
            <button
              onClick={handleNext}
              disabled={isTransitioning}
              className={`
                inline-flex items-center justify-center gap-3 px-12 py-4 rounded-2xl font-bold text-xl
                transition-all duration-300 backdrop-blur-md border-2 border-white/40 shadow-xl
                ${isTransitioning 
                  ? 'bg-white/20 cursor-not-allowed text-white/50' 
                  : 'bg-white/30 hover:bg-white/40 text-white hover:scale-105 hover:shadow-2xl'
                }
              `}
            >
              <Coffee className="w-7 h-7" />
              {completedCount + 1 >= participantList.length ? 'Finalizar café' : 'Siguiente taza (aleatorio)'}
              <ArrowRight className="w-7 h-7" />
            </button>
          </div>
          
          {/* Info about random selection */}
          <div className="mb-4 p-4 bg-white/20 backdrop-blur-md rounded-xl border border-white/30">
            <p className="text-white font-medium mb-2 text-center">
              🎲 Selección Aleatoria Activada
            </p>
            <p className="text-white/80 text-sm text-center">
              Cada turno se asigna aleatoriamente entre los participantes que aún no han hablado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};