(function () {
  window.THBA = window.THBA || {};

  window.THBA.ITEMS = {
    tincture: { name: "Cold Tincture", kind: "heal", heal: 35, text: "A bitter vial that steadies the hands." },
    chapel_key: { name: "Chapel Key", kind: "key", text: "Iron, cold, and wet with old incense." },
    bell_relic: { name: "Cracked Bell Clapper", kind: "relic", text: "It rings only when someone lies." },
    suture_kit: { name: "Suture Kit", kind: "heal", heal: 55, text: "Hospital thread and a rusted clasp." },
    family_locket: { name: "Family Locket", kind: "relic", text: "The portrait inside refuses to stay still." },
    ember_oil: { name: "Ember Oil", kind: "weapon", text: "A miner's fire in a stoppered bottle." },
    miners_lamp: { name: "Miner's Lamp", kind: "relic", text: "The flame leans toward the truth." }
  };

  window.THBA.ENEMIES = {
    hollowed: { name: "Hollowed Townsperson", hp: 55, speed: 42, damage: 12, sheet: "hollowed", tint: "#6c7a67", sanity: 4 },
    keeper: { name: "Attendance Keeper", hp: 160, speed: 34, damage: 18, sheet: "keeper", tint: "#6f88a1", sanity: 9 },
    surgeon: { name: "Surgeon Without Hands", hp: 190, speed: 38, damage: 20, sheet: "surgeon", tint: "#a17676", sanity: 10 },
    bell: { name: "The Bell-Ringer", hp: 180, speed: 36, damage: 22, sheet: "keeper", tint: "#b9824b", sanity: 10 },
    stalker: { name: "Forest Stalker", hp: 70, speed: 55, damage: 14, sheet: "depths", tint: "#4f7055", sanity: 5 },
    mine: { name: "Mine Horror", hp: 95, speed: 44, damage: 17, sheet: "depths", tint: "#7b5f79", sanity: 6 },
    final: { name: "The Hollow Entity", hp: 260, speed: 30, damage: 25, sheet: "depths", tint: "#8b1f27", sanity: 14 }
  };

  window.THBA.DIALOGUES = {
    jonah_intro: {
      speaker: "Jonah Reed",
      text: "You came on the last road still willing to carry strangers. Ashfall remembers that kind of mistake.",
      choices: [
        { text: "Ask about the fog.", reply: "It seeped up after the mine bells stopped. Find Sister Elowen on Main Street.", quest: "reach_main" },
        { text: "Keep walking.", reply: "Then keep your lamp covered. The dead here look for warm eyes.", sanity: -2 }
      ]
    },
    elowen_main: {
      speaker: "Sister Elowen",
      text: "The chapel basement is sealed, but the key has begun leaving its hook. It wants to be found.",
      choices: [
        { text: "Promise to search the chapel.", reply: "Bring back what rings beneath the altar.", quest: "chapel", flag: "met_elowen" },
        { text: "Ask what is below.", reply: "A wound with a town built over it. We named it the Hollow so children could sleep.", sanity: -3 }
      ]
    },
    child_first: {
      speaker: "The Child",
      text: "They counted us in school. They cut us in hospital. They lowered us in the mine.",
      choices: [
        { text: "Remember the names.", reply: "Then gather the memories. Four are enough to open the quiet ending.", flag: "knows_secret" },
        { text: "Look away.", reply: "The walls look back for you.", sanity: -5 }
      ]
    },
    marr_hospital: {
      speaker: "Dr. Selene Marr",
      text: "I did not experiment on the town. I documented what the mine had already made of us.",
      choices: [
        { text: "Condemn her work.", reply: "Good. Anger is a clean instrument.", flag: "condemned_marr", sanity: 2 },
        { text: "Ask for the descent route.", reply: "Past the old mine gate. The surgeon has my last key in its ribs.", quest: "mine" }
      ]
    },
    orlen_home: {
      speaker: "Orlen Voss",
      text: "The company ledger says we owned the mine. The mine owned our children's sleep.",
      choices: [
        { text: "Take his confession.", reply: "Then take the locket too. Burn me with the rest if you choose fire.", flag: "orlen_confessed", quest: "memories" },
        { text: "Leave him with the ledger.", reply: "Mercy is a door. Some of us deserve walls.", sanity: -2 }
      ]
    },
    child_hollow: {
      speaker: "The Child",
      text: "The dead do not want revenge. They want someone to stop calling their cage a town.",
      choices: [
        { text: "Swear to free them.", reply: "Then do not seal only the mouth. Open the wound and name us.", flag: "promised_child" },
        { text: "Swear to end it.", reply: "Endings are knives. Hold yours carefully.", flag: "will_end_hollow" }
      ]
    },
    final_choice: {
      speaker: "The Hollow",
      text: "You have reached the root. Choose what Ashfall becomes.",
      endingChoices: true
    }
  };

  window.THBA.QUESTS = {
    reach_main: { title: "Road Into Ashfall", text: "Find Main Street and learn why the road behind you vanished." },
    chapel: { title: "The Sealed Basement", text: "Recover the chapel key and descend beneath the altar." },
    memories: { title: "Names of the Dead", text: "Find memories hidden in chapel, school, homes, and mine." },
    mine: { title: "Descent Route", text: "Defeat the hospital horror and open the route to the mine." },
    final: { title: "The Heart Below", text: "Reach the Hollow and decide the fate of Ashfall." }
  };

  window.THBA.ENDINGS = {
    seal: {
      title: "Seal the Hollow",
      text: "You ring the cracked clapper beneath the roots. Stone closes over the heart. Ashfall survives, quiet and empty."
    },
    burn: {
      title: "Burn the Town",
      text: "Ember oil catches in the fog. By dawn there is no Ashfall, only warm ash and bells melted into the road."
    },
    keeper: {
      title: "Become the Keeper",
      text: "You accept the ledger, the bell, and the long watch. New travelers will see your lantern first."
    },
    free: {
      title: "Secret Ending: Free the Dead",
      text: "You speak every remembered name. The Hollow exhales, not as hunger, but grief. The dead walk home through morning rain."
    }
  };
})();
