import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface MusicPlayerControlProps {
  onInteract?: () => void;
}

export default function MusicPlayerControl({ onInteract }: MusicPlayerControlProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    // Sync state periodically
    const interval = setInterval(() => {
      setIsPlaying(audioManager.getIsPlaying());
      setIsMuted(audioManager.getIsMuted());
    }, 400);
    return () => clearInterval(interval);
  }, []);

  const handleTogglePlay = () => {
    if (onInteract) onInteract();
    const playing = audioManager.togglePlay();
    setIsPlaying(playing);
  };

  const handleToggleMute = () => {
    if (onInteract) onInteract();
    const muted = audioManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <aside
      id="music-control-panel"
      aria-label="Birthday music controls"
      className="fixed top-4 right-4 z-50 flex items-center gap-2 p-1.5 rounded-full bg-rose-950/70 backdrop-blur-md border border-rose-400/30 shadow-lg shadow-rose-950/50 text-rose-100"
    >
      <button
        id="btn-toggle-music"
        type="button"
        onClick={handleTogglePlay}
        aria-label={isPlaying ? 'Pause birthday music' : 'Play birthday music'}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 active:scale-95 transition-all text-xs font-medium text-rose-200 border border-rose-400/30 min-h-[44px]"
      >
        {isPlaying ? (
          <>
            <Pause className="w-3.5 h-3.5 text-rose-300" />
            <span className="hidden sm:inline">Playing</span>
            <div className="flex items-end gap-0.5 h-3 w-3">
              <span className="w-0.5 h-full bg-rose-400 animate-pulse rounded-full" />
              <span className="w-0.5 h-2/3 bg-rose-300 animate-pulse rounded-full" style={{ animationDelay: '0.2s' }} />
              <span className="w-0.5 h-4/5 bg-rose-400 animate-pulse rounded-full" style={{ animationDelay: '0.4s' }} />
            </div>
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
            <span className="text-xs">Play Music 🎵</span>
          </>
        )}
      </button>

      <button
        id="btn-toggle-mute"
        type="button"
        onClick={handleToggleMute}
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        className="p-2 rounded-full hover:bg-rose-500/20 active:scale-90 transition text-rose-300 min-w-[44px] min-h-[44px] flex items-center justify-center"
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-rose-200" />}
      </button>
    </aside>
  );
}
