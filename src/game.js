(function () {
  window.THBA = window.THBA || {};

  const TILE = 24;
  const VIEW_W = 480;
  const VIEW_H = 270;
  const SPEED = 82;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function dist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function hasFlag(state, flag) {
    return !flag || state.flags[flag];
  }

  class Game {
    constructor(ui) {
      this.canvas = ui.canvas;
      this.ctx = this.canvas.getContext("2d");
      this.ctx.imageSmoothingEnabled = false;
      this.panel = ui.panel;
      this.toastEl = ui.toast;
      this.assets = new window.THBA.AssetManager(window.THBA.ASSET_MANIFEST);
      this.input = new window.THBA.Input();
      this.audio = new window.THBA.AudioManager();
      this.maps = new Map(window.THBA.MAPS.map((map) => [map.id, map]));
      this.last = 0;
      this.mode = "loading";
      this.toastTimer = 0;
      this.dialogue = null;
      this.currentChoice = 0;
      this.portraitImages = {};
      this.failedPortraits = new Set();
      this.camera = { x: 0, y: 0 };
      this.effects = { rain: [], fog: [] };
      for (let i = 0; i < 80; i += 1) {
        this.effects.rain.push({ x: Math.random() * VIEW_W, y: Math.random() * VIEW_H, l: 5 + Math.random() * 18 });
      }
      for (let i = 0; i < 28; i += 1) {
        this.effects.fog.push({ x: Math.random() * VIEW_W, y: Math.random() * VIEW_H, r: 28 + Math.random() * 70, a: .02 + Math.random() * .045 });
      }
      this.state = this.newState();
    }

    boot() {
      this.showPanel("<h2>Loading Ashfall</h2><p class=\"muted\">The road is finding the town.</p>");
      this.assets.load().then(() => {
        this.mode = "menu";
        this.showMainMenu();
        requestAnimationFrame((time) => this.loop(time));
      });
    }

    newState() {
      return {
        mapId: "prologue",
        player: {
          x: 4 * TILE,
          y: 14 * TILE,
          w: 16,
          h: 20,
          hp: 100,
          maxHp: 100,
          stamina: 100,
          maxStamina: 100,
          dir: "down",
          attack: 0,
          dodge: 0,
          invuln: 0
        },
        inventory: ["tincture"],
        quests: { reach_main: "active" },
        flags: {},
        memories: [],
        defeated: {},
        picked: {},
        sanity: 78,
        ending: null,
        settings: { flicker: true, audio: true }
      };
    }

    loop(time) {
      const dt = Math.min(.05, (time - this.last) / 1000 || 0);
      this.last = time;
      this.update(dt, time);
      this.render(time);
      this.input.endFrame();
      requestAnimationFrame((next) => this.loop(next));
    }

    currentMap() {
      return this.maps.get(this.state.mapId);
    }

    enterMap(id, spawn) {
      this.state.mapId = id;
      const map = this.currentMap();
      const at = spawn || map.spawn;
      this.state.player.x = at.x * TILE;
      this.state.player.y = at.y * TILE;
      if (id === "main_street") this.activateQuest("chapel");
      if (id === "descent") this.activateQuest("final");
      this.toast(map.name);
      this.audio.event("horror");
    }

    update(dt, time) {
      if (this.toastTimer > 0) {
        this.toastTimer -= dt;
        if (this.toastTimer <= 0) this.toastEl.classList.add("hidden");
      }
      if (this.mode !== "play") return;

      this.handleHotkeys();
      this.updatePlayer(dt, time);
      this.updateEnemies(dt);
      this.checkPassiveInteractions();
      this.updateCamera();
    }

    handleHotkeys() {
      if (this.input.wasPressed("escape")) this.showPause();
      if (this.input.wasPressed("j")) this.showJournal();
      if (this.input.wasPressed("i")) this.showInventory();
      if (this.input.wasPressed("q")) this.useHeal();
    }

    updatePlayer(dt, time) {
      const p = this.state.player;
      p.attack = Math.max(0, p.attack - dt);
      p.dodge = Math.max(0, p.dodge - dt);
      p.invuln = Math.max(0, p.invuln - dt);
      p.stamina = clamp(p.stamina + 22 * dt, 0, p.maxStamina);

      if (this.input.wasPressed("space")) this.attack();
      if (this.input.wasPressed("e") || this.input.wasPressed("enter")) this.interact();
      if (this.input.wasPressed("shift") && p.stamina >= 28) {
        p.dodge = .22;
        p.invuln = .35;
        p.stamina -= 28;
        this.audio.event("footstep");
      }

      let vx = 0;
      let vy = 0;
      if (this.input.isDown("a", "arrowleft")) vx -= 1;
      if (this.input.isDown("d", "arrowright")) vx += 1;
      if (this.input.isDown("w", "arrowup")) vy -= 1;
      if (this.input.isDown("s", "arrowdown")) vy += 1;
      const mag = Math.hypot(vx, vy) || 1;
      vx /= mag;
      vy /= mag;
      if (vx || vy) {
        p.dir = Math.abs(vx) > Math.abs(vy) ? (vx > 0 ? "right" : "left") : (vy > 0 ? "down" : "up");
        const speed = SPEED * (p.dodge > 0 ? 2.25 : 1);
        this.moveActor(p, vx * speed * dt, vy * speed * dt);
        this.audio.step(time);
      }
    }

    updateEnemies(dt) {
      const p = this.state.player;
      for (const enemy of this.liveEnemies()) {
        const def = window.THBA.ENEMIES[enemy.type];
        enemy.hp = enemy.hp === undefined ? def.hp : enemy.hp;
        enemy.cooldown = Math.max(0, (enemy.cooldown || 0) - dt);
        const dx = p.x - enemy.x;
        const dy = p.y - enemy.y;
        const d = Math.hypot(dx, dy);
        const aggro = 125 + (100 - this.state.sanity) * 1.5;
        if (d < aggro && d > 20) {
          this.moveActor(enemy, (dx / d) * def.speed * dt, (dy / d) * def.speed * dt);
        }
        if (d < 22 && enemy.cooldown <= 0 && p.invuln <= 0) {
          enemy.cooldown = enemy.boss ? 1.1 : 1.45;
          p.hp -= def.damage;
          this.state.sanity = clamp(this.state.sanity - 2, 0, 100);
          this.audio.event("hurt");
          this.toast(`${def.name} wounds you.`);
          if (p.hp <= 0) this.die();
        }
      }
    }

    moveActor(actor, dx, dy) {
      const oldX = actor.x;
      actor.x += dx;
      if (this.collides(actor)) actor.x = oldX;
      const oldY = actor.y;
      actor.y += dy;
      if (this.collides(actor)) actor.y = oldY;
    }

    collides(actor) {
      const map = this.currentMap();
      const left = Math.floor((actor.x - 7) / TILE);
      const right = Math.floor((actor.x + 7) / TILE);
      const top = Math.floor((actor.y - 15) / TILE);
      const bottom = Math.floor((actor.y + 5) / TILE);
      const blocked = new Set(map.blocked.map((p) => `${p[0]},${p[1]}`));
      for (let y = top; y <= bottom; y += 1) {
        for (let x = left; x <= right; x += 1) {
          if (x < 0 || y < 0 || x >= map.width || y >= map.height || blocked.has(`${x},${y}`)) return true;
        }
      }
      for (const prop of map.props) {
        if (right >= prop.x && left < prop.x + prop.w && bottom >= prop.y && top < prop.y + prop.h) return true;
      }
      return false;
    }

    liveEnemies() {
      return this.currentMap().enemies.filter((enemy) => !this.state.defeated[enemy.id]);
    }

    attack() {
      const p = this.state.player;
      if (p.attack > 0 || p.stamina < 18) return;
      p.attack = .22;
      p.stamina -= 18;
      this.audio.event("hit");
      const reach = 34;
      for (const enemy of this.liveEnemies()) {
        if (dist(p, enemy) < reach) {
          const def = window.THBA.ENEMIES[enemy.type];
          enemy.hp = (enemy.hp === undefined ? def.hp : enemy.hp) - 34;
          this.state.sanity = clamp(this.state.sanity - 1, 0, 100);
          if (enemy.hp <= 0) {
            this.state.defeated[enemy.id] = true;
            this.state.sanity = clamp(this.state.sanity - def.sanity, 0, 100);
            this.toast(`${def.name} collapses into ash.`);
            this.onEnemyDefeated(enemy);
          }
          return;
        }
      }
    }

    onEnemyDefeated(enemy) {
      if (enemy.id === "bell_boss") {
        this.state.flags.boss_bell = true;
        this.activateQuest("memories");
      }
      if (enemy.id === "attendance_boss") this.state.flags.boss_keeper = true;
      if (enemy.id === "surgeon_boss") {
        this.state.flags.boss_surgeon = true;
        this.activateQuest("mine");
      }
      if (enemy.id === "final_hollow") {
        this.state.flags.boss_final = true;
        this.toast("The Hollow waits for your answer.");
      }
    }

    interact() {
      const map = this.currentMap();
      const p = this.state.player;
      for (const exit of map.exits) {
        const target = { x: exit.x * TILE, y: exit.y * TILE };
        if (dist(p, target) < 26) {
          if (!hasFlag(this.state, exit.flag)) {
            this.toast("The way is sealed by something you still lack.");
            this.audio.event("bell");
            return;
          }
          this.enterMap(exit.to, exit.spawn);
          return;
        }
      }
      for (const item of map.pickups) {
        if (!this.state.picked[item.id] && hasFlag(this.state, item.flag) && dist(p, { x: item.x * TILE, y: item.y * TILE }) < 26) {
          this.pickup(item);
          return;
        }
      }
      for (const npc of map.npcs) {
        if (hasFlag(this.state, npc.flag) && dist(p, { x: npc.x * TILE, y: npc.y * TILE }) < 30) {
          this.startDialogue(npc.dialogue, npc);
          return;
        }
      }
      if (map.memory && !this.state.memories.includes(map.memory.id) && dist(p, { x: map.memory.x * TILE, y: map.memory.y * TILE }) < 28) {
        this.collectMemory(map.memory);
        return;
      }
      this.toast("Only fog answers.");
    }

    checkPassiveInteractions() {
      const map = this.currentMap();
      const p = this.state.player;
      for (const pickup of map.pickups) {
        if (!this.state.picked[pickup.id] && hasFlag(this.state, pickup.flag) && dist(p, { x: pickup.x * TILE, y: pickup.y * TILE }) < 16) {
          this.toast(`E: ${pickup.label}`);
        }
      }
    }

    pickup(item) {
      this.state.picked[item.id] = true;
      this.state.inventory.push(item.item);
      if (item.item === "chapel_key") this.state.flags.has_chapel_key = true;
      this.audio.event("pickup");
      this.toast(`Found ${window.THBA.ITEMS[item.item].name}.`);
    }

    collectMemory(memory) {
      this.state.memories.push(memory.id);
      this.state.sanity = clamp(this.state.sanity + 6, 0, 100);
      this.state.flags[`found_${memory.id}`] = true;
      this.audio.event("bell");
      this.showPanel(`<h2>Memory</h2><p>${memory.text}</p><div class="row"><button data-action="resume">Continue</button></div>`);
      this.mode = "panel";
    }

    activateQuest(id) {
      if (!this.state.quests[id]) {
        this.state.quests[id] = "active";
        this.toast(`Quest: ${window.THBA.QUESTS[id].title}`);
      }
    }

    completeQuest(id) {
      if (this.state.quests[id] === "active") this.state.quests[id] = "complete";
    }

    useHeal() {
      const index = this.state.inventory.findIndex((id) => window.THBA.ITEMS[id].kind === "heal");
      if (index < 0) {
        this.toast("No healing items remain.");
        return;
      }
      const id = this.state.inventory.splice(index, 1)[0];
      const item = window.THBA.ITEMS[id];
      this.state.player.hp = clamp(this.state.player.hp + item.heal, 0, this.state.player.maxHp);
      this.state.sanity = clamp(this.state.sanity + 3, 0, 100);
      this.audio.event("pickup");
      this.toast(`Used ${item.name}.`);
    }

    die() {
      this.audio.event("horror");
      this.mode = "panel";
      this.showPanel(`
        <h2>You Are Remembered</h2>
        <p>The Hollow takes your breath and files it beside the others.</p>
        <div class="row">
          <button data-action="retry">Wake at the road</button>
          <button data-action="menu">Main Menu</button>
        </div>
      `, true);
    }

    startDialogue(id, npc) {
      const dialogue = window.THBA.DIALOGUES[id];
      if (!dialogue) return;
      this.dialogue = { id, npc, data: dialogue, selected: 0 };
      this.mode = "dialogue";
      this.renderDialogue();
      this.audio.event("choice");
    }

    renderDialogue(reply) {
      const d = this.dialogue.data;
      if (d.endingChoices) {
        this.renderEndingChoices();
        return;
      }
      const choices = d.choices.map((choice, index) => `<button class="choice" data-choice="${index}">${index + 1}. ${choice.text}</button>`).join("");
      const portrait = this.resolvePortraitKey(this.dialogue.npc, d);
      this.showPanel(`
        <div class="dialogue-layout">
          <div class="portrait"><canvas width="80" height="80" data-portrait-key="${portrait}"></canvas></div>
          <div>
            <h2>${d.speaker}</h2>
            <p>${reply || d.text}</p>
            <div class="row">${choices}<button data-action="resume">Leave</button></div>
          </div>
        </div>
      `);
    }

    resolvePortraitKey(npc, dialogue) {
      if (npc && typeof npc.portrait === "string") return npc.portrait;
      const numeric = ["the_hollow", "jonah_reed", "sister_elowen", "dr_selene_marr", "the_child", "orlen_voss"];
      if (npc && typeof npc.portrait === "number") return numeric[npc.portrait] || "the_hollow";
      const name = ((npc && npc.name) || (dialogue && dialogue.speaker) || "").toLowerCase();
      if (name.includes("elowen")) return "sister_elowen";
      if (name.includes("jonah")) return "jonah_reed";
      if (name.includes("marr")) return "dr_selene_marr";
      if (name.includes("child")) return "the_child";
      if (name.includes("bell")) return "bell_ringer";
      if (name.includes("orlen")) return "orlen_voss";
      if (name.includes("attendance")) return "attendance_keeper";
      if (name.includes("surgeon")) return "surgeon_without_hands";
      if (name.includes("hollow")) return "the_hollow";
      return "elias_mercer";
    }

    portraitEntry(key) {
      const manifest = window.THBA.PORTRAIT_MANIFEST;
      const portraits = manifest && Array.isArray(manifest.portraits) ? manifest.portraits : [];
      return portraits.find((entry) => entry.key === key) || portraits.find((entry) => entry.key === "elias_mercer") || null;
    }

    drawPanelPortraits() {
      const canvases = this.panel.querySelectorAll("canvas[data-portrait-key]");
      canvases.forEach((canvas) => {
        const ctx = canvas.getContext("2d");
        const key = canvas.dataset.portraitKey || "elias_mercer";
        const entry = this.portraitEntry(key);
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!entry || !entry.path || this.failedPortraits.has(entry.key)) {
          this.drawPortraitFallback(ctx, canvas, entry, key);
          return;
        }
        const cached = this.portraitImages[entry.key];
        if (cached && cached.complete && cached.naturalWidth > 0) {
          this.drawPortraitImage(ctx, canvas, cached, entry);
          return;
        }
        const img = cached || new Image();
        this.portraitImages[entry.key] = img;
        img.onload = () => this.drawPanelPortraits();
        img.onerror = () => {
          this.failedPortraits.add(entry.key);
          this.drawPanelPortraits();
        };
        if (!cached) img.src = entry.path;
        this.drawPortraitFallback(ctx, canvas, entry, key);
      });
    }

    drawPortraitImage(ctx, canvas, img, entry) {
      ctx.fillStyle = "#070708";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const scale = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const w = Math.max(1, Math.floor(img.naturalWidth * scale));
      const h = Math.max(1, Math.floor(img.naturalHeight * scale));
      const x = Math.floor((canvas.width - w) / 2);
      const y = Math.floor((canvas.height - h) / 2);
      ctx.drawImage(img, x, y, w, h);
      ctx.strokeStyle = entry.accentColor || "#6f5d4a";
      ctx.strokeRect(.5, .5, canvas.width - 1, canvas.height - 1);
    }

    drawPortraitFallback(ctx, canvas, entry, key) {
      const name = entry ? entry.displayName : key;
      const accent = entry && entry.accentColor || "#6f5d4a";
      ctx.fillStyle = "#0b0b0c";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#171614";
      ctx.fillRect(7, 7, canvas.width - 14, canvas.height - 14);
      ctx.fillStyle = accent;
      ctx.globalAlpha = .25;
      ctx.fillRect(10, 10, canvas.width - 20, 4);
      ctx.globalAlpha = 1;
      ctx.fillStyle = "#26211d";
      ctx.fillRect(28, 17, 24, 20);
      ctx.fillStyle = "#11100f";
      ctx.fillRect(21, 37, 38, 32);
      ctx.fillStyle = "#090909";
      ctx.fillRect(23, 25, 34, 8);
      ctx.strokeStyle = accent;
      ctx.strokeRect(.5, .5, canvas.width - 1, canvas.height - 1);
      ctx.fillStyle = "#d7d0bd";
      ctx.font = "9px serif";
      ctx.textAlign = "center";
      ctx.fillText((name || "Unknown").slice(0, 10), canvas.width / 2, canvas.height - 5);
    }

    chooseDialogue(index) {
      const choice = this.dialogue.data.choices[index];
      if (!choice) return;
      if (choice.flag) this.state.flags[choice.flag] = true;
      if (choice.quest) this.activateQuest(choice.quest);
      if (choice.sanity) this.state.sanity = clamp(this.state.sanity + choice.sanity, 0, 100);
      this.audio.event("choice");
      this.renderDialogue(choice.reply);
    }

    renderEndingChoices() {
      const canFree = this.state.memories.length >= 4 && this.state.flags.promised_child && this.state.inventory.includes("family_locket");
      const canBurn = this.state.inventory.includes("ember_oil") && this.state.flags.orlen_confessed;
      const canKeeper = this.state.sanity <= 35 || this.state.inventory.includes("bell_relic");
      this.showPanel(`
        <div class="dialogue-layout">
          <div class="portrait"><canvas width="80" height="80" data-portrait-key="the_hollow"></canvas></div>
          <div>
            <h2>The Hollow</h2>
            <p>${window.THBA.DIALOGUES.final_choice.text}</p>
            <button class="choice" data-ending="seal">Seal the Hollow</button>
            <button class="choice" data-ending="burn" ${canBurn ? "" : "disabled"}>Burn the Town</button>
            <button class="choice" data-ending="keeper" ${canKeeper ? "" : "disabled"}>Become the Keeper</button>
            <button class="choice" data-ending="free" ${canFree ? "" : "disabled"}>Free the Dead</button>
          </div>
        </div>
      `);
    }

    triggerEnding(id) {
      const ending = window.THBA.ENDINGS[id];
      this.state.ending = id;
      this.completeQuest("final");
      this.audio.event(id === "free" ? "bell" : "horror");
      this.mode = "ending";
      this.showPanel(`
        <h1>${ending.title}</h1>
        <p>${ending.text}</p>
        <div class="statline"><span>Memories: ${this.state.memories.length}</span><span>Sanity: ${Math.round(this.state.sanity)}</span></div>
        <div class="row"><button data-action="menu">Main Menu</button><button data-action="save">Save Ending</button></div>
      `, true);
    }

    showMainMenu() {
      const saves = window.THBA.SaveSystem.loadAll();
      const hasSave = Object.keys(saves).length > 0;
      this.mode = "menu";
      this.showPanel(`
        <h1>The Hollow Beneath Ashfall</h1>
        <p class="muted">A pixel horror RPG of fog, memory, and the town below the town.</p>
        <div class="row">
          <button data-action="new">New Game</button>
          <button data-action="load" ${hasSave ? "" : "disabled"}>Load</button>
          <button data-action="settings">Settings</button>
        </div>
      `, true);
    }

    showPause() {
      this.mode = "panel";
      this.showPanel(`
        <h2>Paused</h2>
        <div class="statline">
          <span>${this.currentMap().name}</span>
          <span>HP ${Math.round(this.state.player.hp)}/${this.state.player.maxHp}</span>
          <span>Sanity ${Math.round(this.state.sanity)}</span>
        </div>
        <div class="row">
          <button data-action="resume">Resume</button>
          <button data-action="journal">Journal</button>
          <button data-action="inventory">Inventory</button>
          <button data-action="save">Save</button>
          <button data-action="settings">Settings</button>
          <button data-action="menu">Main Menu</button>
        </div>
      `, true);
    }

    showJournal() {
      const quests = Object.keys(window.THBA.QUESTS).map((id) => {
        const state = this.state.quests[id] || "locked";
        const q = window.THBA.QUESTS[id];
        return `<h3>${q.title} - ${state}</h3><p>${q.text}</p>`;
      }).join("");
      const memories = this.state.memories.length ? this.state.memories.join(", ") : "None";
      this.mode = "panel";
      this.showPanel(`
        <h2>Journal</h2>
        <div class="statline"><span>Memories: ${this.state.memories.length}/4+</span><span>Ending clues: ${memories}</span></div>
        ${quests}
        <div class="row"><button data-action="resume">Close</button></div>
      `, true);
    }

    showInventory() {
      const counts = {};
      this.state.inventory.forEach((id) => counts[id] = (counts[id] || 0) + 1);
      const items = Object.keys(counts).map((id) => {
        const item = window.THBA.ITEMS[id];
        return `<h3>${item.name} x${counts[id]}</h3><p>${item.text}</p>`;
      }).join("") || "<p class=\"muted\">Empty.</p>";
      this.mode = "panel";
      this.showPanel(`
        <h2>Inventory</h2>
        ${items}
        <div class="row"><button data-action="heal">Use Healing Item</button><button data-action="resume">Close</button></div>
      `, true);
    }

    showSettings() {
      this.mode = "panel";
      this.showPanel(`
        <h2>Settings</h2>
        <div class="row">
          <button data-action="toggle-audio">Audio: ${this.state.settings.audio ? "On" : "Off"}</button>
          <button data-action="toggle-flicker">Flicker: ${this.state.settings.flicker ? "On" : "Off"}</button>
          <button data-action="resume">Close</button>
        </div>
      `, true);
    }

    saveGame() {
      window.THBA.SaveSystem.save("slot1", this.snapshot());
      this.toast("Saved to slot 1.");
    }

    loadGame() {
      const save = window.THBA.SaveSystem.load("slot1");
      if (!save) {
        this.toast("No save found.");
        return;
      }
      this.restore(save.state);
      this.mode = "play";
      this.hidePanel();
      this.toast("Loaded.");
    }

    snapshot() {
      return JSON.parse(JSON.stringify(this.state));
    }

    restore(state) {
      this.state = state;
      this.state.player.hp = Math.max(1, this.state.player.hp);
      this.updateCamera();
    }

    startNewGame() {
      this.audio.unlock();
      this.state = this.newState();
      this.enterMap("prologue", { x: 4, y: 14 });
      this.mode = "play";
      this.hidePanel();
      this.toast("Ashfall Road");
    }

    handlePanelClick(event) {
      const button = event.target.closest("button");
      if (!button || button.disabled) return;
      this.audio.unlock();
      const action = button.dataset.action;
      const choice = button.dataset.choice;
      const ending = button.dataset.ending;
      if (choice !== undefined) this.chooseDialogue(Number(choice));
      if (ending) this.triggerEnding(ending);
      if (action === "new") this.startNewGame();
      if (action === "load") this.loadGame();
      if (action === "save") this.saveGame();
      if (action === "resume") {
        this.mode = "play";
        this.hidePanel();
      }
      if (action === "menu") this.showMainMenu();
      if (action === "settings") this.showSettings();
      if (action === "journal") this.showJournal();
      if (action === "inventory") this.showInventory();
      if (action === "heal") {
        this.useHeal();
        this.showInventory();
      }
      if (action === "retry") {
        this.state.player.hp = this.state.player.maxHp;
        this.state.sanity = clamp(this.state.sanity - 8, 0, 100);
        this.enterMap(this.state.mapId, this.currentMap().spawn);
        this.mode = "play";
        this.hidePanel();
      }
      if (action === "toggle-audio") {
        this.state.settings.audio = !this.state.settings.audio;
        this.audio.enabled = this.state.settings.audio;
        this.showSettings();
      }
      if (action === "toggle-flicker") {
        this.state.settings.flicker = !this.state.settings.flicker;
        this.showSettings();
      }
    }

    showPanel(html, full) {
      this.panel.innerHTML = html;
      this.panel.classList.toggle("full", !!full);
      this.panel.classList.remove("hidden");
      this.panel.onclick = (event) => this.handlePanelClick(event);
      this.drawPanelPortraits();
    }

    hidePanel() {
      this.panel.classList.add("hidden");
      this.panel.innerHTML = "";
    }

    toast(text) {
      this.toastEl.textContent = text;
      this.toastEl.classList.remove("hidden");
      this.toastTimer = 2.4;
    }

    updateCamera() {
      const map = this.currentMap();
      this.camera.x = clamp(this.state.player.x - VIEW_W / 2, 0, map.width * TILE - VIEW_W);
      this.camera.y = clamp(this.state.player.y - VIEW_H / 2, 0, map.height * TILE - VIEW_H);
    }

    render(time) {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, VIEW_W, VIEW_H);
      if (this.mode === "loading") {
        ctx.fillStyle = "#050607";
        ctx.fillRect(0, 0, VIEW_W, VIEW_H);
        return;
      }
      this.drawWorld(ctx, time);
      this.drawActors(ctx, time);
      this.drawEffects(ctx, time);
      this.drawHud(ctx);
    }

    drawWorld(ctx, time) {
      const map = this.currentMap();
      const startX = Math.floor(this.camera.x / TILE);
      const startY = Math.floor(this.camera.y / TILE);
      const endX = startX + Math.ceil(VIEW_W / TILE) + 2;
      const endY = startY + Math.ceil(VIEW_H / TILE) + 2;
      for (let y = startY; y < endY; y += 1) {
        for (let x = startX; x < endX; x += 1) {
          const dx = Math.floor(x * TILE - this.camera.x);
          const dy = Math.floor(y * TILE - this.camera.y);
          this.assets.drawAlias(ctx, this.tileAlias(map, x, y), dx, dy, TILE, TILE, {
            tint: map.skin === "hollow" ? "#16101d" : map.skin === "wilds" ? "#101d14" : "#17191a",
            tintAlpha: .18
          });
        }
      }
      ctx.fillStyle = "rgba(2, 2, 3, .45)";
      for (const prop of map.props) {
        ctx.fillRect(prop.x * TILE - this.camera.x, prop.y * TILE - this.camera.y, prop.w * TILE, prop.h * TILE);
        ctx.strokeStyle = "rgba(155, 128, 91, .35)";
        ctx.strokeRect(prop.x * TILE - this.camera.x, prop.y * TILE - this.camera.y, prop.w * TILE, prop.h * TILE);
      }
      for (const exit of map.exits) this.drawMarker(ctx, exit.x, exit.y, "#b9824b", exit.label);
      if (map.memory && !this.state.memories.includes(map.memory.id)) this.drawMarker(ctx, map.memory.x, map.memory.y, "#b8d6d0", "Memory");
      for (const pickup of map.pickups) {
        if (!this.state.picked[pickup.id] && hasFlag(this.state, pickup.flag)) this.drawMarker(ctx, pickup.x, pickup.y, "#d5b27f", pickup.label);
      }
    }

    tileAlias(map, x, y) {
      if (map.skin === "town") {
        if (map.id === "school" && (x + y) % 7 === 0) return "tile.town.water";
        if ((x * 3 + y) % 11 === 0) return "tile.town.debris";
        if ((x + y) % 5 === 0) return "tile.town.road";
        return "tile.town.floor";
      }
      if (map.skin === "wilds") {
        if ((x + y * 2) % 9 === 0) return "tile.wilds.tree";
        if ((x * 5 + y) % 13 === 0) return "tile.wilds.rock";
        if ((x + y) % 4 === 0) return "tile.wilds.path";
        return "tile.wilds.floor";
      }
      if (map.id === "descent" || map.id === "underground" || map.id === "final_chamber") {
        if ((x + y) % 8 === 0) return "tile.hollow.cave";
        if ((x * 2 + y) % 13 === 0) return "tile.hollow.ritual";
      }
      if ((x + y) % 6 === 0) return "tile.hollow.stone";
      return "tile.hollow.floor";
    }

    drawMarker(ctx, tx, ty, color, label) {
      const x = tx * TILE - this.camera.x;
      const y = ty * TILE - this.camera.y;
      ctx.save();
      ctx.fillStyle = color;
      ctx.globalAlpha = .75;
      ctx.fillRect(x + 9, y + 9, 6, 6);
      ctx.globalAlpha = .9;
      ctx.font = "9px system-ui";
      ctx.fillText(label, x - 4, y - 2);
      ctx.restore();
    }

    drawActors(ctx, time) {
      const map = this.currentMap();
      for (const npc of map.npcs) {
        if (hasFlag(this.state, npc.flag)) this.drawCharacter(ctx, npc.x * TILE, npc.y * TILE, npc.id || "townsfolk", "#6d6c5f");
      }
      for (const enemy of this.liveEnemies()) this.drawEnemy(ctx, enemy, time);
      this.drawPlayer(ctx, time);
    }

    drawPlayer(ctx, time) {
      const p = this.state.player;
      const dir = p.dir === "left" ? "left" : p.dir === "right" ? "right" : p.dir === "up" ? "up" : "down";
      this.assets.drawAlias(ctx, `player.${dir}`, Math.floor(p.x - this.camera.x - 16), Math.floor(p.y - this.camera.y - 28), 32, 32, {
        mirror: false,
        tint: p.invuln > 0 ? "#e6d6bf" : null,
        tintAlpha: p.invuln > 0 ? .2 : 0
      });
      if (p.attack > 0) {
        ctx.strokeStyle = "rgba(230, 210, 172, .75)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x - this.camera.x, p.y - this.camera.y - 8, 25, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    drawCharacter(ctx, x, y, id, tint) {
      const aliases = {
        jonah: "npc.jonah",
        elowen: "npc.elowen",
        marr: "npc.marr",
        child_chapel: "npc.child",
        child_hollow: "npc.child",
        orlen: "npc.orlen",
        townsfolk: "npc.townsfolk"
      };
      this.assets.drawAlias(ctx, aliases[id] || aliases.townsfolk, Math.floor(x - this.camera.x - 16), Math.floor(y - this.camera.y - 28), 32, 32, {
        tint,
        tintAlpha: .16
      });
    }

    drawEnemy(ctx, enemy, time) {
      const def = window.THBA.ENEMIES[enemy.type];
      const alias = this.enemyAlias(enemy.type);
      const size = enemy.boss ? 48 : 34;
      this.assets.drawAlias(ctx, alias, Math.floor(enemy.x - this.camera.x - size / 2), Math.floor(enemy.y - this.camera.y - size + 8), size, size, {
        tint: def.tint,
        tintAlpha: .2,
        mirror: Math.sin(time / 500) > 0
      });
      if (enemy.boss) {
        const hp = enemy.hp === undefined ? def.hp : enemy.hp;
        ctx.fillStyle = "rgba(0,0,0,.65)";
        ctx.fillRect(102, 12, 276, 8);
        ctx.fillStyle = "#8b1f27";
        ctx.fillRect(102, 12, 276 * clamp(hp / def.hp, 0, 1), 8);
        ctx.fillStyle = "#d7d0bd";
        ctx.font = "10px system-ui";
        ctx.fillText(def.name, 102, 10);
      }
    }

    enemyAlias(type) {
      const aliases = {
        hollowed: "enemy.hollowed",
        keeper: "enemy.keeper",
        surgeon: "enemy.surgeon",
        bell: "enemy.bell",
        stalker: "enemy.stalker",
        mine: "enemy.mine",
        final: "enemy.final"
      };
      return aliases[type] || aliases.hollowed;
    }

    drawEffects(ctx, time) {
      const sanityLoss = (100 - this.state.sanity) / 100;
      ctx.save();
      for (const fog of this.effects.fog) {
        fog.x -= .08 + sanityLoss * .16;
        if (fog.x < -fog.r) fog.x = VIEW_W + fog.r;
        const gradient = ctx.createRadialGradient(fog.x, fog.y, 0, fog.x, fog.y, fog.r);
        gradient.addColorStop(0, `rgba(190, 196, 184, ${fog.a + sanityLoss * .03})`);
        gradient.addColorStop(1, "rgba(20, 20, 22, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, VIEW_W, VIEW_H);
      }
      ctx.strokeStyle = "rgba(135, 153, 160, .22)";
      ctx.lineWidth = 1;
      for (const drop of this.effects.rain) {
        drop.y += 1.4 + sanityLoss * .8;
        drop.x -= .4;
        if (drop.y > VIEW_H + 20) {
          drop.y = -20;
          drop.x = Math.random() * VIEW_W;
        }
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 3, drop.y + drop.l);
        ctx.stroke();
      }
      const flicker = this.state.settings.flicker ? Math.sin(time / 71) * .035 : 0;
      ctx.fillStyle = `rgba(0,0,0,${.18 + sanityLoss * .45 + flicker})`;
      ctx.fillRect(0, 0, VIEW_W, VIEW_H);
      if (sanityLoss > .55) {
        ctx.fillStyle = `rgba(139,31,39,${(sanityLoss - .55) * .35})`;
        ctx.fillRect(0, 0, VIEW_W, VIEW_H);
      }
      ctx.restore();
    }

    drawHud(ctx) {
      if (this.mode === "menu") return;
      const p = this.state.player;
      ctx.fillStyle = "rgba(0,0,0,.65)";
      ctx.fillRect(8, 8, 136, 35);
      this.bar(ctx, 16, 15, 92, 6, p.hp / p.maxHp, "#8b1f27");
      this.bar(ctx, 16, 27, 92, 5, p.stamina / p.maxStamina, "#b9824b");
      this.bar(ctx, 16, 37, 92, 4, this.state.sanity / 100, "#6d8f88");
      ctx.fillStyle = "#d7d0bd";
      ctx.font = "10px system-ui";
      ctx.fillText("HP", 113, 20);
      ctx.fillText("ST", 113, 32);
      ctx.fillText("MN", 113, 42);
      ctx.fillStyle = "rgba(0,0,0,.55)";
      ctx.fillRect(330, 232, 142, 28);
      ctx.fillStyle = "#d7d0bd";
      ctx.font = "10px system-ui";
      ctx.fillText("E interact  Space attack  Q mend", 337, 248);
    }

    bar(ctx, x, y, w, h, pct, color) {
      ctx.fillStyle = "#171614";
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w * clamp(pct, 0, 1), h);
    }
  }

  window.THBA.Game = Game;
})();
