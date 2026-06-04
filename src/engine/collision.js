(function () {
  window.HBA = window.HBA || {};
  HBA.Collision = {
    rectsOverlap: function (a, b) {
      return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    },
    actorRect: function (a, x, y) {
      return { x: (x == null ? a.x : x) - a.w / 2, y: (y == null ? a.y : y) - a.h / 2, w: a.w, h: a.h };
    },
    blocked: function (map, rect) {
      for (var i = 0; i < map.collision.length; i++) {
        if (this.rectsOverlap(rect, map.collision[i])) return true;
      }
      return false;
    },
    move: function (actor, dx, dy, map) {
      var nextX = actor.x + dx;
      var rx = this.actorRect(actor, nextX, actor.y);
      if (!this.blocked(map, rx)) actor.x = nextX;
      var nextY = actor.y + dy;
      var ry = this.actorRect(actor, actor.x, nextY);
      if (!this.blocked(map, ry)) actor.y = nextY;
    }
  };
})();
