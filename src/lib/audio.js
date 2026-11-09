const PENTATONIC = [220.0, 246.94, 277.18, 329.63, 369.99, 440.0, 493.88, 587.33];

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.bgmTimer = null;
    this.step = 0;
    this.muted = false;
    this.bgmWanted = false;
    this.volume = 0.55;
  }

  ensure() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return null;
      this.ctx = new AudioContextClass();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : this.volume;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume().catch(() => {});
    return this.ctx;
  }

  setMuted(muted) {
    this.muted = muted;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(muted ? 0 : this.volume, this.ctx.currentTime, 0.08);
    }
    if (muted) {
      this.clearBgmTimer();
    } else if (this.bgmWanted) {
      this.startBgm();
    }
  }

  startBgm() {
    this.bgmWanted = true;
    if (this.muted) return;
    const ctx = this.ensure();
    if (!ctx) return;
    if (this.bgmTimer) return;
    this.bgmTick();
    this.bgmTimer = window.setInterval(() => this.bgmTick(), 1150);
  }

  unlock() {
    this.ensure();
  }

  stopBgm() {
    this.bgmWanted = false;
    this.clearBgmTimer();
  }

  clearBgmTimer() {
    if (this.bgmTimer) {
      window.clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  suspend() {
    if (this.ctx && this.ctx.state === 'running') this.ctx.suspend().catch(() => {});
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended' && !this.muted) {
      this.ctx.resume().catch(() => {});
    }
  }

  tone(frequency, { time = 0, duration = 0.8, type = 'triangle', volume = 0.07, filter = 1600 } = {}) {
    if (this.muted) return;
    const ctx = this.ensure();
    if (!ctx) return;

    const start = ctx.currentTime + time;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const lowpass = ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, start);
    lowpass.type = 'lowpass';
    lowpass.frequency.value = filter;
    lowpass.Q.value = 0.6;

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(volume, start + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    osc.connect(lowpass);
    lowpass.connect(gain);
    gain.connect(this.master);
    osc.start(start);
    osc.stop(start + duration + 0.06);
  }

  bgmTick() {
    if (this.muted || !this.bgmWanted) return;
    const note = PENTATONIC[this.step % PENTATONIC.length];
    this.tone(note, { duration: 2.8, volume: 0.028, type: 'triangle', filter: 1100 });
    this.tone(note * 2, { duration: 1.4, volume: 0.01, type: 'sine', filter: 2400 });
    if (this.step % 4 === 0) {
      this.tone(note / 2, { duration: 5.2, volume: 0.03, type: 'sine', filter: 700 });
    }
    this.step += 1;
  }

  click() {
    this.tone(760, { duration: 0.1, volume: 0.045, type: 'sine', filter: 2600 });
  }

  hover() {
    this.tone(980, { duration: 0.06, volume: 0.014, type: 'sine', filter: 3000 });
  }

  success() {
    [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
      this.tone(frequency, { time: index * 0.09, duration: 0.5, volume: 0.05, type: 'triangle' });
    });
  }

  error() {
    [220, 196, 164.81].forEach((frequency, index) => {
      this.tone(frequency, { time: index * 0.08, duration: 0.28, volume: 0.035, type: 'sawtooth', filter: 900 });
    });
  }

  unlock() {
    [392, 523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
      this.tone(frequency, { time: index * 0.11, duration: 0.7, volume: 0.05, type: 'triangle' });
    });
  }

  collect() {
    [1046.5, 1318.51, 1567.98, 2093].forEach((frequency, index) => {
      this.tone(frequency, { time: index * 0.06, duration: 0.45, volume: 0.028, type: 'sine', filter: 4000 });
    });
  }

  note(frequency) {
    this.tone(frequency, { duration: 0.42, volume: 0.07, type: 'triangle', filter: 2200 });
    this.tone(frequency * 2, { duration: 0.22, volume: 0.018, type: 'sine', filter: 3600 });
  }

  play(name) {
    if (typeof this[name] === 'function') this[name]();
  }
}

export const audio = new AudioEngine();
