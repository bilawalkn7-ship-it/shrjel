import { useState } from 'react';
import { Heart, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface Stage6PersonalLetterProps {
  onComplete: () => void;
}

export default function Stage6PersonalLetter({ onComplete }: Stage6PersonalLetterProps) {
  const [isLetterOpen, setIsLetterOpen] = useState(true);

  const exactLetterText = `today is all about celebrating you and the happiness you bring into the lives of the people around you . i may be miles away from you today , but you are always close to my heart. thank you for being the friend who became family. i miss our talks , our laugh , everything, i miss you cute dimples when you smile bcz of me and your beautiful dimples appear  that was the most beautiful time for me to see you smile and your beautiful eyes i just love those pair eyes of yours whwn its on mee my dimploo thank you for having me in your beautifull life . have a bless day , you desserve everything, and listen Always smileee Ok`;

  return (
    <section
      id="stage-personal-letter"
      aria-label="Personal Birthday Letter for Arfa"
      className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8"
    >
      <header className="relative z-10 mb-6 text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-900/50 border border-rose-400/30 text-rose-200 text-xs font-medium backdrop-blur-sm">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>A Letter From The Heart</span>
        </div>
        <h1
          id="letter-heading"
          className="font-romantic text-3xl sm:text-4xl text-rose-100 font-bold drop-shadow-md"
        >
          For My Dearest Arfa ❤️
        </h1>
        <p className="text-rose-200/80 text-xs sm:text-sm">
          Written with all the love across every mile
        </p>
      </header>

      {/* Parchment / Handwritten Letter Card */}
      <article
        id="letter-parchment-card"
        className="w-full max-w-xl bg-gradient-to-br from-amber-50 via-rose-50/95 to-amber-50/90 text-stone-900 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-rose-950/90 border border-amber-200/80 relative overflow-hidden transition-all duration-700"
      >
        {/* Subtle decorative vintage floral stamps in corners */}
        <div className="absolute top-3 left-3 text-rose-400/30 text-2xl select-none">🌸</div>
        <div className="absolute top-3 right-3 text-rose-400/30 text-2xl select-none">🌹</div>
        <div className="absolute bottom-3 left-3 text-rose-400/30 text-2xl select-none">✨</div>
        <div className="absolute bottom-3 right-3 text-rose-400/30 text-2xl select-none">💌</div>

        {/* Vintage Postmark / Wax Seal Header */}
        <div className="flex items-center justify-between border-b border-rose-200/60 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-romantic text-lg shadow-sm">
              A
            </span>
            <div>
              <p className="text-xs font-semibold text-rose-900 uppercase tracking-wider">
                Special Delivery
              </p>
              <p className="text-[11px] text-rose-600/80">To: My Sweet Dimploo (Arfa)</p>
            </div>
          </div>
          <div className="px-2.5 py-1 rounded border border-rose-300 bg-rose-100/50 text-[10px] text-rose-700 font-mono rotate-2">
            STAMP: FOREVER ❤️
          </div>
        </div>

        {/* The Exact Letter Content */}
        <div className="space-y-4">
          <p
            id="letter-body-text"
            className="font-handwriting text-xl sm:text-2xl text-stone-800 leading-relaxed sm:leading-loose whitespace-pre-wrap select-text tracking-wide"
            style={{
              textShadow: '0 0.5px 0.5px rgba(0,0,0,0.08)',
            }}
          >
            {exactLetterText}
          </p>
        </div>

        {/* Letter Sign-off Footer */}
        <div className="mt-8 pt-4 border-t border-rose-200/60 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-rose-600 text-xs sm:text-sm font-handwriting text-lg">
            <span>Forever close to heart</span>
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline ml-1" />
          </div>

          <div className="flex items-center gap-1">
            <span className="text-xs text-rose-400">✨ Always smileee</span>
          </div>
        </div>
      </article>

      {/* Button to proceed to photo memories */}
      <div className="relative z-10 mt-8 flex flex-col items-center gap-3">
        <button
          id="btn-proceed-photos"
          type="button"
          onClick={() => {
            audioManager.playSparkle();
            onComplete();
          }}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-semibold text-base shadow-lg shadow-rose-500/40 active:scale-95 transition-all flex items-center gap-2 cursor-pointer min-h-[48px]"
        >
          <span>See Our Memories 📸</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
