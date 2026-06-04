(function () {
  window.THBA = window.THBA || {};

  class AssetManager {
    constructor(manifest) {
      this.manifest = manifest;
      this.images = {};
    }

    load() {
      const entries = [];
      const walk = (prefix, value) => {
        Object.keys(value).forEach((key) => {
          const next = value[key];
          const id = prefix ? `${prefix}.${key}` : key;
          if (typeof next === "string") entries.push([id, next]);
          else walk(id, next);
        });
      };
      walk("", this.manifest);
      return Promise.all(entries.map(([id, src]) => new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          this.images[id] = img;
          resolve();
        };
        img.onerror = () => {
          console.warn("Missing asset", src);
          resolve();
        };
        img.src = src;
      })));
    }

    get(id) {
      return this.images[id];
    }

    drawCrop(ctx, imageId, sx, sy, sw, sh, dx, dy, dw, dh, options) {
      const img = this.get(imageId);
      options = options || {};
      ctx.save();
      if (options.alpha !== undefined) ctx.globalAlpha = options.alpha;
      if (options.mirror) {
        ctx.translate(dx + dw, dy);
        ctx.scale(-1, 1);
        dx = 0;
        dy = 0;
      }
      if (img) ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
      else {
        ctx.fillStyle = options.fallback || "#6b6057";
        ctx.fillRect(dx, dy, dw, dh);
      }
      if (options.tint) {
        ctx.globalCompositeOperation = "source-atop";
        ctx.globalAlpha = options.tintAlpha || .35;
        ctx.fillStyle = options.tint;
        ctx.fillRect(dx, dy, dw, dh);
      }
      ctx.restore();
    }
  }

  window.THBA.AssetManager = AssetManager;
})();
