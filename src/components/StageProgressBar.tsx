import { Stage } from '../types';

interface StageProgressBarProps {
  currentStage: Stage;
  completedStages: Set<Stage>;
  onSelectStage: (stage: Stage) => void;
}

const STAGES: Array<{ id: Stage; label: string; icon: string }> = [
  { id: 'intro', label: 'Heart', icon: '❤️' },
  { id: 'question', label: 'Surprise', icon: '💌' },
  { id: 'wait', label: 'Magic', icon: '✨' },
  { id: 'cake', label: 'Candles', icon: '🎂' },
  { id: 'cutting', label: 'Celebrate', icon: '🍰' },
  { id: 'letter', label: 'Letter', icon: '📜' },
  { id: 'photos', label: 'Memories', icon: '📸' },
  { id: 'gift', label: 'Gift Box', icon: '🎁' },
  { id: 'wish', label: 'Make a Wish', icon: '🌟' },
];

export default function StageProgressBar({
  currentStage,
  completedStages,
  onSelectStage,
}: StageProgressBarProps) {
  // Only show progress after intro stage
  if (currentStage === 'intro') return null;

  return (
    <nav
      id="birthday-journey-progress"
      aria-label="Birthday surprise timeline"
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] w-auto px-3 py-1.5 rounded-full bg-rose-950/80 backdrop-blur-md border border-rose-400/25 shadow-xl shadow-rose-950/60"
    >
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-0.5 px-1 scrollbar-none">
        {STAGES.map((st) => {
          const isCurrent = currentStage === st.id;
          const isUnlocked = completedStages.has(st.id) || isCurrent;

          return (
            <button
              key={st.id}
              id={`stage-nav-${st.id}`}
              type="button"
              disabled={!isUnlocked}
              onClick={() => onSelectStage(st.id)}
              title={st.label}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all min-h-[34px] ${
                isCurrent
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/40 scale-105'
                  : isUnlocked
                  ? 'bg-rose-900/40 text-rose-300 hover:bg-rose-800/60'
                  : 'bg-rose-950/30 text-rose-500/40 cursor-not-allowed opacity-40'
              }`}
            >
              <span className="text-xs">{st.icon}</span>
              <span className="hidden md:inline">{st.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
