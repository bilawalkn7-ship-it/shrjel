import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface Stage5CakeCuttingProps {
  onComplete: () => void;
}

export default function Stage5CakeCutting({ onComplete }: Stage5CakeCuttingProps) {
  const [isCutting, setIsCutting] = useState(false);
  const [isCutComplete, setIsCutComplete] = useState(false);

  const triggerConfetti = () => {
    // Left & right celebration cannons
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6, x: 0.2 },
      colors: ['#f43f5e', '#ec4899', '#fb7185', '#fbbf24', '#a855f7'],
    });
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6, x: 0.8 },
      colors: ['#f43f5e', '#ec4899', '#fb7185', '#fbbf24', '#38bdf8'],
    });
  };

  const handleCut = () => {
    if (isCutting || isCutComplete) return;
    setIsCutting(true);
    audioManager.playCutSound();

    // Knife slices down
    setTimeout(() => {
      audioManager.playSparkle();
      setIsCutComplete(true);
      setIsCutting(false);
      triggerConfetti();
    }, 1200);
  };

  return (
    <section
      id="stage-cake-cutting"
      aria-label="Cake Cutting Celebration"
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-6 select-none"
    >
      <header className="relative z-10 mb-4 space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-900/50 border border-rose-400/30 text-rose-200 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Cake Ceremony for Arfa</span>
        </div>
        <h1
          id="cutting-heading"
          className="font-romantic text-3xl sm:text-4xl text-rose-100 font-bold drop-shadow-md"
        >
          {isCutComplete ? 'Celebration Time! 🎉' : 'Cut Your Birthday Cake 🎂🔪'}
        </h1>
        <p className="text-rose-200/80 text-sm max-w-sm mx-auto">
          {isCutComplete
            ? 'Here is a delicious slice filled with love, sweet dimples & warm memories!'
            : 'Tap the knife button to make the ceremonial first birthday slice!'}
        </p>
      </header>

      {/* Cutting Stage Canvas */}
      <div className="relative my-4 flex flex-col items-center justify-center w-72 sm:w-84 h-72">
        {/* Animated Ceremonial Knife */}
        {!isCutComplete && (
          <div
            id="ceremonial-knife"
            className={`absolute z-30 transition-all duration-1000 ${
              isCutting
                ? 'top-20 scale-105 rotate-12 drop-shadow-[0_0_15px_rgba(251,191,36,0.9)]'
                : '-top-4 right-6 -rotate-45 animate-pulse'
            }`}
          >
            {/* Knife SVG graphic */}
            <div className="relative w-16 h-40 flex flex-col items-center">
              {/* Blade */}
              <div className="w-4 h-24 bg-gradient-to-r from-stone-200 via-white to-stone-300 rounded-t-sm shadow-md border border-stone-300 clip-knife" />
              {/* Gold Guard */}
              <div className="w-7 h-2 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 rounded-sm shadow-xs" />
              {/* Rose Gold Handle with Bow */}
              <div className="w-3.5 h-12 bg-gradient-to-b from-rose-400 to-rose-700 rounded-b-md shadow-inner relative flex items-center justify-center">
                <span className="text-[10px]">🎀</span>
              </div>
            </div>
          </div>
        )}

        {/* The Cake (Whole or Divided into Slices) */}
        {!isCutComplete ? (
          /* Whole Decorated Cake */
          <div className="relative flex flex-col items-center w-64">
            <div className="w-48 h-12 bg-gradient-to-r from-pink-400 to-rose-400 rounded-t-2xl shadow-md border-t-2 border-white/60 flex justify-around items-center px-4">
              <span className="text-xs">🍓</span>
              <span className="font-romantic text-white font-bold text-sm">Arfa ❤️</span>
              <span className="text-xs">🍓</span>
            </div>
            <div className="w-56 h-14 bg-gradient-to-r from-rose-500 to-pink-500 rounded-t-xl shadow-lg border-t-2 border-white/50 -mt-1 flex justify-center items-center">
              <span className="text-xs text-rose-100">✨ Rainbow Cream ✨</span>
            </div>
            <div className="w-64 h-16 bg-gradient-to-r from-rose-600 to-pink-600 rounded-t-xl shadow-xl border-t-2 border-white/50 -mt-1" />
            <div className="w-72 h-3 bg-stone-200 rounded-full shadow-lg" />
          </div>
        ) : (
          /* Sliced Cake Display: Divided into Several Slices with Filling */
          <div className="relative flex items-center justify-center gap-2 sm:gap-3 animate-fadeIn">
            {/* Left Slice Portion */}
            <div className="w-24 sm:w-28 flex flex-col items-center transform -translate-x-3 -rotate-6 transition-all duration-700">
              <div className="w-20 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-tl-xl border-l border-white/60" />
              <div className="w-24 h-12 bg-gradient-to-r from-rose-500 to-pink-500 border-l border-white/50" />
              <div className="w-26 h-14 bg-gradient-to-r from-rose-600 to-pink-600 rounded-bl-xl border-l border-white/50" />
              <div className="w-28 h-2 bg-stone-200 rounded-full" />
              <span className="text-xs text-rose-200 mt-2 font-medium">For Friends 🍰</span>
            </div>

            {/* Cut Golden Slice Center (Arfa's Special Slice on Plate) */}
            <div className="w-28 sm:w-32 flex flex-col items-center transform scale-110 -translate-y-4 transition-all duration-700">
              <div className="relative bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-rose-300/40 shadow-xl flex flex-col items-center">
                <span className="text-2xl mb-1 animate-bounce">🍰</span>
                <span className="font-romantic text-rose-100 font-bold text-sm">
                  Arfa's Slice ✨
                </span>
                <div className="flex gap-1 mt-1 text-[10px] text-amber-300">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
              <span className="text-xs text-amber-300 font-medium mt-1">Extra Sweet! 💕</span>
            </div>

            {/* Right Slice Portion */}
            <div className="w-24 sm:w-28 flex flex-col items-center transform translate-x-3 rotate-6 transition-all duration-700">
              <div className="w-20 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-tr-xl border-r border-white/60" />
              <div className="w-24 h-12 bg-gradient-to-r from-rose-500 to-pink-500 border-r border-white/50" />
              <div className="w-26 h-14 bg-gradient-to-r from-rose-600 to-pink-600 rounded-br-xl border-r border-white/50" />
              <div className="w-28 h-2 bg-stone-200 rounded-full" />
              <span className="text-xs text-rose-200 mt-2 font-medium">For Family 🍰</span>
            </div>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="relative z-20 mt-4 flex flex-col items-center gap-3">
        {!isCutComplete ? (
          <button
            id="btn-cut-cake"
            type="button"
            disabled={isCutting}
            onClick={handleCut}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 hover:from-rose-400 hover:to-amber-300 text-white font-semibold text-base shadow-lg shadow-rose-500/50 active:scale-95 transition-all flex items-center gap-2 cursor-pointer min-h-[48px]"
          >
            <span>Cut the Cake 🎂🔪</span>
          </button>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                id="btn-re-confetti"
                type="button"
                onClick={triggerConfetti}
                className="px-4 py-2 rounded-full bg-rose-900/50 border border-rose-400/40 text-rose-200 text-xs font-medium hover:bg-rose-800/60 active:scale-95 transition min-h-[40px] flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>More Confetti! 🎊</span>
              </button>
            </div>

            <button
              id="btn-proceed-letter"
              type="button"
              onClick={onComplete}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-semibold text-base shadow-lg shadow-rose-500/50 active:scale-95 transition-all flex items-center gap-2 cursor-pointer min-h-[48px]"
            >
              <span>Read Your Special Letter 💌</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
