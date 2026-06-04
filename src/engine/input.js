(function () {
  window.HBA = window.HBA || {};
  HBA.Input = {
    keys: {},
    pressed: {},
    mouseAttack: false,
    init: function () {
      window.addEventListener("keydown", function (e) {
        if (!HBA.Input.keys[e.key]) HBA.Input.pressed[e.key] = true;
        HBA.Input.keys[e.key] = true;
        if ([" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.key) >= 0) e.preventDefault();
      });
      window.addEventListener("keyup", function (e) { HBA.Input.keys[e.key] = false; });
      document.getElementById("gameCanvas").addEventListener("mousedown", function () { HBA.Input.mouseAttack = true; });
    },
    consume: function (key) {
      var v = !!this.pressed[key];
      this.pressed[key] = false;
      return v;
    },
    axis: function () {
      var x = 0, y = 0;
      if (this.keys.a || this.keys.A || this.keys.ArrowLeft) x--;
      if (this.keys.d || this.keys.D || this.keys.ArrowRight) x++;
      if (this.keys.w || this.keys.W || this.keys.ArrowUp) y--;
      if (this.keys.s || this.keys.S || this.keys.ArrowDown) y++;
      if (x && y) { x *= 0.7071; y *= 0.7071; }
      return { x: x, y: y };
    },
    endFrame: function () {
      this.pressed = {};
      this.mouseAttack = false;
    }
  };
})();
