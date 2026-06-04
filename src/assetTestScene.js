(function () {
  window.THBA = window.THBA || {};

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function addMeta(dl, label, value) {
    dl.appendChild(el("dt", "", label));
    dl.appendChild(el("dd", "", value === null || value === undefined ? "not declared" : String(value)));
  }

  function canSliceTileset(asset) {
    return asset.type === "tileset" &&
      (asset.tileSize === 16 || asset.tileSize === 32) &&
      Number.isInteger(asset.columns) &&
      Number.isInteger(asset.rows);
  }

  function canSliceSpriteSheet(asset) {
    return asset.type === "sprite_sheet" &&
      Number.isInteger(asset.frameWidth) &&
      Number.isInteger(asset.frameHeight) &&
      asset.animations &&
      Object.values(asset.animations).every((frames) => Array.isArray(frames) && frames.every(Number.isInteger));
  }

  function renderSingleImage(asset, index) {
    const imageWrap = el("div", "asset-image-wrap");
    const img = document.createElement("img");
    img.src = asset.path;
    img.alt = `${asset.type}: ${asset.path}`;
    img.loading = "eager";
    img.dataset.auditIndex = String(index + 1);
    imageWrap.appendChild(img);
    return imageWrap;
  }

  function renderUnsupported(asset) {
    return el("div", "error", `Manifest entry cannot be rendered because ${asset.type} is missing required explicit metadata.`);
  }

  function renderAssetVisual(asset, index) {
    if (asset.type === "single_image" && asset.drawAsSingleImage === true) return renderSingleImage(asset, index);
    if (canSliceTileset(asset)) return renderUnsupported(asset);
    if (canSliceSpriteSheet(asset)) return renderUnsupported(asset);
    return renderUnsupported(asset);
  }

  function render() {
    const root = document.getElementById("asset-audit");
    const manifest = window.THBA.ASSET_AUDIT_MANIFEST;
    if (!root) return;
    if (!manifest || !Array.isArray(manifest.assets)) {
      root.appendChild(el("div", "error", "Asset audit manifest is missing or malformed."));
      return;
    }

    const header = el("header", "audit-header");
    header.appendChild(el("h1", "", "The Hollow Beneath Ashfall"));
    header.appendChild(el("p", "", "Strict manifest-only asset audit. Images are never classified from folder names, filenames, or dimensions. Current PNGs are all declared as single images and displayed once as complete source images."));

    const stats = el("div", "audit-stats");
    stats.appendChild(el("span", "audit-pill", `${manifest.assets.length} manifest assets`));
    stats.appendChild(el("span", "audit-pill", manifest.mode));
    stats.appendChild(el("span", "audit-pill", "no inferred slicing"));
    header.appendChild(stats);
    root.appendChild(header);

    const grid = el("section", "asset-grid");
    manifest.assets.forEach((asset, index) => {
      const card = el("article", "asset-card");
      card.appendChild(renderAssetVisual(asset, index));

      const meta = el("div", "asset-meta");
      meta.appendChild(el("h2", "", asset.path));
      const dl = el("dl");
      addMeta(dl, "Type", asset.type);
      addMeta(dl, "Single", asset.drawAsSingleImage ? "yes" : "no");
      addMeta(dl, "Tile size", asset.tileSize);
      addMeta(dl, "Columns", asset.columns);
      addMeta(dl, "Rows", asset.rows);
      addMeta(dl, "Frame W", asset.frameWidth);
      addMeta(dl, "Frame H", asset.frameHeight);
      addMeta(dl, "Animations", asset.animations ? JSON.stringify(asset.animations) : null);
      meta.appendChild(dl);
      meta.appendChild(el("p", "asset-notes", asset.purpose));
      card.appendChild(meta);
      grid.appendChild(card);
    });
    root.appendChild(grid);
  }

  window.addEventListener("DOMContentLoaded", render);
})();
