import { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface Stage1HeartIntroProps {
  onStart: () => void;
}

export default function Stage1HeartIntro({ onStart }: Stage1HeartIntroProps) {
  const [isTapped, setIsTapped] = useState(false);

  const handleHeartClick = () => {
    if (isTapped) return;
    setIsTapped(true);
    audioManager.playHeartbeat();
    // Start music on first tap since it's an explicit user gesture
    audioManager.playMusic();
    setTimeout(() => {
      onStart();
    }, 600);
  };

  return (
    <section
      id="stage-heart-intro"
      aria-label="Happy Birthday Arfa Intro"
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-8 select-none"
    >
      {/* Decorative ambient glowing orbs */}
      <div
        className="absolute w-72 h-72 rounded-full bg-rose-500/20 blur-3xl pointer-events-none -top-10 -left-10 animate-pulse"
        style={{ animationDuration: '4s' }}
      />
      <div
        className="absolute w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none -bottom-10 -right-10 animate-pulse"
        style={{ animationDuration: '5s' }}
      />

      <header className="relative z-10 mb-6 sm:mb-8 space-y-2 max-w-md mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-900/50 border border-rose-400/30 text-rose-200 text-xs tracking-wider uppercase backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-rose-300" />
          <span>A Special Birthday Surprise</span>
        </div>
        <p className="text-rose-300/80 text-sm font-light">
          Prepared with love, just for you
        </p>
      </header>

      {/* Main Glowing Pulsing Heart */}
      <main className="relative z-10 my-4 sm:my-6">
        <button
          id="btn-main-heart"
          type="button"
          onClick={handleHeartClick}
          aria-label="Tap the heart to begin Arfa's birthday surprise"
          className={`group relative flex flex-col items-center justify-center transition-all duration-500 transform cursor-pointer outline-none ${
            isTapped ? 'scale-125 opacity-90' : 'hover:scale-105 active:scale-95'
          }`}
        >
          {/* Subtle outer radiating waves */}
          <div className="absolute inset-0 -m-8 rounded-full bg-linear-to-r from-rose-500/25 to-pink-500/25 blur-xl animate-ping pointer-events-none opacity-40" />

          {/* SVG Heart */}
          <div className="relative w-56 h-56 sm:w-68 sm:h-68 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-full h-full text-rose-500 drop-shadow-[0_0_35px_rgba(244,63,94,0.8)] filter transition-all duration-300 animate-pulse-glow"
              fill="url(#heartGradient)"
            >
              <defs>
                <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="45%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
              </defs>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>

            {/* Centered Text inside/over the glowing heart */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white pointer-events-none">
              <h1 className="font-romantic text-3xl sm:text-4xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] leading-tight tracking-wide">
                Happy Birthday
              </h1>
              <div className="font-romantic text-4xl sm:text-5xl text-rose-100 font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] mt-1 flex items-center gap-1.5">
                <span>Arfa</span>
                <span className="text-2xl animate-bounce">❤️</span>
              </div>
            </div>
          </div>

          {/* Prompt under the heart */}
          <div className="mt-8 flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-100 text-sm font-medium backdrop-blur-md shadow-lg shadow-rose-950/40 transition-all">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
            <span>Tap the heart to begin ✨</span>
          </div>
        </button>
      </main>

      <footer className="relative z-10 mt-6 text-rose-300/70 text-xs">
        Touch anywhere on the heart • Turn up your sound 🎵
      </footer>
    </section>
  );
}
