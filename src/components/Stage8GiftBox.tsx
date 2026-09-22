import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ArrowRight, Gift } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface Stage8GiftBoxProps {
  onComplete: () => void;
}

export default function Stage8GiftBox({ onComplete }: Stage8GiftBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sprayed, setSprayed] = useState(false);

  const handleOpenBox = () => {
    if (isOpen) return;
    setIsOpen(true);
    audioManager.playSparkle();

    // Trigger golden and rose confetti
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#fbbf24', '#f43f5e', '#f59e0b', '#f472b6', '#e0e7ff'],
    });
  };

  const handleSprayPerfume = () => {
    setSprayed(true);
    audioManager.playBlowSound();
    audioManager.playSparkle();
    setTimeout(() => setSprayed(false), 2000);
  };

  return (
    <section
      id="stage-gift-box"
      aria-label="Birthday Gift Box for Arfa"
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8 select-none"
    >
      <header className="relative z-10 mb-4 space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-900/50 border border-rose-400/30 text-rose-200 text-xs font-medium backdrop-blur-sm">
          <Gift className="w-3.5 h-3.5 text-amber-300" />
          <span>A Special Present</span>
        </div>
        <h1
          id="gift-heading"
          className="font-romantic text-3xl sm:text-4xl text-rose-100 font-bold drop-shadow-md"
        >
          A little gift for you, Arfa 🎁
        </h1>
        <p className="text-rose-200/80 text-xs sm:text-sm max-w-sm mx-auto">
          {isOpen
            ? 'A luxury signature fragrance crafted to match your radiant charm.'
            : 'Tap the gift box to untie the ribbon and see what is inside!'}
        </p>
      </header>

      {/* Interactive Gift Stage */}
      <div className="relative my-4 w-72 sm:w-84 h-80 flex flex-col items-center justify-center">
        {!isOpen ? (
          /* CLOSED GIFT BOX WITH GOLDEN RIBBON */
          <button
            id="btn-tap-gift-box"
            type="button"
            onClick={handleOpenBox}
            aria-label="Tap to open the gift box"
            className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 outline-none"
          >
            {/* Ambient glow behind box */}
            <div className="absolute inset-0 bg-rose-500/20 rounded-3xl blur-2xl group-hover:bg-rose-500/40 transition" />

            {/* Gift Box Lid with Bow */}
            <div className="relative z-20 w-52 sm:w-60 h-16 bg-gradient-to-r from-rose-500 via-pink-400 to-rose-500 rounded-t-2xl shadow-xl border-t-2 border-white/60 flex items-center justify-center">
              {/* Gold Ribbon on Lid */}
              <div className="w-8 h-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 shadow-md" />

              {/* Big Satin Ribbon Bow on Top */}
              <div className="absolute -top-7 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-400 to-yellow-200 -rotate-45 shadow-lg border border-amber-300 transform -translate-x-3" />
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-yellow-200 to-amber-400 rotate-45 shadow-lg border border-amber-300 transform translate-x-3" />
                <div className="absolute w-5 h-5 rounded-full bg-gradient-to-r from-amber-300 to-yellow-100 shadow-md border border-white" />
              </div>
            </div>

            {/* Gift Box Base */}
            <div className="relative z-10 w-48 sm:w-56 h-44 bg-gradient-to-r from-rose-600 via-pink-500 to-rose-600 rounded-b-2xl shadow-2xl border-b-2 border-rose-800 -mt-1 flex justify-center overflow-hidden">
              {/* Gold Ribbon Vertical */}
              <div className="w-8 h-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 shadow-md" />
              {/* Gold Ribbon Horizontal */}
              <div className="absolute top-16 w-full h-8 bg-gradient-to-b from-amber-400 via-yellow-200 to-amber-500 shadow-md" />

              {/* Tag on Box */}
              <div className="absolute bottom-6 right-4 px-2.5 py-1 bg-white text-rose-900 font-romantic font-bold text-xs rounded shadow-md rotate-6 border border-rose-200">
                For Arfa ❤️
              </div>
            </div>

            <span className="mt-4 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs font-medium backdrop-blur-xs group-hover:bg-rose-500/30">
              Tap to open 🎁
            </span>
          </button>
        ) : (
          /* OPEN GIFT BOX: LUXURY J. PERFUME BOTTLE PRESENTATION */
          <div className="relative flex flex-col items-center animate-fadeIn">
            {/* Floating Golden Perfume Mist Particles */}
            {sprayed && (
              <div className="absolute -top-12 z-30 flex flex-col items-center pointer-events-none animate-ping">
                <div className="w-32 h-16 bg-radial from-amber-200/80 to-transparent blur-xs rounded-full" />
                <span className="text-xs text-amber-200 font-romantic font-bold mt-1">
                  ✨ Sweet J. Fragrance ✨
                </span>
              </div>
            )}

            {/* PERFUME BOTTLE (J. Fragrance) */}
            <div
              id="j-perfume-bottle"
              onClick={handleSprayPerfume}
              title="Tap bottle to spray perfume!"
              className="group cursor-pointer relative flex flex-col items-center transition-transform hover:scale-105 active:scale-95 duration-300"
            >
              {/* Perfume Cap (Heavy Gold Metal) */}
              <div className="relative z-20 flex flex-col items-center">
                <div className="w-7 h-9 bg-gradient-to-r from-amber-400 via-yellow-100 to-amber-500 rounded-t-md shadow-md border-t border-amber-200 flex flex-col justify-around py-1">
                  <div className="w-full h-0.5 bg-amber-600/30" />
                  <div className="w-full h-0.5 bg-amber-600/30" />
                </div>
                {/* Gold Spray Collar */}
                <div className="w-10 h-2 bg-gradient-to-r from-amber-500 via-yellow-200 to-amber-600 rounded-sm shadow-xs -mt-0.5" />
              </div>

              {/* Crystal Glass Flacon Body */}
              <div className="relative z-10 w-32 sm:w-36 h-44 bg-gradient-to-b from-white/30 via-rose-100/20 to-rose-200/40 backdrop-blur-md rounded-2xl border-2 border-white/80 shadow-2xl shadow-rose-950/70 overflow-hidden flex flex-col items-center justify-between p-3">
                {/* Glass Light Reflections */}
                <div className="absolute top-0 left-2 w-2 h-full bg-white/40 blur-[1px] transform -skew-x-12 pointer-events-none" />
                <div className="absolute top-0 right-3 w-1 h-full bg-white/30 blur-[0.5px] transform -skew-x-12 pointer-events-none" />

                {/* Fragrance Liquid Inside */}
                <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-rose-500/50 via-pink-400/40 to-amber-300/30 rounded-b-xl">
                  {/* Subtle liquid wave */}
                  <div className="w-full h-2 bg-white/30 blur-[1px] -mt-1" />
                </div>

                {/* Internal Dip Tube */}
                <div className="absolute top-0 bottom-3 w-0.5 bg-white/40 shadow-xs" />

                {/* LUXURY "J." BRANDING PLAQUE */}
                <div className="relative z-20 my-auto px-4 py-3 bg-gradient-to-br from-amber-300 via-yellow-100 to-amber-400 rounded-xl shadow-lg border border-amber-200/90 text-center flex flex-col items-center">
                  <span
                    id="perfume-brand-logo"
                    className="font-serif text-3xl font-black text-stone-900 tracking-tight leading-none drop-shadow-xs"
                  >
                    J.
                  </span>
                  <span className="text-[9px] font-sans font-bold text-amber-950 tracking-widest uppercase mt-0.5">
                    PARFUM
                  </span>
                  <span className="text-[7px] text-amber-900 tracking-widest uppercase">
                    POUR FEMME
                  </span>
                </div>

                {/* Flacon Base Cut */}
                <div className="relative z-20 text-[8px] font-mono text-stone-700/80 tracking-widest">
                  EAU DE PARFUM • 100ML
                </div>
              </div>
            </div>

            {/* Scent & Luxury Card */}
            <div className="mt-4 px-4 py-2 rounded-2xl bg-white/95 text-stone-800 shadow-xl border border-rose-200 text-center max-w-xs">
              <div className="flex items-center justify-center gap-1 text-amber-500 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>J. Signature Fragrance</span>
              </div>
              <p className="text-[11px] text-stone-600 mt-1 leading-relaxed">
                "A delicate bouquet of blooming roses, sweet vanilla, and warm amber — as unforgettable as your radiant smile, Arfa."
              </p>
              <button
                type="button"
                onClick={handleSprayPerfume}
                className="mt-2 text-[11px] text-rose-600 hover:text-rose-700 font-medium underline underline-offset-2 min-h-[30px] flex items-center justify-center mx-auto"
              >
                Tap bottle or here to spray mist ✨
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Button to proceed to Final Wish */}
      <div className="relative z-10 mt-6 flex flex-col items-center gap-3">
        {isOpen && (
          <button
            id="btn-proceed-wish"
            type="button"
            onClick={() => {
              audioManager.playSparkle();
              onComplete();
            }}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-semibold text-base shadow-lg shadow-rose-500/40 active:scale-95 transition-all flex items-center gap-2 cursor-pointer min-h-[48px]"
          >
            <span>Make Your Birthday Wish ✨</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
}
