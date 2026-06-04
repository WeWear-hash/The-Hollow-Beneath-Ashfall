(function () {
  window.HBA = window.HBA || {};
  HBA.Quests = {
    ensure: function (s, id) {
      if (!s.quests[id]) s.quests[id] = { stage: 0, done: false };
      return s.quests[id];
    },
    setStage: function (s, id, stage) {
      var q = this.ensure(s, id);
      q.stage = Math.max(q.stage, stage);
      var data = HBA.Content.quests[id];
      if (data && q.stage >= data.stages.length - 1) q.done = true;
      HBA.UI.toast(data ? data.name + " updated" : "Quest updated");
    },
    list: function (s) {
      return Object.keys(s.quests).map(function (id) {
        var q = s.quests[id];
        var data = HBA.Content.quests[id];
        return { id: id, name: data.name, stage: q.stage, done: q.done, text: data.stages[Math.min(q.stage, data.stages.length - 1)] };
      });
    }
  };
})();
