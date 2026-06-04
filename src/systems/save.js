(function () {
  window.HBA = window.HBA || {};
  HBA.Save = {
    key: function (slot) { return "hollow_beneath_ashfall_slot_" + slot; },
    data: function (s) {
      return {
        version: 1,
        savedAt: new Date().toLocaleString(),
        mapId: s.mapId,
        player: s.player,
        inventory: s.inventory,
        quests: s.quests,
        flags: s.flags,
        settings: s.settings,
        lastSafe: s.lastSafe
      };
    },
    save: function (s, slot) {
      localStorage.setItem(this.key(slot), JSON.stringify(this.data(s)));
      HBA.UI.toast("Saved to slot " + slot);
    },
    load: function (game, slot) {
      var raw = localStorage.getItem(this.key(slot));
      if (!raw) { HBA.UI.toast("No save in slot " + slot); return false; }
      var data = JSON.parse(raw);
      var fresh = HBA.makeFreshState();
      fresh.mapId = data.mapId;
      fresh.player = data.player;
      fresh.inventory = data.inventory || {};
      fresh.quests = data.quests || {};
      fresh.flags = data.flags || {};
      fresh.settings = Object.assign(fresh.settings, data.settings || {});
      fresh.lastSafe = data.lastSafe || { mapId: data.mapId, x: data.player.x, y: data.player.y };
      game.state = fresh;
      HBA.State = fresh;
      game.changeMap(fresh.mapId, { x: fresh.player.x, y: fresh.player.y });
      game.state.mode = "play";
      HBA.UI.showGame();
      return true;
    },
    meta: function (slot) {
      var raw = localStorage.getItem(this.key(slot));
      if (!raw) return null;
      try { return JSON.parse(raw); } catch (e) { return null; }
    },
    hasAny: function () { return !!(this.meta(1) || this.meta(2) || this.meta(3)); }
  };
})();
