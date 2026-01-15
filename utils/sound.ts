// Simple Synthesizer using Web Audio API to avoid external assets
let audioCtx: AudioContext | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const playKeystrokeSound = () => {
  const ctx = initAudio();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = 'square';
  // Random pitch variation for realistic mechanical feel
  oscillator.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);
  
  gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.05);
};

export const playStartupSound = () => {
  const ctx = initAudio();
  
  // Create a futuristic swell sound
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gainNode = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc1.type = 'sawtooth';
  osc2.type = 'sine';

  // Chord progression
  osc1.frequency.setValueAtTime(110, ctx.currentTime); // Low A
  osc1.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.5); // High A
  
  osc2.frequency.setValueAtTime(110 * 1.5, ctx.currentTime); // Harmonic
  osc2.frequency.exponentialRampToValueAtTime(440 * 1.5, ctx.currentTime + 1.5);

  // Filter sweep
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(200, ctx.currentTime);
  filter.frequency.linearRampToValueAtTime(2000, ctx.currentTime + 1);

  // Envelope
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.5);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc1.start();
  osc2.start();
  osc1.stop(ctx.currentTime + 3);
  osc2.stop(ctx.currentTime + 3);
};