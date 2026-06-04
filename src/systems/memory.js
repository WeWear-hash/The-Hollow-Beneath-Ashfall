(function () {
  window.HBA = window.HBA || {};
  HBA.Memory = {
    add: function (s, amount) {
      s.player.memory = Math.max(0, Math.min(100, s.player.memory + amount));
      s.player.sanity = Math.max(0, s.player.sanity - Math.max(1, Math.floor(amount / 3)));
      if (amount > 4) HBA.Audio.play("horror");
    },
    update: function (s, dt) {
      if (s.player.memory > 55) s.player.sanity = Math.max(0, s.player.sanity - dt * 0.65);
      if (s.player.sanity < 25 && Math.random() < dt * 0.5) HBA.UI.toast("Something almost remembers you.");
    }
  };
})();
