(function () {
  window.HBA = window.HBA || {};
  HBA.Maps = {
    load: function (game, id, spawn) {
      var s = game.state;
      var map = HBA.Content.maps[id];
      s.mapId = id;
      s.items = map.items.filter(function (it) {
        if (it.require && !s.flags[it.require]) return false;
        return !s.flags["item_" + id + "_" + it.item + "_" + it.x + "_" + it.y];
      }).map(function (it) {
        return { x: it.x, y: it.y, item: it.item, count: it.count || 1, key: "item_" + id + "_" + it.item + "_" + it.x + "_" + it.y };
      });
      s.npcs = map.npcs.map(function (n) {
        return { id: n.id, x: n.x, y: n.y, w: n.sprite === "child" ? 14 : 18, h: n.sprite === "child" ? 20 : 24, sprite: n.sprite, dialogue: n.dialogue, scale: n.sprite === "child" ? 0.86 : 1, tint: "rgba(18,16,16,0.22)", anim: "idle", facing: "down" };
      });
      s.enemies = map.enemies.filter(function (e, i) { return !s.flags["enemy_" + id + "_" + i]; }).map(function (e) { return HBA.Enemies.spawn(e); });
      s.boss = this.spawnBossForState(s, map.boss);
      if (spawn) { s.player.x = spawn.x; s.player.y = spawn.y; }
      s.lastSafe = { mapId: id, x: s.player.x, y: s.player.y };
      HBA.Audio.ambientFor(map.ambient);
      HBA.UI.setArea(map.name);
      HBA.UI.toast(map.name);
    },
    spawnBossForState: function (s, ref) {
      if (!ref) return null;
      var b = HBA.Content.bosses[ref.id];
      if (s.flags[b.flag]) return null;
      return {
        bossId: ref.id, name: b.name, sprite: b.sprite, x: ref.x, y: ref.y, w: 28, h: 32,
        hp: b.hp, maxHp: b.hp, speed: b.speed, damage: b.damage, phases: b.phases.slice(),
        flag: b.flag, memory: b.memory, range: 36, tint: "rgba(60,32,44,0.3)", attackCd: 1, scale: 0.88, anim: "idle", facing: "down"
      };
    },
    interact: function (game) {
      var s = game.state, p = s.player, map = game.map;
      for (var i = 0; i < s.items.length; i++) {
        var it = s.items[i];
        if (Math.hypot(it.x - p.x, it.y - p.y) < 30) {
          HBA.Inventory.add(s, it.item, it.count);
          s.flags[it.key] = true;
          s.items.splice(i, 1);
          this.itemQuest(s, it.item);
          return;
        }
      }
      for (var n = 0; n < s.npcs.length; n++) {
        var npc = s.npcs[n];
        if (Math.hypot(npc.x - p.x, npc.y - p.y) < 42) {
          HBA.Dialogue.start(game, npc.dialogue);
          return;
        }
      }
      for (var j = 0; j < map.interactables.length; j++) {
        var o = map.interactables[j];
        if (HBA.Collision.rectsOverlap({ x: p.x - 18, y: p.y - 22, w: 36, h: 44 }, o)) {
          if (o.requireItem && !HBA.Inventory.has(s, o.requireItem)) { HBA.UI.toast("The lock wants " + HBA.Content.items[o.requireItem].name); return; }
          if (o.requireFlag && !s.flags[o.requireFlag]) { HBA.UI.toast("The Hollow is not ready to answer."); return; }
          if (o.memory) HBA.Memory.add(s, o.memory);
          if (o.quest) HBA.Quests.setStage(s, o.quest[0], o.quest[1]);
          if (o.dialogue) HBA.Dialogue.start(game, o.dialogue);
          else HBA.UI.toast(o.text);
          return;
        }
      }
      for (var e = 0; e < map.exits.length; e++) {
        var ex = map.exits[e];
        if (HBA.Collision.rectsOverlap({ x: p.x - 8, y: p.y - 12, w: 16, h: 24 }, ex)) {
          if (ex.requireItem && !HBA.Inventory.has(s, ex.requireItem)) { HBA.UI.toast("Locked. You need " + HBA.Content.items[ex.requireItem].name + "."); return; }
          if (ex.quest) HBA.Quests.setStage(s, ex.quest[0], ex.quest[1]);
          game.changeMap(ex.to, ex.spawn);
          return;
        }
      }
    },
    itemQuest: function (s, id) {
      if (id === "bellShard") { HBA.Quests.setStage(s, "chapel", 2); HBA.Quests.setStage(s, "bell", 1); }
      if (id === "schoolLedger") HBA.Quests.setStage(s, "school", 2);
      if (id === "hospitalTag") { HBA.Quests.setStage(s, "hospital", 2); HBA.Quests.setStage(s, "mine", 0); }
      if (id === "mineKey") HBA.Quests.setStage(s, "mine", 1);
      if (id === "memoryBell") HBA.Quests.setStage(s, "remember", 1);
      if (id === "finalEmber") HBA.Quests.setStage(s, "hollow", 2);
    }
  };
})();
