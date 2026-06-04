(function () {
  window.HBA = window.HBA || {};
  HBA.Player = {
    update: function (game, dt) {
      var s = game.state, p = s.player, map = game.map;
      p.attackCd = Math.max(0, p.attackCd - dt);
      p.dodge = Math.max(0, p.dodge - dt);
      p.invuln = Math.max(0, p.invuln - dt);
      var axis = HBA.Input.axis();
      var moving = axis.x || axis.y;
      var speed = p.dodge > 0 ? 156 : 82;
      p.facing = p.dir || "down";
      p.anim = moving ? "walk" : "idle";
      if (p.dodge > 0) p.anim = "dodge";
      if (p.attackCd > 0.18) p.anim = "attack";
      if (moving && p.dodge <= 0) {
        p.stamina = Math.max(0, p.stamina - dt * 4);
        if (Math.random() < dt * 4) HBA.Audio.play("footstep");
      }
      if (!moving) p.stamina = Math.min(p.maxStamina, p.stamina + dt * 18);
      if (moving) {
        if (Math.abs(axis.x) > Math.abs(axis.y)) p.dir = axis.x > 0 ? "right" : "left";
        else p.dir = axis.y > 0 ? "down" : "up";
        p.facing = p.dir;
        HBA.Collision.move(p, axis.x * speed * dt, axis.y * speed * dt, map);
      }
      if ((HBA.Input.consume(" ") || HBA.Input.consume("Spacebar")) && p.stamina >= 24) {
        p.stamina -= 24; p.dodge = 0.22; p.invuln = Math.max(p.invuln, 0.35); p.anim = "dodge"; HBA.Audio.play("footstep");
      }
      if ((HBA.Input.consume("j") || HBA.Input.consume("J") || HBA.Input.mouseAttack) && p.attackCd <= 0 && p.stamina >= 18) {
        p.stamina -= 18; p.attackCd = 0.36; p.anim = "attack"; HBA.Combat.playerAttack(game); HBA.Audio.play("attack");
      }
      if (HBA.Input.consume("e") || HBA.Input.consume("E") || HBA.Input.consume("Enter")) HBA.Maps.interact(game);
      if (HBA.Input.consume("i") || HBA.Input.consume("I")) HBA.UI.showInventory();
      if (HBA.Input.consume("q") || HBA.Input.consume("Q")) HBA.UI.showJournal();
      if (HBA.Input.consume("Escape")) HBA.UI.togglePause();
      if (p.hp <= 0) HBA.Combat.playerDied(game);
    }
  };
})();
