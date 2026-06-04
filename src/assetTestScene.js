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
    dl.appendChild(el("dd", "", value));
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
    header.appendChild(el("p", "", "Asset audit scene. Every PNG under assets/ is displayed exactly once as a complete image. No gameplay scripts, slicing, animation, tile sampling, or sprite framing are running."));

    const stats = el("div", "audit-stats");
    stats.appendChild(el("span", "audit-pill", `${manifest.summary.pngCount} PNG files`));
    stats.appendChild(el("span", "audit-pill", manifest.mode));
    stats.appendChild(el("span", "audit-pill", "full-image display only"));
    header.appendChild(stats);
    root.appendChild(header);

    const grid = el("section", "asset-grid");
    manifest.assets.forEach((asset, index) => {
      const card = el("article", "asset-card");
      const imageWrap = el("div", "asset-image-wrap");
      const img = document.createElement("img");
      img.src = asset.path;
      img.alt = `${asset.classification}: ${asset.filename}`;
      img.loading = "eager";
      img.dataset.auditIndex = String(index + 1);
      imageWrap.appendChild(img);
      card.appendChild(imageWrap);

      const meta = el("div", "asset-meta");
      meta.appendChild(el("h2", "", asset.filename));
      const dl = el("dl");
      addMeta(dl, "Path", asset.path);
      addMeta(dl, "Folder", asset.folder);
      addMeta(dl, "Dimensions", `${asset.width} x ${asset.height}`);
      addMeta(dl, "Color", asset.colorMode);
      addMeta(dl, "Alpha", asset.hasAlpha ? "yes" : "no");
      addMeta(dl, "Type", asset.classification);
      addMeta(dl, "Purpose", asset.likelyPurpose);
      meta.appendChild(dl);
      meta.appendChild(el("p", "asset-notes", asset.notes));
      card.appendChild(meta);
      grid.appendChild(card);
    });
    root.appendChild(grid);
  }

  window.addEventListener("DOMContentLoaded", render);
})();
