import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { MeetingScreen } from './components/MeetingScreen';
import { SEOHead } from './components/SEOHead';
import { useAnalytics } from './hooks/useAnalytics';
import { trackPageView, trackMeetingStart, trackMeetingComplete } from './utils/analytics';
import { Participant, AppState } from './types';

function App() {
  const [appState, setAppState] = useState<AppState>({
    screen: 'welcome',
    participants: [],
    currentParticipantIndex: 0,
    timerDuration: 120, // 2 minutos por defecto
  });

  // Initialize analytics
  const { isEnabled: analyticsEnabled } = useAnalytics();

  // Track page views when screen changes
  useEffect(() => {
    if (analyticsEnabled) {
      switch (appState.screen) {
        case 'welcome':
          trackPageView('Daily Brew - Inicio', window.location.href);
          break;
        case 'meeting':
          trackPageView(
            `Daily Brew - Reunión con ${appState.participants.length} participantes`,
            window.location.href
          );
          break;
      }
    }
  }, [appState.screen, analyticsEnabled]);

  const handleStartMeeting = (participantNames: string[], timerDuration: number) => {
    const participants: Participant[] = participantNames.map((name, index) => ({
      id: `participant-${index}`,
      name: name.trim(),
      hasSpoken: false,
    }));

    // Track meeting start
    if (analyticsEnabled) {
      trackMeetingStart(participants.length, timerDuration);
    }

    setAppState({
      screen: 'meeting',
      participants,
      currentParticipantIndex: 0,
      timerDuration,
    });
  };

  const handleRestart = () => {
    // Shuffle participants again
    const shuffledParticipants = [...appState.participants]
      .sort(() => Math.random() - 0.5)
      .map((p, index) => ({
        ...p,
        id: `participant-${index}-restart`,
        hasSpoken: false,
      }));

    setAppState({
      ...appState,
      participants: shuffledParticipants,
      currentParticipantIndex: 0,
    });
  };

  const handleGoHome = () => {
    setAppState({
      screen: 'welcome',
      participants: [],
      currentParticipantIndex: 0,
      timerDuration: 120,
    });
  };

  const handleMeetingComplete = (totalDuration: number) => {
    if (analyticsEnabled) {
      trackMeetingComplete(
        appState.participants.length,
        totalDuration,
        appState.timerDuration
      );
    }
  };

  // Dynamic SEO based on current screen
  const getSEOProps = () => {
    switch (appState.screen) {
      case 'meeting':
        return {
          title: `Daily Brew - Reunión en progreso con ${appState.participants.length} participantes ☕`,
          description: `Reunión diaria en curso con ${appState.participants.length} participantes. Daily Brew facilita tus stand-ups con temporizadores y animaciones interactivas.`,
          keywords: "reunión en progreso, daily standup activo, scrum meeting, team collaboration en vivo"
        };
      default:
        return {
          title: "Daily Brew - Reuniones diarias con sabor a café ☕",
          description: "Transforma tus daily standups en una experiencia divertida y visual. Daily Brew facilita reuniones diarias con animaciones de café, temporizadores inteligentes y selección aleatoria de participantes.",
          keywords: "daily standup, scrum, reuniones diarias, agile, productividad, team meetings, coffee, café"
        };
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead {...getSEOProps()} />
      
      {appState.screen === 'welcome' && (
        <WelcomeScreen onStartMeeting={handleStartMeeting} />
      )}
      
      {appState.screen === 'meeting' && (
        <MeetingScreen
          participants={appState.participants}
          timerDuration={appState.timerDuration}
          onRestart={handleRestart}
          onGoHome={handleGoHome}
          onMeetingComplete={handleMeetingComplete}
        />
      )}
    </div>
  );
}

export default App;