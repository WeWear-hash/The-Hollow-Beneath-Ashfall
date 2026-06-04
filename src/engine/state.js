(function () {
  window.HBA = window.HBA || {};
  HBA.baseState = function () {
    return {
    mode: "boot",
    mapId: "arrival",
    time: 0,
    camera: { x: 0, y: 0 },
    player: { x: 120, y: 160, w: 16, h: 22, dir: "down", hp: 100, maxHp: 100, stamina: 100, maxStamina: 100, sanity: 100, memory: 0, attackCd: 0, dodge: 0, invuln: 0 },
    inventory: {},
    quests: {},
    flags: {},
    enemies: [],
    items: [],
    npcs: [],
    boss: null,
    dialogue: null,
    toast: { text: "", t: 0 },
    settings: { volume: 0.55, shake: true, reducedFlicker: false, textSpeed: 1, difficulty: "Normal" },
    ending: null,
    lastSafe: { mapId: "arrival", x: 120, y: 160 }
    };
  };

  HBA.State = HBA.baseState();

  HBA.makeFreshState = function () {
    var fresh = HBA.baseState();
    fresh.mode = "play";
    fresh.mapId = HBA.Content.story.startMap;
    fresh.player.x = HBA.Content.story.start.x;
    fresh.player.y = HBA.Content.story.start.y;
    fresh.inventory = { ashTonic: 1 };
    fresh.quests = {};
    fresh.flags = {};
    fresh.enemies = [];
    fresh.items = [];
    fresh.npcs = [];
    fresh.boss = null;
    fresh.ending = null;
    return fresh;
  };
})();
