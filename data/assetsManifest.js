(function () {
  window.THBA = window.THBA || {};
  window.THBA.ASSET_AUDIT_MANIFEST = {
  "version": 5,
  "mode": "source-manifest-mirror",
  "assets": [
    {
      "path": "assets/characters/player_sheet.png",
      "type": "sprite_sheet",
      "frameWidth": 32,
      "frameHeight": 32
    },
    {
      "path": "assets/enemies/hollowed_townsman.png",
      "type": "sprite_sheet",
      "frameWidth": 32,
      "frameHeight": 32
    },
    {
      "path": "assets/enemies/final_hollow.png",
      "type": "sprite_sheet",
      "frameWidth": 32,
      "frameHeight": 32
    },
    {
      "path": "assets/enemies/attendance_keeper.png",
      "type": "sprite_sheet",
      "frameWidth": 32,
      "frameHeight": 32
    },
    {
      "path": "assets/enemies/bell_ringer.png",
      "type": "sprite_sheet",
      "frameWidth": 32,
      "frameHeight": 32
    },
    {
      "path": "assets/enemies/forest_stalker.png",
      "type": "sprite_sheet",
      "frameWidth": 32,
      "frameHeight": 32
    },
    {
      "path": "assets/enemies/mine_horror.png",
      "type": "sprite_sheet",
      "frameWidth": 32,
      "frameHeight": 32
    },
    {
      "path": "assets/enemies/surgeon_without_hands.png",
      "type": "sprite_sheet",
      "frameWidth": 32,
      "frameHeight": 32
    },
    {
      "path": "assets/tilesets/town_tileset.png",
      "type": "tileset",
      "tileSize": 32
    },
    {
      "path": "assets/tilesets/cave_tileset.png",
      "type": "tileset",
      "tileSize": 32
    },
    {
      "path": "assets/tilesets/interior_tileset.png",
      "type": "tileset",
      "tileSize": 32
    },
    {
      "path": "assets/portraits/father_portrait.png",
      "type": "portrait"
    },
    {
      "path": "assets/portraits/player_portrait.png",
      "type": "portrait"
    },
    {
      "path": "assets/portraits/doctor_portrait.png",
      "type": "portrait"
    },
    {
      "path": "assets/ui/ui_sheet.png",
      "type": "ui"
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
    "bell": "assets/enemies/bell_ringer.png",
    "stalker": "assets/enemies/forest_stalker.png",
    "mine": "assets/enemies/mine_horror.png",
    "final": "assets/enemies/final_hollow.png"
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
  "version": 4,
  "mode": "manifest-safe-static-frames",
  "rules": {
    "noRuntimeInference": true,
    "spriteSheets": "Use only manifest frameWidth/frameHeight and static named aliases.",
    "tilesets": "Use only manifest tileSize and named tile aliases.",
    "portraits": "Full image only via portrait manifest.",
    "ui": "Full image only unless metadata is added."
  },
  "files": [
    {
      "id": "characters.sheet",
      "path": "assets/characters/player_sheet.png",
      "type": "sprite_sheet",
      "frameWidth": 32,
      "frameHeight": 32,
      "aliases": {
        "player.down": {
          "x": 0,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "player.up": {
          "x": 32,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "player.right": {
          "x": 64,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "player.left": {
          "x": 96,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "npc.jonah": {
          "x": 128,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "npc.elowen": {
          "x": 160,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "npc.marr": {
          "x": 192,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "npc.child": {
          "x": 224,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "npc.orlen": {
          "x": 256,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "npc.townsfolk": {
          "x": 288,
          "y": 0,
          "w": 32,
          "h": 32
        }
      }
    },
    {
      "id": "enemies.hollowed",
      "path": "assets/enemies/hollowed_townsman.png",
      "type": "sprite_sheet",
      "frameWidth": 32,
      "frameHeight": 32,
      "aliases": {
        "enemy.hollowed": {
          "x": 0,
          "y": 0,
          "w": 32,
          "h": 32
        }
      }
    },
    {
      "id": "enemies.keeper",
      "path": "assets/enemies/attendance_keeper.png",
      "type": "sprite_sheet",
      "frameWidth": 32,
      "frameHeight": 32,
      "aliases": {
        "enemy.keeper": {
          "x": 0,
          "y": 0,
          "w": 32,
          "h": 32
        }
      }
    },
    {
      "id": "enemies.surgeon",
      "path": "assets/enemies/surgeon_without_hands.png",
      "type": "sprite_sheet",
      "frameWidth": 32,
      "frameHeight": 32,
      "aliases": {
        "enemy.surgeon": {
          "x": 0,
          "y": 0,
          "w": 32,
          "h": 32
        }
      }
    },
    {
      "id": "enemies.bell",
      "path": "assets/enemies/bell_ringer.png",
      "type": "sprite_sheet",
      "frameWidth": 32,
      "frameHeight": 32,
      "aliases": {
        "enemy.bell": {
          "x": 0,
          "y": 0,
          "w": 32,
          "h": 32
        }
      }
    },
    {
      "id": "enemies.stalker",
      "path": "assets/enemies/forest_stalker.png",
      "type": "sprite_sheet",
      "frameWidth": 32,
      "frameHeight": 32,
      "aliases": {
        "enemy.stalker": {
          "x": 0,
          "y": 0,
          "w": 32,
          "h": 32
        }
      }
    },
    {
      "id": "enemies.mine",
      "path": "assets/enemies/mine_horror.png",
      "type": "sprite_sheet",
      "frameWidth": 32,
      "frameHeight": 32,
      "aliases": {
        "enemy.mine": {
          "x": 0,
          "y": 0,
          "w": 32,
          "h": 32
        }
      }
    },
    {
      "id": "enemies.final",
      "path": "assets/enemies/final_hollow.png",
      "type": "sprite_sheet",
      "frameWidth": 32,
      "frameHeight": 32,
      "aliases": {
        "enemy.final": {
          "x": 0,
          "y": 0,
          "w": 32,
          "h": 32
        }
      }
    },
    {
      "id": "tilesets.town",
      "path": "assets/tilesets/town_tileset.png",
      "type": "tileset",
      "tileSize": 32,
      "aliases": {
        "tile.town.floor": {
          "x": 0,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "tile.town.road": {
          "x": 32,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "tile.town.wall": {
          "x": 64,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "tile.town.water": {
          "x": 96,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "tile.town.debris": {
          "x": 128,
          "y": 0,
          "w": 32,
          "h": 32
        }
      }
    },
    {
      "id": "tilesets.wilds",
      "path": "assets/tilesets/interior_tileset.png",
      "type": "tileset",
      "tileSize": 32,
      "aliases": {
        "tile.wilds.floor": {
          "x": 0,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "tile.wilds.path": {
          "x": 32,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "tile.wilds.tree": {
          "x": 64,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "tile.wilds.rock": {
          "x": 96,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "tile.wilds.debris": {
          "x": 128,
          "y": 0,
          "w": 32,
          "h": 32
        }
      }
    },
    {
      "id": "tilesets.hollow",
      "path": "assets/tilesets/cave_tileset.png",
      "type": "tileset",
      "tileSize": 32,
      "aliases": {
        "tile.hollow.floor": {
          "x": 0,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "tile.hollow.stone": {
          "x": 32,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "tile.hollow.cave": {
          "x": 64,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "tile.hollow.sewer": {
          "x": 96,
          "y": 0,
          "w": 32,
          "h": 32
        },
        "tile.hollow.ritual": {
          "x": 128,
          "y": 0,
          "w": 32,
          "h": 32
        }
      }
    },
    {
      "id": "ui.sheet",
      "path": "assets/ui/ui_sheet.png",
      "type": "ui",
      "aliases": {}
    }
  ]
};
})();
