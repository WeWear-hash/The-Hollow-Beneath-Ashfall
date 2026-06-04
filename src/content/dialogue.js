(function () {
  window.HBA = window.HBA || {};
  HBA.Content = HBA.Content || {};
  HBA.Content.dialogue = {
    elias_intro: {
      speaker: "Elias Vale",
      portrait: "oldMan",
      nodes: {
        start: {
          text: "You came on the last bus. That means the road let you in. Roads here do not always let people out.",
          actions: [{ type: "quest", id: "arrival", stage: 1 }],
          choices: [
            { text: "Why is the town empty?", next: "empty" },
            { text: "I heard a bell underground.", next: "bell" },
            { text: "Where should I go?", next: "chapel" }
          ]
        },
        empty: {
          text: "Not empty. Listening. The school kept the names, the hospital kept the bodies, and the mine kept what was beneath both.",
          actions: [{ type: "memory", amount: 4 }],
          choices: [{ text: "The chapel, then.", next: "chapel" }]
        },
        bell: {
          text: "Saint Orison's bell cracked before the fire. The larger piece fell down through Main Street and never stopped ringing.",
          actions: [{ type: "quest", id: "bell", stage: 0 }],
          choices: [{ text: "I will find it.", next: "chapel" }]
        },
        chapel: {
          text: "Start at the chapel. If the Bell-Ringer kneels, take the shard and do not let it hear your real name.",
          actions: [{ type: "quest", id: "chapel", stage: 0 }, { type: "flag", id: "met_elias" }],
          choices: [{ text: "Leave", end: true }]
        }
      }
    },
    sister_mara: {
      speaker: "Sister Mara",
      portrait: "healer",
      nodes: {
        start: {
          text: "The chapel has no saints left, only echoes wearing robes. If you are hurt, drink before the bell answers.",
          actions: [{ type: "give", item: "ashTonic", count: 2 }],
          choices: [
            { text: "What happened here?", next: "fire" },
            { text: "Thank you.", end: true }
          ]
        },
        fire: {
          text: "A fire began below the mine and burned upward through memory. People survived. Their histories did not.",
          actions: [{ type: "memory", amount: 6 }],
          choices: [{ text: "I will remember them.", end: true }]
        }
      }
    },
    school_child: {
      speaker: "Lenore",
      portrait: "child",
      nodes: {
        start: {
          text: "Teacher says attendance is forever. If your name is in the ledger, you have to stay after the bell.",
          choices: [
            { text: "Show me the ledger.", next: "ledger" },
            { text: "Run along.", end: true }
          ]
        },
        ledger: {
          text: "Your handwriting is in it. Page thirty-two. You wrote: do not trust the doctor when she smiles.",
          actions: [{ type: "give", item: "schoolLedger", count: 1 }, { type: "quest", id: "school", stage: 2 }, { type: "memory", amount: 12 }, { type: "flag", id: "memory_school" }],
          choices: [{ text: "Take the ledger", end: true }]
        }
      }
    },
    doctor_ames: {
      speaker: "Doctor Ames",
      portrait: "mage",
      nodes: {
        start: {
          text: "You are late for admission. The Hollow loves punctuality, but it forgives useful organs.",
          choices: [
            { text: "Open the patient wing.", next: "wing" },
            { text: "Back away.", end: true }
          ]
        },
        wing: {
          text: "Down the hall. When Matron sings, do not answer in your mother's voice.",
          actions: [{ type: "quest", id: "hospital", stage: 1 }, { type: "give", item: "smellingSalt", count: 1 }],
          choices: [{ text: "Enter the wing", end: true }]
        }
      }
    },
    ranger_iona: {
      speaker: "Iona",
      portrait: "ranger",
      nodes: {
        start: {
          text: "The forest keeps offerings for those too afraid to enter the mine. Take the red candle. Burn it when the dark grows teeth.",
          actions: [{ type: "give", item: "redCandle", count: 2 }, { type: "quest", id: "forest", stage: 2 }, { type: "flag", id: "memory_forest" }, { type: "memory", amount: 10 }],
          choices: [{ text: "Take the candle", end: true }]
        }
      }
    },
    final_choice: {
      speaker: "The Hollow Saint",
      portrait: "hollowSaint",
      nodes: {
        start: {
          text: "You found the town beneath the town. Choose: leave us hungry, burn us clean, wear us kindly, or remember us whole.",
          choices: [
            { text: "Leave Ashfall behind", ending: "escape" },
            { text: "Burn the Hollow", ending: "burn" },
            { text: "Become the vessel", ending: "vessel" },
            { text: "Ring the Memory Bell", ending: "remembered", require: ["memory_school", "memory_forest", "boss_hollowSaint"] }
          ]
        }
      }
    }
  };
})();
