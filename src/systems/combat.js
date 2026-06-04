(function () {
  window.HBA = window.HBA || {};
  HBA.Combat = {
    playerAttack: function (game) {
      var p = game.state.player;
      var targets = game.state.enemies.slice();
      if (game.state.boss) targets.push(game.state.boss);
      targets.forEach(function (e) {
        var d = Math.hypot(e.x - p.x, e.y - p.y);
        if (d < 48) {
          e.hp -= 34;
          e.x += (e.x - p.x) / Math.max(1, d) * 12;
          e.y += (e.y - p.y) / Math.max(1, d) * 12;
          HBA.Audio.play("hit");
          if (e.hp <= 0 && !e.bossId) HBA.Memory.add(game.state, HBA.Content.enemyTypes[e.kind].xpMemory);
        }
      });
    },
    hurtPlayer: function (game, amount) {
      var p = game.state.player;
      if (p.invuln > 0) return;
      var diff = game.state.settings.difficulty;
      var mult = diff === "Story" ? 0.7 : diff === "Harrowing" ? 1.35 : 1;
      p.hp = Math.max(0, p.hp - Math.round(amount * mult));
      p.sanity = Math.max(0, p.sanity - 3);
      p.invuln = 0.55;
      HBA.Audio.play("hit");
    },
    playerDied: function (game) {
      HBA.UI.showDeath(function () {
        var safe = game.state.lastSafe;
        game.changeMap(safe.mapId, { x: safe.x, y: safe.y });
        game.state.player.hp = game.state.player.maxHp;
        game.state.player.stamina = game.state.player.maxStamina;
        game.state.player.sanity = Math.max(40, game.state.player.sanity);
        game.state.mode = "play";
      });
    }
  };
})();
