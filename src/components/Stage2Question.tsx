import { useState } from 'react';
import { Heart, Sparkles, Smile } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface Stage2QuestionProps {
  onYes: () => void;
}

const NO_RESPONSES = [
  'NO 🙈',
  'Are you sure? 🥺',
  'Really really sure? 🌸',
  'Think about it again! 💕',
  'You cannot escape my love! 🥰',
  'Okay fine, say YES! ✨',
];

export default function Stage2Question({ onYes }: Stage2QuestionProps) {
  const [noCount, setNoCount] = useState<number>(0);
  const [isWobbling, setIsWobbling] = useState<boolean>(false);

  const handleYes = () => {
    audioManager.playSparkle();
    onYes();
  };

  const handleNo = () => {
    audioManager.playHeartbeat();
    setIsWobbling(true);
    setNoCount((prev) => (prev + 1) % NO_RESPONSES.length);
    setTimeout(() => setIsWobbling(false), 500);
  };

  // Grow the YES button gently with each NO tap to make it playful and irresistible
  const yesScale = Math.min(1 + noCount * 0.12, 1.45);

  return (
    <section
      id="stage-ready-question"
      aria-label="Ready for surprise question"
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8"
    >
      <div
        id="question-card"
        className="w-full max-w-md bg-rose-950/60 backdrop-blur-xl border border-rose-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-rose-950/80 text-center relative overflow-hidden"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-3xl mb-4 animate-bounce">
            💌
          </div>

          <h1
            id="question-title"
            className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug mb-3"
          >
            Are you ready for your surprise, <span className="text-rose-300 font-romantic text-3xl sm:text-4xl block sm:inline">Arfa? ❤️</span>
          </h1>

          <p className="text-rose-200/80 text-sm mb-8 max-w-xs mx-auto">
            A little world of love and celebration has been crafted especially for you.
          </p>

          {/* Interactive buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
            <button
              id="btn-yes-surprise"
              type="button"
              onClick={handleYes}
              style={{ transform: `scale(${yesScale})` }}
              className="w-full sm:w-auto min-w-[150px] min-h-[50px] px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-semibold text-base shadow-lg shadow-rose-500/40 hover:shadow-rose-500/60 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white text-white" />
              <span>YES ❤️</span>
            </button>

            <button
              id="btn-no-surprise"
              type="button"
              onClick={handleNo}
              className={`w-full sm:w-auto min-w-[140px] min-h-[50px] px-6 py-3 rounded-full bg-rose-900/40 hover:bg-rose-900/60 border border-rose-400/30 text-rose-200 text-sm font-medium transition-all duration-200 active:scale-90 flex items-center justify-center gap-2 cursor-pointer ${
                isWobbling ? 'animate-wiggle scale-95' : ''
              }`}
            >
              <Smile className="w-4 h-4 text-rose-300" />
              <span>{NO_RESPONSES[noCount]}</span>
            </button>
          </div>

          {noCount > 0 && (
            <p className="mt-6 text-xs text-rose-300/90 italic flex items-center gap-1 animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>There's only one right answer, Arfa! 😉</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
