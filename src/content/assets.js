(function () {
  window.HBA = window.HBA || {};
  HBA.Content = HBA.Content || {};
  HBA.Content.assets = {
    tilesets: {
      town: { src: "assets/tilesets/mage_city/magecity.png", tile: 32 },
      chapel: { src: "assets/tilesets/castle_tiles/Castle2.png", tile: 32 },
      forest: { src: "assets/tilesets/whispers_of_avalon/ground_tiles.png", tile: 32 },
      cave: { src: "assets/tilesets/cave_tiles/cave.png", tile: 32 },
      sewer: { src: "assets/tilesets/sewer_tiles/sewer_1.png", tile: 32 }
    },
    sprites: {
      player: { src: "assets/characters/24x32_black_characters/Fighter-M-01.png", frameW: 24, frameH: 32, def: "character" },
      oldMan: { src: "assets/characters/24x32_black_characters/Townfolk-Old-M.png", frameW: 24, frameH: 32, def: "character" },
      healer: { src: "assets/characters/24x32_black_characters/Healer-F-01.png", frameW: 24, frameH: 32, def: "character" },
      child: { src: "assets/characters/24x32_black_characters/Townfolk-Child-F.png", frameW: 24, frameH: 32, def: "child" },
      ranger: { src: "assets/characters/24x32_black_characters/Ranger-F-01.png", frameW: 24, frameH: 32, def: "character" },
      mage: { src: "assets/characters/24x32_black_characters/Mage-F-01.png", frameW: 24, frameH: 32, def: "character" },
      zombie: { src: "assets/enemies/zombie_sprites/zombie_0.png", frameW: 128, frameH: 128, def: "zombie" },
      skeleton: { src: "assets/enemies/monster_pack/Spritesheets Skeletons/Skeleton/Skeleton_Move.png", frameW: 64, frameH: 64, def: "skeleton" },
      witch: { src: "assets/enemies/monster_pack/Spritesheets Skeletons/Witch Doctor/Witch_Doctor_Move.png", frameW: 64, frameH: 64, def: "witch" },
      hollowSaint: { src: "assets/enemies/monster_pack/Spritesheets/Staff/F_Magic_Staff_Retro.png", frameW: 64, frameH: 64, def: "boss" },
      swordThing: { src: "assets/enemies/monster_pack/Spritesheets/Sword/F_Melee_1H_Sword_Retro.png", frameW: 64, frameH: 64, def: "boss" }
    }
  };

  HBA.Content.tilePalettes = {
    town: {
      ground: [{ sx: 0, sy: 0, sw: 32, sh: 32 }],
      path: [{ sx: 0, sy: 64, sw: 32, sh: 32 }],
      edge: [{ sx: 0, sy: 96, sw: 32, sh: 32 }],
      wall: [{ sx: 32, sy: 96, sw: 32, sh: 32 }],
      debris: [{ sx: 64, sy: 64, sw: 32, sh: 32 }]
    },
    chapel: {
      ground: [{ sx: 0, sy: 64, sw: 32, sh: 32 }],
      path: [{ sx: 0, sy: 96, sw: 32, sh: 32 }],
      edge: [{ sx: 32, sy: 96, sw: 32, sh: 32 }],
      wall: [{ sx: 64, sy: 96, sw: 32, sh: 32 }],
      debris: [{ sx: 96, sy: 96, sw: 32, sh: 32 }]
    },
    forest: {
      ground: [{ sx: 0, sy: 0, sw: 32, sh: 32 }],
      path: [{ sx: 0, sy: 32, sw: 32, sh: 32 }],
      edge: [{ sx: 64, sy: 0, sw: 32, sh: 32 }],
      wall: [{ sx: 96, sy: 0, sw: 32, sh: 32 }],
      debris: [{ sx: 96, sy: 32, sw: 32, sh: 32 }]
    },
    cave: {
      ground: [{ sx: 0, sy: 64, sw: 32, sh: 32 }],
      path: [{ sx: 0, sy: 96, sw: 32, sh: 32 }],
      edge: [{ sx: 0, sy: 0, sw: 32, sh: 32 }],
      wall: [{ sx: 32, sy: 0, sw: 32, sh: 32 }],
      debris: [{ sx: 64, sy: 96, sw: 32, sh: 32 }]
    },
    sewer: {
      ground: [{ sx: 0, sy: 64, sw: 32, sh: 32 }],
      path: [{ sx: 0, sy: 96, sw: 32, sh: 32 }],
      edge: [{ sx: 0, sy: 0, sw: 32, sh: 32 }],
      wall: [{ sx: 32, sy: 0, sw: 32, sh: 32 }],
      debris: [{ sx: 64, sy: 96, sw: 32, sh: 32 }]
    }
  };

  HBA.Content.spriteDefs = {
    character: { frameW: 24, frameH: 32, cols: 6, rows: 4, scale: 1, anchorX: 12, anchorY: 30, shadow: [18, 6], animations: { idle: [1], walk: [0, 1, 2, 1], attack: [3, 4], dodge: [2], hurt: [1] }, facingRows: { down: 0, left: 1, right: 2, up: 3 } },
    child: { frameW: 24, frameH: 32, cols: 6, rows: 4, scale: 0.86, anchorX: 12, anchorY: 30, shadow: [15, 5], animations: { idle: [1], walk: [0, 1, 2, 1], hurt: [1] }, facingRows: { down: 0, left: 1, right: 2, up: 3 } },
    zombie: { frameW: 128, frameH: 128, cols: 36, rows: 8, scale: 0.34, anchorX: 64, anchorY: 104, shadow: [24, 8], animations: { idle: [0, 1], walk: [0, 1, 2, 3], attack: [4, 5], hurt: [1] } },
    skeleton: { frameW: 64, frameH: 64, cols: 12, rows: 8, scale: 0.6, anchorX: 32, anchorY: 56, shadow: [21, 7], animations: { idle: [0, 1], walk: [0, 1, 2, 3], attack: [4, 5], hurt: [1] } },
    witch: { frameW: 64, frameH: 64, cols: 12, rows: 8, scale: 0.64, anchorX: 32, anchorY: 57, shadow: [23, 8], animations: { idle: [0, 1], walk: [0, 1, 2, 3], attack: [4, 5], hurt: [1] } },
    boss: { frameW: 64, frameH: 64, cols: 12, rows: 8, scale: 0.88, anchorX: 32, anchorY: 58, shadow: [32, 10], animations: { idle: [0, 1, 2], walk: [0, 1, 2, 3], attack: [4, 5, 6], hurt: [1] } }
  };
})();
