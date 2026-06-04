(function () {
  window.HBA = window.HBA || {};
  HBA.Inventory = {
    add: function (s, id, count) {
      s.inventory[id] = (s.inventory[id] || 0) + (count || 1);
      var item = HBA.Content.items[id];
      HBA.UI.toast("Found " + (item ? item.name : id));
    },
    has: function (s, id) { return (s.inventory[id] || 0) > 0; },
    use: function (s, id) {
      var item = HBA.Content.items[id];
      if (!item || !this.has(s, id)) return false;
      if (item.type !== "consumable" && item.type !== "combat") return false;
      if (item.heal) s.player.hp = Math.min(s.player.maxHp, s.player.hp + item.heal);
      if (item.sanity) s.player.sanity = Math.min(100, s.player.sanity + item.sanity);
      if (item.ward) s.player.invuln = Math.max(s.player.invuln, item.ward);
      s.inventory[id]--;
      HBA.Audio.play(item.heal ? "heal" : "horror");
      HBA.UI.toast("Used " + item.name);
      return true;
    },
    entries: function (s) {
      return Object.keys(s.inventory).filter(function (id) { return s.inventory[id] > 0; }).map(function (id) {
        return { id: id, count: s.inventory[id], data: HBA.Content.items[id] };
      });
    }
  };
})();
