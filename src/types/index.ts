export interface Participant {
  id: string;
  name: string;
  hasSpoken: boolean;
}

export interface AppState {
  screen: 'welcome' | 'meeting' | 'completed';
  participants: Participant[];
  currentParticipantIndex: number;
  timerDuration: number; // en segundos
}

export interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  isPaused: boolean;
}