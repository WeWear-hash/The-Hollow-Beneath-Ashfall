(function () {
  window.addEventListener("DOMContentLoaded", () => {
    const game = new window.THBA.Game({
      canvas: document.getElementById("game"),
      panel: document.getElementById("panel"),
      toast: document.getElementById("toast")
    });
    game.boot();
    window.THBA.game = game;
  });
})();
