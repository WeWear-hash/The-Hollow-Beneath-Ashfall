(function () {
  window.HBA = window.HBA || {};
  HBA.Dialogue = {
    start: function (game, id) {
      var d = HBA.Content.dialogue[id];
      game.state.mode = "dialogue";
      game.state.dialogue = { id: id, node: "start" };
      this.apply(game, d.nodes.start.actions);
      HBA.UI.renderDialogue(game);
    },
    choose: function (game, choice) {
      if (choice.require && !choice.require.every(function (f) { return game.state.flags[f]; })) {
        HBA.UI.toast("The answer is still missing.");
        return;
      }
      if (choice.ending) { HBA.Endings.trigger(game, choice.ending); return; }
      if (choice.end) { game.state.dialogue = null; game.state.mode = "play"; HBA.UI.hideDialogue(); return; }
      var data = HBA.Content.dialogue[game.state.dialogue.id];
      game.state.dialogue.node = choice.next;
      this.apply(game, data.nodes[choice.next].actions);
      HBA.UI.renderDialogue(game);
    },
    apply: function (game, actions) {
      (actions || []).forEach(function (a) {
        if (a.type === "quest") HBA.Quests.setStage(game.state, a.id, a.stage);
        if (a.type === "give") HBA.Inventory.add(game.state, a.item, a.count);
        if (a.type === "memory") HBA.Memory.add(game.state, a.amount);
        if (a.type === "flag") game.state.flags[a.id] = true;
      });
    }
  };
})();
