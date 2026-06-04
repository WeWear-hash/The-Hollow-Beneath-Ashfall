(function () {
  window.HBA = window.HBA || {};
  function by(id) { return document.getElementById(id); }

  HBA.UI = {
    game: null,
    init: function (game) {
      this.game = game;
      this.bindMenus();
      this.applySettings();
    },
    bindMenus: function () {
      document.body.addEventListener("click", function (e) {
        var action = e.target && e.target.dataset && e.target.dataset.action;
        if (!action) return;
        HBA.Audio.play("click");
        if (action === "newGame") HBA.UI.game.newGame();
        if (action === "continue") HBA.Save.load(HBA.UI.game, 1);
        if (action === "load") HBA.UI.showLoad();
        if (action === "settings") HBA.UI.showSettings();
        if (action === "resume") HBA.UI.togglePause(false);
        if (action === "inventory") HBA.UI.showInventory();
        if (action === "journal") HBA.UI.showJournal();
        if (action === "save") HBA.UI.showSave();
        if (action === "mainMenu") HBA.UI.showMain();
        if (action === "closeModal") HBA.UI.closeModal();
      });
    },
    showGame: function () {
      ["bootOverlay", "mainMenu", "pauseMenu", "modalOverlay"].forEach(function (id) { by(id).classList.remove("visible"); });
      by("hud").classList.remove("hidden");
      by("dialogueBox").classList.add("hidden");
    },
    showMain: function () {
      this.game.state.mode = "menu";
      by("hud").classList.add("hidden");
      by("mainMenu").classList.add("visible");
      by("pauseMenu").classList.remove("visible");
      by("modalOverlay").classList.remove("visible");
    },
    togglePause: function (force) {
      var s = this.game.state;
      if (force === false || s.mode === "pause") {
        s.mode = "play";
        by("pauseMenu").classList.remove("visible");
        return;
      }
      if (s.mode === "play") {
        s.mode = "pause";
        by("pauseMenu").classList.add("visible");
      }
    },
    modal: function (html) {
      by("modalPanel").innerHTML = html;
      by("modalOverlay").classList.add("visible");
    },
    closeModal: function () {
      by("modalOverlay").classList.remove("visible");
      if (this.game.state.mode !== "ending" && this.game.state.mode !== "menu") this.game.state.mode = "play";
    },
    showInventory: function () {
      this.game.state.mode = "pause";
      var entries = HBA.Inventory.entries(this.game.state);
      var html = "<h2>Inventory</h2><div class='grid-list'>";
      if (!entries.length) html += "<p class='small'>Your pockets are empty.</p>";
      entries.forEach(function (it) {
        html += "<div class='item-row'><h3>" + it.data.name + " x" + it.count + "</h3><p>" + it.data.desc + "</p>";
        if (it.data.type === "consumable" || it.data.type === "combat") html += "<button data-use='" + it.id + "'>Use</button>";
        html += "</div>";
      });
      html += "</div><div class='menu-list'><button data-action='closeModal'>Close</button></div>";
      this.modal(html);
      by("modalPanel").querySelectorAll("[data-use]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          HBA.Inventory.use(HBA.UI.game.state, btn.dataset.use);
          HBA.UI.showInventory();
        });
      });
    },
    showJournal: function () {
      this.game.state.mode = "pause";
      var quests = HBA.Quests.list(this.game.state);
      var html = "<h2>Journal</h2><div class='grid-list'>";
      if (!quests.length) html += "<p class='small'>No entries yet. The road is waiting.</p>";
      quests.forEach(function (q) {
        html += "<div class='item-row'><h3>" + q.name + "</h3><p>" + q.text + "</p><p class='small'>" + (q.done ? "Complete" : "In progress") + "</p></div>";
      });
      html += "</div><h3>Notes</h3><p class='small'>Memory " + Math.round(this.game.state.player.memory) + " / Sanity " + Math.round(this.game.state.player.sanity) + "</p><div class='menu-list'><button data-action='closeModal'>Close</button></div>";
      this.modal(html);
    },
    showSave: function () {
      var html = "<h2>Save</h2><div class='menu-list'>";
      for (var i = 1; i <= 3; i++) html += "<button data-slot-save='" + i + "'>Save Slot " + i + "</button>";
      html += "<button data-action='closeModal'>Close</button></div>";
      this.modal(html);
      by("modalPanel").querySelectorAll("[data-slot-save]").forEach(function (b) {
        b.addEventListener("click", function () { HBA.Save.save(HBA.UI.game.state, b.dataset.slotSave); HBA.UI.closeModal(); });
      });
    },
    showLoad: function () {
      var html = "<h2>Load</h2><div class='menu-list'>";
      for (var i = 1; i <= 3; i++) {
        var meta = HBA.Save.meta(i);
        html += "<button data-slot-load='" + i + "'>Slot " + i + (meta ? " - " + meta.savedAt + " - " + HBA.Content.maps[meta.mapId].name : " - Empty") + "</button>";
      }
      html += "<button data-action='closeModal'>Close</button></div>";
      this.modal(html);
      by("modalPanel").querySelectorAll("[data-slot-load]").forEach(function (b) {
        b.addEventListener("click", function () { HBA.Save.load(HBA.UI.game, b.dataset.slotLoad); });
      });
    },
    showSettings: function () {
      var st = this.game.state.settings;
      this.modal(
        "<h2>Settings</h2>" +
        "<div class='settings-row'><label>Volume</label><input id='setVolume' type='range' min='0' max='1' step='0.05' value='" + st.volume + "'></div>" +
        "<div class='settings-row'><label>Screen shake</label><input id='setShake' type='checkbox' " + (st.shake ? "checked" : "") + "></div>" +
        "<div class='settings-row'><label>Reduced flicker</label><input id='setFlicker' type='checkbox' " + (st.reducedFlicker ? "checked" : "") + "></div>" +
        "<div class='settings-row'><label>Difficulty</label><select id='setDifficulty'><option>Story</option><option>Normal</option><option>Harrowing</option></select></div>" +
        "<div class='menu-list'><button data-action='closeModal'>Close</button></div>"
      );
      by("setDifficulty").value = st.difficulty;
      this.applySettings();
    },
    applySettings: function () {
      var panel = by("modalPanel");
      var volume = panel.querySelector("#setVolume");
      if (!volume) return;
      volume.oninput = function () { HBA.Audio.setVolume(volume.value); };
      panel.querySelector("#setShake").onchange = function (e) { HBA.UI.game.state.settings.shake = e.target.checked; };
      panel.querySelector("#setFlicker").onchange = function (e) { HBA.UI.game.state.settings.reducedFlicker = e.target.checked; };
      panel.querySelector("#setDifficulty").onchange = function (e) { HBA.UI.game.state.settings.difficulty = e.target.value; };
    },
    renderDialogue: function (game) {
      var state = game.state.dialogue;
      var data = HBA.Content.dialogue[state.id];
      var node = data.nodes[state.node];
      by("dialogueSpeaker").textContent = data.speaker;
      by("dialogueText").textContent = node.text;
      by("dialoguePortrait").style.backgroundImage = "linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.7)), url('" + (HBA.Content.assets.sprites[data.portrait] || HBA.Content.assets.sprites.oldMan).src + "')";
      var choices = by("dialogueChoices");
      choices.innerHTML = "";
      (node.choices || [{ text: "Continue", end: true }]).forEach(function (choice) {
        var b = document.createElement("button");
        b.textContent = choice.text;
        b.addEventListener("click", function () { HBA.Dialogue.choose(game, choice); });
        choices.appendChild(b);
      });
      by("dialogueBox").classList.remove("hidden");
    },
    hideDialogue: function () { by("dialogueBox").classList.add("hidden"); },
    updateHud: function (s) {
      by("hpFill").style.width = Math.max(0, s.player.hp / s.player.maxHp * 100) + "%";
      by("staminaFill").style.width = Math.max(0, s.player.stamina / s.player.maxStamina * 100) + "%";
      by("memoryFill").style.width = Math.max(0, s.player.memory) + "%";
      if (s.toast.t > 0) {
        by("toast").textContent = s.toast.text;
        by("toast").classList.add("visible");
      } else by("toast").classList.remove("visible");
    },
    setArea: function (name) { by("areaName").textContent = name; },
    toast: function (text) {
      if (!HBA.State) return;
      HBA.State.toast = { text: text, t: 2.6 };
    },
    showDeath: function (retry) {
      this.game.state.mode = "death";
      this.modal("<h2>You Died</h2><p>Ashfall forgets the shape of your breathing, then remembers enough to hurt you again.</p><div class='menu-list'><button id='retryDeath'>Wake at Last Safe Place</button></div>");
      by("retryDeath").addEventListener("click", function () { HBA.UI.closeModal(); retry(); });
    },
    showEnding: function (id) {
      var e = HBA.Content.story.endings[id];
      this.modal("<h2>" + e.name + "</h2><p>" + e.text + "</p><div class='menu-list'><button data-action='mainMenu'>Return to Main Menu</button></div>");
    }
  };
})();
