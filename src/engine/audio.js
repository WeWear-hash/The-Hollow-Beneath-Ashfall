(function () {
  window.HBA = window.HBA || {};
  HBA.Audio = {
    ctx: null,
    master: null,
    ambient: null,
    init: function () {
      if (this.ctx) return;
      var Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = HBA.State.settings.volume;
      this.master.connect(this.ctx.destination);
    },
    setVolume: function (v) {
      HBA.State.settings.volume = Number(v);
      if (this.master) this.master.gain.value = HBA.State.settings.volume;
    },
    tone: function (freq, dur, type, gain) {
      this.init();
      if (!this.ctx) return;
      var osc = this.ctx.createOscillator();
      var g = this.ctx.createGain();
      osc.type = type || "sine";
      osc.frequency.value = freq;
      g.gain.value = gain || 0.04;
      g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);
      osc.connect(g);
      g.connect(this.master);
      osc.start();
      osc.stop(this.ctx.currentTime + dur);
    },
    play: function (name) {
      var table = {
        click: [360, 0.04, "square", 0.025],
        footstep: [95, 0.035, "triangle", 0.018],
        bell: [220, 1.2, "sine", 0.05],
        attack: [170, 0.08, "sawtooth", 0.04],
        hit: [68, 0.12, "square", 0.05],
        horror: [43, 0.9, "sawtooth", 0.035],
        boss: [52, 1.4, "triangle", 0.05],
        heal: [520, 0.16, "sine", 0.035]
      };
      var t = table[name] || table.click;
      this.tone(t[0], t[1], t[2], t[3]);
    },
    ambientFor: function (kind) {
      if (kind === "bell") this.play("bell");
      if (kind === "hollow" || kind === "drone") this.play("horror");
    }
  };
})();
