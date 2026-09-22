import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'heart' | 'sparkle' | 'petal';
  opacity: number;
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate an optimized set of romantic floating particles
    const count = window.innerWidth < 640 ? 18 : 28;
    const items: Particle[] = [];
    const types: Array<'heart' | 'sparkle' | 'petal'> = ['heart', 'heart', 'sparkle', 'petal'];

    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 10 + Math.random() * 18,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 6,
        type: types[Math.floor(Math.random() * types.length)],
        opacity: 0.25 + Math.random() * 0.45,
      });
    }
    setParticles(items);
  }, []);

  return (
    <div
      id="floating-particles-layer"
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute will-change-transform"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            animation: `floatSlow ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        >
          {p.type === 'heart' && (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
          {p.type === 'sparkle' && (
            <svg
              width={p.size * 0.85}
              height={p.size * 0.85}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-amber-200 drop-shadow-[0_0_10px_rgba(253,230,138,0.7)]"
            >
              <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
            </svg>
          )}
          {p.type === 'petal' && (
            <div
              className="rounded-full bg-linear-to-tr from-pink-400/60 to-rose-300/40 blur-[0.5px]"
              style={{
                width: `${p.size * 0.8}px`,
                height: `${p.size * 1.2}px`,
                transform: 'rotate(-25deg)',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
