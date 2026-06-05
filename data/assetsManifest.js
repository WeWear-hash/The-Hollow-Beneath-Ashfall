(function () {
  window.THBA = window.THBA || {};
  window.THBA.ASSET_AUDIT_MANIFEST = {
  "version": 3,
  "mode": "strict-manifest-only-asset-audit",
  "rules": {
    "noInference": true,
    "singleImageRule": "Draw as a single full image unless the manifest explicitly declares a supported tileset or sprite_sheet type.",
    "tilesetRule": "Slice only when type is tileset, tileSize is 16 or 32, and columns and rows are explicit numbers.",
    "spriteSheetRule": "Slice only when type is sprite_sheet, frameWidth and frameHeight are explicit numbers, and animations defines explicit frame order.",
    "currentAssetDefault": "All current PNGs are single_image because no explicit tile or animation metadata has been provided."
  },
  "assets": [
    {
      "path": "assets/characters/ChatGPT Image Jun 4, 2026, 08_11_39 PM.png",
      "type": "single_image",
      "purpose": "Undeclared character artwork. Draw as one full image until animation metadata is explicitly provided.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/enemies/ChatGPT Image Jun 4, 2026, 08_11_42 PM.png",
      "type": "single_image",
      "purpose": "Undeclared enemy artwork. Draw as one full image until animation metadata is explicitly provided.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/enemies/ChatGPT Image Jun 4, 2026, 08_24_53 PM.png",
      "type": "single_image",
      "purpose": "Undeclared enemy artwork. Draw as one full image until animation metadata is explicitly provided.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/enemies/ChatGPT Image Jun 4, 2026, 08_24_59 PM.png",
      "type": "single_image",
      "purpose": "Undeclared enemy artwork. Draw as one full image until animation metadata is explicitly provided.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/enemies/ChatGPT Image Jun 4, 2026, 08_25_03 PM.png",
      "type": "single_image",
      "purpose": "Undeclared enemy artwork. Draw as one full image until animation metadata is explicitly provided.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/portraits/ChatGPT Image Jun 4, 2026, 08_15_41 PM.png",
      "type": "single_image",
      "purpose": "Portrait artwork. Always draw as one full image in this audit pass.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/tilesets/ChatGPT Image Jun 4, 2026, 08_11_46 PM.png",
      "type": "single_image",
      "purpose": "Undeclared environment artwork. Draw as one full image until tileSize, columns, and rows are explicitly provided.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/tilesets/ChatGPT Image Jun 4, 2026, 08_11_51 PM.png",
      "type": "single_image",
      "purpose": "Undeclared environment artwork. Draw as one full image until tileSize, columns, and rows are explicitly provided.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/tilesets/ChatGPT Image Jun 4, 2026, 08_11_55 PM.png",
      "type": "single_image",
      "purpose": "Undeclared environment artwork. Draw as one full image until tileSize, columns, and rows are explicitly provided.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/ui/ChatGPT Image Jun 4, 2026, 08_13_04 PM.png",
      "type": "single_image",
      "purpose": "UI artwork. Always draw as one full image in this audit pass.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    }
  ]
};
  window.THBA.ASSET_MANIFEST = {
  "tilesets": {
    "town": "assets/tilesets/ChatGPT Image Jun 4, 2026, 08_11_46 PM.png",
    "wilds": "assets/tilesets/ChatGPT Image Jun 4, 2026, 08_11_51 PM.png",
    "hollow": "assets/tilesets/ChatGPT Image Jun 4, 2026, 08_11_55 PM.png"
  },
  "characters": {
    "sheet": "assets/characters/ChatGPT Image Jun 4, 2026, 08_11_39 PM.png"
  },
  "enemies": {
    "hollowed": "assets/enemies/ChatGPT Image Jun 4, 2026, 08_11_42 PM.png",
    "keeper": "assets/enemies/ChatGPT Image Jun 4, 2026, 08_24_53 PM.png",
    "surgeon": "assets/enemies/ChatGPT Image Jun 4, 2026, 08_24_59 PM.png",
    "depths": "assets/enemies/ChatGPT Image Jun 4, 2026, 08_25_03 PM.png"
  },
  "portraits": {
    "sheet": "assets/portraits/ChatGPT Image Jun 4, 2026, 08_15_41 PM.png"
  },
  "ui": {
    "sheet": "assets/ui/ChatGPT Image Jun 4, 2026, 08_13_04 PM.png"
  }
};
  window.THBA.ASSET_CATALOG = {
  "version": 2,
  "mode": "no-sliced-gameplay-assets",
  "rules": {
    "noRuntimeInference": true,
    "noSlicingWithoutVerifiedMetadata": true,
    "description": "Gameplay does not crop or slice generated PNGs. Visuals are procedural until verified tile/sprite metadata is supplied."
  },
  "files": []
};
})();
