(function () {
  window.HBA = window.HBA || {};
  HBA.Enemies = {
    spawn: function (ref) {
      var type = HBA.Content.enemyTypes[ref.type];
      return {
        id: ref.type + "_" + Math.random().toString(16).slice(2),
        kind: ref.type,
        name: type.name,
        sprite: type.sprite,
        x: ref.x,
        y: ref.y,
        w: type.w || 18,
        h: type.h || 24,
        hp: type.hp,
        maxHp: type.hp,
        speed: type.speed,
        damage: type.damage,
        range: type.range,
        tint: type.tint,
        attackCd: 0,
        scale: type.scale,
        anim: "idle",
        facing: "down"
      };
    },
    spawnBoss: function (ref) {
      if (!ref) return null;
      var b = HBA.Content.bosses[ref.id];
      if (HBA.State.flags[b.flag]) return null;
      return {
        bossId: ref.id,
        name: b.name,
        sprite: b.sprite,
        x: ref.x,
        y: ref.y,
        w: 28,
        h: 32,
        hp: b.hp,
        maxHp: b.hp,
        speed: b.speed,
        damage: b.damage,
        phases: b.phases.slice(),
        flag: b.flag,
        memory: b.memory,
        range: 34,
        tint: "rgba(60,32,44,0.3)",
        attackCd: 1,
        scale: 0.88,
        anim: "idle",
        facing: "down"
      };
    },
    update: function (game, dt) {
      var all = game.state.enemies.slice();
      if (game.state.boss) all.push(game.state.boss);
      all.forEach(function (e) { HBA.Enemies.updateOne(game, e, dt); });
      game.state.enemies = game.state.enemies.filter(function (e) { return e.hp > 0; });
      if (game.state.boss && game.state.boss.hp <= 0) {
        var b = game.state.boss;
        game.state.flags[b.flag] = true;
        HBA.Memory.add(game.state, b.memory);
        HBA.Quests.setStage(game.state, b.bossId === "hollowSaint" ? "remember" : b.bossId === "lanternMaw" ? "hollow" : b.bossId === "matronHusk" ? "hospital" : "chapel", 2);
        HBA.Audio.play("boss");
        HBA.UI.toast(b.name + " has fallen");
        game.state.boss = null;
        HBA.Enemies.revealBossRewards(game);
      }
    },
    revealBossRewards: function (game) {
      game.map.items.forEach(function (it) {
        if (!it.require || !game.state.flags[it.require]) return;
        var key = "item_" + game.map.id + "_" + it.item + "_" + it.x + "_" + it.y;
        var exists = game.state.items.some(function (held) { return held.key === key; });
        if (!game.state.flags[key] && !exists) {
          game.state.items.push({ x: it.x, y: it.y, item: it.item, count: it.count || 1, key: key });
        }
      });
    },
    updateOne: function (game, e, dt) {
      if (e.hp <= 0) return;
      var p = game.state.player;
      e.attackCd = Math.max(0, e.attackCd - dt);
      var dx = p.x - e.x, dy = p.y - e.y;
      var d = Math.max(1, Math.hypot(dx, dy));
      e.anim = "idle";
      if (d < 220) {
        e.anim = "walk";
        e.facing = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? "right" : "left") : (dy > 0 ? "down" : "up");
        var speed = e.speed * (e.hp < e.maxHp * 0.35 ? 1.25 : 1);
        HBA.Collision.move(e, dx / d * speed * dt, dy / d * speed * dt, game.map);
      }
      if (d < e.range && e.attackCd <= 0) {
        e.anim = "attack";
        e.attackCd = e.bossId ? 1.1 : 0.9;
        HBA.Combat.hurtPlayer(game, e.damage);
      }
      if (e.attackCd > 0.72) e.anim = "attack";
      if (e.bossId && e.phases.length && e.hp / e.maxHp < e.phases[0]) {
        e.phases.shift();
        e.damage += 3;
        e.speed += 8;
        e.scale = Math.min(1.05, (e.scale || 0.88) + 0.05);
        HBA.Audio.play("boss");
        HBA.UI.toast(e.name + " changes its prayer");
      }
    }
  };
})();
