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
  "version": 1,
  "mode": "explicit-gameplay-crops",
  "rules": {
    "noRuntimeInference": true,
    "description": "Gameplay renders only aliases declared in this catalog. The strict audit manifest remains single-image only."
  },
  "files": [
    {
      "id": "characters.sheet",
      "path": "assets/characters/ChatGPT Image Jun 4, 2026, 08_11_39 PM.png",
      "type": "sprite_sheet",
      "frameWidth": 128,
      "frameHeight": 128,
      "animations": {
        "player.down": [
          "player.down.0",
          "player.down.1",
          "player.down.2",
          "player.down.3"
        ],
        "player.right": [
          "player.right.0",
          "player.right.1",
          "player.right.2",
          "player.right.3"
        ],
        "player.up": [
          "player.up.0",
          "player.up.1",
          "player.up.2",
          "player.up.3"
        ]
      },
      "aliases": {
        "player.down.0": {
          "x": 0,
          "y": 128,
          "w": 128,
          "h": 128
        },
        "player.down.1": {
          "x": 128,
          "y": 128,
          "w": 128,
          "h": 128
        },
        "player.down.2": {
          "x": 256,
          "y": 128,
          "w": 128,
          "h": 128
        },
        "player.down.3": {
          "x": 384,
          "y": 128,
          "w": 128,
          "h": 128
        },
        "player.right.0": {
          "x": 0,
          "y": 256,
          "w": 128,
          "h": 128
        },
        "player.right.1": {
          "x": 128,
          "y": 256,
          "w": 128,
          "h": 128
        },
        "player.right.2": {
          "x": 256,
          "y": 256,
          "w": 128,
          "h": 128
        },
        "player.right.3": {
          "x": 384,
          "y": 256,
          "w": 128,
          "h": 128
        },
        "player.up.0": {
          "x": 0,
          "y": 384,
          "w": 128,
          "h": 128
        },
        "player.up.1": {
          "x": 128,
          "y": 384,
          "w": 128,
          "h": 128
        },
        "player.up.2": {
          "x": 256,
          "y": 384,
          "w": 128,
          "h": 128
        },
        "player.up.3": {
          "x": 384,
          "y": 384,
          "w": 128,
          "h": 128
        },
        "npc.elowen": {
          "x": 0,
          "y": 640,
          "w": 128,
          "h": 128
        },
        "npc.jonah": {
          "x": 128,
          "y": 640,
          "w": 128,
          "h": 128
        },
        "npc.marr": {
          "x": 256,
          "y": 640,
          "w": 128,
          "h": 128
        },
        "npc.child": {
          "x": 384,
          "y": 640,
          "w": 128,
          "h": 128
        },
        "npc.orlen": {
          "x": 512,
          "y": 640,
          "w": 128,
          "h": 128
        },
        "npc.townsfolk": {
          "x": 640,
          "y": 640,
          "w": 128,
          "h": 128
        }
      }
    },
    {
      "id": "enemies.hollowed",
      "path": "assets/enemies/ChatGPT Image Jun 4, 2026, 08_11_42 PM.png",
      "type": "sprite_sheet",
      "frameWidth": 128,
      "frameHeight": 128,
      "animations": {
        "enemy.hollowed": [
          "enemy.hollowed.0",
          "enemy.hollowed.1",
          "enemy.hollowed.2",
          "enemy.hollowed.3"
        ]
      },
      "aliases": {
        "enemy.hollowed.0": {
          "x": 0,
          "y": 128,
          "w": 128,
          "h": 128
        },
        "enemy.hollowed.1": {
          "x": 128,
          "y": 128,
          "w": 128,
          "h": 128
        },
        "enemy.hollowed.2": {
          "x": 256,
          "y": 128,
          "w": 128,
          "h": 128
        },
        "enemy.hollowed.3": {
          "x": 384,
          "y": 128,
          "w": 128,
          "h": 128
        }
      }
    },
    {
      "id": "enemies.keeper",
      "path": "assets/enemies/ChatGPT Image Jun 4, 2026, 08_24_53 PM.png",
      "type": "sprite_sheet",
      "frameWidth": 128,
      "frameHeight": 128,
      "animations": {
        "enemy.keeper": [
          "enemy.keeper.0",
          "enemy.keeper.1",
          "enemy.keeper.2",
          "enemy.keeper.3"
        ]
      },
      "aliases": {
        "enemy.keeper.0": {
          "x": 0,
          "y": 128,
          "w": 128,
          "h": 128
        },
        "enemy.keeper.1": {
          "x": 128,
          "y": 128,
          "w": 128,
          "h": 128
        },
        "enemy.keeper.2": {
          "x": 256,
          "y": 128,
          "w": 128,
          "h": 128
        },
        "enemy.keeper.3": {
          "x": 384,
          "y": 128,
          "w": 128,
          "h": 128
        }
      }
    },
    {
      "id": "enemies.surgeon",
      "path": "assets/enemies/ChatGPT Image Jun 4, 2026, 08_24_59 PM.png",
      "type": "sprite_sheet",
      "frameWidth": 128,
      "frameHeight": 128,
      "animations": {
        "enemy.surgeon": [
          "enemy.surgeon.0",
          "enemy.surgeon.1",
          "enemy.surgeon.2",
          "enemy.surgeon.3"
        ]
      },
      "aliases": {
        "enemy.surgeon.0": {
          "x": 0,
          "y": 128,
          "w": 128,
          "h": 128
        },
        "enemy.surgeon.1": {
          "x": 128,
          "y": 128,
          "w": 128,
          "h": 128
        },
        "enemy.surgeon.2": {
          "x": 256,
          "y": 128,
          "w": 128,
          "h": 128
        },
        "enemy.surgeon.3": {
          "x": 384,
          "y": 128,
          "w": 128,
          "h": 128
        }
      }
    },
    {
      "id": "enemies.depths",
      "path": "assets/enemies/ChatGPT Image Jun 4, 2026, 08_25_03 PM.png",
      "type": "sprite_sheet",
      "frameWidth": 128,
      "frameHeight": 128,
      "animations": {
        "enemy.depths": [
          "enemy.depths.0",
          "enemy.depths.1",
          "enemy.depths.2",
          "enemy.depths.3"
        ]
      },
      "aliases": {
        "enemy.depths.0": {
          "x": 0,
          "y": 128,
          "w": 128,
          "h": 128
        },
        "enemy.depths.1": {
          "x": 128,
          "y": 128,
          "w": 128,
          "h": 128
        },
        "enemy.depths.2": {
          "x": 256,
          "y": 128,
          "w": 128,
          "h": 128
        },
        "enemy.depths.3": {
          "x": 384,
          "y": 128,
          "w": 128,
          "h": 128
        }
      }
    },
    {
      "id": "portraits.sheet",
      "path": "assets/portraits/ChatGPT Image Jun 4, 2026, 08_15_41 PM.png",
      "type": "sprite_sheet",
      "frameWidth": 256,
      "frameHeight": 256,
      "animations": {},
      "aliases": {
        "portrait.hollow": {
          "x": 0,
          "y": 0,
          "w": 256,
          "h": 256
        },
        "portrait.jonah": {
          "x": 256,
          "y": 0,
          "w": 256,
          "h": 256
        },
        "portrait.elowen": {
          "x": 512,
          "y": 0,
          "w": 256,
          "h": 256
        },
        "portrait.marr": {
          "x": 768,
          "y": 0,
          "w": 256,
          "h": 256
        },
        "portrait.child": {
          "x": 0,
          "y": 256,
          "w": 256,
          "h": 256
        },
        "portrait.orlen": {
          "x": 256,
          "y": 256,
          "w": 256,
          "h": 256
        }
      }
    },
    {
      "id": "ui.sheet",
      "path": "assets/ui/ChatGPT Image Jun 4, 2026, 08_13_04 PM.png",
      "type": "single_image",
      "aliases": {}
    },
    {
      "id": "tilesets.town",
      "path": "assets/tilesets/ChatGPT Image Jun 4, 2026, 08_11_46 PM.png",
      "type": "tileset",
      "tileSize": 64,
      "aliases": {
        "tile.town.floor": {
          "x": 64,
          "y": 64,
          "w": 64,
          "h": 64
        },
        "tile.town.road": {
          "x": 192,
          "y": 64,
          "w": 64,
          "h": 64
        },
        "tile.town.wall": {
          "x": 320,
          "y": 64,
          "w": 64,
          "h": 64
        },
        "tile.town.water": {
          "x": 448,
          "y": 128,
          "w": 64,
          "h": 64
        },
        "tile.town.debris": {
          "x": 576,
          "y": 192,
          "w": 64,
          "h": 64
        }
      }
    },
    {
      "id": "tilesets.wilds",
      "path": "assets/tilesets/ChatGPT Image Jun 4, 2026, 08_11_51 PM.png",
      "type": "tileset",
      "tileSize": 64,
      "aliases": {
        "tile.wilds.floor": {
          "x": 64,
          "y": 64,
          "w": 64,
          "h": 64
        },
        "tile.wilds.path": {
          "x": 192,
          "y": 64,
          "w": 64,
          "h": 64
        },
        "tile.wilds.tree": {
          "x": 320,
          "y": 128,
          "w": 64,
          "h": 64
        },
        "tile.wilds.rock": {
          "x": 448,
          "y": 192,
          "w": 64,
          "h": 64
        },
        "tile.wilds.debris": {
          "x": 576,
          "y": 256,
          "w": 64,
          "h": 64
        }
      }
    },
    {
      "id": "tilesets.hollow",
      "path": "assets/tilesets/ChatGPT Image Jun 4, 2026, 08_11_55 PM.png",
      "type": "tileset",
      "tileSize": 64,
      "aliases": {
        "tile.hollow.floor": {
          "x": 64,
          "y": 64,
          "w": 64,
          "h": 64
        },
        "tile.hollow.stone": {
          "x": 192,
          "y": 64,
          "w": 64,
          "h": 64
        },
        "tile.hollow.cave": {
          "x": 320,
          "y": 128,
          "w": 64,
          "h": 64
        },
        "tile.hollow.sewer": {
          "x": 448,
          "y": 192,
          "w": 64,
          "h": 64
        },
        "tile.hollow.ritual": {
          "x": 576,
          "y": 256,
          "w": 64,
          "h": 64
        }
      }
    }
  ]
};
})();
