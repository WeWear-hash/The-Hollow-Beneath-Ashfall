(function () {
  window.THBA = window.THBA || {};
  window.THBA.ASSET_AUDIT_MANIFEST = {
  "version": 4,
  "mode": "strict-manifest-only-asset-audit",
  "rules": {
    "noInference": true,
    "singleImageRule": "Draw as a single full image unless explicit metadata declares otherwise.",
    "currentAssetDefault": "All current PNGs are treated as single images unless separately declared for gameplay."
  },
  "assets": [
    {
      "path": "assets/characters/player_sheet.png",
      "type": "single_image",
      "purpose": "Repository image asset; no slicing inferred from path or dimensions.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/enemies/attendance_keeper.png",
      "type": "single_image",
      "purpose": "Repository image asset; no slicing inferred from path or dimensions.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/enemies/bell_ringer.png",
      "type": "single_image",
      "purpose": "Repository image asset; no slicing inferred from path or dimensions.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/enemies/final_hollow.png",
      "type": "single_image",
      "purpose": "Repository image asset; no slicing inferred from path or dimensions.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/enemies/forest_stalker.png",
      "type": "single_image",
      "purpose": "Repository image asset; no slicing inferred from path or dimensions.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/enemies/hollowed_townsman.png",
      "type": "single_image",
      "purpose": "Repository image asset; no slicing inferred from path or dimensions.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/enemies/mine_horror.png",
      "type": "single_image",
      "purpose": "Repository image asset; no slicing inferred from path or dimensions.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/enemies/surgeon_without_hands.png",
      "type": "single_image",
      "purpose": "Repository image asset; no slicing inferred from path or dimensions.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/portraits/doctor_portrait.png",
      "type": "single_image",
      "purpose": "Repository image asset; no slicing inferred from path or dimensions.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/portraits/father_portrait.png",
      "type": "single_image",
      "purpose": "Repository image asset; no slicing inferred from path or dimensions.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/portraits/player_portrait.png",
      "type": "single_image",
      "purpose": "Repository image asset; no slicing inferred from path or dimensions.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/tilesets/cave_tileset.png",
      "type": "single_image",
      "purpose": "Repository image asset; no slicing inferred from path or dimensions.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/tilesets/interior_tileset.png",
      "type": "single_image",
      "purpose": "Repository image asset; no slicing inferred from path or dimensions.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/tilesets/town_tileset.png",
      "type": "single_image",
      "purpose": "Repository image asset; no slicing inferred from path or dimensions.",
      "drawAsSingleImage": true,
      "tileSize": null,
      "columns": null,
      "rows": null,
      "frameWidth": null,
      "frameHeight": null,
      "animations": null
    },
    {
      "path": "assets/ui/ui_sheet.png",
      "type": "single_image",
      "purpose": "Repository image asset; no slicing inferred from path or dimensions.",
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
    "town": "assets/tilesets/town_tileset.png",
    "wilds": "assets/tilesets/interior_tileset.png",
    "hollow": "assets/tilesets/cave_tileset.png"
  },
  "characters": {
    "sheet": "assets/characters/player_sheet.png"
  },
  "enemies": {
    "hollowed": "assets/enemies/hollowed_townsman.png",
    "keeper": "assets/enemies/attendance_keeper.png",
    "surgeon": "assets/enemies/surgeon_without_hands.png",
    "depths": "assets/enemies/mine_horror.png"
  },
  "portraits": {
    "player": "assets/portraits/player_portrait.png",
    "doctor": "assets/portraits/doctor_portrait.png",
    "father": "assets/portraits/father_portrait.png"
  },
  "ui": {
    "sheet": "assets/ui/ui_sheet.png"
  }
};
  window.THBA.ASSET_CATALOG = {
  "version": 3,
  "mode": "no-sliced-gameplay-assets",
  "rules": {
    "noRuntimeInference": true,
    "noSlicingWithoutVerifiedMetadata": true,
    "description": "Gameplay does not crop or slice generated PNGs. Portraits are loaded separately as full single images."
  },
  "files": []
};
})();
