(function () {
  window.HBA = window.HBA || {};
  HBA.Renderer = {
    canvas: null,
    ctx: null,
    tintCanvas: null,
    tintCtx: null,
    init: function () {
      this.canvas = document.getElementById("gameCanvas");
      this.ctx = this.canvas.getContext("2d");
      this.ctx.imageSmoothingEnabled = false;
      this.tintCanvas = document.createElement("canvas");
      this.tintCtx = this.tintCanvas.getContext("2d");
      this.tintCtx.imageSmoothingEnabled = false;
    },
    draw: function (game) {
      var ctx = this.ctx;
      var s = game.state;
      var map = game.map;
      ctx.clearRect(0, 0, 480, 270);
      this.updateCamera(s, map);
      this.drawMap(ctx, map, s.camera);
      this.drawItems(ctx, s.items, s.camera);
      this.drawActors(ctx, s.npcs, s.camera, false);
      this.drawActors(ctx, s.enemies, s.camera, true);
      if (s.boss) this.drawActors(ctx, [s.boss], s.camera, true);
      this.drawPlayer(ctx, s.player, s.camera);
      this.drawWeather(ctx, s, map);
      this.drawDarkness(ctx, s, map);
      this.drawMemory(ctx, s);
      if (s.player.attackCd > 0.24) this.drawAttack(ctx, s.player, s.camera);
    },
    updateCamera: function (s, map) {
      s.camera.x = Math.max(0, Math.min(map.w * 16 - 480, s.player.x - 240));
      s.camera.y = Math.max(0, Math.min(map.h * 16 - 270, s.player.y - 135));
    },
    pickTile: function (palette, key, x, y) {
      var group = palette[key] || palette.ground;
      return group[(x * 3 + y * 5) % group.length];
    },
    drawMap: function (ctx, map, cam) {
      var img = HBA.Assets.tile(map.tileset);
      var def = HBA.Content.assets.tilesets[map.tileset];
      var palette = HBA.Content.tilePalettes[map.tileset];
      for (var layerName in map.layers) {
        var layer = map.layers[layerName];
        for (var y = 0; y < map.h; y++) {
          for (var x = 0; x < map.w; x++) {
            var key = layer[y * map.w + x];
            if (!key) continue;
            var tile = this.pickTile(palette, key, x, y);
            if (!tile || tile.sx == null || tile.sy == null) {
              console.warn("Invalid tile", map.tileset, key, tile);
              continue;
            }
            ctx.drawImage(img, tile.sx, tile.sy, tile.sw || def.tile, tile.sh || def.tile, x * 16 - cam.x, y * 16 - cam.y, 16, 16);
          }
        }
      }
    },
    spriteDef: function (sprite) {
      var asset = HBA.Content.assets.sprites[sprite] || HBA.Content.assets.sprites.player;
      return HBA.Content.spriteDefs[asset.def || "character"] || HBA.Content.spriteDefs.character;
    },
    frameFor: function (actor, def) {
      var anim = actor.anim || "idle";
      var frames = def.animations[anim] || def.animations.idle || [0];
      var index = Math.floor((HBA.State.time * (anim === "idle" ? 3 : 8)) % frames.length);
      var col = frames[index];
      var row = 0;
      if (def.facingRows) row = def.facingRows[actor.dir || actor.facing || "down"] || 0;
      return { col: Math.min(def.cols - 1, col), row: Math.min(def.rows - 1, row) };
    },
    drawSprite: function (ctx, sprite, actor, cam) {
      var asset = HBA.Content.assets.sprites[sprite] || HBA.Content.assets.sprites.player;
      var img = HBA.Assets.sprite(sprite);
      var def = this.spriteDef(sprite);
      if (!img || !img.width) return this.drawFallback(ctx, actor.x, actor.y, cam, sprite);
      var fw = def.frameW || asset.frameW;
      var fh = def.frameH || asset.frameH;
      var frame = this.frameFor(actor, def);
      var sx = frame.col * fw;
      var sy = frame.row * fh;
      if (sx + fw > img.width || sy + fh > img.height) {
        console.warn("Invalid sprite frame", sprite, frame);
        return this.drawFallback(ctx, actor.x, actor.y, cam, sprite);
      }
      var scale = actor.scale || def.scale || 1;
      var dx = Math.round(actor.x - cam.x - def.anchorX * scale);
      var dy = Math.round(actor.y - cam.y - def.anchorY * scale);
      this.drawShadow(ctx, actor.x - cam.x, actor.y - cam.y, def.shadow, scale);
      this.tintCanvas.width = fw;
      this.tintCanvas.height = fh;
      this.tintCtx.clearRect(0, 0, fw, fh);
      this.tintCtx.drawImage(img, sx, sy, fw, fh, 0, 0, fw, fh);
      this.cleanSpriteBackground(this.tintCtx, fw, fh);
      this.tintCtx.globalCompositeOperation = "multiply";
      this.tintCtx.fillStyle = actor.tint || "rgba(46, 40, 42, 0.62)";
      this.tintCtx.fillRect(0, 0, fw, fh);
      this.tintCtx.globalCompositeOperation = "source-over";
      ctx.drawImage(this.tintCanvas, dx, dy, fw * scale, fh * scale);
    },
    cleanSpriteBackground: function (ctx, w, h) {
      var img = ctx.getImageData(0, 0, w, h);
      var d = img.data;
      for (var i = 0; i < d.length; i += 4) {
        var r = d[i], g = d[i + 1], b = d[i + 2], a = d[i + 3];
        var teal = r < 20 && g > 45 && b > 45 && Math.abs(g - b) < 55;
        var blackMatte = r < 8 && g < 16 && b < 16;
        if (a > 0 && (teal || blackMatte)) d[i + 3] = 0;
      }
      ctx.putImageData(img, 0, 0);
    },
    drawShadow: function (ctx, x, y, shadow, scale) {
      shadow = shadow || [18, 6];
      ctx.fillStyle = "rgba(0,0,0,0.42)";
      ctx.beginPath();
      ctx.ellipse(Math.round(x), Math.round(y - 2), shadow[0] * scale, shadow[1] * scale, 0, 0, Math.PI * 2);
      ctx.fill();
    },
    drawFallback: function (ctx, x, y, cam, sprite) {
      console.warn("Missing sprite fallback", sprite);
      ctx.fillStyle = "rgba(10,8,8,0.82)";
      ctx.beginPath();
      ctx.ellipse(x - cam.x, y - cam.y - 8, 8, 14, 0, 0, Math.PI * 2);
      ctx.fill();
    },
    drawActors: function (ctx, actors, cam, hostile) {
      actors.forEach(function (a) {
        HBA.Renderer.drawSprite(ctx, a.sprite, a, cam);
        if (hostile && a.hp > 0) {
          var w = a.bossId ? 44 : 30;
          ctx.fillStyle = "rgba(0,0,0,0.72)";
          ctx.fillRect(a.x - cam.x - w / 2, a.y - cam.y - 34, w, 4);
          ctx.fillStyle = a.bossId ? "#b24a54" : "#8f3439";
          ctx.fillRect(a.x - cam.x - w / 2, a.y - cam.y - 34, w * (a.hp / a.maxHp), 4);
        }
      });
    },
    drawPlayer: function (ctx, p, cam) {
      this.drawSprite(ctx, "player", p, cam);
    },
    drawItems: function (ctx, items, cam) {
      items.forEach(function (it) {
        ctx.fillStyle = "rgba(0,0,0,0.45)";
        ctx.beginPath();
        ctx.ellipse(it.x - cam.x, it.y - cam.y, 8, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#d0a55c";
        ctx.fillRect(it.x - cam.x - 3, it.y - cam.y - 9, 6, 10);
        ctx.fillStyle = "rgba(255,230,180,0.24)";
        ctx.fillRect(it.x - cam.x - 5, it.y - cam.y - 11, 10, 14);
      });
    },
    drawAttack: function (ctx, p, cam) {
      ctx.strokeStyle = "rgba(230,210,165,0.75)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(p.x - cam.x, p.y - cam.y - 8, 26, -0.35, Math.PI + 0.35);
      ctx.stroke();
    },
    drawWeather: function (ctx, s, map) {
      if (map.ambient === "rain") {
        ctx.strokeStyle = "rgba(145,160,170,0.24)";
        ctx.lineWidth = 1;
        for (var i = 0; i < 90; i++) {
          var x = (i * 37 + s.time * 160) % 520 - 20;
          var y = (i * 23 + s.time * 260) % 300 - 20;
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 8, y + 16); ctx.stroke();
        }
      }
    },
    drawDarkness: function (ctx, s, map) {
      var pulse = s.settings.reducedFlicker ? 0 : Math.sin(s.time * 17) * 0.025;
      ctx.fillStyle = "rgba(0,0,0," + (0.28 + pulse) + ")";
      ctx.fillRect(0, 0, 480, 270);
      var g = ctx.createRadialGradient(240, 135, 20, 240, 135, map.ambient === "hollow" ? 142 : 188);
      g.addColorStop(0, "rgba(0,0,0,0)");
      g.addColorStop(1, "rgba(0,0,0,0.62)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 480, 270);
    },
    drawMemory: function (ctx, s) {
      if (s.player.memory < 35) return;
      var a = Math.min(0.22, s.player.memory / 420);
      ctx.fillStyle = "rgba(100,160,190," + a + ")";
      for (var i = 0; i < 8; i++) ctx.fillRect((i * 71 + s.time * 13) % 480, 0, 1, 270);
    }
  };
})();
