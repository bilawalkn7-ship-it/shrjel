import { useState } from 'react';
import { Stage } from './types';
import FloatingParticles from './components/FloatingParticles';
import MusicPlayerControl from './components/MusicPlayerControl';
import StageProgressBar from './components/StageProgressBar';
import Stage1HeartIntro from './components/Stage1HeartIntro';
import Stage2Question from './components/Stage2Question';
import Stage3WaitTransition from './components/Stage3WaitTransition';
import Stage4BirthdayCake from './components/Stage4BirthdayCake';
import Stage5CakeCutting from './components/Stage5CakeCutting';
import Stage6PersonalLetter from './components/Stage6PersonalLetter';
import Stage7PhotoSection from './components/Stage7PhotoSection';
import Stage8GiftBox from './components/Stage8GiftBox';
import Stage9FinalWish from './components/Stage9FinalWish';

export default function App() {
  const [currentStage, setCurrentStage] = useState<Stage>('intro');
  const [completedStages, setCompletedStages] = useState<Set<Stage>>(new Set());

  const advanceStage = (next: Stage) => {
    setCompletedStages((prev) => new Set(prev).add(currentStage));
    setCurrentStage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStage = (stage: Stage) => {
    setCurrentStage(stage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setCurrentStage('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      id="arfa-birthday-app"
      className="relative min-h-screen bg-linear-to-b from-rose-950 via-purple-950 to-slate-950 text-rose-50 overflow-x-hidden font-body flex flex-col justify-between selection:bg-rose-400 selection:text-rose-950"
    >
      {/* Background Floating Hearts & Glowing Particles */}
      <FloatingParticles />

      {/* Floating Music Player Controls (Top Right) */}
      <MusicPlayerControl />

      {/* Main Interactive Stage Container */}
      <main className="relative z-10 flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full px-3 sm:px-6 pt-16 pb-20 sm:pb-24">
        {currentStage === 'intro' && (
          <Stage1HeartIntro onStart={() => advanceStage('question')} />
        )}

        {currentStage === 'question' && (
          <Stage2Question onYes={() => advanceStage('wait')} />
        )}

        {currentStage === 'wait' && (
          <Stage3WaitTransition onComplete={() => advanceStage('cake')} />
        )}

        {currentStage === 'cake' && (
          <Stage4BirthdayCake onCandlesBlown={() => advanceStage('cutting')} />
        )}

        {currentStage === 'cutting' && (
          <Stage5CakeCutting onComplete={() => advanceStage('letter')} />
        )}

        {currentStage === 'letter' && (
          <Stage6PersonalLetter onComplete={() => advanceStage('photos')} />
        )}

        {currentStage === 'photos' && (
          <Stage7PhotoSection onComplete={() => advanceStage('gift')} />
        )}

        {currentStage === 'gift' && (
          <Stage8GiftBox onComplete={() => advanceStage('wish')} />
        )}

        {currentStage === 'wish' && (
          <Stage9FinalWish onRestart={handleRestart} />
        )}
      </main>

      {/* Stage Timeline / Progress Navigation at Bottom */}
      <StageProgressBar
        currentStage={currentStage}
        completedStages={completedStages}
        onSelectStage={handleSelectStage}
      />
    </div>
  );
}
