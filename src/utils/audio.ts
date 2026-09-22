/**
 * Romantic Birthday Audio Synthesizer & Sound Effects
 * Built with Web Audio API: 100% reliable, zero external MP3 network dependencies.
 */

class BirthdayAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private loopTimer: number | null = null;
  private gainNode: GainNode | null = null;

  private notes: { [key: string]: number } = {
    C4: 261.63,
    D4: 293.66,
    E4: 329.63,
    F4: 349.23,
    G4: 392.0,
    A4: 440.0,
    B4: 493.88,
    C5: 523.25,
    D5: 587.33,
    E5: 659.25,
    F5: 698.46,
    G5: 783.99,
  };

  // Melody: Happy Birthday in C major, romantic music-box style
  private melody: Array<{ note: string; duration: number; chord?: string[] }> = [
    { note: 'G4', duration: 0.45, chord: ['C4', 'E4'] },
    { note: 'G4', duration: 0.3 },
    { note: 'A4', duration: 0.75, chord: ['F4'] },
    { note: 'G4', duration: 0.75, chord: ['C4'] },
    { note: 'C5', duration: 0.75, chord: ['E4', 'G4'] },
    { note: 'B4', duration: 1.35, chord: ['G4', 'D4'] },

    { note: 'G4', duration: 0.45, chord: ['G4', 'B4'] },
    { note: 'G4', duration: 0.3 },
    { note: 'A4', duration: 0.75, chord: ['D4', 'F4'] },
    { note: 'G4', duration: 0.75, chord: ['G4'] },
    { note: 'D5', duration: 0.75, chord: ['F4', 'B4'] },
    { note: 'C5', duration: 1.4, chord: ['C4', 'E4', 'G4'] },

    { note: 'G4', duration: 0.45, chord: ['C4', 'G4'] },
    { note: 'G4', duration: 0.3 },
    { note: 'G5', duration: 0.75, chord: ['C4', 'E4', 'C5'] },
    { note: 'E5', duration: 0.75, chord: ['A4', 'C5'] },
    { note: 'C5', duration: 0.75, chord: ['F4', 'A4'] },
    { note: 'B4', duration: 0.75, chord: ['G4', 'D5'] },
    { note: 'A4', duration: 1.3, chord: ['F4', 'C5'] },

    { note: 'F5', duration: 0.45, chord: ['F4', 'A4'] },
    { note: 'F5', duration: 0.3 },
    { note: 'E5', duration: 0.75, chord: ['C4', 'G4', 'C5'] },
    { note: 'C5', duration: 0.75, chord: ['E4', 'G4'] },
    { note: 'D5', duration: 0.75, chord: ['G4', 'B4'] },
    { note: 'C5', duration: 1.8, chord: ['C4', 'E4', 'G4', 'C5'] },
  ];

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = this.isMuted ? 0 : 0.28;
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public playMusic(): void {
    const ctx = this.getContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    let timeOffset = 0;
    const playTune = () => {
      if (!this.isPlaying) return;
      const startTime = ctx.currentTime + 0.1;
      let currentNoteTime = startTime;

      this.melody.forEach(({ note, duration, chord }) => {
        // Play lead chime
        this.scheduleChime(ctx, this.notes[note] || 440, currentNoteTime, duration * 0.95, 0.4);

        // Play harmonic chord note (softer, lower octave music box bell)
        if (chord) {
          chord.forEach((chNote, idx) => {
            const freq = this.notes[chNote];
            if (freq) {
              this.scheduleChime(ctx, freq, currentNoteTime + idx * 0.04, duration * 1.2, 0.15);
            }
          });
        }

        currentNoteTime += duration;
      });

      const totalDuration = currentNoteTime - startTime;
      this.loopTimer = window.setTimeout(() => {
        if (this.isPlaying) {
          playTune();
        }
      }, (totalDuration + 1.2) * 1000);
    };

    playTune();
  }

  private scheduleChime(ctx: AudioContext, freq: number, time: number, duration: number, volume: number): void {
    if (!this.gainNode) return;

    // Oscillator 1: Sine (warm pure chime)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, time);

    // Oscillator 2: Triangle (gives bell/music-box sparkle)
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, time);

    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0, time);
    noteGain.gain.linearRampToValueAtTime(volume, time + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc1.connect(noteGain);
    osc2.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration + 0.1);
    osc2.stop(time + duration + 0.1);
  }

  public pauseMusic(): void {
    this.isPlaying = false;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.pauseMusic();
      return false;
    } else {
      this.playMusic();
      return true;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.28, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  // Sound Effect: Candle Blow whoosh
  public playBlowSound(): void {
    try {
      const ctx = this.getContext();
      const bufferSize = ctx.sampleRate * 0.6;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.6);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch {
      // AudioContext fallback
    }
  }

  // Sound Effect: Heartbeat
  public playHeartbeat(): void {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(75, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // AudioContext fallback
    }
  }

  // Sound Effect: Magic Sparkle / Gift Open
  public playSparkle(): void {
    try {
      const ctx = this.getContext();
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = ctx.currentTime + index * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    } catch {
      // AudioContext fallback
    }
  }

  // Sound Effect: Cake Cut slice chime
  public playCutSound(): void {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // AudioContext fallback
    }
  }
}

export const audioManager = new BirthdayAudioManager();
