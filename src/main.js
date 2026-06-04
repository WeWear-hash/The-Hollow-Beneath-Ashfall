(function () {
  window.addEventListener("DOMContentLoaded", function () {
    var status = document.getElementById("bootStatus");
    HBA.Assets.loadAll(function () {
      var game = new HBA.Game();
      game.init();
      requestAnimationFrame(game.loop.bind(game));
    }, function (loaded, total) {
      status.textContent = "Loading " + loaded + " / " + total + " memories...";
    });
  });
})();
