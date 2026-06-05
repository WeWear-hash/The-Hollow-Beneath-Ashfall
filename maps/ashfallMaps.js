(function () {
  window.THBA = window.THBA || {};

  const W = 42;
  const H = 28;

  function makeArea(id, name, skin, exits, extras) {
    const blocked = [];
    for (let x = 0; x < W; x += 1) {
      blocked.push([x, 0], [x, H - 1]);
    }
    for (let y = 0; y < H; y += 1) {
      blocked.push([0, y], [W - 1, y]);
    }
    for (let x = 5; x < W - 5; x += 7) {
      blocked.push([x, 6], [x, 18]);
    }
    const clear = new Set();
    exits.forEach((exit) => {
      for (let dx = -1; dx <= 1; dx += 1) {
        for (let dy = -1; dy <= 1; dy += 1) {
          clear.add(`${exit.x + dx},${exit.y + dy}`);
        }
      }
    });
    return Object.assign({
      id,
      name,
      width: W,
      height: H,
      skin,
      spawn: { x: 4, y: 14 },
      exits,
      blocked: blocked.filter((p) => !clear.has(`${p[0]},${p[1]}`)),
      props: [],
      npcs: [],
      pickups: [],
      enemies: [],
      memory: null
    }, extras || {});
  }

  window.THBA.MAPS = [
    makeArea("prologue", "Ashfall Road", "wilds", [
      { x: 39, y: 14, to: "main_street", spawn: { x: 3, y: 14 }, label: "Main Street" }
    ], {
      props: [{ x: 11, y: 12, w: 4, h: 2 }, { x: 22, y: 18, w: 3, h: 2 }],
      npcs: [{ id: "jonah", name: "Jonah Reed", x: 16, y: 13, dialogue: "jonah_intro", portrait: "jonah_reed" }],
      pickups: [{ id: "road_tincture", item: "tincture", x: 24, y: 15, label: "Cold Tincture" }]
    }),
    makeArea("main_street", "Main Street", "town", [
      { x: 2, y: 14, to: "prologue", spawn: { x: 38, y: 14 }, label: "Ashfall Road" },
      { x: 39, y: 6, to: "chapel", spawn: { x: 3, y: 14 }, label: "Chapel" },
      { x: 39, y: 21, to: "school", spawn: { x: 3, y: 14 }, label: "School" },
      { x: 20, y: 2, to: "residential", spawn: { x: 20, y: 24 }, label: "Homes" }
    ], {
      spawn: { x: 3, y: 14 },
      props: [{ x: 9, y: 8, w: 6, h: 4 }, { x: 25, y: 15, w: 8, h: 5 }],
      npcs: [{ id: "elowen", name: "Sister Elowen", x: 18, y: 12, dialogue: "elowen_main", portrait: "sister_elowen" }],
      enemies: [{ id: "hollowed_1", type: "hollowed", x: 31, y: 11 }]
    }),
    makeArea("chapel", "Chapel of Saint Ash", "hollow", [
      { x: 2, y: 14, to: "main_street", spawn: { x: 38, y: 6 }, label: "Main Street" },
      { x: 39, y: 14, to: "chapel_basement", spawn: { x: 3, y: 14 }, label: "Basement", flag: "has_chapel_key" }
    ], {
      props: [{ x: 13, y: 9, w: 15, h: 2 }, { x: 18, y: 18, w: 5, h: 2 }],
      pickups: [{ id: "chapel_key", item: "chapel_key", x: 20, y: 16, label: "Chapel Key" }],
      npcs: [{ id: "child_chapel", name: "The Child", x: 29, y: 13, dialogue: "child_first", portrait: "the_child" }],
      memory: { id: "memory_bells", x: 22, y: 10, text: "The bell remembers every name lowered into the mine." }
    }),
    makeArea("chapel_basement", "Sealed Chapel Basement", "hollow", [
      { x: 2, y: 14, to: "chapel", spawn: { x: 38, y: 14 }, label: "Chapel" },
      { x: 39, y: 14, to: "hospital", spawn: { x: 3, y: 14 }, label: "Hospital" }
    ], {
      props: [{ x: 12, y: 7, w: 17, h: 3 }, { x: 15, y: 20, w: 9, h: 2 }],
      enemies: [{ id: "bell_boss", type: "bell", x: 28, y: 14, boss: true }],
      pickups: [{ id: "bell_relic", item: "bell_relic", x: 31, y: 14, label: "Cracked Bell Clapper", flag: "boss_bell" }]
    }),
    makeArea("school", "Flooded School", "town", [
      { x: 2, y: 14, to: "main_street", spawn: { x: 38, y: 21 }, label: "Main Street" },
      { x: 39, y: 14, to: "forest", spawn: { x: 3, y: 14 }, label: "Forest Edge" }
    ], {
      props: [{ x: 7, y: 8, w: 8, h: 3 }, { x: 23, y: 12, w: 12, h: 2 }],
      enemies: [{ id: "attendance_boss", type: "keeper", x: 30, y: 14, boss: true }],
      memory: { id: "memory_register", x: 15, y: 18, text: "Names repeat in the class register. Some are written after they died." }
    }),
    makeArea("hospital", "Marr Memorial Hospital", "town", [
      { x: 2, y: 14, to: "chapel_basement", spawn: { x: 38, y: 14 }, label: "Chapel Basement" },
      { x: 39, y: 14, to: "mine_entrance", spawn: { x: 3, y: 14 }, label: "Mine Road" }
    ], {
      props: [{ x: 10, y: 7, w: 5, h: 10 }, { x: 23, y: 8, w: 8, h: 8 }],
      npcs: [{ id: "marr", name: "Dr. Selene Marr", x: 18, y: 14, dialogue: "marr_hospital", portrait: "dr_selene_marr" }],
      enemies: [{ id: "surgeon_boss", type: "surgeon", x: 32, y: 14, boss: true }],
      pickups: [{ id: "suture_kit", item: "suture_kit", x: 13, y: 19, label: "Suture Kit" }]
    }),
    makeArea("residential", "Greywater Homes", "town", [
      { x: 20, y: 25, to: "main_street", spawn: { x: 20, y: 3 }, label: "Main Street" },
      { x: 39, y: 14, to: "forest", spawn: { x: 3, y: 20 }, label: "Hidden Path" }
    ], {
      props: [{ x: 8, y: 7, w: 9, h: 5 }, { x: 24, y: 16, w: 8, h: 5 }],
      npcs: [{ id: "orlen", name: "Orlen Voss", x: 22, y: 10, dialogue: "orlen_home", portrait: "orlen_voss" }],
      memory: { id: "memory_family", x: 14, y: 18, text: "A family photograph has your face scratched out." },
      pickups: [{ id: "family_locket", item: "family_locket", x: 26, y: 13, label: "Family Locket" }]
    }),
    makeArea("forest", "Forest Edge", "wilds", [
      { x: 2, y: 14, to: "school", spawn: { x: 38, y: 14 }, label: "School" },
      { x: 2, y: 20, to: "residential", spawn: { x: 38, y: 14 }, label: "Homes" },
      { x: 39, y: 14, to: "mine_entrance", spawn: { x: 3, y: 14 }, label: "Mine Entrance" }
    ], {
      props: [{ x: 8, y: 5, w: 4, h: 14 }, { x: 23, y: 9, w: 5, h: 13 }],
      enemies: [{ id: "forest_stalker_1", type: "stalker", x: 29, y: 12 }, { id: "forest_stalker_2", type: "stalker", x: 34, y: 19 }],
      pickups: [{ id: "ember_oil", item: "ember_oil", x: 17, y: 12, label: "Ember Oil" }]
    }),
    makeArea("mine_entrance", "Mine Entrance", "wilds", [
      { x: 2, y: 14, to: "forest", spawn: { x: 38, y: 14 }, label: "Forest" },
      { x: 39, y: 14, to: "descent", spawn: { x: 3, y: 14 }, label: "Descent", flag: "boss_surgeon" }
    ], {
      props: [{ x: 10, y: 11, w: 8, h: 4 }, { x: 25, y: 8, w: 6, h: 10 }],
      enemies: [{ id: "mine_horror_1", type: "mine", x: 30, y: 13 }],
      pickups: [{ id: "lamp", item: "miners_lamp", x: 19, y: 17, label: "Miner's Lamp" }]
    }),
    makeArea("descent", "The Descent", "hollow", [
      { x: 2, y: 14, to: "mine_entrance", spawn: { x: 38, y: 14 }, label: "Mine Entrance" },
      { x: 39, y: 14, to: "underground", spawn: { x: 3, y: 14 }, label: "The Hollow" }
    ], {
      props: [{ x: 9, y: 7, w: 5, h: 15 }, { x: 26, y: 5, w: 4, h: 16 }],
      enemies: [{ id: "mine_horror_2", type: "mine", x: 25, y: 18 }, { id: "hollowed_2", type: "hollowed", x: 32, y: 11 }],
      memory: { id: "memory_hollow", x: 18, y: 9, text: "The mine is not below the town. The town is a scab over the mine." }
    }),
    makeArea("underground", "Underground Hollow", "hollow", [
      { x: 2, y: 14, to: "descent", spawn: { x: 38, y: 14 }, label: "The Descent" },
      { x: 39, y: 14, to: "final_chamber", spawn: { x: 3, y: 14 }, label: "Final Chamber" }
    ], {
      props: [{ x: 11, y: 4, w: 3, h: 20 }, { x: 28, y: 6, w: 4, h: 17 }],
      npcs: [{ id: "child_hollow", name: "The Child", x: 20, y: 14, dialogue: "child_hollow", portrait: "the_child" }],
      enemies: [{ id: "depth_horror_1", type: "mine", x: 31, y: 17 }]
    }),
    makeArea("final_chamber", "Heart of the Hollow", "hollow", [
      { x: 2, y: 14, to: "underground", spawn: { x: 38, y: 14 }, label: "The Hollow" }
    ], {
      props: [{ x: 18, y: 8, w: 6, h: 12 }],
      enemies: [{ id: "final_hollow", type: "final", x: 27, y: 14, boss: true }],
      npcs: [{ id: "heart", name: "The Hollow", x: 30, y: 14, dialogue: "final_choice", portrait: "the_hollow", flag: "boss_final" }]
    })
  ];
})();
