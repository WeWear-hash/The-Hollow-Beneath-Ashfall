(function () {
  window.HBA = window.HBA || {};
  HBA.Game = function () {
    this.state = HBA.makeFreshState();
    HBA.State = this.state;
    this.map = HBA.Content.maps[this.state.mapId];
    this.acc = 0;
    this.last = 0;
  };

  HBA.Game.prototype.init = function () {
    HBA.Renderer.init();
    HBA.Input.init();
    HBA.UI.init(this);
    this.showMenu();
  };

  HBA.Game.prototype.showMenu = function () {
    this.state.mode = "menu";
    document.getElementById("bootOverlay").classList.remove("visible");
    document.getElementById("mainMenu").classList.add("visible");
  };

  HBA.Game.prototype.newGame = function () {
    this.state = HBA.makeFreshState();
    HBA.State = this.state;
    HBA.Quests.setStage(this.state, "arrival", 0);
    this.changeMap(this.state.mapId, HBA.Content.story.start);
    HBA.UI.showGame();
  };

  HBA.Game.prototype.changeMap = function (id, spawn) {
    this.map = HBA.Content.maps[id];
    HBA.Maps.load(this, id, spawn);
  };

  HBA.Game.prototype.update = function (dt) {
    var s = this.state;
    s.time += dt;
    if (s.toast.t > 0) s.toast.t -= dt;
    if (s.mode === "play") {
      HBA.Player.update(this, dt);
      HBA.Enemies.update(this, dt);
      HBA.Memory.update(s, dt);
    } else {
      if (HBA.Input.consume("Escape") && s.mode === "pause") HBA.UI.togglePause(false);
    }
    HBA.UI.updateHud(s);
    HBA.Input.endFrame();
  };

  HBA.Game.prototype.loop = function (now) {
    now = now || 0;
    var dt = Math.min(0.05, (now - this.last) / 1000 || 0);
    this.last = now;
    this.acc += dt;
    while (this.acc >= 1 / 60) {
      this.update(1 / 60);
      this.acc -= 1 / 60;
    }
    if (this.state.mode !== "menu") HBA.Renderer.draw(this);
    requestAnimationFrame(this.loop.bind(this));
  };
})();
