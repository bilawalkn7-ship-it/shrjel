import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Save, Edit3, RotateCcw } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface Stage9FinalWishProps {
  onRestart: () => void;
}

const STORAGE_KEY = 'arfa_birthday_wish_saved';

export default function Stage9FinalWish({ onRestart }: Stage9FinalWishProps) {
  const [wishText, setWishText] = useState('');
  const [savedWish, setSavedWish] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [savedDate, setSavedDate] = useState<string>('');

  useEffect(() => {
    // Load local stored wish
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSavedWish(parsed.text);
        setSavedDate(parsed.date);
        setWishText(parsed.text);
      } catch {
        setSavedWish(stored);
        setWishText(stored);
      }
    }
  }, []);

  const handleSaveWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;

    audioManager.playSparkle();
    const now = new Date();
    const dateFormatted = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    const wishData = {
      text: wishText.trim(),
      date: dateFormatted,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishData));
    setSavedWish(wishData.text);
    setSavedDate(dateFormatted);
    setIsEditing(false);

    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f43f5e', '#fbbf24', '#ec4899', '#38bdf8', '#c084fc'],
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <section
      id="stage-final-wish"
      aria-label="Make a Birthday Wish"
      className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 py-8"
    >
      <header className="relative z-10 mb-6 space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-900/50 border border-rose-400/30 text-rose-200 text-xs font-medium backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Birthday Magic</span>
        </div>
        <h1
          id="wish-heading"
          className="font-romantic text-3xl sm:text-4xl text-rose-100 font-bold drop-shadow-md"
        >
          Now it’s your turn, Arfa ❤️
        </h1>
        <p className="text-rose-200/80 text-xs sm:text-sm max-w-sm mx-auto">
          Write your deepest birthday wish into the universe…
        </p>
      </header>

      {/* Main Wish Card */}
      <div className="w-full max-w-lg relative z-10">
        {!savedWish || isEditing ? (
          /* Wish Input Form */
          <form
            onSubmit={handleSaveWish}
            id="wish-input-form"
            className="bg-rose-950/70 backdrop-blur-xl border border-rose-400/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-rose-950/80 text-left space-y-4"
          >
            <div className="space-y-1">
              <label
                htmlFor="arfa-wish-textarea"
                className="text-sm font-medium text-rose-200 flex items-center gap-1.5"
              >
                <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
                <span>Write your birthday wish…</span>
              </label>
              <textarea
                id="arfa-wish-textarea"
                rows={4}
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                placeholder="Dear universe, on my birthday I wish for..."
                className="w-full p-4 rounded-2xl bg-rose-900/30 border border-rose-400/40 text-rose-100 placeholder-rose-400/50 focus:outline-none focus:ring-2 focus:ring-rose-400 text-base resize-none leading-relaxed"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-2">
              <span className="text-[11px] text-rose-300/60">
                Kept safely right on your phone 🔒
              </span>

              <div className="flex gap-2 w-full sm:w-auto">
                {savedWish && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-full border border-rose-400/30 text-rose-200 text-xs font-medium hover:bg-rose-900/40 min-h-[44px]"
                  >
                    Cancel
                  </button>
                )}

                <button
                  id="btn-save-wish"
                  type="submit"
                  disabled={!wishText.trim()}
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white text-xs font-semibold shadow-lg shadow-rose-500/40 active:scale-95 transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 min-h-[44px]"
                >
                  <Save className="w-4 h-4" />
                  <span>Save My Wish ✨</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* GLOWING SAVED BIRTHDAY WISH KEEPSAKE CARD */
          <div
            id="glowing-saved-wish-card"
            className="bg-gradient-to-br from-rose-900/70 via-purple-950/60 to-rose-950/80 backdrop-blur-xl border-2 border-rose-400/50 rounded-3xl p-6 sm:p-8 shadow-[0_0_35px_rgba(244,63,94,0.35)] relative overflow-hidden text-center space-y-4 animate-fadeIn"
          >
            {/* Glowing accents */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-rose-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="w-12 h-12 rounded-full bg-rose-500/20 border border-rose-300/40 flex items-center justify-center mx-auto text-rose-300">
              <Sparkles className="w-6 h-6 text-amber-300 animate-bounce" />
            </div>

            <div className="space-y-1">
              <h2 className="font-romantic text-2xl sm:text-3xl text-rose-100 font-bold">
                Arfa's Birthday Wish ✨
              </h2>
              {savedDate && (
                <p className="text-[11px] text-rose-300/70 tracking-widest uppercase">
                  Sealed on {savedDate}
                </p>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 my-4">
              <p className="font-handwriting text-2xl sm:text-3xl text-rose-100 leading-relaxed italic">
                "{savedWish}"
              </p>
            </div>

            <p className="text-xs text-rose-200/80 italic">
              May every word of your wish come true and bless you with endless joy, Arfa. ❤️
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleEdit}
                className="px-4 py-2 rounded-full bg-rose-900/40 hover:bg-rose-800/50 border border-rose-400/30 text-rose-200 text-xs font-medium transition flex items-center gap-1.5 min-h-[40px]"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Wish</span>
              </button>

              <button
                type="button"
                onClick={onRestart}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white text-xs font-semibold shadow-md transition flex items-center gap-1.5 min-h-[40px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay the Surprise 🔁</span>
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="relative z-10 mt-8 text-rose-300/60 text-xs">
        Made with infinite love for Arfa on her special day 💖
      </footer>
    </section>
  );
}
