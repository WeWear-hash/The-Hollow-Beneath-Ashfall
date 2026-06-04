(function () {
  window.THBA = window.THBA || {};

  const KEY = "the-hollow-beneath-ashfall-save-v1";

  window.THBA.SaveSystem = {
    save(slot, state) {
      const all = this.loadAll();
      all[slot] = {
        savedAt: new Date().toISOString(),
        state
      };
      localStorage.setItem(KEY, JSON.stringify(all));
    },
    load(slot) {
      return this.loadAll()[slot] || null;
    },
    loadAll() {
      try {
        return JSON.parse(localStorage.getItem(KEY) || "{}");
      } catch (error) {
        return {};
      }
    },
    clear(slot) {
      const all = this.loadAll();
      delete all[slot];
      localStorage.setItem(KEY, JSON.stringify(all));
    }
  };
})();
