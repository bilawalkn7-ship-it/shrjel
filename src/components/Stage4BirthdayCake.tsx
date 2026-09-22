import { useState } from 'react';
import { Wind, Sparkles, CheckCircle2 } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface Stage4BirthdayCakeProps {
  onCandlesBlown: () => void;
}

interface Candle {
  id: number;
  isLit: boolean;
  color: string;
  xOffset: string;
  delay: string;
}

export default function Stage4BirthdayCake({ onCandlesBlown }: Stage4BirthdayCakeProps) {
  const [candles, setCandles] = useState<Candle[]>([
    { id: 1, isLit: true, color: 'from-pink-400 to-rose-400', xOffset: '-translate-x-12', delay: '0s' },
    { id: 2, isLit: true, color: 'from-amber-300 to-yellow-400', xOffset: '-translate-x-6', delay: '0.15s' },
    { id: 3, isLit: true, color: 'from-purple-400 to-indigo-400', xOffset: 'translate-x-0', delay: '0.3s' },
    { id: 4, isLit: true, color: 'from-sky-300 to-cyan-400', xOffset: 'translate-x-6', delay: '0.1s' },
    { id: 5, isLit: true, color: 'from-emerald-300 to-teal-400', xOffset: 'translate-x-12', delay: '0.25s' },
  ]);

  const [hasBlown, setHasBlown] = useState(false);

  const allBlown = candles.every((c) => !c.isLit);

  const blowAllCandles = () => {
    if (hasBlown) return;
    audioManager.playBlowSound();
    setHasBlown(true);

    // Turn off candles sequentially
    candles.forEach((_, idx) => {
      setTimeout(() => {
        setCandles((prev) =>
          prev.map((c, i) => (i === idx ? { ...c, isLit: false } : c))
        );
      }, idx * 120);
    });

    setTimeout(() => {
      audioManager.playSparkle();
    }, 800);
  };

  const toggleSingleCandle = (id: number) => {
    audioManager.playBlowSound();
    setCandles((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, isLit: !c.isLit } : c));
      if (updated.every((c) => !c.isLit)) {
        setHasBlown(true);
        audioManager.playSparkle();
      }
      return updated;
    });
  };

  return (
    <section
      id="stage-birthday-cake"
      aria-label="Birthday Cake and Blow Candles"
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-6 select-none"
    >
      <header className="relative z-10 mb-4 space-y-1">
        <h1
          id="cake-heading"
          className="font-romantic text-3xl sm:text-4xl text-rose-100 font-bold drop-shadow-[0_2px_12px_rgba(244,63,94,0.6)]"
        >
          Happy Birthday Arfa 🎂
        </h1>
        <p className="text-rose-200/80 text-sm">
          {allBlown ? 'All candles are blown out! Make a wish ✨' : 'Make a wish and blow out the candles!'}
        </p>
      </header>

      {/* Interactive Birthday Cake Container */}
      <div id="cake-interactive-stage" className="relative my-6 flex flex-col items-center justify-end w-72 sm:w-84 h-72">
        {/* Sparkle effects around cake */}
        <div className="absolute -top-4 -left-4 text-amber-300 animate-pulse">✨</div>
        <div className="absolute top-10 -right-6 text-pink-300 animate-bounce">💖</div>
        <div className="absolute -bottom-2 -left-6 text-rose-300 animate-pulse">🌸</div>

        {/* CANDLES ROW on top of cake */}
        <div className="relative z-20 flex items-end justify-center gap-3 sm:gap-4 mb-0.5">
          {candles.map((candle) => (
            <button
              key={candle.id}
              id={`candle-${candle.id}`}
              type="button"
              onClick={() => toggleSingleCandle(candle.id)}
              aria-label={`Candle ${candle.id} ${candle.isLit ? 'lit' : 'blown out'}`}
              className="flex flex-col items-center cursor-pointer group outline-none"
            >
              {/* Flame or Smoke */}
              <div className="h-9 flex items-end justify-center">
                {candle.isLit ? (
                  <div
                    className="relative w-4 h-7 rounded-full bg-linear-to-t from-amber-500 via-yellow-300 to-white animate-flicker drop-shadow-[0_0_12px_rgba(251,191,36,0.95)]"
                    style={{ animationDelay: candle.delay }}
                  >
                    <div className="absolute inset-0 bg-yellow-200 blur-[2px] opacity-70 rounded-full" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-2 bg-blue-500 rounded-full opacity-60" />
                  </div>
                ) : (
                  /* Smoke puff */
                  <div className="flex flex-col items-center animate-fadeOut">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-300/60 blur-[0.5px] animate-ping" />
                    <span className="text-[10px] text-stone-400 font-mono select-none">~</span>
                  </div>
                )}
              </div>

              {/* Wick */}
              <div className="w-0.5 h-1.5 bg-stone-800" />

              {/* Candle Body */}
              <div
                className={`w-3.5 sm:w-4 h-12 rounded-t-md bg-linear-to-b ${candle.color} shadow-sm border border-white/20 relative overflow-hidden`}
              >
                {/* Spiral decorative stripes */}
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(255,255,255,0.4)_4px,rgba(255,255,255,0.4)_8px)]" />
              </div>
            </button>
          ))}
        </div>

        {/* MULTI-TIER CAKE - Rainbow Pastel with Pink as Dominant Color */}
        <div className="relative z-10 flex flex-col items-center w-full">
          {/* TOP TIER (Smallest) */}
          <div className="relative w-44 sm:w-52 h-14 bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 rounded-t-2xl shadow-md border-t-2 border-white/60 overflow-hidden flex flex-col justify-between">
            {/* White cream frosting scalloped drip */}
            <div className="w-full flex justify-around -mt-0.5">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-4 h-3 bg-white rounded-b-full shadow-xs -mx-0.5" />
              ))}
            </div>
            {/* Pearls & Sprinkles */}
            <div className="flex justify-around items-center px-4 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-200 shadow-xs" />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-300 shadow-xs" />
              <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs" />
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-xs" />
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-200 shadow-xs" />
            </div>
            {/* Bottom pastel rainbow trim */}
            <div className="h-1.5 w-full bg-gradient-to-r from-rose-300 via-amber-200 via-emerald-200 to-sky-300" />
          </div>

          {/* MIDDLE TIER (Medium) */}
          <div className="relative w-56 sm:w-64 h-16 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 rounded-t-xl shadow-lg border-t-2 border-white/50 overflow-hidden flex flex-col justify-between -mt-1">
            {/* Strawberry Cream drips */}
            <div className="w-full flex justify-around -mt-0.5">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="w-4.5 bg-white/95 rounded-b-full shadow-xs -mx-0.5"
                  style={{ height: i % 2 === 0 ? '14px' : '10px' }}
                />
              ))}
            </div>

            {/* "Arfa" piped icing message badge */}
            <div className="self-center px-3 py-0.5 bg-white/20 backdrop-blur-xs rounded-full border border-white/40 shadow-xs">
              <span className="font-romantic text-xs sm:text-sm text-white font-bold tracking-wider drop-shadow-sm">
                Sweetest Arfa
              </span>
            </div>

            {/* Pastel rainbow cake layer gradient ribbon */}
            <div className="h-2 w-full bg-gradient-to-r from-pink-300 via-yellow-200 via-emerald-200 via-sky-300 to-purple-300" />
          </div>

          {/* BASE TIER (Largest) */}
          <div className="relative w-68 sm:w-76 h-18 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 rounded-t-xl shadow-xl border-t-2 border-white/50 overflow-hidden flex flex-col justify-between -mt-1">
            {/* Large cream rosettes */}
            <div className="w-full flex justify-around -mt-1">
              {[...Array(14)].map((_, i) => (
                <div key={i} className="w-5 h-4 bg-white rounded-b-full shadow-xs -mx-0.5" />
              ))}
            </div>

            {/* Decorative golden pearls and rainbow sprinkle dots */}
            <div className="flex justify-around items-center px-4">
              <span className="w-2 h-2 rounded-full bg-amber-300 shadow-sm" />
              <span className="w-1.5 h-1.5 rounded-full bg-pink-200 shadow-sm" />
              <span className="w-2 h-2 rounded-full bg-sky-200 shadow-sm" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-sm" />
              <span className="w-2 h-2 rounded-full bg-purple-200 shadow-sm" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 shadow-sm" />
              <span className="w-2 h-2 rounded-full bg-amber-300 shadow-sm" />
            </div>

            {/* Base scalloped gold trim */}
            <div className="h-2.5 w-full bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-400" />
          </div>

          {/* CAKE STAND / PLATTER */}
          <div className="w-76 sm:w-84 h-3 bg-gradient-to-r from-stone-300 via-white to-stone-300 rounded-full shadow-2xl border-t border-white" />
          <div className="w-28 h-4 bg-gradient-to-b from-stone-300 to-stone-400 rounded-b-lg shadow-md -mt-0.5" />
          <div className="w-40 h-2 bg-gradient-to-r from-stone-300 via-stone-200 to-stone-300 rounded-full shadow-lg -mt-0.5" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-20 mt-4 flex flex-col items-center gap-3">
        {!allBlown ? (
          <button
            id="btn-blow-candles"
            type="button"
            onClick={blowAllCandles}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-semibold text-base shadow-lg shadow-rose-500/50 active:scale-95 transition-all flex items-center gap-2 cursor-pointer min-h-[48px]"
          >
            <Wind className="w-5 h-5 animate-pulse" />
            <span>Blow Candles 💨</span>
          </button>
        ) : (
          <button
            id="btn-proceed-cutting"
            type="button"
            onClick={onCandlesBlown}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold text-base shadow-lg shadow-emerald-500/40 active:scale-95 transition-all flex items-center gap-2 cursor-pointer min-h-[48px] animate-bounce"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Candles Blown! Next: Cut the Cake 🔪</span>
          </button>
        )}

        <p className="text-xs text-rose-300/70 max-w-xs">
          Tip: You can also tap individual candles to blow them out one by one!
        </p>
      </div>
    </section>
  );
}
