(function () {
  window.THBA = window.THBA || {};

  class AudioManager {
    constructor() {
      this.ctx = null;
      this.enabled = true;
      this.lastStep = 0;
    }

    unlock() {
      if (!this.enabled || this.ctx) return;
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.ctx = new AudioContext();
    }

    tone(freq, duration, type, gain) {
      if (!this.enabled || !this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const amp = this.ctx.createGain();
      osc.type = type || "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq * .7), now + duration);
      amp.gain.setValueAtTime(gain || .04, now);
      amp.gain.exponentialRampToValueAtTime(.0001, now + duration);
      osc.connect(amp);
      amp.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    }

    event(name) {
      const map = {
        footstep: [70, .05, "triangle", .025],
        bell: [210, 1.4, "sine", .055],
        hit: [95, .12, "square", .05],
        hurt: [48, .22, "sawtooth", .06],
        horror: [32, 1.0, "sawtooth", .05],
        pickup: [520, .16, "triangle", .035],
        choice: [330, .09, "sine", .025]
      };
      if (map[name]) this.tone.apply(this, map[name]);
    }

    step(now) {
      if (now - this.lastStep > 280) {
        this.lastStep = now;
        this.event("footstep");
      }
    }
  }

  window.THBA.AudioManager = AudioManager;
})();
