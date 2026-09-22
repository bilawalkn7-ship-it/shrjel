import { useEffect, useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface Stage3WaitTransitionProps {
  onComplete: () => void;
}

const MESSAGES = [
  'Wait a little…',
  'Something special is coming for you… ✨',
  'Just for you, Arfa ❤️',
];

export default function Stage3WaitTransition({ onComplete }: Stage3WaitTransitionProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment progress over 3.6 seconds
    const intervalTime = 40;
    const totalTime = 3600;
    const step = (intervalTime / totalTime) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            audioManager.playSparkle();
            onComplete();
          }, 400);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    // Cycle through messages
    const msgTimer1 = setTimeout(() => setCurrentMessageIndex(1), 1200);
    const msgTimer2 = setTimeout(() => setCurrentMessageIndex(2), 2400);

    return () => {
      clearTimeout(msgTimer1);
      clearTimeout(msgTimer2);
    };
  }, []);

  return (
    <section
      id="stage-wait-transition"
      aria-label="Surprise loading transition"
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8"
    >
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Animated magic glowing orb with heart */}
        <div className="relative w-36 h-36 flex items-center justify-center mb-8">
          {/* Outer rotating glowing border */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-rose-400/50 animate-spin" style={{ animationDuration: '8s' }} />
          <div className="absolute -inset-2 rounded-full bg-linear-to-tr from-rose-500/30 to-purple-500/30 blur-xl animate-pulse" />
          
          <div className="relative w-28 h-28 rounded-full bg-rose-900/60 border border-rose-300/40 backdrop-blur-md flex items-center justify-center shadow-lg shadow-rose-950/80">
            <Heart className="w-12 h-12 text-rose-400 fill-rose-400 animate-pulse-glow" />
            <Sparkles className="w-5 h-5 text-amber-300 absolute -top-1 -right-1 animate-bounce" />
          </div>
        </div>

        {/* Dynamic messages */}
        <div className="h-20 flex items-center justify-center px-4">
          <p
            key={currentMessageIndex}
            className="font-romantic text-2xl sm:text-3xl text-rose-100 font-semibold drop-shadow-md transition-all duration-500 transform animate-fadeIn"
          >
            {MESSAGES[currentMessageIndex]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 sm:w-72 h-2.5 bg-rose-950/80 rounded-full overflow-hidden border border-rose-400/30 mt-6 p-0.5">
          <div
            className="h-full bg-linear-to-r from-rose-500 via-pink-400 to-amber-300 rounded-full transition-all duration-100 shadow-[0_0_12px_rgba(244,63,94,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          type="button"
          onClick={() => {
            audioManager.playSparkle();
            onComplete();
          }}
          className="mt-8 text-xs text-rose-300/80 hover:text-rose-200 underline underline-offset-4 cursor-pointer min-h-[44px] flex items-center justify-center"
        >
          Skip waiting & show surprise ✨
        </button>
      </div>
    </section>
  );
}
