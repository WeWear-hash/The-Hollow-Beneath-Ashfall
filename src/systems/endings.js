(function () {
  window.HBA = window.HBA || {};
  HBA.Endings = {
    trigger: function (game, id) {
      if (id === "remembered" && game.state.player.memory < 60) {
        HBA.UI.toast("You remember the shape, but not the names.");
        return;
      }
      if (id === "vessel") game.state.flags.vessel = true;
      if (id === "burn" && !HBA.Inventory.has(game.state, "finalEmber")) {
        HBA.UI.toast("You need the Final Ember to burn the Hollow.");
        return;
      }
      game.state.ending = id;
      game.state.mode = "ending";
      HBA.UI.showEnding(id);
    }
  };
})();
