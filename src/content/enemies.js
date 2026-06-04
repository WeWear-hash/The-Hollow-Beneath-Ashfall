(function () {
  window.HBA = window.HBA || {};
  HBA.Content = HBA.Content || {};
  HBA.Content.enemyTypes = {
    ashWalker: { name: "Ash Walker", sprite: "zombie", hp: 45, speed: 42, damage: 12, xpMemory: 2, range: 24, tint: "rgba(48,38,38,0.26)", scale: 0.34, w: 18, h: 24 },
    hollowChild: { name: "Hollow Child", sprite: "zombie", hp: 38, speed: 60, damage: 10, xpMemory: 3, range: 18, tint: "rgba(48,58,70,0.28)", scale: 0.3, w: 16, h: 20 },
    boneClerk: { name: "Bone Clerk", sprite: "skeleton", hp: 52, speed: 38, damage: 14, xpMemory: 3, range: 24, tint: "rgba(54,45,36,0.24)", scale: 0.6, w: 18, h: 24 },
    tunnelMouth: { name: "Tunnel Mouth", sprite: "witch", hp: 70, speed: 34, damage: 17, xpMemory: 5, range: 32, tint: "rgba(56,38,62,0.28)", scale: 0.64, w: 20, h: 26 }
  };
})();
