(function () {
  window.HBA = window.HBA || {};
  HBA.Content = HBA.Content || {};

  function fill(w, h, value) {
    var out = [];
    for (var i = 0; i < w * h; i++) out.push(value);
    return out;
  }

  function setCell(layer, w, x, y, value) {
    if (x < 0 || y < 0) return;
    layer[y * w + x] = value;
  }


  function makeLayers(w, h, style) {
    var ground = fill(w, h, "ground");
    var detail = fill(w, h, null);
    road(ground, w, h, style);
    for (var x = 0; x < w; x++) { setCell(detail, w, x, 0, "edge"); setCell(detail, w, x, h - 1, "edge"); }
    for (var y = 0; y < h; y++) { setCell(detail, w, 0, y, "edge"); setCell(detail, w, w - 1, y, "edge"); }
    for (var i = 0; i < Math.floor(w * h / 260); i++) {
      var dx = (i * 13 + 5) % (w - 4) + 2;
      var dy = (i * 17 + 7) % (h - 4) + 2;
      if (ground[dy * w + dx] !== "path") setCell(detail, w, dx, dy, "debris");
    }
    return { ground: ground, detail: detail };
  }

  function bounds(w, h) {
    return [
      { x: 0, y: 0, w: w * 16, h: 16 },
      { x: 0, y: (h - 1) * 16, w: w * 16, h: 16 },
      { x: 0, y: 0, w: 16, h: h * 16 },
      { x: (w - 1) * 16, y: 0, w: 16, h: h * 16 }
    ];
  }

  function map(id, name, tileset, style, opts) {
    opts = opts || {};
    var w = opts.w || 48;
    var h = opts.h || 34;
    var layers = makeLayers(w, h, style);
    return {
      id: id,
      name: name,
      tileset: tileset,
      w: w,
      h: h,
      layers: layers,
      collision: bounds(w, h).concat(opts.collision || []),
      exits: opts.exits || [],
      npcs: opts.npcs || [],
      items: opts.items || [],
      enemies: opts.enemies || [],
      boss: opts.boss || null,
      interactables: opts.interactables || [],
      ambient: opts.ambient || "rain"
    };
  }

  HBA.Content.maps = {
    arrival: map("arrival", "Ashfall Road", "town", "arrival", {
      w: 44, h: 28, ambient: "rain",
      exits: [{ x: 638, y: 132, w: 42, h: 92, to: "mainStreet", spawn: { x: 42, y: 168 } }],
      npcs: [{ id: "elias", x: 474, y: 152, sprite: "oldMan", dialogue: "elias_intro" }],
      items: [{ x: 244, y: 188, item: "ashTonic", count: 1 }],
      collision: [{ x: 170, y: 64, w: 250, h: 32 }, { x: 98, y: 228, w: 420, h: 34 }]
    }),
    mainStreet: map("mainStreet", "Main Street", "town", "street", {
      w: 56, h: 36, ambient: "bell",
      exits: [
        { x: 0, y: 132, w: 30, h: 82, to: "arrival", spawn: { x: 600, y: 170 } },
        { x: 820, y: 74, w: 42, h: 72, to: "chapel", spawn: { x: 68, y: 160 } },
        { x: 420, y: 0, w: 76, h: 28, to: "school", spawn: { x: 230, y: 426 } },
        { x: 532, y: 536, w: 94, h: 28, to: "hospital", spawn: { x: 250, y: 42 } },
        { x: 820, y: 454, w: 42, h: 74, to: "forestEdge", spawn: { x: 54, y: 222 } }
      ],
      npcs: [{ id: "mara", x: 258, y: 186, sprite: "healer", dialogue: "sister_mara" }],
      enemies: [{ type: "ashWalker", x: 588, y: 240 }, { type: "ashWalker", x: 690, y: 310 }],
      items: [{ x: 390, y: 298, item: "smellingSalt", count: 1 }],
      collision: [{ x: 120, y: 88, w: 180, h: 64 }, { x: 530, y: 86, w: 210, h: 70 }, { x: 120, y: 372, w: 250, h: 60 }]
    }),
    chapel: map("chapel", "Chapel of Saint Orison", "chapel", "interior", {
      w: 42, h: 32, ambient: "bell",
      exits: [{ x: 0, y: 132, w: 30, h: 92, to: "mainStreet", spawn: { x: 784, y: 108 } }],
      boss: { id: "bellRinger", x: 482, y: 230 },
      items: [{ x: 536, y: 160, item: "bellShard", count: 1, require: "boss_bellRinger" }],
      interactables: [{ id: "chapelAltar", x: 502, y: 116, w: 54, h: 36, text: "The altar is split by heat. Below the stone you hear a larger bell answer.", memory: 6, quest: ["bell", 1] }],
      collision: [{ x: 178, y: 118, w: 82, h: 44 }, { x: 408, y: 100, w: 140, h: 34 }]
    }),
    school: map("school", "Ashfall School", "town", "interior", {
      w: 40, h: 32, ambient: "whisper",
      exits: [{ x: 190, y: 494, w: 94, h: 28, to: "mainStreet", spawn: { x: 450, y: 48 } }],
      npcs: [{ id: "lenore", x: 292, y: 194, sprite: "child", dialogue: "school_child" }],
      enemies: [{ type: "hollowChild", x: 430, y: 278 }, { type: "boneClerk", x: 154, y: 236 }],
      interactables: [{ id: "blackboard", x: 190, y: 118, w: 90, h: 26, text: "The chalk writes your name, then crosses it out.", memory: 5, quest: ["school", 1] }],
      collision: [{ x: 116, y: 112, w: 250, h: 30 }, { x: 84, y: 344, w: 380, h: 26 }]
    }),
    hospital: map("hospital", "Saint Orison Hospital", "chapel", "interior", {
      w: 44, h: 34, ambient: "whisper",
      exits: [{ x: 230, y: 0, w: 76, h: 30, to: "mainStreet", spawn: { x: 570, y: 502 } }],
      npcs: [{ id: "ames", x: 220, y: 138, sprite: "mage", dialogue: "doctor_ames" }],
      boss: { id: "matronHusk", x: 498, y: 344 },
      items: [{ x: 534, y: 392, item: "hospitalTag", count: 1, require: "boss_matronHusk" }, { x: 170, y: 408, item: "ashTonic", count: 1 }],
      collision: [{ x: 92, y: 94, w: 520, h: 28 }, { x: 328, y: 182, w: 32, h: 246 }]
    }),
    forestEdge: map("forestEdge", "Forest Edge", "forest", "forest", {
      w: 52, h: 36, ambient: "rain",
      exits: [
        { x: 0, y: 190, w: 30, h: 76, to: "mainStreet", spawn: { x: 780, y: 488 } },
        { x: 784, y: 178, w: 34, h: 86, to: "mineEntrance", spawn: { x: 52, y: 216 } }
      ],
      npcs: [{ id: "iona", x: 342, y: 202, sprite: "ranger", dialogue: "ranger_iona" }],
      enemies: [{ type: "hollowChild", x: 524, y: 174 }, { type: "ashWalker", x: 624, y: 296 }],
      items: [{ x: 674, y: 128, item: "mineKey", count: 1 }, { x: 446, y: 330, item: "redCandle", count: 1 }],
      collision: [{ x: 98, y: 74, w: 190, h: 54 }, { x: 516, y: 64, w: 130, h: 76 }, { x: 260, y: 418, w: 350, h: 44 }]
    }),
    mineEntrance: map("mineEntrance", "Mine Entrance", "cave", "cave", {
      w: 42, h: 32, ambient: "drone",
      exits: [
        { x: 0, y: 178, w: 30, h: 86, to: "forestEdge", spawn: { x: 760, y: 210 } },
        { x: 598, y: 206, w: 34, h: 70, to: "tunnels", spawn: { x: 54, y: 240 }, requireItem: "mineKey", quest: ["mine", 2] }
      ],
      enemies: [{ type: "boneClerk", x: 346, y: 242 }, { type: "tunnelMouth", x: 478, y: 188 }],
      interactables: [{ id: "mineDoor", x: 586, y: 202, w: 42, h: 78, text: "The mine lock opens with a tired click. Warm air breathes from below.", requireItem: "mineKey", quest: ["hollow", 0], memory: 4 }]
    }),
    tunnels: map("tunnels", "Sewer Tunnels", "sewer", "sewer", {
      w: 54, h: 34, ambient: "drone",
      exits: [
        { x: 0, y: 206, w: 30, h: 80, to: "mineEntrance", spawn: { x: 560, y: 232 } },
        { x: 802, y: 112, w: 34, h: 92, to: "hollow", spawn: { x: 64, y: 248 } }
      ],
      boss: { id: "lanternMaw", x: 526, y: 250 },
      enemies: [{ type: "tunnelMouth", x: 282, y: 184 }, { type: "ashWalker", x: 374, y: 314 }],
      items: [{ x: 592, y: 292, item: "finalEmber", count: 1, require: "boss_lanternMaw" }]
    }),
    hollow: map("hollow", "The Underground Hollow", "cave", "cave", {
      w: 48, h: 34, ambient: "hollow",
      exits: [{ x: 0, y: 214, w: 28, h: 72, to: "tunnels", spawn: { x: 768, y: 150 } }],
      boss: { id: "hollowSaint", x: 512, y: 230 },
      interactables: [{ id: "finalRift", x: 560, y: 176, w: 70, h: 70, text: "The Hollow opens. Every name in Ashfall waits for your answer.", requireFlag: "boss_hollowSaint", dialogue: "final_choice" }],
      items: [{ x: 454, y: 166, item: "memoryBell", count: 1, require: "boss_hollowSaint" }]
    })
  };
})();
