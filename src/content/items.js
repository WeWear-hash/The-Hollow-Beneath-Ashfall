(function () {
  window.HBA = window.HBA || {};
  HBA.Content = HBA.Content || {};
  HBA.Content.items = {
    ashTonic: { name: "Ash Tonic", type: "consumable", desc: "A bitter bottle that restores health.", heal: 38 },
    smellingSalt: { name: "Smelling Salt", type: "consumable", desc: "Clears panic and steadies the hands.", sanity: 18 },
    bellShard: { name: "Bell Shard", type: "key", desc: "Warm metal from the chapel bell." },
    schoolLedger: { name: "School Ledger", type: "note", desc: "Attendance records. Some names repeat after death." },
    hospitalTag: { name: "Patient Tag", type: "key", desc: "Stamped BENEATH WARD." },
    mineKey: { name: "Mine Key", type: "key", desc: "A blackened key with coal dust in the teeth." },
    redCandle: { name: "Red Candle", type: "combat", desc: "Drives hollow things back for a moment.", ward: 7 },
    memoryBell: { name: "Memory Bell", type: "key", desc: "A hand bell that rings only near the truth." },
    finalEmber: { name: "Final Ember", type: "key", desc: "A coal that remembers the first fire." }
  };
})();
