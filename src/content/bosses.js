(function () {
  window.HBA = window.HBA || {};
  HBA.Content = HBA.Content || {};
  HBA.Content.bosses = {
    bellRinger: { name: "The Bell-Ringer", sprite: "witch", hp: 180, speed: 34, damage: 18, memory: 8, phases: [0.66, 0.33], flag: "boss_bellRinger" },
    matronHusk: { name: "The Matron Husk", sprite: "swordThing", hp: 220, speed: 44, damage: 20, memory: 10, phases: [0.7, 0.35], flag: "boss_matronHusk" },
    lanternMaw: { name: "The Lantern Maw", sprite: "zombie", hp: 260, speed: 28, damage: 24, memory: 12, phases: [0.75, 0.45, 0.2], flag: "boss_lanternMaw" },
    hollowSaint: { name: "The Hollow Saint", sprite: "hollowSaint", hp: 340, speed: 36, damage: 26, memory: 20, phases: [0.8, 0.5, 0.25], flag: "boss_hollowSaint" }
  };
})();
