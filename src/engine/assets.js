(function () {
  window.THBA = window.THBA || {};

  class AssetManager {
    constructor(manifest, catalog) {
      this.manifest = manifest;
      this.catalog = catalog || window.THBA.ASSET_CATALOG || { files: [] };
      this.images = {};
      this.aliases = {};
      this.buildAliases();
    }

    buildAliases() {
      for (const file of this.catalog.files || []) {
        for (const name of Object.keys(file.aliases || {})) {
          this.aliases[name] = Object.assign({ imageId: file.id }, file.aliases[name]);
        }
      }
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

    drawAlias(ctx, alias, dx, dy, dw, dh, options) {
      const crop = this.aliases[alias];
      if (!crop) {
        if (!this.warnedAliases) this.warnedAliases = new Set();
        if (!this.warnedAliases.has(alias)) {
          console.warn("Missing asset alias", alias);
          this.warnedAliases.add(alias);
        }
        ctx.save();
        ctx.fillStyle = options && options.fallback || "#6b6057";
        ctx.fillRect(dx, dy, dw, dh);
        ctx.restore();
        return false;
      }
      return this.drawCrop(ctx, crop.imageId, crop.x, crop.y, crop.w, crop.h, dx, dy, dw, dh, options);
    }

    drawCrop(ctx, imageId, sx, sy, sw, sh, dx, dy, dw, dh, options) {
      const img = this.get(imageId);
      options = options || {};
      if (img && (sx < 0 || sy < 0 || sx + sw > img.naturalWidth || sy + sh > img.naturalHeight)) {
        if (!this.warnedCrops) this.warnedCrops = new Set();
        const key = `${imageId}:${sx},${sy},${sw},${sh}`;
        if (!this.warnedCrops.has(key)) {
          console.warn("Out-of-bounds asset crop", key, img.naturalWidth, img.naturalHeight);
          this.warnedCrops.add(key);
        }
      }
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
      return Boolean(img);
    }
  }

  window.THBA.AssetManager = AssetManager;
})();
